/**
 * message-bubble.js — 訊息氣泡元件（<message-bubble> Custom Element）
 *
 * 設計決策：
 * - Custom Element、light DOM；動態 createElement 插入即自動掛上行為
 * - 內層為語意化 <article>，以 aria-labelledby 指向可見角色標題；
 *   Custom Element 標籤本身不承載 ARIA
 * - 串流播報（開始輸入、分句進度、完成、停止、錯誤）：
 *   串流中正文掛 aria-hidden="true"（aria-busy 於 NVDA/VoiceOver 實測
 *   不受支援，僅 JAWS 部分支援）、操作列 hidden；分句（。！？；換行）
 *   + 距上次播報 ≥1100ms 才呼叫 <live-announcer>.announce()，未滿間隔
 *   的完整句進待播緩衝由 timer 送出
 * - 串流終止的判定與後端無關：對外只有 appendToken()/complete()/abort()/error()
 * - 操作列＝複製／重新生成／讚／倒讚；roving tabindex 沿用 toolbar.js
 * - 收尾（complete/abort）與殘句播報合併為同一次 announce
 * - 送達確認（_pendingAnnounce／_dispatchAnnounce）：送下一批前若前一批
 *   尚未確認送達，一律將其文字併入本批重送，不另外呼叫兩次。此依賴
 *   live-announcer._write「後者取消前者未寫入 timer」的既定行為，
 *   修改該行為需同步回改本檔
 * - error() 為終結態：放棄重送任何尚未送達的分句批，改以 announce('')
 *   截斷 polite 頻道（live-announcer 無獨立取消 API，這是在既有介面
 *   內達成「取消」的手段）
 * - 無 JS：伺服器渲染的靜態結構可讀；操作列（含讚/倒讚）維持 hidden
 */

'use strict';

import { initToolbar } from './toolbar.js';

// 分句播報的最小間隔（ms）。必須 > live-announcer 保留期（1000ms），
// 否則前一句尚未送達即被下一句覆蓋而無聲丟句
const ANNOUNCE_MIN_INTERVAL = 1100;

// 句末標點：。！？；與換行
const SENTENCE_PATTERN = /[^。！？；\n]*[。！？；\n]+/g;

let roleIdCounter = 0;
let warnedNoAnnouncer = false;

const bubbleTemplate = document.createElement('template');
bubbleTemplate.innerHTML = `
  <article class="message-bubble__inner">
    <p class="message-bubble__role"></p>
    <div class="message-bubble__slot-pre" hidden></div>
    <div class="message-bubble__body"></div>
    <p class="message-bubble__error" hidden></p>
    <div class="toolbar message-bubble__toolbar" role="toolbar" aria-label="訊息操作" hidden>
      <button type="button" class="toolbar__button" data-action="copy" tabindex="0">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span class="visually-hidden">複製</span>
      </button>
      <button type="button" class="toolbar__button" data-action="regenerate" tabindex="-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <polyline points="23 4 23 10 17 10"/>
          <polyline points="1 20 1 14 7 14"/>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
        </svg>
        <span class="visually-hidden">重新生成</span>
      </button>
      <button type="button" class="toolbar__button toolbar__button--toggle" data-action="like" aria-pressed="false" tabindex="-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        </svg>
        <span class="visually-hidden">讚</span>
      </button>
      <button type="button" class="toolbar__button toolbar__button--toggle" data-action="dislike" aria-pressed="false" tabindex="-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
        </svg>
        <span class="visually-hidden">倒讚</span>
      </button>
    </div>
  </article>
`;

