/**
 * consent.demo.js — 文件頁的送出流程示範（非元件本體）
 *
 * 不送出網路請求，也不保存選擇；保存失敗只寫入表單外的示範結果區。
 */

'use strict';

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

  function showOutcome(message) {
    result.textContent = message;
    requestAnimationFrame(function () {
      if (result.textContent === message) result.focus();
    });
  }

  function showNext(section) {
    section.hidden = false;
    const heading = section.querySelector('h4');
    requestAnimationFrame(function () {
      if (!section.hidden && heading) heading.focus();
    });
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

    if (failControl.checked) {
      clearOutcome();
      showOutcome('選擇尚未保存，請重試。');
      return;
    }

    clearOutcome();
    if (choice === 'agree') {
      showNext(agreeNext);
    } else {
      showNext(declineNext);
    }
  });

  form.addEventListener('change', clearOutcome);
  form.addEventListener('reset', clearOutcome);
  failControl.addEventListener('change', clearOutcome);

  controls.hidden = false;
  demo.dataset.consentDemoReady = 'true';
});
