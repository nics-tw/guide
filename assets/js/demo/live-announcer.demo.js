/**
 * live-announcer.demo.js — 文件頁示範程式（非元件本體）
 *
 * 監聽 <live-announcer> 每次寫入時 dispatch 的 live-announcer:announced
 * 事件，把宣告內容同步到可視化「已宣告內容」面板。
 * 一律使用事件委派：示範內容由 live-example（customElement="true"）
 * 於頁面載入後注入，不能假設節點在本檔執行時已存在。
 */

'use strict';

// 等級的文字標籤：面板不可只靠顏色區分等級
const LEVEL_LABELS = {
  polite: '【提示】',
  assertive: '【警示】',
};

// 測試按鈕 → 呼叫元件 instance method
document.addEventListener('click', function (event) {
  const button = event.target.closest('[data-demo-level]');
  if (!button) return;

  const announcer = document.querySelector('live-announcer');
  if (!announcer) return;

  const message = button.getAttribute('data-demo-message') || '';
  if (button.getAttribute('data-demo-level') === 'assertive') {
    announcer.alert(message);
  } else {
    announcer.announce(message);
  }
});

// 元件每次實際寫入 region 時，同步 append 一列到面板
document.addEventListener('live-announcer:announced', function (event) {
  const log = document.querySelector('[data-demo-log]');
  if (!log) return;

  const empty = log.querySelector('[data-demo-empty]');
  if (empty) empty.remove();

  const item = document.createElement('li');
  item.className = 'live-announcer-demo__item';

  const level = document.createElement('span');
  level.className = 'live-announcer-demo__level';
  level.textContent = LEVEL_LABELS[event.detail.level] || '';

  const time = document.createElement('span');
  time.className = 'live-announcer-demo__time';
  time.textContent = new Date().toLocaleTimeString('zh-TW', { hour12: false });

  const message = document.createElement('span');
  message.className = 'live-announcer-demo__message';
  message.textContent = event.detail.message;

  item.append(level, time, message);
  log.append(item);
});
