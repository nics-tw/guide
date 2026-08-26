/**
 * data-ownership.demo.js — 文件頁假後端流程（非元件本體）
 */

'use strict';

document.querySelectorAll('[data-data-ownership-demo]').forEach(function (demo) {
  const form = demo.querySelector('[data-data-ownership]');
  const failButton = demo.querySelector('[data-data-ownership-demo-fail]');

  if (!form || !form.dataOwnership || !failButton) return;

  let failMode = false;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const submission = form.dataOwnership.captureSubmission();
    const shouldFail = failMode;
    form.dataOwnership.setBusy(true);

    window.setTimeout(function () {
      if (shouldFail) {
        form.dataOwnership.fail('設定未儲存，選擇已保留，請稍後再試。');
        return;
      }

      form.dataOwnership.accept(submission);
    }, 600);
  });

  failButton.addEventListener('click', function () {
    failMode = !failMode;
    failButton.setAttribute('aria-pressed', String(failMode));
    failButton.classList.toggle('button-danger', failMode);
    failButton.textContent = failMode ? '模擬儲存失敗中' : '模擬儲存失敗';
  });
});
