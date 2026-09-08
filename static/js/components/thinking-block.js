/**
 * thinking-block.js — Thinking Block（<thinking-block> Custom Element）
 *
 * 公開摘要以原生 details/summary 呈現。元件只管理可見純文字與狀態；
 * 動態狀態的宣告由採用端依 thinking-block:statechange 協調。
 */

'use strict';

const TERMINAL_STATES = new Set(['complete', 'aborted', 'error']);

const STATUS_TEXT = {
  idle: '尚無摘要',
  streaming: '摘要更新中',
  complete: '摘要已完成',
  aborted: '摘要已停止更新',
  error: '摘要未完成',
};

const DEFAULT_LABEL = '思考摘要';
const DEFAULT_ERROR_MESSAGE = '摘要暫時無法取得';

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (typeof text === 'string') element.textContent = text;
  return element;
}

class ThinkingBlock extends HTMLElement {
  connectedCallback() {
    if (!this._initialized) this._initialize();
    if (!this._ready) return;

    if (!this._pauseListener) {
      this._pauseListener = () => {
        if (this._pauseButton.getAttribute('aria-disabled') === 'true') return;
        if (this._paused) this.resume();
        else this.pause();
      };
      this._pauseBlurListener = () => {
        if (!TERMINAL_STATES.has(this._state) || this._paused) return;
        this._pauseButton.hidden = true;
        this._pauseButton.removeAttribute('aria-disabled');
      };
    }

    if (!this._pauseBound) {
      this._pauseButton.addEventListener('click', this._pauseListener);
      this._pauseButton.addEventListener('blur', this._pauseBlurListener);
      this._pauseBound = true;
    }

    this._renderPauseButton();
  }

  disconnectedCallback() {
    if (this._pauseBound) {
      this._pauseButton.removeEventListener('click', this._pauseListener);
      this._pauseButton.removeEventListener('blur', this._pauseBlurListener);
      this._pauseBound = false;
    }
  }

  get state() {
    return this._state || 'idle';
  }

  appendText(text) {
    if (!this._canReceive() || typeof text !== 'string' || text === '') return false;
    if (this._content === '' && text.trim() === '') return false;

    this._content += text;
    const wasIdle = this._state === 'idle';
    if (wasIdle) this._setState('streaming');

    if (!this._paused) this._renderContent();
    this._renderPauseButton();
    if (wasIdle) {
      this._renderStatus();
      this._emitStatechange();
    }
    return true;
  }

  complete() {
    return this._finish('complete');
  }

  abort() {
    return this._finish('aborted');
  }

  error(message) {
    if (!this._canReceive()) return false;
    this._errorMessage = typeof message === 'string' && message.trim()
      ? message
      : DEFAULT_ERROR_MESSAGE;
    return this._finish('error');
  }

  pause() {
    if (!this._canReceive() || this._paused || this._state !== 'streaming' || !this._content) return false;
    this._paused = true;
    this._renderPauseButton();
    return true;
  }

  resume() {
    if (!this._ready || !this.isConnected || !this._paused) return false;
    this._paused = false;
    this._renderContent();
    this._renderStatus();
    this._renderError();
    this._renderPauseButton();
    return true;
  }

  _initialize() {
    this._initialized = true;

    const existingDetails = this.querySelector(':scope > details.thinking-block');
    if (existingDetails) {
      if (!this._initializeServerMarkup(existingDetails)) return;
    } else if (this.children.length === 0) {
      this._initializeBareElement();
    } else {
      // 不完整的伺服器端結構維持原樣，讓無 JavaScript fallback 不受破壞。
      return;
    }

    this._ready = true;
    this.setAttribute('data-thinking-block-ready', '');
    this._render();
  }

  _initializeServerMarkup(details) {
    const summary = details.firstElementChild;
    if (!summary || summary.tagName !== 'SUMMARY') return false;

    const label = summary.querySelector('.thinking-block__label');
    const status = summary.querySelector('.thinking-block__status');
    const pauseButton = details.querySelector(':scope > .thinking-block__pause');
    const content = details.querySelector(':scope > .thinking-block__content');
    const error = details.querySelector(':scope > .thinking-block__error');
    if (!label || !status || !pauseButton || !content || !error) return false;
    if (pauseButton.tagName !== 'BUTTON' || error.tagName !== 'P') return false;
    pauseButton.type = 'button';

    this._details = details;
    this._label = label;
    this._status = status;
    this._pauseButton = pauseButton;
    this._contentElement = content;
    this._errorElement = error;
    const serverContent = content.textContent || '';
    this._content = serverContent.trim() ? serverContent : '';
    this._renderedContent = this._content;
    this._errorMessage = error.textContent || DEFAULT_ERROR_MESSAGE;
    this._paused = false;

    this._state = this._initialState(this.getAttribute('data-state'));

    const labelOverride = (this.getAttribute('data-label') || '').trim();
    if (labelOverride) this._label.textContent = labelOverride;
    return true;
  }

