/**
 * thinking-block.demo.js — 文件頁本機示範（非元件本體）
 *
 * 只示範採用端如何把 Thinking Block 的狀態交給同頁唯一的
 * Live Announcer；正文從不送入 live region。所有進度都由使用者按鈕
 * 開始，並以 live-announcer:announced 的實際 DOM 寫入事件排序。
 */

'use strict';

const CHUNKS = [
  '先確認問題的範圍與可公開的資訊。',
  '再整理適用條件與可採取的下一步。',
  '最後準備清楚、可閱讀的答覆。',
];
const CHUNK_INTERVAL = 600;
const ANNOUNCEMENT_FALLBACK = 5000;

const STATE_MESSAGES = {
  streaming: '摘要更新中',
  complete: '摘要已完成',
  aborted: '摘要已停止更新',
  error: '摘要未完成',
};

function setVisibleStatus(demo, message) {
  const status = demo.querySelector('[data-thinking-block-status]');
  if (status) status.textContent = message;
}

function setFallback(demo, message) {
  const fallback = demo.querySelector('[data-thinking-block-fallback]');
  if (!fallback) return;
  fallback.hidden = !message;
  fallback.textContent = message || '';
}

function setButtons(demo, disabled) {
  demo.querySelectorAll('[data-thinking-block-start]').forEach(function (button) {
    button.disabled = disabled;
  });
}

function addLog(demo, level, message) {
  const log = demo.querySelector('[data-thinking-block-log]');
  if (!log) return;

  const empty = log.querySelector('[data-thinking-block-log-empty]');
  if (empty) empty.remove();

  const item = document.createElement('li');
  item.className = 'live-announcer-demo__item';

  const label = document.createElement('span');
  label.className = 'live-announcer-demo__level';
  label.textContent = level === 'assertive' ? '【警示】' : '【提示】';

  const text = document.createElement('span');
  text.className = 'live-announcer-demo__message';
  text.textContent = message;

  item.append(label, text);
  log.append(item);
}

function createCoordinator(demo, announcer) {
  const coordinator = {
    active: false,
    expected: null,
    fallbackTimer: null,
    queue: [],
    run: 0,
    timer: null,
  };

  function connected() {
    return document.contains(demo) && document.contains(announcer);
  }

  function release(run) {
    if (coordinator.run !== run) return;
    coordinator.active = false;
    setButtons(demo, false);
  }

  function clearFallback() {
    clearTimeout(coordinator.fallbackTimer);
    coordinator.fallbackTimer = null;
  }

  function sendNext() {
    if (coordinator.expected) return;
    if (!connected()) {
      const abandoned = coordinator.queue.splice(0);
      if (document.contains(demo)) {
        setFallback(demo, '即時宣告元件不可用，請閱讀畫面狀態。');
      }
      abandoned.forEach(function (item) {
        if (typeof item.after === 'function') item.after(false);
      });
      return;
    }
    const next = coordinator.queue.shift();
    if (!next) return;

    coordinator.expected = next;
    coordinator.fallbackTimer = setTimeout(function () {
      if (coordinator.expected !== next) return;
      coordinator.expected = null;
      if (document.contains(demo)) setFallback(demo, '播報未確認，請閱讀畫面狀態。');
      if (typeof next.after === 'function') next.after(false);
      sendNext();
    }, ANNOUNCEMENT_FALLBACK);

    if (next.level === 'assertive') {
      announcer.alert(next.message);
    } else {
      announcer.announce(next.message);
    }
  }

  function enqueue(message, level, after) {
    if (!document.contains(demo)) return;
    coordinator.queue.push({ message: message, level: level || 'polite', after: after });
    sendNext();
  }

  function onAnnounced(event) {
    if (event.target !== announcer || !coordinator.expected) return;
    const expected = coordinator.expected;
    const detail = event.detail || {};
    if (detail.level !== expected.level || detail.message !== expected.message) return;

    clearFallback();
    coordinator.expected = null;
    addLog(demo, detail.level, detail.message);
    if (typeof expected.after === 'function') expected.after(true);
    sendNext();
  }

  announcer.addEventListener('live-announcer:announced', onAnnounced);

  coordinator.enqueue = enqueue;
  coordinator.release = release;
  coordinator.cancel = function (run, message) {
    if (coordinator.run !== run) return;
    clearTimeout(coordinator.timer);
    clearFallback();
    coordinator.expected = null;
    coordinator.queue = [];
    if (document.contains(demo)) {
      setVisibleStatus(demo, message);
      setFallback(demo, '示範流程已中斷，請閱讀畫面狀態後重新開始。');
    }
    release(run);
  };
  coordinator.destroy = function () {
    clearTimeout(coordinator.timer);
    clearFallback();
    coordinator.queue = [];
    coordinator.expected = null;
    announcer.removeEventListener('live-announcer:announced', onAnnounced);
  };
  return coordinator;
}

