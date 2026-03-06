class PasswordInput {
  /**
   * @param {HTMLElement} root - 最外層容器，需包含 input 與 toggle button
   * @param {Object}      [options] - 可選的 i18n / aria 文字設定
   */
  constructor(root, options = {}) {
    if (!(root instanceof HTMLElement)) {
      throw new Error('PasswordInput: 必須傳入有效的 HTMLElement 作為根元素。');
    }

    this.root = root;

    // 預設文字（可透過 data-* 或 options 覆寫）
    const defaults = {
      showText: '顯示',
      hideText: '隱藏',
      showAriaLabel: '顯示密碼',
      hideAriaLabel: '隱藏密碼',
      shownAnnouncement: '',
      hiddenAnnouncement: '',
    };

    // 合併：defaults < data-* attributes < options 參數
    this.i18n = Object.assign({}, defaults, this._parseDataset(), options);

    // 取得子元素
    this.input = root.querySelector('[data-password-input]');
    this.toggle = root.querySelector('[data-password-toggle]');

    if (!this.input || !this.toggle) {
      throw new Error('PasswordInput: 找不到 [data-password-input] 或 [data-password-toggle]。');
    }

    // 建立螢幕閱讀器狀態區域
    this.srStatus = document.createElement('div');
    this.srStatus.className = 'password-input__sr-status';
    this.srStatus.setAttribute('aria-live', 'polite');
    this.input.insertAdjacentElement('afterend', this.srStatus);

    // 顯示切換按鈕（progressive enhancement）
    this.toggle.removeAttribute('hidden');

    // 綁定事件
    this.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      this._toggle();
    });

    // 表單送出前強制隱藏密碼
    if (this.input.form) {
      this.input.form.addEventListener('submit', () => this._hide());
    }

    // bfcache 還原時隱藏密碼
    window.addEventListener('pageshow', (e) => {
      if (e.persisted && this.input.type !== 'password') {
        this._hide();
      }
    });

    // 初始狀態：隱藏密碼
    this._hide();
  }

  /* ---- 私有方法 ---- */

  /** 從根元素的 data-* 讀取 i18n 設定 */
  _parseDataset() {
    const d = this.root.dataset;
    const result = {};
    if (d.showText)            result.showText = d.showText;
    if (d.hideText)            result.hideText = d.hideText;
    if (d.showAriaLabel)       result.showAriaLabel = d.showAriaLabel;
    if (d.hideAriaLabel)       result.hideAriaLabel = d.hideAriaLabel;
    if (d.shownAnnouncement)   result.shownAnnouncement = d.shownAnnouncement;
    if (d.hiddenAnnouncement)  result.hiddenAnnouncement = d.hiddenAnnouncement;
    return result;
  }

  /** 切換可見性 */
  _toggle() {
    if (this.input.type === 'password') {
      this._show();
    } else {
      this._hide();
    }
  }

  /** 顯示密碼 */
  _show() {
    this._setType('text');
  }

  /** 隱藏密碼 */
  _hide() {
    this._setType('password');
  }

  /**
   * 設定 input type 並同步更新按鈕與 SR 狀態
   * @param {'text'|'password'} type
   */
  _setType(type) {
    if (type === this.input.type) return;

    this.input.setAttribute('type', type);

    const isHidden = type === 'password';

    // 更新按鈕文字 & aria-label
    this.toggle.textContent = isHidden ? this.i18n.showText : this.i18n.hideText;
    this.toggle.setAttribute(
      'aria-label',
      isHidden ? this.i18n.showAriaLabel : this.i18n.hideAriaLabel
    );

    // 通知螢幕閱讀器
    this.srStatus.textContent = isHidden
      ? this.i18n.hiddenAnnouncement
      : this.i18n.shownAnnouncement;
  }
}

/* ---- 自動初始化 ---- */
document.querySelectorAll('[data-password-input-root]').forEach((el) => {
  new PasswordInput(el);
});
