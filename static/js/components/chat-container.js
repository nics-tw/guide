/**
 * chat-container.js — 對話容器（role="log"）互動邏輯
 *
 * 設計決策：
 * - 屬性掛載：querySelectorAll('[data-chat-container]')，支援同頁多個執行個體
 * - 容器語意由 HTML 提供（role="log" + aria-labelledby + tabindex="0"）；
 *   JS 不建立任何 live region、不呼叫任何播報，整則訊息由 log 隱含
 *   polite 播報；串流中、階段狀態、錯誤屬 live-announcer 的職責
 * - 捲動策略：位置在底部 → 新訊息自動捲到底；上捲讀歷史 → 不捲動、
 *   顯示「捲到最新訊息」按鈕；點擊按鈕 → 捲到底，焦點留在按鈕上
 * - 按鈕的隱藏時機：聚焦期間不隱藏，blur 才隱藏。按鈕聚焦時直接隱藏
 *   會造成焦點無聲消失（各瀏覽器行為不一致，不可依賴）；改為先標記
 *   待隱藏，等使用者離開按鈕（blur）才真正隱藏
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
  // jump-latest 按鈕放在 log 元素外的同一父層，避免按鈕被當作 log 內容播報
  const jumpButton = container.parentElement
    ? container.parentElement.querySelector('[data-jump-latest]')
    : null;

  let nearBottom = isNearBottom(container);

  // 平滑捲動進行中的暫時狀態：捲動尚未到底時 nearBottom 會短暫為 false，
  // 以此旗標避免連續新增訊息時誤判為「使用者上捲中」
  let autoScrolling = false;

  // 按鈕聚焦時直接隱藏會造成焦點無聲消失（見檔頭說明），
  // 改為標記待隱藏，等 blur 才實際隱藏。
  let jumpButtonPendingHide = false;

  function hideJumpButton() {
    if (!jumpButton) return;
    if (document.activeElement === jumpButton) {
      jumpButtonPendingHide = true;
    } else {
      jumpButton.hidden = true;
    }
  }

  if (jumpButton) {
    jumpButton.addEventListener('blur', function () {
      if (jumpButtonPendingHide) {
        jumpButton.hidden = true;
        jumpButtonPendingHide = false;
      }
    });
  }

  function scrollToBottom() {
    autoScrolling = true;
    container.scrollTo({ top: container.scrollHeight });
    hideJumpButton();
  }

  container.addEventListener('scroll', function () {
    nearBottom = isNearBottom(container);
    if (nearBottom) {
      autoScrolling = false;
      hideJumpButton();
    }
  });

  // 使用者主動介入（滾輪／觸控／鍵盤捲動／拖曳捲軸）即取消自動捲到底，尊重使用者的閱讀位置
  ['wheel', 'touchstart', 'mousedown'].forEach(function (type) {
    container.addEventListener(type, function () {
      autoScrolling = false;
    }, { passive: true });
  });

  container.addEventListener('keydown', function (event) {
    if (SCROLL_KEYS.includes(event.key)) autoScrolling = false;
  });

  if (jumpButton) {
    jumpButton.addEventListener('click', function () {
      // 捲到底；焦點留在按鈕上，按鈕要等 blur 才隱藏（見檔頭說明）
      scrollToBottom();
    });
  }

  container.chatContainer = {
    /**
     * 將訊息節點加入 log 末端並依捲動策略處理捲動
     * @param {Node} node
     */
    appendMessage: function (node) {
      container.append(node);
      if (nearBottom || autoScrolling) {
        scrollToBottom();
      } else if (jumpButton) {
        jumpButtonPendingHide = false;
        jumpButton.hidden = false;
      }
    },
  };
}

document.querySelectorAll('[data-chat-container]').forEach(initChatContainer);
