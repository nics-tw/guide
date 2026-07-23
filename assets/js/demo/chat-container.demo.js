/**
 * chat-container.demo.js — 文件頁示範程式（非元件本體）
 *
 * 「模擬新訊息」按鈕：輪流以訊息氣泡（<message-bubble>）產生
 * 使用者／客服訊息，透過容器對外 API appendMessage() 加入 log，
 * 展示捲動策略。內容一律以 textContent 設定（防 XSS）。
 */

'use strict';

// 模擬訊息輪播內容（demo 專用）
const DEMO_MESSAGES = [
  { variant: 'user', text: '請問可以用信用卡繳納嗎？' },
  { variant: 'ai', text: '可以，您可透過地方稅網路申報作業網站以信用卡繳納。' },
  { variant: 'user', text: '逾期繳納會有滯納金嗎？' },
  { variant: 'ai', text: '會的，每逾 3 日按滯納稅額加徵 1%，最高加徵 10%。' },
  { variant: 'user', text: '瞭解，謝謝您的協助。' },
  { variant: 'ai', text: '不客氣，祝您順心！' },
];

let demoIndex = 0;

document.addEventListener('click', function (event) {
  const button = event.target.closest('[data-demo-add-message]');
  if (!button) return;

  const demo = button.closest('[data-chat-demo]');
  const container = demo ? demo.querySelector('[data-chat-container]') : null;
  if (!container || !container.chatContainer) return;

  const data = DEMO_MESSAGES[demoIndex % DEMO_MESSAGES.length];
  demoIndex += 1;

  const bubble = document.createElement('message-bubble');
  bubble.setAttribute('variant', data.variant);
  bubble.textContent = data.text;
  container.chatContainer.appendMessage(bubble);
});
