/**
 * Search Feedback — Demo 模擬程式碼
 *
 * 此檔案僅供元件展示頁使用，包含模擬搜尋與即時篩選的 demo 邏輯。
 * 實際使用時不需載入此檔案，只需載入 search-feedback.js（核心）。
 *
 * 依賴：search-feedback.js（需先載入，提供 updateStatus / updateAlert / debounce）
 */

// 從全域取得核心函式（因 type="module" 各檔案為獨立作用域）
var updateStatus = window.updateStatus;
var updateAlert = window.updateAlert;
var debounce = window.debounce;

// =============================================================================
// Demo 功能一：initSearchFeedbackDemo — 提交搜尋示範
// =============================================================================

/**
 * 初始化提交搜尋示範
 * @param {HTMLElement} root  [data-search-feedback-demo] 根容器
 */
function initSearchFeedbackDemo(root) {
  var form           = root.querySelector('[data-search-form]');
  var input          = root.querySelector('[data-search-input]');
  var statusEl       = root.querySelector('[data-search-status]');
  var alertEl        = root.querySelector('[data-search-alert]');
  var resultsList    = root.querySelector('[data-search-results]');
  var resultsHeading = root.querySelector('[data-results-heading]');
  var controls       = root.querySelector('[data-search-controls]');

  if (!statusEl) return;

  /**
   * 模擬搜尋並更新狀態
   * @param {string} state    狀態類型
   * @param {string} keyword  搜尋關鍵字（含 keyword 的宣告文字）
   * @param {number} [count]  有結果時的筆數
   */
  function simulateSearch(state, keyword, count) {
    // 步驟 1：顯示「搜尋中」，清除前次結果與 alert，設定 aria-busy
    updateAlert(alertEl, '', '');
    if (resultsHeading) resultsHeading.textContent = '';
    if (resultsList) {
      resultsList.setAttribute('aria-busy', 'true');
      resultsList.hidden = true;
    }
    updateStatus(statusEl, 'loading', '搜尋中，請稍候...');

    // 步驟 2：模擬網路延遲後回傳結果
    setTimeout(function () {
      // 先更新結果列表，再更新 status（順序重要）
      if (resultsList) {
        resultsList.removeAttribute('aria-busy');
        if (state === 'found') {
          resultsList.hidden = false;
        } else {
          resultsList.hidden = true;
        }
      }

      // 再更新 status / alert 文字
      var message = '';
      if (state === 'found') {
        message = keyword
          ? '搜尋結果共 ' + count + ' 筆，關鍵字「' + keyword + '」'
          : '搜尋結果共 ' + count + ' 筆';
        updateAlert(alertEl, '', '');
        if (resultsHeading) {
          resultsHeading.textContent = message;
          updateStatus(statusEl, '', '');
        } else {
          updateStatus(statusEl, state, message);
        }
      } else if (state === 'not-found') {
        message = keyword
          ? '找不到符合「' + keyword + '」的項目，請試試其他關鍵字'
          : '找不到符合的項目，請試試其他關鍵字';
        updateStatus(statusEl, '', '');
        setTimeout(function () {
          updateAlert(alertEl, 'not-found', message);
        }, 200);
      } else if (state === 'error') {
        message = '搜尋失敗，請稍後再試';
        updateStatus(statusEl, '', '');
        setTimeout(function () {
          updateAlert(alertEl, 'error', message);
        }, 200);
      }
    }, 600); // 模擬 600ms 網路延遲
  }

  // 表單提交事件
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var keyword = input ? input.value.trim() : '';
      if (!keyword) return;
      simulateSearch('found', keyword, 12);
    });
  }

  // Demo 控制按鈕事件
  if (controls) {
    controls.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-search-trigger]');
      if (!btn) return;

      var state   = btn.dataset.searchTrigger;
      var keyword = btn.dataset.keyword || '';
      var count   = parseInt(btn.dataset.resultCount, 10) || 0;

      simulateSearch(state, keyword, count);
    });
  }
}

// =============================================================================
// Demo 功能二：initLiveFilterDemo — 即時篩選示範
// =============================================================================

/**
 * 初始化即時篩選示範
 * @param {HTMLElement} root  [data-live-filter-demo] 根容器
 */
function initLiveFilterDemo(root) {
  var input    = root.querySelector('[data-live-filter-input]');
  var statusEl = root.querySelector('[data-live-filter-status]');
  var alertEl  = root.querySelector('[data-live-filter-alert]');
  var list     = root.querySelector('[data-live-filter-list]');

  if (!input || !statusEl || !list) return;

  var allItems = Array.from(list.querySelectorAll('[data-filter-text]'));

  /**
   * 執行篩選並更新 status
   * @param {string} query  篩選字串
   */
  function doFilter(query) {
    var q = query.trim().toLowerCase();

    // 步驟 1：先更新結果列表（顯示/隱藏項目）
    var visibleCount = 0;
    allItems.forEach(function (item) {
      var text = (item.dataset.filterText || item.textContent).toLowerCase();
      var matches = !q || text.indexOf(q) !== -1;
      item.hidden = !matches;
      if (matches) visibleCount++;
    });

    // 步驟 2：再更新 status 文字（順序重要，AT 宣告應在結果更新後）
    if (!q) {
      updateStatus(statusEl, '', '');
      return;
    }

    var message = '';
    if (visibleCount > 0) {
      message = '篩選「' + q + '」，共找到 ' + visibleCount + ' 筆項目';
      updateStatus(statusEl, 'found', message);
      updateAlert(alertEl, '', '');
    } else {
      message = '找不到符合「' + q + '」的項目';
      updateAlert(alertEl, 'not-found', message);
      updateStatus(statusEl, '', '');
    }
  }

  // debounce 300ms，避免每次按鍵都觸發宣告
  var debouncedFilter = debounce(function () { doFilter(input.value); }, 300);

  // IME 組字狀態追蹤（注音、拼音等輸入法）
  var isComposing = false;

  input.addEventListener('compositionstart', function () {
    isComposing = true;
  });

  input.addEventListener('compositionend', function () {
    isComposing = false;
    debouncedFilter();
  });

  input.addEventListener('input', function () {
    if (isComposing) return;
    debouncedFilter();
  });
}

// =============================================================================
// Demo 自動初始化
// =============================================================================

document.addEventListener('DOMContentLoaded', function () {
  // 初始化提交搜尋示範
  document.querySelectorAll('[data-search-feedback-demo]').forEach(function (root) {
    initSearchFeedbackDemo(root);
  });

  // 初始化即時篩選示範
  document.querySelectorAll('[data-live-filter-demo]').forEach(function (root) {
    initLiveFilterDemo(root);
  });
});
