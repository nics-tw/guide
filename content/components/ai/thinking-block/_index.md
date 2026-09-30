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
- 按鈕僅做本機模擬；摘要正文不會逐段放進 live region，準備階段只顯示於畫面，不另外播報。
- 示範執行期間，三個啟動按鈕會標記為不可用，並保留目前按鈕的鍵盤焦點；完成後才恢復操作。

#### 使用方式

- 靜態：伺服器輸出已完成的摘要時，保留下方完整結構即可；沒有 JavaScript 時仍可閱讀與開合。已有文字的結構預設為完成狀態。
- 動態：載入 `thinking-block.js`，在元件接到 DOM 且 `customElements.whenDefined('thinking-block')` 完成後，再以 `appendText()` 追加文字並呼叫終結方法。

{{< code-example content=`<thinking-block data-label="思考摘要" data-state="complete">
  <details class="thinking-block" open>
    <summary class="thinking-block__summary">
      <span class="thinking-block__label">思考摘要</span>
      <span class="thinking-block__status">摘要已完成</span>
    </summary>
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

#### API

| 名稱 | 說明 |
|---|---|
| `state` | 唯讀，值為 `idle`、`streaming`、`complete`、`aborted`、`error`；`data-state` 同步反映目前狀態 |
| `appendText(text)` | 追加非空純文字；第一段非空文字讓狀態由 `idle` 進入 `streaming`，只有空白的第一段會被拒絕 |
| `complete()`、`abort()`、`error(message)` | 結束摘要並保留已有文字；`error()` 只在有摘要時顯示錯誤說明，未提供訊息時使用預設文字 |
| `thinking-block:statechange` | 會冒泡的事件，`detail` 為 `{ state, hasContent }`；首段、完成、停止與錯誤各發出一次，片段追加、開合與重新插入不發出 |

- 所有方法都回傳布林值。只有已初始化且仍連接到 DOM 的執行個體會接受操作；終結後再新增或再次終結，以及元件移出 DOM 期間的呼叫，都會回傳 `false`。
- 重新插入會保留文字與開合狀態；要重試請建立新的執行個體。
- 已有文字的結構若設定 `data-state="streaming"` 或 `data-state="idle"`，載入後會以 `streaming` 狀態繼續接受追加。

#### 摘要內容

元件只顯示可公開閱讀的純文字，不解析 HTML 或 Markdown。不要傳入模型的原始思考、簽章、加密資料或其他不適合公開的內容；含 Markdown 的摘要須先轉為純文字。供應商回傳的事件，請先由採用端整理成下列其中一種情況：

| 情況 | 做法 |
|---|---|
| 逐段到達 | 以 `appendText()` 逐段追加，最後呼叫 `complete()`、`abort()` 或 `error()`。多段摘要請自行加入段落分隔（例如 `\n\n`）；收到完整快照後，不要再追加相同的片段 |
| 一次到齊 | 載入既有對話時，在插入 DOM 前寫入文字並設定 `data-state="complete"`，元件直接完成且不發出事件；回合進行中才到齊時，連續呼叫 `appendText()` 與 `complete()` |
| 沒有摘要 | 例如未啟用摘要，或只回傳空字串、簽章時，可以不建立元件。若已建立，終結方法仍會發出 `hasContent: false` 的事件，但不顯示可開合區塊與錯誤說明，採用端不應據此播報 |

更新中的摘要可由使用者收合原生 `details` 隱藏；元件不管理後端請求的取消。

#### 狀態播報

元件不建立 live region，也不自動播報。動態摘要需要狀態通知時，由採用端透過頁面上唯一的[即時宣告]({{< ref "components/ai/live-announcer/_index.md" >}}) `<live-announcer>` 送出簡短狀態，並遵守下列規則：

- 以事件的 `target` 對應自己的回合；同一回合只由一個協調者送出摘要狀態，避免和[輸入中提示]({{< ref "components/ai/typing-indicator/_index.md" >}})或[訊息氣泡]({{< ref "components/ai/message-bubble/_index.md" >}})競爭同一個宣告頻道。
- 沒有可見摘要（`hasContent: false`）時不播報。
- 狀態在寫入前又變化時，只送出最新一則，並以 `live-announcer:announced` 事件確認實際寫入；不建立全域佇列。
- `<live-announcer>` 是全頁共用頻道，其他元件的呼叫可能覆蓋尚未寫入的狀態。請設定確認期限：逾時不代表已播報，只是停止等待，改由摘要標題中的可見狀態提供資訊。
- 答案開始後由訊息氣泡負責通知，摘要不再送出狀態。若同時使用輸入中提示，也要先完成它的宣告交接。
- 回合在答案開始前取消時，移除監聽器與計時器；已交給即時宣告元件的訊息無法撤回，也可能被後續訊息覆蓋。

下列範例實作以上規則，適用於尚未開始答案的摘要階段：

- 在第一段文字抵達前安裝監聽器；`block` 是新建立、尚未呼叫 `appendText()` 的摘要實例。
- 答案資料抵達時呼叫 `beginAnswer(start)`；摘要狀態確認寫入或逾時後，才會執行 `start`。
- 回合在答案開始前取消時呼叫 `cancelSummary()`，之後不會啟動答案，也不再送出摘要狀態。若「已停止」通知由其他元件負責（例如訊息氣泡），先呼叫 `cancelSummary()` 再呼叫 `block.abort()`，摘要只更新可見狀態；若要由摘要提出「摘要已停止更新」的宣告，則先呼叫 `block.abort()` 再呼叫 `cancelSummary()`。

{{< code-example content=`await customElements.whenDefined('live-announcer');
const announcer = document.querySelector('live-announcer');
if (!announcer || typeof announcer.announce !== 'function') {
  throw new Error('缺少 live-announcer');
}

const MESSAGES = {
  streaming: '摘要更新中',
  complete: '摘要已完成',
  aborted: '摘要已停止更新',
  error: '摘要未完成',
};
const CONFIRM_TIMEOUT = 5000;

let closed = false; // 答案已開始或回合已取消
let pending = null;
let timer = null;
let startAnswer = null;

function settle() {
  clearTimeout(timer);
  pending = null;
  const next = startAnswer;
  startAnswer = null;
  if (next) next();
}

function onAnnounced(event) {
  if (event.target !== announcer || pending === null) return;
  if (event.detail.level === 'polite' && event.detail.message === pending) settle();
}
announcer.addEventListener('live-announcer:announced', onAnnounced);

function onStatechange(event) {
  if (event.target !== block || closed) return;
  const { state, hasContent } = event.detail;
  if (!hasContent) return; // 沒有可見摘要時不播報
  pending = MESSAGES[state];
  announcer.announce(pending);
  clearTimeout(timer);
  timer = setTimeout(settle, CONFIRM_TIMEOUT);
}
block.addEventListener('thinking-block:statechange', onStatechange);

function detach() {
  clearTimeout(timer);
  pending = null;
  startAnswer = null;
  announcer.removeEventListener('live-announcer:announced', onAnnounced);
  block.removeEventListener('thinking-block:statechange', onStatechange);
}

function beginAnswer(start) {
  if (closed) return;
  const run = () => {
    closed = true;
    detach();
    start(); // 之後由訊息氣泡負責通知
  };
  if (pending === null) run();
  else startAnswer = run;
}

function cancelSummary() {
  if (closed) return;
  closed = true;
  detach();
}` >}}

#### CSS

- `.thinking-block`：摘要的原生開合容器。
- `.thinking-block__summary`／`__label`／`__status`：標題與目前狀態。
- `.thinking-block__content`／`__error`：純文字內容與錯誤說明。

#### 親和力

- 原生 `summary` 提供鍵盤開合，不需額外加 `role`、`button` 或 `aria-expanded`。
- 元件不建立 live region，也不自動收合、移焦或捲動；動態摘要的狀態通知規則見「狀態播報」。
- 摘要若位於聊天 `role="log"`，串流組合可設定 `aria-live="off"`，但這不是保證靜音；需以實際使用的螢幕閱讀器與瀏覽器驗證焦點在 log 內時是否重複或漏播。

#### JavaScript

元件為 [`<thinking-block>`]({{< relURL "js/components/thinking-block.js" >}}) 自訂元素，以 ES module 撰寫，載入必須加 `type="module"`。若跨網域載入，伺服器須提供 CORS 標頭；路徑請依實際部署位置調整。

{{< code-example content=`<script type="module" src="js/components/thinking-block.js"></script>` >}}

- 靜態完成摘要不需要 JavaScript。動態摘要需載入 `thinking-block.js`；若需要狀態通知，還需先在頁面掛載一個 `live-announcer.js`／`<live-announcer>`。文件頁的示範腳本不是產品依賴。
- 建立摘要前先確定要公開的內容。元件只處理呈現，不管理模型 API、網路取消、答案串流、重試、焦點或捲動。

#### 參考

- [The Details disclosure element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element) - HTML Living Standard
- [Disclosure (Show/Hide) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) - ARIA Authoring Practices Guide

{{< asset-script "js/components/live-announcer.js" >}}
{{< asset-script "js/components/thinking-block.js" "simplified-summary-v1" >}}
{{< asset-script "js/demo/thinking-block.demo.js" "simplified-summary-v1" >}}
