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
  if (!form || !controls || !failControl || !result) return;

  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) return;
    event.preventDefault();

    const choice = new FormData(form).get('recording_consent');
    if (choice !== 'agree' && choice !== 'decline') return;

    const staleError = form.querySelector('.consent__error:not([hidden])');
    if (staleError) {
      staleError.hidden = true;
      staleError.textContent = '';
      if (staleError.id) removeDescription(form, staleError.id);
    }

    if (failControl.checked) {
      result.textContent = '示範：選擇尚未保存。請保留或更改選擇後重試；本頁沒有傳送資料。';
      return;
    }

    const choiceLabel = choice === 'agree' ? '同意' : '不同意';
    result.textContent = '示範：本次送出的選擇為' + choiceLabel + '本次 AI 紀錄。這個選擇沒有傳送或保存。';
  });

  controls.hidden = false;
  demo.dataset.consentDemoReady = 'true';
});
