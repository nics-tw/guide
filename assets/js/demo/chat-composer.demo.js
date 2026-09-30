/**
 * chat-composer.demo.js — 文件頁假後端流程（非元件本體）
 */

'use strict';

document.querySelectorAll('[data-chat-composer-demo]').forEach(function (demo) {
  const form = demo.querySelector('[data-chat-composer]');
  const container = demo.querySelector('[data-chat-container]');
  const input = form ? form.querySelector('[data-chat-composer-input]') : null;
  const indicator = demo.querySelector('[data-typing-indicator]');
  const failButton = demo.querySelector('[data-chat-composer-demo-fail]');
  const stopButton = demo.querySelector('[data-chat-composer-demo-stop]');

  if (!form || !form.chatComposer || !container || !container.chatContainer) return;

  let failMode = false;
  let requestTimer = null;
  let streamTimer = null;
  let currentBubble = null;

  function clearTimers() {
    clearTimeout(requestTimer);
    clearInterval(streamTimer);
    if (indicator) indicator.removeEventListener('typing-indicator:settled', beginReply);
    requestTimer = null;
    streamTimer = null;
  }

  function finish() {
    clearTimers();
    form.chatComposer.setBusy(false);
    const stopHadFocus = document.activeElement === stopButton;
    stopButton.hidden = true;
    if (stopHadFocus && input) input.focus();
    currentBubble = null;
  }

  function beginReply() {
    const parts = ['您好，', '這是文件頁模擬的回覆。', '你可以繼續輸入訊息，或附加相關檔案。'];
    let partIndex = 0;

    if (indicator && indicator.typingIndicator) indicator.typingIndicator.hide();

    currentBubble = document.createElement('message-bubble');
    currentBubble.setAttribute('variant', 'ai');
    currentBubble.setAttribute('streaming', '');
    container.chatContainer.appendMessage(currentBubble);

    streamTimer = setInterval(function () {
      if (!currentBubble) return;
      currentBubble.appendToken(parts[partIndex]);
      partIndex += 1;

      if (partIndex === parts.length) {
        currentBubble.complete();
        form.chatComposer.setStatus('模擬回覆已完成。');
        finish();
      }
    }, 1200);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const submission = form.chatComposer.captureSubmission();
    const submittedValue = String(formData.get('message') || '');
    const submittedFiles = formData.getAll('attachments').filter(function (value) {
      return value instanceof File && value.name;
    });
    form.chatComposer.setBusy(true);

    requestTimer = setTimeout(function () {
      requestTimer = null;

      if (failMode) {
        form.chatComposer.fail('訊息未送出，輸入內容已保留，請稍後再試。');
        return;
      }

      form.chatComposer.accept(submission);

      const userBubble = document.createElement('message-bubble');
      userBubble.setAttribute('variant', 'user');
      userBubble.textContent = submittedFiles.length > 0
        ? submittedValue + '\n附件：' + submittedFiles.map(function (file) { return file.name; }).join('、')
        : submittedValue;
      container.chatContainer.appendMessage(userBubble);

      stopButton.hidden = false;
      form.chatComposer.setStatus('正在模擬產生回覆。');

      if (!indicator || !indicator.typingIndicator) {
        beginReply();
        return;
      }

      indicator.addEventListener('typing-indicator:settled', beginReply, { once: true });
      indicator.typingIndicator.show();
    }, 400);
  });

  failButton.addEventListener('click', function () {
    failMode = !failMode;
    failButton.setAttribute('aria-pressed', String(failMode));
    failButton.classList.toggle('button-danger', failMode);
    failButton.textContent = failMode ? '模擬送出失敗中' : '模擬送出失敗';
  });

  stopButton.addEventListener('click', function () {
    clearTimers();
    if (indicator && indicator.typingIndicator) indicator.typingIndicator.hide();
    if (currentBubble) currentBubble.abort();
    form.chatComposer.setStatus('已停止產生模擬回覆。');
    finish();
  });
});
