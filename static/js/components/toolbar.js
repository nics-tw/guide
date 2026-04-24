/**
 * toolbar.js — Toolbar 元件互動邏輯
 *
 * 設計決策：
 * - selector：[role="toolbar"]，支援頁面多個 toolbar 各自初始化
 * - Roving tabindex 管理焦點，Tab 鍵只進入 / 離開整個 toolbar
 * - aria-disabled 項目「納入」roving tabindex（可導覽但 click 被攔截）
 *   依據：OQ-3 團隊決策，讓螢幕閱讀器使用者感知 disabled 項目的存在
 * - Separator（role="separator"）不進入 roving tabindex
 * - 方向鍵 wrap-around：到邊界時循環（OQ-2 決策，依 APG 規格）
 * - aria-orientation 擴充介面：初版僅實作水平（horizontal），
 *   架構保留垂直方向鍵（↑↓）的擴充空間（OQ-6）
 * - 無 JS 時：按鈕靜態展示，每個按鈕皆可 Tab 到達（漸進式增強）
 */

'use strict';

/**
 * 取得 toolbar 內所有可互動項目（排除 separator）
 * aria-disabled 項目仍納入（決策 OQ-3）
 *
 * @param {HTMLElement} toolbarEl
 * @returns {HTMLElement[]}
 */
function getToolbarItems(toolbarEl) {
  return Array.from(
    toolbarEl.querySelectorAll(
      'button, [role="button"], input, select, textarea, a[href]'
    )
  ).filter(function (el) {
    // 排除 separator 子項目（理論上不會有，但防禦性過濾）
    return el.getAttribute('role') !== 'separator';
  });
}

/**
 * 更新 roving tabindex：將 activeIndex 的項目設為 tabindex="0"，
 * 其餘設為 tabindex="-1"
 *
 * @param {HTMLElement[]} items - toolbar 可互動項目清單
 * @param {number} activeIndex - 目前活躍項目的 index
 */
function updateRovingTabindex(items, activeIndex) {
  items.forEach(function (item, index) {
    item.setAttribute('tabindex', index === activeIndex ? '0' : '-1');
  });
}

/**
 * 初始化單一 toolbar 元素
 *
 * @param {HTMLElement} toolbarEl
 */
