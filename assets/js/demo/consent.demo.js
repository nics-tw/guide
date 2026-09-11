/**
 * consent.demo.js — 文件頁同步送出示範（非元件本體）
 */

'use strict';

function removeDescription(form, id) {
  const descriptions = (form.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
  const remaining = descriptions.filter(function (description) {
    return description !== id;
  });

  if (remaining.length) {
    form.setAttribute('aria-describedby', remaining.join(' '));
  } else {
    form.removeAttribute('aria-describedby');
  }
}

document.querySelectorAll('[data-consent-demo]').forEach(function (demo) {
  if (demo.dataset.consentDemoReady === 'true') return;

  const form = demo.querySelector('form.consent');
  const controls = demo.querySelector('[data-consent-demo-controls]');
  const failControl = demo.querySelector('[data-consent-demo-fail]');
  const result = demo.querySelector('[data-consent-demo-result]');
  const agreeNext = demo.querySelector('[data-consent-demo-next="agree"]');
  const declineNext = demo.querySelector('[data-consent-demo-next="decline"]');
  if (!form || !controls || !failControl || !result || !agreeNext || !declineNext) return;

  function clearOutcome() {
    result.textContent = '';
    agreeNext.hidden = true;
    declineNext.hidden = true;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      clearOutcome();
      return;
    }

    const choice = new FormData(form).get('data_consent');
    if (choice !== 'agree' && choice !== 'decline') {
      clearOutcome();
      return;
    }

    const staleError = form.querySelector('.consent__error:not([hidden])');
    if (staleError) {
      staleError.hidden = true;
      staleError.textContent = '';
      if (staleError.id) removeDescription(form, staleError.id);
    }

    if (failControl.checked) {
      clearOutcome();
      result.textContent = '示範：選擇尚未保存，未進入下一步。請保留或更改選擇後重試；本頁沒有傳送資料。';
      return;
    }

    clearOutcome();
    if (choice === 'agree') {
      agreeNext.hidden = false;
      result.textContent = '示範：進入開始對話的流程示意；沒有傳送訊息或保存選擇。';
    } else {
      declineNext.hidden = false;
      result.textContent = '示範：不提供對話資料並改用其他服務管道；沒有傳送資料或保存選擇。';
    }
  });

  form.addEventListener('change', clearOutcome);
  form.addEventListener('reset', clearOutcome);
  failControl.addEventListener('change', clearOutcome);

  controls.hidden = false;
  demo.dataset.consentDemoReady = 'true';
});