class MessageBubble extends HTMLElement {
  connectedCallback() {
    if (!this._initialized) {
      this._initialized = true;

      this._variant = this.getAttribute('variant') === 'user' ? 'user' : 'ai';

      // progressive：允許伺服器端已渲染完整結構，JS 只掛行為
      let inner = this.querySelector('.message-bubble__inner');
      if (!inner) inner = this._buildStructure();

      this._body = inner.querySelector('.message-bubble__body');
      this._errorEl = inner.querySelector('.message-bubble__error');
      this._toolbar = inner.querySelector('.message-bubble__toolbar');

      // data-role-label 覆寫角色標題文字（動態／靜態建構路徑皆適用）；
      // 未指定時沿用預設（動態路徑為「你」／「客服助理」，靜態路徑沿用
      // 伺服器渲染好的文字）
      const roleLabel = this.getAttribute('data-role-label');
      if (roleLabel) {
        const role = inner.querySelector('.message-bubble__role');
        if (role) role.textContent = roleLabel;
      }

      this._sentenceBuffer = '';
      this._pendingSentences = [];
      this._lastAnnounceAt = 0;
      this._debounceTimer = null;
      this._ended = false;

      // 本元件自己呼叫的最近一批 polite 訊息，尚未收到 'live-announcer:announced'
      // 確認送達前保持非 null；見檔頭「送達確認」說明
      this._pendingAnnounce = null;

      if (this.hasAttribute('streaming')) {
        this._enterStreaming();
      } else if (this._toolbar) {
        // JS 啟用後才顯示操作列（無 JS 時讚/倒讚等維持隱藏）
        this._toolbar.hidden = false;
      }

      if (this._toolbar) {
        // 不論結構來自伺服器渲染或動態建立都主動初始化：initToolbar 本身
        // 已冪等（見 toolbar.js），若靜態渲染的 toolbar 已被頁面載入時的
        // 自動初始化處理過，這裡會是無害的重複呼叫
        initToolbar(this._toolbar);
        this._wireToolbarActions();
      }
    }

    // live-announcer 送達確認監聽：結構只建立一次，但監聽綁定跟隨標準
    // Custom Element 生命週期，每次 connected 重新綁定、disconnected 解綁。
    // 串流中把氣泡搬到另一個父節點會先觸發 disconnectedCallback 再觸發
    // connectedCallback，若監聽只在首次 connected 綁定一次，重掛載後就
    // 收不到 'live-announcer:announced'，送達確認鏈永久失效
    this._onAnnounced = (event) => {
      const detail = event.detail;
      if (detail && detail.level === 'polite' && detail.message === this._pendingAnnounce) {
        this._pendingAnnounce = null;
      }
    };
    document.addEventListener('live-announcer:announced', this._onAnnounced);
  }

  disconnectedCallback() {
    if (this._onAnnounced) document.removeEventListener('live-announcer:announced', this._onAnnounced);
    // 待播 timer 一併清除，避免元件已從文件移除後才觸發 flush；
    // _pendingSentences 緩衝本身保留不清空，重掛載後由後續的
    // appendToken()／complete()／abort() 接手送出
    clearTimeout(this._debounceTimer);
    this._debounceTimer = null;
  }

  // ── 對外方法（串流抽象介面，後端無關）─────────────────

  /**
   * 追加一段串流文字
   * @param {string} text
   */
  appendToken(text) {
    if (this._ended || !this._body) return;
    const str = typeof text === 'string' ? text : String(text);
    if (!this.hasAttribute('streaming')) this._enterStreaming();

    this._body.append(document.createTextNode(str));

    this._sentenceBuffer += str;
    this._extractSentences();
    if (this._pendingSentences.length) this._scheduleFlush();
  }

  /** 回覆完成；結語文字可用 data-complete-message 覆寫 */
  complete() {
    this._finishStreaming(this.getAttribute('data-complete-message') || '回覆完成');
  }

  /**
   * 停止生成：保留已生成部分。停止按鈕由 composer 提供；
   * 結語文字可用 data-abort-message 覆寫
   */
  abort() {
    this._finishStreaming(this.getAttribute('data-abort-message') || '已停止產生回覆');
  }

  /**
   * 錯誤：assertive 播報 + 氣泡內可見錯誤文字
   * @param {string} message
   */
  error(message) {
    if (!this._body) return;
    const msg = typeof message === 'string' ? message : String(message);

    clearTimeout(this._debounceTimer);
    this._debounceTimer = null;
    this._pendingSentences = [];
    this._sentenceBuffer = '';

    // 終結態：放棄重送任何尚未確認送達的分句批，改截斷 polite 頻道，
    // 避免它在 error 之後才播出（見檔頭「error() 為終結態」說明）
    if (this._pendingAnnounce !== null) {
      this._pendingAnnounce = null;
      this._announce('');
    }

    if (this._errorEl) {
      // 錯誤以文字標示，不只靠顏色
      this._errorEl.textContent = '錯誤：' + msg;
      this._errorEl.hidden = false;
    }
    this._alert(msg);

    this._body.removeAttribute('aria-hidden');
    if (this._toolbar) this._toolbar.hidden = false; // 保留重新生成的入口
    this.removeAttribute('streaming');
    this._ended = true;
  }

