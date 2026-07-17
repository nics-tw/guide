/**
 * typing-indicator.demo.js — 文件頁示範程式（非元件本體）
 *
 * 「模擬等待回覆」：show() 後 3 秒呼叫 hide()，可快速連按驗證 show() 冪等
 * （面板只會看到恰一次【提示】AI 正在輸入）。狀態文字只給人眼看，不掛
 * 任何 live 屬性，實際播報內容一律以「已宣告內容」面板為準。
 *
 * 防閃爍機制（回覆在延遲出現的 300ms 門檻內就抵達時不顯示、不宣告）不
 * 額外做成互動按鈕：「按了什麼都不發生」的示範即使配旁白仍然反直覺，
 * 容易被誤認為故障；這段行為改以 _index.md 的文字說明，並由元件測試
 * 直接呼叫 API 驗證。
 */

'use strict';

const SIMULATED_WAIT = 3000; // 模擬回覆延遲（ms），僅供文件示範

function setStatus(demo, text) {
  const status = demo.querySelector('[data-ti-status]');
  if (status) status.textContent = text;
}

document.addEventListener('click', function (event) {
  const startButton = event.target.closest('[data-ti-start]');
  if (!startButton) return;

  const demo = event.target.closest('[data-ti-demo]');
  const indicator = demo ? demo.querySelector('[data-typing-indicator]') : null;
  if (!indicator || !indicator.typingIndicator) return;

  indicator.typingIndicator.show();
  setStatus(demo, '已送出請求，回應將於 3 秒後抵達');
  setTimeout(function () {
    indicator.typingIndicator.hide();
    setStatus(demo, '回應已抵達');
  }, SIMULATED_WAIT);
});
