---
title: 思考區塊 (Thinking Block)
maturity: "new"
---

### 基本摘要

{{< live-example partial="ai/thinking-block/basic.html" >}}

- 使用原生 `<details>`／`<summary>`，可由使用者自行開合。
- 摘要只放適合公開閱讀的純文字；必要警示與最終答覆不應只放在此處。

### 多個摘要

{{< live-example partial="ai/thinking-block/multiple.html" >}}

- 每個摘要可獨立開合，不會因開啟另一個摘要而收合。

### 動態摘要

{{< live-example partial="ai/thinking-block/streaming.html" source="ai/thinking-block/streaming-source.html" >}}

- 「已寫入宣告區域」只表示示範的狀態文字已寫入 DOM，不代表螢幕閱讀器已完成語音播報。
- 按鈕僅做本機模擬；摘要正文不會逐段放進 live region。

#### Custom Element

- 使用 [`<thinking-block>`]({{< relURL "js/components/thinking-block.js" >}})。

#### 使用方式

伺服器渲染的完成摘要可直接保留完整結構；沒有 JavaScript 時仍可閱讀與開合。動態情境請在元件接到 DOM、且 `customElements.whenDefined()` 完成後，再呼叫方法。

{{< code-example content=`<thinking-block data-label="思考摘要" data-state="complete">
  <details class="thinking-block" open>
    <summary class="thinking-block__summary">
      <span class="thinking-block__label">思考摘要</span>
      <span class="thinking-block__status">摘要已完成</span>
    </summary>
    <button type="button" class="thinking-block__pause" hidden>暫停摘要更新</button>
    <div class="thinking-block__content">可公開閱讀的摘要。</div>
    <p class="thinking-block__error" hidden></p>
  </details>
</thinking-block>` >}}

{{< code-example content=`const block = document.createElement('thinking-block');
block.setAttribute('data-label', '思考摘要');
container.append(block);

await customElements.whenDefined('thinking-block');
block.appendText('先整理適合公開的摘要。');
block.appendText('再追加下一段。');
block.complete();` >}}

`state` 是唯讀的 `idle`、`streaming`、`complete`、`aborted`、`error`；`data-state` 同步反映目前狀態。`appendText()`、`complete()`、`abort()`、`error()`、`pause()`、`resume()` 都回傳布林值，只有已初始化且仍連接到 DOM 的執行個體會接受有效操作。終結後的新增、再次終結與暫停會回傳 `false`；已在暫停的終結摘要仍可 `resume()` 顯示累積內容。移除期間的呼叫會回傳 `false`；重新插入會保留文字、開合與暫停狀態，重試請建立新的執行個體。

有內容且仍在 `streaming` 的摘要可 `pause()`；後續文字仍會累積但不更新可見內容，`resume()` 才一次同步。暫停與恢復不會發出狀態事件。未暫停的終結摘要，或已恢復後的終結摘要，若暫停按鈕正有焦點，按鈕會保留為不可用的「摘要更新已結束」，避免把焦點移走；焦點離開後才隱藏。

已有文字的 SSR 結構預設為完成狀態；明確設定 `data-state="streaming"` 可在載入後追加文字，明確的 `data-state="idle"` 且已有文字也會正規化為 `streaming`。空的裸標籤從 `idle` 開始，第一段非空純文字才進入 `streaming`。`appendText()` 只接受非空純文字。供應商的事件、完整快照與文字片段須先由採用端正規化：完整快照只寫入一次，不要又追加相同的 delta。元件不解析 HTML 或 Markdown；不要傳入模型的原始思考、簽章、加密資料或其他不適合公開的內容。

`complete()`、`abort()` 與 `error()` 會保留已有摘要。沒有文字時，元件不會顯示空白的可開合區塊；重試請建立新的執行個體。暫停只凍結畫面上的摘要更新，並不取消後端請求；完成或停止後若仍在暫停，可用「繼續摘要更新」顯示累積內容。

每次邏輯狀態轉換會同步發出會冒泡的 `thinking-block:statechange`，`detail` 為 `{ state, hasContent }`。首段、完成、停止與錯誤各發出一次；片段追加、開合、暫停、恢復與重新插入不會發出事件。

動態狀態由採用端負責通知。以下是「尚未開始答案」的獨立摘要階段最小範例：同一回合只由這個協調者送摘要狀態；它只合併自己尚未確認的訊息，並以實際寫入事件確認，不建立全域佇列。

