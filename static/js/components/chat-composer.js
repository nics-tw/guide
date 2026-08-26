/**
 * chat-composer.js — 訊息輸入區互動邏輯
 *
 * 原生 form submit 是唯一送出介面；本檔只管理空白／忙碌守門、
 * IME 安全快捷鍵、草稿與選填附件保全、可見操作狀態及送出階段錯誤。
 * 訊息渲染、串流錯誤、停止產生回覆、附件限制與後端請求都由採用端整合。
 */

'use strict';

let warnedNoAnnouncer = false;

function getAnnouncer() {
  const announcer = document.querySelector('live-announcer');
  if (!announcer || typeof announcer.alert !== 'function') {
    if (!warnedNoAnnouncer) {
      console.warn('chat-composer：頁面上找不到可用的 <live-announcer>，錯誤播報將被略過。');
      warnedNoAnnouncer = true;
    }
    return null;
  }
  return announcer;
}

function initChatComposer(form) {
  if (form.chatComposer) return;

  const input = form.querySelector('[data-chat-composer-input]');
  const submitButton = form.querySelector('[data-chat-composer-submit]');
  const error = form.querySelector('[data-chat-composer-error]');
  const status = form.querySelector('[data-chat-composer-status]');
  const attachments = form.querySelector('[data-chat-composer-attachments]');
  const attachmentSelection = form.querySelector('[data-chat-composer-selection]');
  const attachmentList = form.querySelector('[data-chat-composer-attachment-list]');
  const clearAttachmentsButton = form.querySelector('[data-chat-composer-clear-attachments]');

  if (!input || !submitButton || !error) {
    console.warn('chat-composer：缺少必要的 input、submit 或 error 節點，未進行初始化。');
    return;
  }

  let busy = false;
  let attachmentsVersion = 0;

  function isBlank() {
    return input.value.trim().length === 0;
  }

  function isBlocked() {
    return busy || isBlank();
  }

  function syncSubmitState() {
    if (isBlocked()) {
      submitButton.setAttribute('aria-disabled', 'true');
    } else {
      submitButton.removeAttribute('aria-disabled');
    }
  }

  function clearError() {
    error.textContent = '';
    error.hidden = true;
    input.removeAttribute('aria-invalid');
  }

  function setStatus(message) {
    if (!status) return;
    const value = typeof message === 'string' ? message : String(message);
    status.textContent = value;
    status.hidden = value.trim().length === 0;
  }

  function renderAttachments() {
    if (!attachments) return;

    const files = Array.from(attachments.files || []);
    if (attachmentList) {
      attachmentList.replaceChildren();
      files.forEach(function (file) {
        const item = document.createElement('li');
        const name = document.createElement('span');
        item.className = 'file-upload__file';
        name.className = 'file-upload__file-name';
        name.textContent = file.name;
        item.append(name);
        attachmentList.append(item);
      });
    }

    if (attachmentSelection) attachmentSelection.hidden = files.length === 0;
    if (clearAttachmentsButton) clearAttachmentsButton.hidden = files.length === 0;
  }

  function clearAttachments() {
    if (!attachments || !attachments.files || attachments.files.length === 0) return;
    attachments.value = '';
    attachmentsVersion += 1;
    renderAttachments();
  }

  submitButton.addEventListener('click', function (event) {
    if (isBlocked()) event.preventDefault();
  });

  form.addEventListener('submit', function (event) {
    if (isBlocked()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  input.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && !event.isComposing) {
      event.preventDefault();
      if (typeof form.requestSubmit === 'function') {
        form.requestSubmit(submitButton);
      } else {
        submitButton.click();
      }
    }
  });

  input.addEventListener('input', function () {
    clearError();
    syncSubmitState();
  });

  if (attachments) {
    attachments.addEventListener('change', function () {
      attachmentsVersion += 1;
      clearError();
      renderAttachments();
    });
  }

  if (clearAttachmentsButton) {
    clearAttachmentsButton.addEventListener('click', clearAttachments);
  }

  form.addEventListener('reset', function () {
    // 原生 reset 會在事件結束後套用初始值，下一個 task 再同步畫面狀態。
    setTimeout(function () {
      attachmentsVersion += 1;
      clearError();
      renderAttachments();
      setStatus('');
      syncSubmitState();
    }, 0);
  });

  form.chatComposer = {
    captureSubmission: function () {
      return {
        message: input.value,
        attachmentsVersion: attachmentsVersion,
      };
    },

    accept: function (submission) {
      const submittedValue = typeof submission === 'object' && submission !== null
        ? submission.message
        : submission;
      const submittedAttachmentsVersion = typeof submission === 'object' && submission !== null
        ? submission.attachmentsVersion
        : null;

      clearError();
      if (input.value === submittedValue) input.value = '';
      if (submittedAttachmentsVersion === attachmentsVersion) clearAttachments();
      busy = true;
      setStatus('訊息已送出，正在等待回覆。');
      syncSubmitState();
    },

    fail: function (message) {
      busy = false;
      error.textContent = typeof message === 'string' ? message : String(message);
      error.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      setStatus('');
      syncSubmitState();

      // 焦點留在輸入框時，顯示 aria-describedby 指向的錯誤會讓 AT
      // 重新讀取欄位說明；此時再寫入 assertive region 會造成同一句雙播。
      // 只有焦點位於其他控制（例如以送出按鈕提交）時才額外宣告。
      if (document.activeElement !== input) {
        const announcer = getAnnouncer();
        if (announcer) announcer.alert(error.textContent);
      }
    },

    setBusy: function (isBusy) {
      busy = Boolean(isBusy);
      if (busy) {
        clearError();
        setStatus('正在送出訊息。');
      }
      syncSubmitState();
    },

    setStatus: setStatus,
    clearError: clearError,
  };

  renderAttachments();
  syncSubmitState();
}

document.querySelectorAll('[data-chat-composer]').forEach(initChatComposer);
