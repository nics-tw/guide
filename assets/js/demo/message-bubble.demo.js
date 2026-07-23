/**
 * message-bubble.demo.js — 文件頁示範程式（非元件本體）
 *
 * 「模擬 AI 回覆」：先加入一則使用者訊息，顯示 typing-indicator 等待動畫；
 * 等其 typing-indicator:announced 事件確認「AI 正在輸入」已實際送達，
 * 才動態建立 streaming 狀態的 AI 氣泡，以 setInterval 逐段
 * appendToken() → complete()，展示逐字渲染、分句播報與完成後操作列
 * 出現的完整流程。
 *
 * 等送達才開始串流：typing-indicator 與訊息氣泡的分句播報共用同一個
 * polite 頻道，時間相近的呼叫，後者會覆蓋前者；若串流一啟動就有完整句
 * 可以 flush，會跟尚未送達的「正在輸入」搶頻道並蓋掉它。真實串接時
 * 「正在輸入」到首個 token 之間通常隔著模型延遲，遠大於本元件的送達
 * 時間窗，此處等待只是把 demo 的人造時序拉回貼近真實情況。
 */

'use strict';

const DEMO_USER_TEXT = '請問自然人憑證的工本費是多少？';
const DEMO_REPLY = '您好！自然人憑證工本費為新臺幣 250 元。憑證有效期限為 5 年，到期前可透過內政部憑證管理中心網站線上展期；展期免費。若還有其他問題，歡迎隨時詢問！';
const CHUNK_SIZE = 3; // 每段模擬 token 的字元數
const CHUNK_INTERVAL = 120; // 模擬 token 間隔（ms）

document.addEventListener('click', function (event) {
  const startButton = event.target.closest('[data-mb-start]');
  if (!startButton) return;

  const demo = startButton.closest('[data-mb-demo]');
  const stage = demo ? demo.querySelector('[data-mb-stage]') : null;
  const indicator = demo ? demo.querySelector('[data-typing-indicator]') : null;
  if (!stage || !indicator || !indicator.typingIndicator) return;

  startButton.disabled = true;

  const userBubble = document.createElement('message-bubble');
  userBubble.setAttribute('variant', 'user');
  userBubble.textContent = DEMO_USER_TEXT;
  stage.append(userBubble);
  stage.append(indicator); // 移到使用者訊息之後，示意「等待中」的位置

  function streamReply() {
    const aiBubble = document.createElement('message-bubble');
    aiBubble.setAttribute('variant', 'ai');
    aiBubble.setAttribute('streaming', '');
    stage.append(aiBubble);

    let offset = 0;
    const timer = setInterval(function () {
      if (offset >= DEMO_REPLY.length) {
        clearInterval(timer);
        aiBubble.complete();
        startButton.disabled = false;
        return;
      }
      aiBubble.appendToken(DEMO_REPLY.slice(offset, offset + CHUNK_SIZE));
      offset += CHUNK_SIZE;
    }, CHUNK_INTERVAL);
  }

  const onAnnounced = function () {
    indicator.removeEventListener('typing-indicator:announced', onAnnounced);
    indicator.typingIndicator.hide();
    streamReply();
  };
  indicator.addEventListener('typing-indicator:announced', onAnnounced);
  indicator.typingIndicator.show();
});