請在第一段文字抵達前安裝下列監聽器；`block` 是新建立、尚未呼叫 `appendText()` 的摘要實例。只有 `beginAnswer()` 回傳 `true` 時才能開始呼叫訊息氣泡的答案 API；回傳 `false` 時先保留答案資料，等狀態寫入事件後再試。若宣告元件失效，採用端需提供可閱讀的持久狀態與明確降級流程，不能把逾時當成已送達。若同時使用輸入中提示，也要先完成它的宣告交接。

{{< code-example content=`await customElements.whenDefined('live-announcer');
const announcer = document.querySelector('live-announcer');
const announcerReady = Boolean(
  announcer && typeof announcer.announce === 'function'
);
if (!announcerReady) throw new Error('缺少 live-announcer');

let answerStarted = false;
let pending = null;

function announceSummary(message) {
  if (answerStarted) return;
  pending = { message: pending ? pending.message + '；' + message : message };
  announcer.announce(pending.message);
}

announcer.addEventListener('live-announcer:announced', (event) => {
  if (event.target !== announcer || !pending) return;
  if (event.detail.level === 'polite' && event.detail.message === pending.message) {
    pending = null;
  }
});

block.addEventListener('thinking-block:statechange', (event) => {
  if (event.target !== block || answerStarted) return;
  const { state, hasContent } = event.detail;
  if (state === 'streaming' && hasContent) announceSummary('摘要更新中');
  if (state === 'complete') announceSummary('摘要已完成');
  if (state === 'aborted') announceSummary('摘要已停止更新');
  if (state === 'error') announceSummary('摘要未完成');
});

function beginAnswer() {
  if (!announcerReady || pending !== null || answerStarted) return false;
  answerStarted = true; // 之後由 Message Bubble 成為答案的唯一通知 owner
  return true;
}` >}}

#### CSS

- `.thinking-block`：摘要的原生開合容器。
- `.thinking-block__summary`／`__label`／`__status`：標題與目前狀態。
- `.thinking-block__pause`／`__content`／`__error`：暫停控制、純文字內容與錯誤說明。

#### 親和力

- 原生 `summary` 提供鍵盤開合，不需額外加 `role`、`button` 或 `aria-expanded`。
- 元件不建立 live region，也不自動收合、移焦或捲動。動態摘要的簡短狀態通知由採用端統一協調，避免和[輸入中提示]({{< ref "components/ai/typing-indicator/_index.md" >}})或[訊息氣泡]({{< ref "components/ai/message-bubble/_index.md" >}})競爭同一個宣告頻道；答案開始後，摘要協調者不得另外送狀態。
- 摘要若位於聊天 `role="log"`，串流組合可設定 `aria-live="off"`，但這不是保證靜音；需以實際使用的螢幕閱讀器與瀏覽器驗證焦點在 log 內時是否重複或漏播。
- 尚未完成 NVDA 與可用瀏覽器、VoiceOver 與 Safari、語音控制及真實縮放的人工驗證；使用產品前應依目標環境測試。

#### JavaScript

元件以 ES module 撰寫，載入必須加 `type="module"`。若跨網域載入，伺服器須提供 CORS 標頭；路徑請依實際部署位置調整。

{{< code-example content=`<script type="module" src="js/components/thinking-block.js"></script>` >}}

- 靜態完成摘要不需要 JavaScript。動態摘要需載入 `thinking-block.js`；若需要狀態通知，還需先在頁面掛載一個 `live-announcer.js`／`<live-announcer>`。文件頁的示範腳本不是產品依賴。
- 元件以 `thinking-block:statechange` 事件交出 `streaming`、`complete`、`aborted`、`error` 與 `hasContent`。採用端應以事件的 `target` 對應自己的回合，並由同一個協調者決定是否向[即時宣告]({{< ref "components/ai/live-announcer/_index.md" >}})送出短狀態。
- 建立摘要前先確定要公開的內容。元件只處理呈現，不管理模型 API、網路取消、答案串流、重試、焦點或捲動。

#### 參考

- [The Details disclosure element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element) - HTML Living Standard
- [Disclosure (Show/Hide) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) - ARIA Authoring Practices Guide

{{< asset-script "js/components/live-announcer.js" >}}
{{< asset-script "js/components/thinking-block.js" >}}
{{< asset-script "js/demo/thinking-block.demo.js" >}}
