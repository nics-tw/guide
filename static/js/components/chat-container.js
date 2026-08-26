/**
 * chat-container.js — 對話容器（role="log"）互動邏輯
 *
 * 設計決策：
 * - 屬性掛載：querySelectorAll('[data-chat-container]')，支援同頁多個執行個體
 * - 容器語意由 HTML 提供（role="log" + aria-labelledby + tabindex="0"）；
 *   JS 啟用後，只有內容實際溢出時才保留在 Tab 順序，避免不可捲動的
 *   空間形成沒有操作作用的焦點停靠點；無 JS 時仍保留鍵盤捲動基線
 *   JS 不建立任何 live region、不呼叫任何播報，整則訊息由 log 隱含
 *   polite 播報；串流中、階段狀態、錯誤屬 live-announcer 的職責
 * - 捲動策略：位置接近底部 → 新訊息及同一則訊息的內容增長持續捲到底；
 *   上捲讀歷史 → 不捲動、顯示「捲到最新訊息」按鈕；點擊按鈕 →
 *   捲到底，焦點留在按鈕上
 * - 按鈕的隱藏時機：聚焦期間不隱藏，blur 才隱藏。按鈕聚焦時直接隱藏
 *   會造成焦點無聲消失（各瀏覽器行為不一致，不可依賴）；因此先標記
 *   待隱藏，等使用者離開按鈕（blur）後才真正隱藏
 * - 新訊息永不搶焦點；視覺捲動與鍵盤焦點分開處理
 * - 平滑捲動由 CSS scroll-behavior 控制（reduced-motion 由 SCSS 覆蓋為瞬時）
 * - 對外 API：element.chatContainer.appendMessage(node)
 *   只負責 append 與捲動，不產生節點內容（節點內容是 message-bubble 的職責）
 */

'use strict';

// 「接近底部」判定閾值（px），可依實際使用情境調整。
const NEAR_BOTTOM_THRESHOLD = 48;

// 容器（tabindex="0"）聚焦時可觸發原生捲動的按鍵：視為使用者主動介入
const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];

/**
 * 捲動位置是否接近底部
 * @param {HTMLElement} container
 * @returns {boolean}
 */
function isNearBottom(container) {
  return container.scrollHeight - container.scrollTop - container.clientHeight
    <= NEAR_BOTTOM_THRESHOLD;
}

/**
 * 初始化單一容器執行個體（每個執行個體各自維護狀態）
 * @param {HTMLElement} container [data-chat-container] 元素
 */
