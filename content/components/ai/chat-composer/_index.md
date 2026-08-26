---
title: 訊息輸入區 (Chat Composer)
maturity: "new"
---

### 基本範例

{{< live-example partial="ai/chat-composer/basic.html" source="ai/chat-composer/basic-source.html" >}}

- Enter／Shift+Enter 換行；Ctrl+Enter 或 Command+Enter 送出。
- 「測試送出狀態」可持續模擬失敗；它與回覆期間的停止按鈕只供組合示範，不屬於元件。

### 附加檔案（選用）

{{< live-example partial="ai/chat-composer/with-attachments.html" source="ai/chat-composer/with-attachments-source.html" >}}

- 附件功能可以省略；需要時，使用[檔案上傳]({{< ref "components/file-upload/_index.md" >}})的 compact 樣式與 `data-chat-composer-attachments`，放在輸入區操作列。
- 元件只列出檔名與清除按鈕；`accept`、`multiple`、數量、大小、上傳與安全檢查由採用端設定。

#### 使用方式

採用端監聽原生 `submit`，取得送出當下的提交快照（snapshot），並在後端結果確定後呼叫控制器：

{{< code-example content=`const form = document.querySelector('[data-chat-composer]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const submission = form.chatComposer.captureSubmission();
  form.chatComposer.setBusy(true);

  try {
    await sendMessage(formData);
    form.chatComposer.accept(submission);
  } catch (error) {
    form.chatComposer.fail('訊息未送出，輸入內容已保留，請稍後再試。');
  }
});` class="mb3" >}}

| 方法 | 用途 |
|---|---|
| `captureSubmission()` | 記錄送出當下的狀態；資料仍由 `FormData` 取得 |
| `accept(submission)` | 接受請求、進入忙碌；若有狀態節點則顯示「訊息已送出，正在等待回覆」，並清除未被修改的草稿與附件 |
| `fail(message)` | 送出失敗時保留內容、顯示錯誤，並依焦點位置提供一次回饋 |
| `setBusy(isBusy)` | 控制是否允許再次送出 |
| `setStatus(message)` | 更新可見操作狀態；傳入空字串時隱藏 |
| `clearError()` | 清除錯誤，不改變草稿或焦點 |

串流開始後的錯誤由[訊息氣泡]({{< ref "components/ai/message-bubble/_index.md" >}})處理；不要再呼叫 Composer 的 `fail()`。使用者訊息請透過[對話容器]({{< ref "components/ai/chat-container/_index.md" >}})加入紀錄。

#### CSS

- `.chat-composer`／`.chat-composer__input`：表單與多行訊息欄位。
- `.chat-composer__error`／`.chat-composer__status`：錯誤與操作狀態。
- `.chat-composer__attachments`／`.chat-composer__actions`：操作列中的選用附件與送出控制。

#### 親和力

- 保留可見 label 與原生 required 驗證；placeholder 不取代 label。
- 空白或忙碌時以 `aria-disabled` 表達狀態，送出按鈕仍保留在 Tab 順序中。
- 元件不移動焦點或建立額外的 live region。焦點留在輸入框時，由既有的 `aria-describedby` 錯誤關聯提供回饋；焦點位於其他控制時，才使用頁面既有的 `<live-announcer>` 播報，避免同一句錯誤重複朗讀。
- 組合串流 Message Bubble 時，對話紀錄設定 `aria-live="off"`，避免它與 `<live-announcer>` 重複播報 AI 回覆。

#### JavaScript

元件以 ES module 撰寫，載入必須加 `type="module"`。跨網域載入時，伺服器必須提供 CORS 標頭。

{{< code-example content=`<script type="module" src="js/components/chat-composer.js"></script>` class="mb3" >}}

- 腳本載入時自動初始化所有 `[data-chat-composer]`；不處理載入後才動態插入的表單。
- 表單必須包含 `[data-chat-composer-input]`、`[data-chat-composer-submit]` 與 `[data-chat-composer-error]`；缺少任一節點時不會初始化。狀態與附件相關節點皆為選用。
- 使用 `fail()` 且焦點不在輸入框時，頁面必須掛載一個 `<live-announcer>` 並載入其腳本；缺少時仍會顯示持久錯誤，但不會額外動態播報。
- 無 JS 時，原生 form action、required textarea 與 submit button 仍可使用；採用端必須提供有效的 `action`。

#### 參考

- [The textarea element](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element) - WHATWG
- [KeyboardEvent.isComposing](https://w3c.github.io/uievents/#dom-keyboardevent-iscomposing) - W3C UI Events
- [Making Disabled Buttons More Inclusive](https://css-tricks.com/making-disabled-buttons-more-inclusive/) - Sandrina Pereira

{{< asset-script "js/components/live-announcer.js" >}}
{{< asset-script "js/components/message-bubble.js" >}}
{{< asset-script "js/components/chat-container.js" "scroll-follow-v4" >}}
{{< asset-script "js/components/typing-indicator.js" >}}
{{< asset-script "js/components/chat-composer.js" >}}
{{< asset-script "js/demo/chat-composer.demo.js" "focus-return-v1" >}}