  _initializeBareElement() {
    const initialText = this.textContent || '';
    const label = (this.getAttribute('data-label') || '').trim() || DEFAULT_LABEL;

    this.replaceChildren();
    const details = createElement('details', 'thinking-block');
    const summary = createElement('summary', 'thinking-block__summary');
    const labelElement = createElement('span', 'thinking-block__label', label);
    const status = createElement('span', 'thinking-block__status');
    const pauseButton = createElement('button', 'thinking-block__pause', '暫停摘要更新');
    const content = createElement('div', 'thinking-block__content');
    const error = createElement('p', 'thinking-block__error');

    pauseButton.type = 'button';
    pauseButton.hidden = true;
    error.hidden = true;
    details.open = true;
    summary.append(labelElement, status);
    details.append(summary, pauseButton, content, error);
    this.append(details);

    this._details = details;
    this._label = labelElement;
    this._status = status;
    this._pauseButton = pauseButton;
    this._contentElement = content;
    this._errorElement = error;
    this._content = initialText.trim() ? initialText : '';
    if (this._content) content.append(document.createTextNode(this._content));
    this._renderedContent = this._content;
    this._errorMessage = DEFAULT_ERROR_MESSAGE;
    this._paused = false;

    this._state = this._initialState(this.getAttribute('data-state'));
  }

  _initialState(requestedState) {
    const hasContent = Boolean(this._content);
    if (!hasContent) {
      return TERMINAL_STATES.has(requestedState) ? requestedState : 'idle';
    }
    if (requestedState === 'idle' || requestedState === 'streaming') return 'streaming';
    return TERMINAL_STATES.has(requestedState) ? requestedState : 'complete';
  }

  _canReceive() {
    return this._ready && this.isConnected && (this._state === 'idle' || this._state === 'streaming');
  }

  _finish(state) {
    if (!this._canReceive()) return false;
    this._setState(state);
    if (!this._paused) {
      this._renderContent();
      this._renderStatus();
      this._renderError();
    }
    this._renderPauseButton();
    this._emitStatechange();
    return true;
  }

  _setState(state) {
    this._state = state;
    this.setAttribute('data-state', state);
  }

  _emitStatechange() {
    this.dispatchEvent(new CustomEvent('thinking-block:statechange', {
      bubbles: true,
      detail: {
        state: this._state,
        hasContent: Boolean(this._content.trim()),
      },
    }));
  }

  _render() {
    this.setAttribute('data-state', this._state);
    this._renderContent();
    this._renderStatus();
    this._renderError();
    this._renderPauseButton();
  }

  _renderContent() {
    const hasContent = Boolean(this._content.trim());
    this._details.hidden = !hasContent;
    if (!hasContent) return;

    if (this._content.startsWith(this._renderedContent)) {
      const pendingText = this._content.slice(this._renderedContent.length);
      if (pendingText) this._contentElement.append(document.createTextNode(pendingText));
      this._renderedContent = this._content;
    }
  }

  _renderStatus() {
    this._status.textContent = STATUS_TEXT[this._state];
  }

  _renderError() {
    const showError = this._state === 'error' && Boolean(this._content.trim());
    this._errorElement.hidden = !showError;
    if (showError) this._errorElement.textContent = this._errorMessage;
  }

  _renderPauseButton() {
    const hasContent = Boolean(this._content.trim());
    if (TERMINAL_STATES.has(this._state)) {
      if (this._paused && hasContent) {
        this._pauseButton.hidden = false;
        this._pauseButton.textContent = '繼續摘要更新';
        this._pauseButton.removeAttribute('aria-disabled');
        return;
      }
      if (document.activeElement === this._pauseButton) {
        this._pauseButton.hidden = false;
        this._pauseButton.textContent = '摘要更新已結束';
        this._pauseButton.setAttribute('aria-disabled', 'true');
      } else {
        this._pauseButton.hidden = true;
        this._pauseButton.removeAttribute('aria-disabled');
      }
      return;
    }

    const canPause = this._state === 'streaming' && hasContent;
    const canResume = this._paused && hasContent;
    this._pauseButton.hidden = !(canPause || canResume);
    this._pauseButton.textContent = this._paused ? '繼續摘要更新' : '暫停摘要更新';
    this._pauseButton.removeAttribute('aria-disabled');
  }
}

if (!customElements.get('thinking-block')) {
  customElements.define('thinking-block', ThinkingBlock);
}

export default ThinkingBlock;