function beginDemo(demo, coordinator, outcome) {
  if (coordinator.active) return;
  coordinator.active = true;
  coordinator.run += 1;
  const run = coordinator.run;
  setButtons(demo, true);
  setFallback(demo, '');
  setVisibleStatus(demo, '正在準備摘要。');

  coordinator.enqueue('正在準備摘要', 'polite', function () {
    if (coordinator.run !== run) return;
    if (!document.contains(demo)) {
      coordinator.cancel(run, '示範已離開頁面。');
      return;
    }
    const stage = demo.querySelector('[data-thinking-block-stage]');
    if (!stage) return;

    const block = document.createElement('thinking-block');
    block.setAttribute('data-label', '思考摘要');
    stage.append(block);

    block.addEventListener('thinking-block:statechange', function (event) {
      if (event.target !== block || coordinator.run !== run || !document.contains(block)) return;
      const state = event.detail && event.detail.state;
      const message = STATE_MESSAGES[state];
      if (!message) return;
      setVisibleStatus(demo, message);
      const terminal = state === 'complete' || state === 'aborted' || state === 'error';
      coordinator.enqueue(message, 'polite', terminal ? function () {
        coordinator.release(run);
      } : null);
    });

    let index = 0;
    coordinator.timer = setInterval(function () {
      if (coordinator.run !== run) {
        clearInterval(coordinator.timer);
        return;
      }
      if (!document.contains(block)) {
        coordinator.cancel(run, '示範摘要已移除。');
        return;
      }

      if (index < CHUNKS.length) {
        block.appendText(CHUNKS[index]);
        index += 1;
        if (outcome === 'abort' && index === 1) {
          clearInterval(coordinator.timer);
          block.abort();
        }
        if (outcome === 'error' && index === 2) {
          clearInterval(coordinator.timer);
          block.error('摘要暫時無法取得');
        }
        return;
      }

      clearInterval(coordinator.timer);
      block.complete();
    }, CHUNK_INTERVAL);
  });
}

function initialiseDemo(demo) {
  if (demo._thinkingBlockCoordinator) return;
  const actions = demo.querySelector('[data-thinking-block-actions]');
  const announcer = document.querySelector('live-announcer');
  if (!actions || !announcer || typeof announcer.announce !== 'function' || typeof announcer.alert !== 'function') {
    setVisibleStatus(demo, '示範元件未完成初始化。');
    return;
  }

  window.customElements.whenDefined('thinking-block').then(function () {
    if (!document.contains(demo) || !window.customElements.get('thinking-block')) return;
    const stage = demo.querySelector('[data-thinking-block-stage]');
    if (!stage) return;
    const probe = document.createElement('thinking-block');
    stage.append(probe);
    const ready = probe.hasAttribute('data-thinking-block-ready');
    probe.remove();
    if (!ready) {
      setVisibleStatus(demo, '示範元件未完成初始化。');
      return;
    }
    actions.hidden = false;
    const coordinator = createCoordinator(demo, announcer);
    demo._thinkingBlockCoordinator = coordinator;
    if (!demo.hasAttribute('data-thinking-block-demo-bound')) {
      demo.setAttribute('data-thinking-block-demo-bound', '');
      demo.addEventListener('click', function (event) {
        const button = event.target.closest('[data-thinking-block-start]');
        const current = demo._thinkingBlockCoordinator;
        if (!button || !demo.contains(button) || !current) return;
        beginDemo(demo, current, button.getAttribute('data-thinking-block-start'));
      });
    }
    window.addEventListener('pagehide', function () {
      coordinator.destroy();
      if (demo._thinkingBlockCoordinator === coordinator) {
        delete demo._thinkingBlockCoordinator;
        setButtons(demo, false);
      }
    }, { once: true });
  });
}

document.querySelectorAll('[data-thinking-block-demo]').forEach(initialiseDemo);
window.addEventListener('pageshow', function () {
  document.querySelectorAll('[data-thinking-block-demo]').forEach(function (demo) {
    if (!demo._thinkingBlockCoordinator) initialiseDemo(demo);
  });
});