function initChatContainer(container) {
  if (container.chatContainer) return;

  // jump-latest 按鈕放在 log 元素外的同一父層，避免按鈕被當作 log 內容播報
  const jumpButton = container.parentElement
    ? container.parentElement.querySelector('[data-jump-latest]')
    : null;

  let nearBottom = isNearBottom(container);

  // 是否持續跟隨最新內容。不能只在 appendMessage() 時檢查，因為串流
  // 訊息會在同一個節點內逐段增加高度。初次載入尚無使用者捲動意圖，
  // 即使預先渲染的內容已超出容器，也應先顯示最新位置；只有使用者
  // 主動捲動時才停止跟隨。
  let followLatest = true;

  // 平滑捲動進行中的暫時狀態：捲動尚未到底時 nearBottom 會短暫為 false，
  // 以此旗標避免連續新增訊息時誤判為「使用者上捲中」
  let autoScrolling = false;

  // 按鈕聚焦時直接隱藏會造成焦點無聲消失（見檔頭說明），
  // 因此先標記待隱藏，等 blur 後才實際隱藏。
  let jumpButtonPendingHide = false;

  // HTML 先保留 tabindex="0"，確保無 JS 時溢出內容仍可用鍵盤捲動。
  // JS 啟用後依實際尺寸調整：沒有溢出時不占用 Tab 順序；內容增加、
  // 視窗縮小或文字放大造成溢出時，再自動恢復為可聚焦。
  function syncScrollTabStop() {
    const isScrollable = container.scrollHeight > container.clientHeight + 1;
    container.setAttribute('tabindex', isScrollable ? '0' : '-1');
  }

  function hideJumpButton() {
    if (!jumpButton) return;
    if (document.activeElement === jumpButton) {
      jumpButtonPendingHide = true;
    } else {
      jumpButton.hidden = true;
    }
  }

  function showJumpButton() {
    if (!jumpButton) return;
    jumpButtonPendingHide = false;
    jumpButton.hidden = false;
  }

  if (jumpButton) {
    jumpButton.addEventListener('blur', function () {
      if (jumpButtonPendingHide) {
        jumpButton.hidden = true;
        jumpButtonPendingHide = false;
      }
    });
  }

  function scrollToBottom(smooth) {
    followLatest = true;
    autoScrolling = true;
    if (smooth) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    } else {
      // 串流內容可能在短時間內連續增高；每次重啟平滑捲動會讓實際位置
      // 持續落後新目標，因此自動跟隨使用即時定位。
      container.scrollTop = container.scrollHeight;
      nearBottom = isNearBottom(container);
      if (nearBottom) autoScrolling = false;
    }
    hideJumpButton();
  }

  container.addEventListener('scroll', function () {
    nearBottom = isNearBottom(container);
    if (nearBottom) {
      followLatest = true;
      autoScrolling = false;
      hideJumpButton();
    } else if (!autoScrolling) {
      followLatest = false;
    }
  });

  // 使用者主動介入（滾輪／觸控／鍵盤捲動／拖曳捲軸）即取消自動捲到底，尊重使用者的閱讀位置
  ['wheel', 'touchstart', 'mousedown'].forEach(function (type) {
    container.addEventListener(type, function () {
      followLatest = false;
      autoScrolling = false;
    }, { passive: true });
  });

  container.addEventListener('keydown', function (event) {
    if (SCROLL_KEYS.includes(event.key)) {
      followLatest = false;
      autoScrolling = false;
    }
  });

  // 文字／DOM 變動與圖片、字型、CSS reflow 等尺寸變動都可能讓既有
  // 訊息繼續增高。版面完成後再捲動，才能取得新的 scrollHeight。
  // 多個同步變動合併到同一個 animation frame。
  let pendingScrollFrame = null;

  function scheduleLayoutSync() {
    if (pendingScrollFrame !== null) return;

    pendingScrollFrame = requestAnimationFrame(function () {
      pendingScrollFrame = null;
      syncScrollTabStop();
      if (followLatest || autoScrolling) {
        scrollToBottom();
      } else {
        showJumpButton();
      }
    });
  }

  let resizeObserver = null;
  const observedContentElements = new Set();

  function syncObservedContentElements() {
    if (!resizeObserver) return;

    const currentElements = new Set(Array.from(container.children));
    observedContentElements.forEach(function (element) {
      if (currentElements.has(element)) return;
      resizeObserver.unobserve(element);
      observedContentElements.delete(element);
    });

    currentElements.forEach(function (element) {
      if (observedContentElements.has(element)) return;
      resizeObserver.observe(element);
      observedContentElements.add(element);
    });
  }

  const contentObserver = new MutationObserver(function () {
    syncObservedContentElements();
    scheduleLayoutSync();
  });

  contentObserver.observe(container, {
    attributes: true,
    attributeFilter: ['hidden', 'streaming'],
    characterData: true,
    childList: true,
    subtree: true,
  });

  // 容器尺寸會因 viewport 或文字放大改變；直接訊息元素也會因內部圖片、
  // 字型載入或 CSS reflow 改變尺寸。兩者都不一定伴隨 DOM mutation。
  // 觀察直接子元素即可涵蓋常見訊息內容，避免監看整個後代樹。
  if (typeof ResizeObserver === 'function') {
    resizeObserver = new ResizeObserver(scheduleLayoutSync);
    resizeObserver.observe(container);
    syncObservedContentElements();
  }

  // 瀏覽器預設從 scrollTop = 0 開始。預先渲染的對話若已超出容器，
  // 這不是使用者上捲的結果，不能據此停在最舊訊息。等待目前畫面完成
  // 版面配置後，直接定位到最新內容；後續才依使用者操作維護狀態。
  requestAnimationFrame(function () {
    syncScrollTabStop();
    if (!followLatest) return;
    scrollToBottom();
  });

  if (jumpButton) {
    jumpButton.addEventListener('click', function () {
      // 捲到底；焦點留在按鈕上，按鈕要等 blur 才隱藏（見檔頭說明）
      scrollToBottom(true);
    });
  }

  container.chatContainer = {
    /**
     * 將訊息節點加入 log 末端並依捲動策略處理捲動
     * @param {Node} node
     */
    appendMessage: function (node) {
      container.append(node);
      if (nearBottom || followLatest || autoScrolling) {
        scrollToBottom();
      } else {
        showJumpButton();
      }
    },
  };
}

document.querySelectorAll('[data-chat-container]').forEach(initChatContainer);
