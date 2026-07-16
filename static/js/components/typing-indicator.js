/**
 * typing-indicator.js — 輸入中提示互動邏輯
 *
 * 設計決策：
 * - 屬性掛載：querySelectorAll('[data-typing-indicator]')，對外 API 比照
 *   chat-container 慣例掛 element.typingIndicator = { show(), hide() }
 * - 動畫節點整體 aria-hidden="true" 常駐、永不移除；狀態完全交由
 *   live-announcer 播報一次，節點本身不承載任何輔助科技可讀的文字
 * - 防閃爍只靠延遲出現（等待期短於此值即被 hide() 取消則不顯示、不
 *   宣告）；不設最短顯示時間，它會使三點動畫與已抵達的串流文字並存重疊，誤導
 *   使用者；hide() 一律立即移除視覺，防閃爍完全由延遲出現承擔
 * - 送達確認：show() 的宣告監聽一次 live-announcer:announced（比對訊息
 *   全文），確認實際寫入 region 後才 dispatch typing-indicator:announced。
 *   多個播報來源共用同一個 polite 頻道時，時間相近的呼叫，後者會覆蓋
 *   前者，串接方以此事件為「可以開始送出回覆內容」的訊號，避免
 *   「正在輸入」被後續播報覆蓋
 * - show() 冪等：等待中或已顯示時重複呼叫不重啟計時、不重複宣告
 * - hide() 在延遲等待期間呼叫：計時器直接取消，什麼都不發生、不宣告；
 *   已顯示時呼叫：立即隱藏，不宣告任何結束訊息。隱藏後若再次 show()，
 *   視為新的一輪等待（例如使用者又送出一則新訊息），重新走一次完整的
 *   延遲出現流程並重新宣告
 * - 找不到 <live-announcer>：console.warn、視覺照常（與 message-bubble
 *   同慣例）
 */

'use strict';

// 等待期短於此值即被 hide() 取消則不顯示、不宣告，避免極快回覆時的閃爍
const SHOW_DELAY = 300;

let warnedNoAnnouncer = false;

function getAnnouncer() {
  const announcer = document.querySelector('live-announcer');
  if (!announcer || typeof announcer.announce !== 'function') {
    if (!warnedNoAnnouncer) {
      console.warn('typing-indicator：頁面上找不到可用的 <live-announcer>，播報將被略過。');
      warnedNoAnnouncer = true;
    }
    return null;
  }
  return announcer;
}

/**
 * 初始化單一節點執行個體（每個執行個體各自維護狀態）
 * @param {HTMLElement} el [data-typing-indicator] 元素
 */
function initTypingIndicator(el) {
  const text = el.getAttribute('data-typing-text') || 'AI 正在輸入';

  // 是否已請求顯示（涵蓋等待中與已顯示），用於 show() 的冪等判斷
  let active = false;
  let delayTimer = null; // 延遲出現計時

  // 上一輪 announce() 尚未觸發的送達監聽參照；hide() 與新一輪 announce()
  // 都會先把它移除，避免前一輪的送達確認遲到才觸發，在 hide() 之後或
  // 新一輪播報開始後才 dispatch 一個屬於舊一輪的 typing-indicator:announced
  let pendingOnAnnounced = null;

  function clearPendingAnnounced() {
    if (pendingOnAnnounced) {
      document.removeEventListener('live-announcer:announced', pendingOnAnnounced);
      pendingOnAnnounced = null;
    }
  }

  function announce() {
    const announcer = getAnnouncer();
    if (!announcer) return;

    clearPendingAnnounced();

    const onAnnounced = function (event) {
      const detail = event.detail;
      if (detail && detail.level === 'polite' && detail.message === text) {
        clearPendingAnnounced();
        el.dispatchEvent(new CustomEvent('typing-indicator:announced', { bubbles: true }));
      }
    };
    pendingOnAnnounced = onAnnounced;
    document.addEventListener('live-announcer:announced', onAnnounced);
    announcer.announce(text);
  }

  el.typingIndicator = {
    show: function () {
      if (active) return; // 冪等：等待中或已顯示皆不重啟、不重複宣告
      active = true;

      delayTimer = setTimeout(function () {
        delayTimer = null;
        // 節點在延遲出現期間被移出文件（例如訊息列表整段重繪）：不顯示、
        // 不宣告；同時重置 active，否則節點若原地重插，show() 的冪等判斷
        // 會誤判為「已在等待/顯示中」而永久鎖死，之後 show() 無法再觸發
        if (!el.isConnected) {
          active = false;
          return;
        }
        el.hidden = false;
        announce();
      }, SHOW_DELAY);
    },

    hide: function () {
      active = false;
      clearPendingAnnounced(); // 前一輪送達確認一併失效，hide() 之後不再 dispatch

      if (delayTimer) {
        clearTimeout(delayTimer);
        delayTimer = null;
        return; // 一次都沒顯示過：什麼都不發生，不宣告
      }

      el.hidden = true; // 立即移除視覺，不設最短顯示時間
    },
  };
}

document.querySelectorAll('[data-typing-indicator]').forEach(initTypingIndicator);
