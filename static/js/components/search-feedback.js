/**
 * Search Feedback — 搜尋狀態回饋元件（核心）
 *
 * 提供搜尋狀態回饋所需的工具函式，供消費者在自己的搜尋流程中使用。
 * Demo 模擬程式碼請見 search-feedback.demo.js。
 *
 * 使用方式：
 *   1. 在 HTML 中建立 status / alert live region（參考元件頁面的 HTML 範例）
 *   2. 在搜尋邏輯中呼叫 updateStatus() / updateAlert() 更新狀態
 *   3. 若需即時篩選，可搭配 debounce() 控制觸發頻率
 *
 * ARIA 設計說明：
 *   - <output> 原生具有 role="status" + aria-live="polite"，為語意化的狀態容器
 *   - 需要 assertive 通知時，在 <output> 加上 role="alert" 覆寫
 *   - status region 必須在頁面載入時就存在於 DOM，初始內容為空
 *   - 更新順序：先更新結果列表 → 再更新 status 文字
 *   - 重複搜尋：先清空 status（約 100ms delay）→ 再填入新文字，確保宣告觸發
 *   - 不立即清空 status（至少等 1000ms），讓 AT 有時間讀完
 *   - 宣告文字含 keyword，使用 textContent 插入（不使用 innerHTML，避免 XSS）
 *   - 多語言環境：訊息字串應從 data attribute 或設定檔讀取，不 hardcode
 */

// =============================================================================
// 工具函式
// =============================================================================

/**
 * debounce：延遲執行函式，避免過於頻繁觸發
 * @param {Function} fn       要延遲執行的函式
 * @param {number}   delay    延遲毫秒數
 * @returns {Function}
 */
function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () { fn.apply(context, args); }, delay);
  };
}

/**
 * 更新 status region 的文字與狀態 class
 *
 * 更新流程（確保 AT 能重複宣告相同文字）：
 *   1. 清空文字並移除所有狀態 class
 *   2. 等待約 100ms（讓 AT 感知到空→有的變化）
 *   3. 設定新的狀態 class 與文字
 *
 * @param {HTMLOutputElement} statusEl  <output> 容器元素（原生 role="status"）
 * @param {string}      state     'loading' | 'found' | 'not-found' | 'error' | ''
 * @param {string}      message   宣告文字（用 textContent 設定，非 innerHTML）
 */
function updateStatus(statusEl, state, message) {
  if (!statusEl) return;

  var BASE_CLASS = 'search-feedback__status';
  var STATES = ['loading', 'found', 'not-found', 'error'];

  // 步驟 1：清空內容，移除所有狀態 modifier class
  statusEl.textContent = '';
  STATES.forEach(function (s) { statusEl.classList.remove(BASE_CLASS + '--' + s); });

  if (!state) return; // 只是要清空，到此結束

  // 步驟 2：短暫延遲後填入新內容（確保 AT 能重新觸發宣告）
  setTimeout(function () {
    if (state) {
      statusEl.classList.add(BASE_CLASS + '--' + state);
    }
    // 使用 textContent 而非 innerHTML，防止 XSS
    statusEl.textContent = message;
  }, 100);
}

/**
 * 更新 assertive alert region（無結果、錯誤等需立即通知的狀態）
 * 與 updateStatus 共用 modifier class 以統一視覺樣式
 *
 * @param {HTMLOutputElement} alertEl   <output role="alert"> 容器元素
 * @param {string}      state     'not-found' | 'error' | ''
 * @param {string}      message   宣告文字
 */
function updateAlert(alertEl, state, message) {
  if (!alertEl) return;

  var BASE_CLASS = 'search-feedback__status';
  var STATES = ['not-found', 'error'];

  alertEl.textContent = '';
  STATES.forEach(function (s) { alertEl.classList.remove(BASE_CLASS + '--' + s); });

  if (!state) return;

  setTimeout(function () {
    alertEl.classList.add(BASE_CLASS + '--' + state);
    alertEl.textContent = message;
  }, 100);
}

// 匯出至全域，供外部檔案（如 search-feedback.demo.js）存取
window.debounce = debounce;
window.updateStatus = updateStatus;
window.updateAlert = updateAlert;
