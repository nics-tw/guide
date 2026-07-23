/**
 * live-announcer.js — 即時宣告元件（<live-announcer> Custom Element）
 *
 * 設計決策：
 * - 對外 API 為 instance method：announce(message) / alert(message)，
 *   呼叫端以 document.querySelector('live-announcer') 取得執行個體後呼叫
 * - light DOM（不用 Shadow DOM），全站樣式與 .visually-hidden 照常生效
 * - 內部固定兩個獨立 region，頁面載入（connectedCallback）即建立：
 *   polite：aria-live="polite" + aria-atomic="true"
 *   assertive：role="alert"
 *   不動態切換 aria-live 值；region 必須先存在於 DOM 才會被 AT 播報
 * - 寫入慣例：一律 textContent（防 XSS）；清空 → 100ms → 填入，
 *   確保相同訊息可重複觸發宣告；上一則訊息至少保留 1000ms 才被清空
 * - 每次實際寫入時 dispatch CustomEvent('live-announcer:announced')，
 *   detail.message 為呼叫時的原文（不含下述交替附加的 NBSP）；供文件
 *   示範面板等外部觀察者使用，亦是 message-bubble 等呼叫端確認訊息
 *   是否已實際送達的訊號
 * - 主流螢幕閱讀器（NVDA、VoiceOver）對 live region 連續相同文字會在
 *   語音層去除重複，一般半形空格也會被正規化掉而失效；改為交替附加
 *   一個 U+00A0（NBSP）可繞過此限制，是 WordPress 核心 wp.a11y.speak
 *   驗證過的手法。移除此機制將使螢幕閱讀器不再重播連續相同訊息；
 *   本機制無正式規格保證，需以人工聽測驗證
 * - 不做佇列管理、不做分句斷句（斷句為呼叫端職責）、無任何視覺輸出
 * - data-live-region 屬性保留為純 DOM fallback：極端無法取得執行個體的環境
 *   可直接對該節點寫入 textContent（最後手段）
 */

'use strict';

// 清空 → 填入的間隔，讓 AT 感知「空 → 有」的變化，相同訊息才會重新宣告
const CLEAR_TO_SET_DELAY = 100;

// 上一則訊息至少保留的毫秒數，讓 AT 有時間讀完
const MIN_MESSAGE_HOLD = 1000;

class LiveAnnouncer extends HTMLElement {
  connectedCallback() {
    // 全站單例原則：偵測到多個執行個體時提醒，但不阻斷（文件頁示範可能需要）
    if (document.querySelectorAll('live-announcer').length > 1) {
      console.warn('<live-announcer> 應全站僅掛載一個，偵測到多個執行個體。');
    }

    if (!this._regions) {
      this._regions = {
        polite: {
          el: this._createRegion('polite'),
          clearTimer: null,
          setTimer: null,
          lastSetAt: 0,
          appendNbsp: false,
        },
        assertive: {
          el: this._createRegion('assertive'),
          clearTimer: null,
          setTimer: null,
          lastSetAt: 0,
          appendNbsp: false,
        },
      };
    }
  }

  /**
   * 一般提示（polite）：等 AT 讀完手邊內容才播
   * @param {string} message 純文字訊息
   */
  announce(message) {
    this._write('polite', message);
  }

  /**
   * 必要中斷（assertive）：僅限錯誤、逾時等必須立即通知的情況
   * @param {string} message 純文字訊息
   */
  alert(message) {
    this._write('assertive', message);
  }

  /**
   * 建立（或沿用既有的）live region 節點
   * @param {'polite'|'assertive'} level
   * @returns {HTMLElement}
   */
  _createRegion(level) {
    let region = this.querySelector('[data-live-region="' + level + '"]');
    if (region) return region;

    region = document.createElement('div');
    region.className = 'live-announcer__region visually-hidden';
    region.setAttribute('data-live-region', level);

    if (level === 'assertive') {
      region.setAttribute('role', 'alert');
    } else {
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
    }

    this.append(region);
    return region;
  }

  /**
   * 寫入流程（兩個等級共用）：
   * 等上一則保留滿 1000ms → 清空 → 100ms → 填入新訊息。
   * 短時間連續呼叫採「後者覆蓋前者」，不做佇列。
   * @param {'polite'|'assertive'} level
   * @param {string} message
   */
  _write(level, message) {
    if (!this._regions) return; // 尚未掛載於 DOM 時靜默略過

    const text = typeof message === 'string' ? message : String(message);
    const state = this._regions[level];

    clearTimeout(state.clearTimer);
    clearTimeout(state.setTimer);

    const elapsed = Date.now() - state.lastSetAt;
    const holdDelay = Math.max(0, MIN_MESSAGE_HOLD - elapsed);

    state.clearTimer = setTimeout(() => {
      state.el.textContent = '';
      state.setTimer = setTimeout(() => {
        // 交替附加 NBSP（U+00A0）防主流 AT 語音層對連續相同文字去除
        // 重複（見檔頭說明；一般半形空格會被去除重複比對正規化掉，
        // NBSP 不會）。dispatch 的 detail.message 維持原文，送達確認
        // 等呼叫端邏輯不受影響。第一次寫入不加後綴，維持與呼叫原文
        // 完全相等（單次播報是最常見情境，交替只在連續相同文字時才
        // 有意義）
        const useNbsp = state.appendNbsp;
        state.appendNbsp = !state.appendNbsp;
        state.el.textContent = useNbsp ? text + '\u00A0' : text;
        state.lastSetAt = Date.now();
        this.dispatchEvent(new CustomEvent('live-announcer:announced', {
          bubbles: true,
          detail: { level: level, message: text },
        }));
      }, CLEAR_TO_SET_DELAY);
    }, holdDelay);
  }
}

window.customElements.define('live-announcer', LiveAnnouncer);

export default LiveAnnouncer;
