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
  }

  get state() {
    return this._state || 'idle';
  }

  appendText(text) {
    if (!this._canReceive() || typeof text !== 'string' || text === '') return false;
    if (this._content === '' && text.trim() === '') return false;

    this._content += text;
    this._contentElement.append(document.createTextNode(text));
    this._renderVisibility();

    if (this._state === 'idle') {
      this._setState('streaming');
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
    const content = details.querySelector(':scope > .thinking-block__content');
    const error = details.querySelector(':scope > .thinking-block__error');
    if (!label || !status || !content || !error) return false;
    if (error.tagName !== 'P') return false;

    this._details = details;
    this._label = label;
    this._status = status;
    this._contentElement = content;
    this._errorElement = error;
    const serverContent = content.textContent || '';
    this._content = serverContent.trim() ? serverContent : '';
    this._errorMessage = error.textContent || DEFAULT_ERROR_MESSAGE;

    this._state = this._initialState(this.getAttribute('data-state'));

    const labelOverride = (this.getAttribute('data-label') || '').trim();
    if (labelOverride) this._label.textContent = labelOverride;
    return true;
  }

  _initializeBareElement() {
    // 插入前寫入的文字視為摘要內容，初始狀態由 data-state 決定。
    const initialText = this.textContent || '';
    const label = (this.getAttribute('data-label') || '').trim() || DEFAULT_LABEL;

    this.replaceChildren();
    const details = createElement('details', 'thinking-block');
    const summary = createElement('summary', 'thinking-block__summary');
    const labelElement = createElement('span', 'thinking-block__label', label);
    const status = createElement('span', 'thinking-block__status');
    const content = createElement('div', 'thinking-block__content');
    const error = createElement('p', 'thinking-block__error');

    error.hidden = true;
    details.open = true;
    summary.append(labelElement, status);
    details.append(summary, content, error);
    this.append(details);

    this._details = details;
    this._label = labelElement;
    this._status = status;
    this._contentElement = content;
    this._errorElement = error;
    this._content = initialText.trim() ? initialText : '';
    if (this._content) content.append(document.createTextNode(this._content));
    this._errorMessage = DEFAULT_ERROR_MESSAGE;

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

  _hasContent() {
    return Boolean(this._content.trim());
  }

  _finish(state) {
    if (!this._canReceive()) return false;
    this._setState(state);
    this._renderStatus();
    this._renderError();
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
        hasContent: this._hasContent(),
      },
    }));
  }

  _render() {
    this.setAttribute('data-state', this._state);
    this._renderVisibility();
    this._renderStatus();
    this._renderError();
  }

  _renderVisibility() {
    // 沒有可公開文字時不顯示空白的可開合區塊。
    this._details.hidden = !this._hasContent();
  }

  _renderStatus() {
    this._status.textContent = STATUS_TEXT[this._state];
  }

  _renderError() {
    const showError = this._state === 'error' && this._hasContent();
    this._errorElement.hidden = !showError;
    if (showError) this._errorElement.textContent = this._errorMessage;
  }
}

if (!customElements.get('thinking-block')) {
  customElements.define('thinking-block', ThinkingBlock);
}

export default ThinkingBlock;