function initToolbar(toolbarEl) {
  var items = getToolbarItems(toolbarEl);

  if (items.length === 0) return;

  // 偵測 aria-orientation，預留垂直擴充（OQ-6）
  // 初版僅實作水平（horizontal），vertical 留空待擴充
  var orientation = toolbarEl.getAttribute('aria-orientation') || 'horizontal';
  var isHorizontal = orientation !== 'vertical';

  // 初始化 roving tabindex：第一個項目 tabindex="0"，其餘 "-1"
  var activeIndex = 0;

  // 如果靜態 HTML 已指定某個 tabindex="0"，沿用該位置
  var presetIndex = items.findIndex(function (el) {
    return el.getAttribute('tabindex') === '0';
  });
  if (presetIndex !== -1) {
    activeIndex = presetIndex;
  }

  updateRovingTabindex(items, activeIndex);

  // ── 鍵盤事件 ─────────────────────────────────────────
  toolbarEl.addEventListener('keydown', function (event) {
    var key = event.key;
    var total = items.length;
    var newIndex = activeIndex;

    // 依 aria-orientation 決定方向鍵組合
    var prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    var nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

    if (key === nextKey) {
      // 下一個（wrap-around：到最後一個後循環至第一個）
      newIndex = (activeIndex + 1) % total;
      event.preventDefault();
    } else if (key === prevKey) {
      // 上一個（wrap-around：到第一個後循環至最後一個）
      newIndex = (activeIndex - 1 + total) % total;
      event.preventDefault();
    } else if (key === 'Home') {
      newIndex = 0;
      event.preventDefault();
    } else if (key === 'End') {
      newIndex = total - 1;
      event.preventDefault();
    } else {
      // 其他按鍵不處理
      return;
    }

    // 更新 tabindex 並移動焦點
    activeIndex = newIndex;
    updateRovingTabindex(items, activeIndex);
    items[activeIndex].focus();
  });

  // ── 點擊事件（焦點同步 + disabled 攔截）──────────────
  items.forEach(function (item, index) {
    item.addEventListener('click', function (event) {
      // 同步 activeIndex（使用者可能用滑鼠點擊非活躍項目）
      activeIndex = index;
      updateRovingTabindex(items, activeIndex);

      // aria-disabled 項目：攔截 click，不執行動作
      if (item.getAttribute('aria-disabled') === 'true') {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }

      // Toggle Button：切換 aria-pressed
      if (item.hasAttribute('aria-pressed')) {
        var currentPressed = item.getAttribute('aria-pressed') === 'true';
        item.setAttribute('aria-pressed', currentPressed ? 'false' : 'true');
      }

      // Menu Button：切換 aria-expanded 並管理焦點與鍵盤導航
      if (
        item.hasAttribute('aria-expanded') &&
        item.hasAttribute('aria-haspopup')
      ) {
        var currentExpanded = item.getAttribute('aria-expanded') === 'true';
        var newExpanded = !currentExpanded;
        item.setAttribute('aria-expanded', String(newExpanded));

        var controlsId = item.getAttribute('aria-controls');
        if (controlsId) {
          var menuEl = document.getElementById(controlsId);
          if (menuEl) {
            if (newExpanded) {
              menuEl.removeAttribute('hidden');

              // 開啟時：焦點移至第一個 menuitem
              var firstMenuItem = menuEl.querySelector('[role="menuitem"]');
              if (firstMenuItem) firstMenuItem.focus();

              // 加入鍵盤導航（ArrowDown/Up/Left/Right、Escape、Tab、Enter/Space）
              // 所有已處理的按鍵都需 stopPropagation()，防止冒泡至 toolbar handler
              if (!menuEl._menuKeyHandler) {
                menuEl._menuKeyHandler = function (e) {
                  var menuitems = Array.from(menuEl.querySelectorAll('[role="menuitem"]'));
                  var currentIdx = menuitems.indexOf(document.activeElement);
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    e.stopPropagation();
                    menuitems[(currentIdx + 1) % menuitems.length].focus();
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    e.stopPropagation();
                    menuitems[(currentIdx - 1 + menuitems.length) % menuitems.length].focus();
                  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    item.setAttribute('aria-expanded', 'false');
                    menuEl.setAttribute('hidden', '');
                    item.focus();
                  } else if (e.key === 'Enter' || e.key === ' ') {
                    // APG: Enter/Space 觸發 menuitem 動作，關閉選單，焦點回觸發按鈕
                    e.preventDefault();
                    e.stopPropagation();
                    item.setAttribute('aria-expanded', 'false');
                    menuEl.setAttribute('hidden', '');
                    item.focus();
                  } else if (e.key === 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    item.setAttribute('aria-expanded', 'false');
                    menuEl.setAttribute('hidden', '');
                    item.focus();
                  } else if (e.key === 'Tab') {
                    // Tab 離開選單：關閉選單，讓焦點自然移動
                    e.stopPropagation();
                    item.setAttribute('aria-expanded', 'false');
                    menuEl.setAttribute('hidden', '');
                  }
                };
                menuEl.addEventListener('keydown', menuEl._menuKeyHandler);
              }
            } else {
              menuEl.setAttribute('hidden', '');
            }
          }
        }
      }
    });

    // 焦點進入時同步 activeIndex
    // （支援使用者用 Tab 從外部進入 toolbar 時，
    //  焦點可能落在 tabindex="0" 的項目，需同步記錄）
    item.addEventListener('focus', function () {
      activeIndex = index;
    });
  });

  // ── 點擊 toolbar 外部時關閉示意選單 ──────────────────
  document.addEventListener('click', function (event) {
    if (!toolbarEl.contains(event.target)) {
      var menuButtons = toolbarEl.querySelectorAll(
        '[aria-haspopup][aria-expanded="true"]'
      );
      menuButtons.forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
        var controlsId = btn.getAttribute('aria-controls');
        if (controlsId) {
          var menuEl = document.getElementById(controlsId);
          if (menuEl) menuEl.setAttribute('hidden', '');
        }
      });
    }
  });
}

// ── 頁面初始化：支援多個 toolbar ──────────────────────
document.querySelectorAll('[role="toolbar"]').forEach(function (toolbarEl) {
  initToolbar(toolbarEl);
});
