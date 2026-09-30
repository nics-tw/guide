/**
 * thinking-block.demo.js — 文件頁本機示範（非元件本體）
 *
 * 只示範採用端如何把 Thinking Block 的狀態交給同頁唯一的
 * 即時宣告元件；正文從不送入 live region。所有進度都由使用者按鈕
 * 開始。狀態在寫入前再變化時只保留最新一則，並以
 * live-announcer:announced 的實際 DOM 寫入事件確認。
 */

'use strict';

const CHUNKS = [
  '先確認問題的範圍與可公開的資訊。',
  '再整理適用條件與可採取的下一步。',
  '最後準備清楚、可閱讀的答覆。',
];
const CHUNK_INTERVAL = 600;
// 宣告頻道為全頁共用，可能被其他元件覆蓋；逾時只代表停止等待，不代表已播報。
const CONFIRM_TIMEOUT = 5000;

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
    if (disabled) {
      button.setAttribute('aria-disabled', 'true');
      button.classList.add('button-disabled');
    } else {
      button.removeAttribute('aria-disabled');
      button.classList.remove('button-disabled');
    }
  });
}

function addLog(demo, message) {
  const log = demo.querySelector('[data-thinking-block-log]');
  if (!log) return;

  const empty = log.querySelector('[data-thinking-block-log-empty]');
  if (empty) empty.remove();

  const item = document.createElement('li');
  item.className = 'live-announcer-demo__item';

  const label = document.createElement('span');
  label.className = 'live-announcer-demo__level';
  label.textContent = '【提示】';

  const text = document.createElement('span');
  text.className = 'live-announcer-demo__message';
  text.textContent = message;

  item.append(label, text);
  log.append(item);
}

function createCoordinator(demo, announcer) {
  const coordinator = {
    active: false,
    chunkTimer: null,
    confirmTimer: null,
    onSettled: null,
    pending: null,
    run: 0,
  };

  function settle(confirmed) {
    clearTimeout(coordinator.confirmTimer);
    coordinator.confirmTimer = null;
    const message = coordinator.pending;
    const next = coordinator.onSettled;
    coordinator.pending = null;
    coordinator.onSettled = null;
    if (confirmed) {
      addLog(demo, message);
    } else if (document.contains(demo)) {
      setFallback(demo, '播報未確認，請閱讀畫面狀態。');
    }
    if (next) next();
  }

  function announce(message, onSettled) {
    if (!document.contains(demo)) return;
    if (!document.contains(announcer)) {
      coordinator.pending = null;
      coordinator.onSettled = null;
      setFallback(demo, '即時宣告元件不可用，請閱讀畫面狀態。');
      if (onSettled) onSettled();
      return;
    }

    coordinator.pending = message;
    coordinator.onSettled = onSettled || null;
    clearTimeout(coordinator.confirmTimer);
    coordinator.confirmTimer = setTimeout(function () {
      settle(false);
    }, CONFIRM_TIMEOUT);
    announcer.announce(message);
  }

  function onAnnounced(event) {
    if (event.target !== announcer || coordinator.pending === null) return;
    const detail = event.detail || {};
    if (detail.level !== 'polite' || detail.message !== coordinator.pending) return;
    settle(true);
  }

  announcer.addEventListener('live-announcer:announced', onAnnounced);

  coordinator.announce = announce;
  coordinator.release = function (run) {
    if (coordinator.run !== run) return;
    coordinator.active = false;
    setButtons(demo, false);
  };
  coordinator.cancel = function (run, message) {
    if (coordinator.run !== run) return;
    clearInterval(coordinator.chunkTimer);
    clearTimeout(coordinator.confirmTimer);
    coordinator.pending = null;
    coordinator.onSettled = null;
    if (document.contains(demo)) {
      setVisibleStatus(demo, message);
      setFallback(demo, '示範流程已中斷，請閱讀畫面狀態後重新開始。');
    }
    coordinator.release(run);
  };
  coordinator.destroy = function () {
    clearInterval(coordinator.chunkTimer);
    clearTimeout(coordinator.confirmTimer);
    coordinator.pending = null;
    coordinator.onSettled = null;
    announcer.removeEventListener('live-announcer:announced', onAnnounced);
  };
  return coordinator;
}

function beginDemo(demo, coordinator, outcome) {
  if (coordinator.active) return;
  const stage = demo.querySelector('[data-thinking-block-stage]');
  if (!stage) return;

  coordinator.active = true;
  coordinator.run += 1;
  const run = coordinator.run;
  setButtons(demo, true);
  setFallback(demo, '');
  setVisibleStatus(demo, '正在準備摘要。');

  const block = document.createElement('thinking-block');
  block.setAttribute('data-label', '思考摘要');
  stage.append(block);

  block.addEventListener('thinking-block:statechange', function (event) {
    if (event.target !== block || coordinator.run !== run || !document.contains(block)) return;
    const detail = event.detail || {};
    const message = STATE_MESSAGES[detail.state];
    if (!message) return;
    const terminal = detail.state !== 'streaming';
    const release = terminal ? function () {
      coordinator.release(run);
    } : null;

    // 沒有可見摘要時不播報。
    if (!detail.hasContent) {
      if (release) release();
      return;
    }
    setVisibleStatus(demo, message);
    coordinator.announce(message, release);
  });

  let index = 0;
  coordinator.chunkTimer = setInterval(function () {
    if (coordinator.run !== run) {
      clearInterval(coordinator.chunkTimer);
      return;
    }
    if (!document.contains(block)) {
      coordinator.cancel(run, '示範摘要已移除。');
      return;
    }

    // 終結延後一個間隔，讓「摘要更新中」先寫入。
    if (outcome === 'abort' && index === 1) {
      clearInterval(coordinator.chunkTimer);
      block.abort();
      return;
    }
    if (outcome === 'error' && index === 2) {
      clearInterval(coordinator.chunkTimer);
      block.error('摘要暫時無法取得');
      return;
    }
    if (index < CHUNKS.length) {
      block.appendText(CHUNKS[index]);
      index += 1;
      return;
    }

    clearInterval(coordinator.chunkTimer);
    block.complete();
  }, CHUNK_INTERVAL);
}

function initialiseDemo(demo) {
  if (demo._thinkingBlockCoordinator) return;
  const actions = demo.querySelector('[data-thinking-block-actions]');
  const announcer = document.querySelector('live-announcer');
  if (!actions || !announcer || typeof announcer.announce !== 'function') {
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