  // ── 串流狀態與分句播報 ────────────────────────────────

  _enterStreaming() {
    if (!this.hasAttribute('streaming')) this.setAttribute('streaming', '');
    this._body.setAttribute('aria-hidden', 'true');
    if (this._toolbar) this._toolbar.hidden = true;
  }

  /** 從緩衝取出完整句（。！？；換行結尾），移入待播清單 */
  _extractSentences() {
    let consumed = 0;
    let match;
    SENTENCE_PATTERN.lastIndex = 0;
    while ((match = SENTENCE_PATTERN.exec(this._sentenceBuffer)) !== null) {
      const sentence = match[0].trim();
      if (sentence) this._pendingSentences.push(sentence);
      consumed = SENTENCE_PATTERN.lastIndex;
    }
    if (consumed > 0) this._sentenceBuffer = this._sentenceBuffer.slice(consumed);
  }

  /** 距上次播報 ≥1100ms 立即送出；未滿間隔由 timer 補送 */
  _scheduleFlush() {
    const elapsed = Date.now() - this._lastAnnounceAt;
    if (elapsed >= ANNOUNCE_MIN_INTERVAL) {
      this._flushSentences();
      return;
    }
    if (!this._debounceTimer) {
      this._debounceTimer = setTimeout(() => {
        this._debounceTimer = null;
        this._flushSentences();
      }, ANNOUNCE_MIN_INTERVAL - elapsed);
    }
  }

  _flushSentences() {
    if (!this._pendingSentences.length) return;
    const message = this._pendingSentences.join('');
    this._pendingSentences = [];
    this._lastAnnounceAt = Date.now();
    this._dispatchAnnounce(message);
  }

  /**
   * complete/abort 共用收尾：殘句與結語合併為同一次播報，移除正文
   * aria-hidden、顯示操作列、移除 streaming 屬性；不移動焦點
   * @param {string} closingMessage
   */
  _finishStreaming(closingMessage) {
    if (!this._body || this._ended) return;

    clearTimeout(this._debounceTimer);
    this._debounceTimer = null;

    const leftover = (this._pendingSentences.join('') + this._sentenceBuffer).trim();
    this._pendingSentences = [];
    this._sentenceBuffer = '';

    let message = closingMessage;
    if (leftover) {
      message = /[。！？；.!?;]$/.test(leftover)
        ? leftover + closingMessage
        : leftover + '。' + closingMessage;
    }
    // 立即送出：不再用「呼叫時刻 + 節流下限」來估算前批送達時間，
    // _dispatchAnnounce 會在前批尚未確認送達時把它併入本批重送，
    // 結構性保證收尾不會覆蓋尚未播出的內容（見檔頭「送達確認」說明）
    this._dispatchAnnounce(message);

    this._body.removeAttribute('aria-hidden');
    if (this._toolbar) this._toolbar.hidden = false;
    this.removeAttribute('streaming');
    this._ended = true;
  }

  // ── live-announcer 橋接 ──────────────────────────────

  _getAnnouncer() {
    const announcer = document.querySelector('live-announcer');
    if (!announcer || typeof announcer.announce !== 'function') {
      if (!warnedNoAnnouncer) {
        console.warn('message-bubble：頁面上找不到可用的 <live-announcer>，播報將被略過。');
        warnedNoAnnouncer = true;
      }
      return null;
    }
    return announcer;
  }

