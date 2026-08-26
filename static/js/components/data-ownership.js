/**
 * data-ownership.js — 資料使用權限面板互動邏輯
 *
 * 原生 form submit 是唯一送出介面；本檔只管理設定草稿、忙碌守門、
 * 可見結果訊息，以及請求期間繼續修改設定時的競態保護。
 * 後端請求、合法基礎與持久化由採用端負責。
 */

'use strict';

function initDataOwnership(form) {
  if (form.dataOwnership) return;

  const options = Array.from(form.querySelectorAll('[data-data-ownership-option]'));
  const submitButton = form.querySelector('[data-data-ownership-submit]');
  const status = form.querySelector('[data-data-ownership-status]');
  const error = form.querySelector('[data-data-ownership-error]');

  if (options.length === 0 || !submitButton || !status || !error) {
    console.warn('data-ownership：缺少必要的 option、submit、status 或 error 節點，未進行初始化。');
    return;
  }

  if (options.some(function (option) { return !option.name; })) {
    console.warn('data-ownership：每個選項都必須有 name，未進行初始化。');
    return;
  }

  let busy = false;
  let version = 0;
  const submitLabel = submitButton.textContent.trim();

  function readValues() {
    return options.reduce(function (values, option) {
      values[option.name] = option.checked;
      return values;
    }, {});
  }

  function copyValues(values) {
    return options.reduce(function (copy, option) {
      copy[option.name] = Boolean(values && values[option.name]);
      return copy;
    }, {});
  }

  function matches(values) {
    return options.every(function (option) {
      return option.checked === Boolean(values[option.name]);
    });
  }

  let confirmedValues = readValues();

  function clearStatus() {
    status.textContent = '';
  }

  function clearError() {
    error.textContent = '';
    error.hidden = true;
  }

  function clearMessage() {
    clearStatus();
    clearError();
  }

  function setStatus(message) {
    clearError();
    status.textContent = message;
  }

  function setError(message) {
    clearStatus();
    error.textContent = message;
    error.hidden = false;
  }

  function isDirty() {
    return !matches(confirmedValues);
  }

  function syncState() {
    const dirty = isDirty();
    const blocked = busy || !dirty;

    form.dataset.state = busy ? 'saving' : (dirty ? 'dirty' : 'pristine');
    submitButton.textContent = busy ? '儲存中…' : submitLabel;
    if (blocked) {
      submitButton.setAttribute('aria-disabled', 'true');
    } else {
      submitButton.removeAttribute('aria-disabled');
    }
  }

  submitButton.addEventListener('click', function (event) {
    if (busy || !isDirty()) event.preventDefault();
  });

  form.addEventListener('submit', function (event) {
    if (busy || !isDirty()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  options.forEach(function (option) {
    option.addEventListener('change', function () {
      version += 1;
      clearError();
      if (!busy) clearStatus();
      syncState();
    });
  });

  form.addEventListener('reset', function () {
    queueMicrotask(function () {
      version += 1;
      clearMessage();
      syncState();
    });
  });

  form.dataOwnership = {
    captureSubmission: function () {
      return Object.freeze({
        values: Object.freeze(copyValues(readValues())),
        version: version,
      });
    },

    setBusy: function (isBusy) {
      busy = Boolean(isBusy);
      if (busy) {
        clearMessage();
      } else {
        clearStatus();
      }
      syncState();
    },

    accept: function (submission, message) {
      const acceptedValues = copyValues(submission && submission.values);
      confirmedValues = acceptedValues;
      busy = false;

      if (matches(acceptedValues)) {
        setStatus(message || '設定已儲存。');
      } else {
        setStatus('先前設定已儲存，你還有尚未儲存的變更。');
      }

      syncState();
      form.dataset.state = matches(acceptedValues) ? 'saved' : 'saved-with-new-draft';
    },

    fail: function (message) {
      busy = false;
      setError(typeof message === 'string' ? message : String(message));
      syncState();
      form.dataset.state = 'error';
    },

    clearMessage: clearMessage,
  };

  syncState();
}

document.querySelectorAll('[data-data-ownership]').forEach(initDataOwnership);
