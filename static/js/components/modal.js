/**
 * modal.js — Modal 元件互動邏輯
 *
 * 設計決策：
 * - 使用原生 <dialog> + showModal()，取得原生 focus trap 與 ESC 支援
 * - 開啟時焦點移至 <dialog> 本身（tabindex="-1" + dialog.focus()）
 *   依據：Adrian Roselli 2025 建議，先宣告標題再讓使用者 Tab 到互動元素
 * - 關閉時焦點還原至觸發按鈕（JS 手動管理，原生 <dialog> 不自動處理）
 * - Backdrop 點擊關閉：預設啟用，可在 <dialog> 加上 data-modal-no-backdrop-close 停用
 * - 不在 dialog 層級攔截 Space 鍵，讓瀏覽器原生行為處理
 * - 無 JS 時：<dialog open> 可靜態展示內容（漸進式增強）
 */

'use strict';

/**
 * 初始化單一 dialog 元素
 * @param {HTMLDialogElement} dialog
 */
function initModal(dialog) {
  // 觸發按鈕：以 data-modal-trigger 的值對應 dialog 的 id
  const triggers = document.querySelectorAll(
    `[data-modal-trigger="${dialog.id}"]`
  );

  // 記錄最近一次觸發此 modal 的元素，用於關閉後還原焦點
  let lastTrigger = null;

  /**
   * 開啟 modal
   * @param {Element} triggerEl — 觸發按鈕（關閉後還原焦點用）
   */
  function openModal(triggerEl) {
    lastTrigger = triggerEl;
    dialog.showModal();
    // 焦點移至 dialog 本身（非第一個子元素）
    // tabindex="-1" 使 dialog 可被程式化聚焦
    dialog.focus();
  }

  /**
   * 關閉 modal，並還原焦點至觸發元素
   */
  function closeModal() {
    dialog.close();
    // 檢查觸發元素是否仍在 DOM 中（可能已被移除），防範邊界案例
    if (lastTrigger && document.contains(lastTrigger) && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    } else {
      // fallback：觸發元素已從 DOM 移除，焦點移至主內容區
      const main = document.querySelector('main') || document.body;
      if (typeof main.focus === 'function') main.focus();
    }
  }

  // ── 觸發按鈕：點擊開啟 ───────────────────────────────
  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openModal(trigger);
    });
  });

  // ── 關閉按鈕：data-modal-close ────────────────────────
  // 監聽 dialog 內所有帶有 data-modal-close 的按鈕
  dialog.addEventListener('click', function (event) {
    const closeBtn = event.target.closest('[data-modal-close]');
    if (closeBtn) {
      closeModal();
    }
  });

  // ── ESC 鍵：補強焦點還原 ──────────────────────────────
  // 原生 <dialog> + showModal() 已支援 ESC 觸發 cancel 事件並關閉 dialog，
  // 但不會自動還原焦點至觸發元素，需手動補強。
  dialog.addEventListener('cancel', function (event) {
    // 阻止原生關閉，改由 closeModal() 統一處理（含焦點還原）
    event.preventDefault();
    closeModal();
  });

  // ── Focus Trap：手動攔截 Tab 鍵 ──────────────────────
  // showModal() 的原生 focus trap 在部分瀏覽器（Safari + VoiceOver）不可靠，
  // 依據 Vispero/TPGi 建議，JS 層需手動確保 Tab 在 dialog 內循環。
  dialog.addEventListener('keydown', function (event) {
    if (event.key !== 'Tab') return;

    var focusable = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // ── Backdrop 點擊關閉 ─────────────────────────────────
  // 預設啟用；在 <dialog> 加上 data-modal-no-backdrop-close 可停用。
  // 偵測方式：使用 getBoundingClientRect 判斷點擊位置是否在 dialog 邊界外。
  // 注意：backdrop 的 click 事件會冒泡至 dialog 元素本身。
  dialog.addEventListener('click', function (event) {
    if (dialog.hasAttribute('data-modal-no-backdrop-close')) {
      return;
    }

    const rect = dialog.getBoundingClientRect();
    const isInsideDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInsideDialog) {
      closeModal();
    }
  });
}

// ── 初始化頁面上所有 modal ────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  // 找到所有由 data-modal-trigger 所指向的 dialog 元素
  const triggerEls = document.querySelectorAll('[data-modal-trigger]');

  triggerEls.forEach(function (trigger) {
    const modalId = trigger.getAttribute('data-modal-trigger');
    const dialog = document.getElementById(modalId);

    if (dialog && dialog.tagName === 'DIALOG') {
      // 避免重複初始化（同一 dialog 被多個觸發按鈕共用時）
      if (!dialog.dataset.modalInit) {
        dialog.dataset.modalInit = 'true';
        initModal(dialog);
      }
    }
  });
});