  /**
   * 送出 polite 播報；若本元件上一批呼叫的訊息尚未收到送達確認
   * （'live-announcer:announced'），把它的全文併入本批重送而非另外
   * 呼叫一次。這刻意依賴 live-announcer._write 對同通道連續呼叫
   * 「後者取消前者尚未寫入 region 的 timer」的既定行為：前批全文已
   * 併入本批，取代它不會漏播，也不會雙播。分句 flush 與收尾都經由
   * 此函式，消除兩者之間「呼叫時刻節流 ≈ 實際寫入時刻」的邊際誤差，
   * 避免句子被靜默取消而遺失。切勿把 _pendingAnnounce 追蹤
   * 當成多餘防禦移除
   * @param {string} message
   */
  _dispatchAnnounce(message) {
    const combined = this._pendingAnnounce !== null
      ? this._pendingAnnounce + message
      : message;
    this._announce(combined);
  }

  _announce(message) {
    const announcer = this._getAnnouncer();
    if (!announcer) return;
    this._pendingAnnounce = message;
    announcer.announce(message);
  }

  _alert(message) {
    const announcer = this._getAnnouncer();
    if (announcer) announcer.alert(message);
  }

  // ── 結構建立與操作列 ─────────────────────────────────

  /** 動態插入（無伺服器渲染結構）時建立內部結構；既有子節點移入正文 */
  _buildStructure() {
    const existingChildren = Array.from(this.childNodes);

    const fragment = bubbleTemplate.content.cloneNode(true);
    const inner = fragment.querySelector('.message-bubble__inner');
    const role = fragment.querySelector('.message-bubble__role');
    const body = fragment.querySelector('.message-bubble__body');

    inner.classList.add(this._variant === 'user' ? 'message-bubble__inner--user' : 'message-bubble__inner--ai');
    role.id = 'message-bubble-role-' + (roleIdCounter += 1);
    role.textContent = this._variant === 'user' ? '你' : '客服助理';
    inner.setAttribute('aria-labelledby', role.id);

    if (this._variant === 'user') {
      fragment.querySelector('.message-bubble__toolbar').remove();
      fragment.querySelector('.message-bubble__error').remove();
    }

    existingChildren.forEach((node) => body.append(node));
    this.append(fragment);
    return inner;
  }

  _wireToolbarActions() {
    const copyBtn = this._toolbar.querySelector('[data-action="copy"]');
    const regenBtn = this._toolbar.querySelector('[data-action="regenerate"]');
    const likeBtn = this._toolbar.querySelector('[data-action="like"]');
    const dislikeBtn = this._toolbar.querySelector('[data-action="dislike"]');

    if (copyBtn) {
      copyBtn.addEventListener('click', () => this._copyBody());
    }

    if (regenBtn) {
      regenBtn.addEventListener('click', () => {
        // 元件本體不重送請求，由外部（composer／後端串接）接手
        this.dispatchEvent(new CustomEvent('message-bubble:regenerate', { bubbles: true }));
      });
    }

    // 讚/倒讚三態互斥：toolbar.js 的 click listener（先註冊）切換完
    // aria-pressed 後，這裡強制另一顆為 false
    if (likeBtn && dislikeBtn) {
      [likeBtn, dislikeBtn].forEach((btn, index, pair) => {
        btn.addEventListener('click', () => {
          if (btn.getAttribute('aria-pressed') === 'true') {
            pair[1 - index].setAttribute('aria-pressed', 'false');
          }
          const value = likeBtn.getAttribute('aria-pressed') === 'true'
            ? 'up'
            : dislikeBtn.getAttribute('aria-pressed') === 'true' ? 'down' : null;
          this.dispatchEvent(new CustomEvent('message-bubble:feedback', {
            bubbles: true,
            detail: { value: value },
          }));
        });
      });
    }
  }

  _copyBody() {
    const text = this._body ? this._body.textContent : '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => this._dispatchAnnounce('已複製'),
        () => this._copyFallback()
      );
    } else {
      this._copyFallback();
    }
  }

  /** 剪貼簿 API 不可用時的備援機制：選取正文文字並提示手動複製 */
  _copyFallback() {
    try {
      const range = document.createRange();
      range.selectNodeContents(this._body);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      this._dispatchAnnounce('無法自動複製，已選取訊息文字，請手動複製');
    } catch {
      this._dispatchAnnounce('無法複製');
    }
  }
}

window.customElements.define('message-bubble', MessageBubble);

export default MessageBubble;
