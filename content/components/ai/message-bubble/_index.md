---
title: 訊息氣泡 (Message Bubble)
maturity: "new"
---

### 基本氣泡

{{< live-example partial="ai/message-bubble/basic.html" source="ai/message-bubble/basic-source.html" >}}

- 角色標示為可見文字（「你」「客服助理」），`<article>` 以 `aria-labelledby` 指向它。
- AI 氣泡含操作列：複製、重新生成、讚、倒讚。

### 模擬串流回覆

{{< live-example partial="ai/message-bubble/streaming.html" source="ai/message-bubble/streaming-source.html" >}}

- 送出訊息後先由[輸入中提示]({{< ref "components/ai/typing-indicator/_index.md" >}})元件顯示等待動畫並播報「AI 正在輸入」；等其 `typing-indicator:announced` 事件確認播報已送達，才開始串流。
- 串流期間正文掛 `aria-hidden="true"`，由本元件依句末標點分句、以至少 1100ms 間隔交由即時宣告代播（節流原因詳見[即時宣告]({{< ref "components/ai/live-announcer/_index.md" >}})頁）；完成時播「回覆完成」並顯示操作列。
- 「模擬 AI 回覆」按鈕與「已宣告內容」面板僅供文件示範。

#### Custom Element

- 使用 [`<message-bubble>`]({{< relURL "js/components/message-bubble.js" >}})。

#### 使用方式

元件對外只有四個後端無關的方法，任何串流來源都翻譯成這四個呼叫：

{{< code-example content=`const bubble = document.createElement('message-bubble');
bubble.setAttribute('variant', 'ai');
bubble.setAttribute('streaming', '');
container.chatContainer.appendMessage(bubble); // 或直接 append 到任何位置

bubble.appendToken('串流文字片段'); // 追加正文
bubble.complete();                  // 回覆完成
bubble.abort();                     // 停止生成（保留已生成部分）
bubble.error('連線逾時');           // 錯誤（assertive 播報 + 可見錯誤文字）` >}}

後端事件對照範例（**非規範性**，僅為示意）：

{{< code-example content=`// Anthropic Messages API（串流）
stream.on('content_block_delta', (event) => bubble.appendToken(event.delta.text));
stream.on('message_stop', () => bubble.complete());` >}}

{{< code-example content=`// OpenAI Responses API（串流）
for await (const event of stream) {
  if (event.type === 'response.output_text.delta') bubble.appendToken(event.delta);
  if (event.type === 'response.completed') bubble.complete();
}` >}}

角色標題與收尾播報文字可用 `data-*` 屬性覆寫（動態建立與伺服器渲染的靜態氣泡皆支援）：

{{< code-example content=`bubble.setAttribute('data-role-label', '王小明');           // 覆寫角色標題，預設「你」／「客服助理」
bubble.setAttribute('data-complete-message', '已回覆完畢'); // 覆寫 complete() 結語，預設「回覆完成」
bubble.setAttribute('data-abort-message', '已取消生成');    // 覆寫 abort() 結語，預設「已停止產生回覆」` >}}

#### CSS

- `.message-bubble__inner`／`__inner--user`／`__inner--ai`：氣泡本體與角色 modifier。
- `.message-bubble__role`：可見角色標題。
- `.message-bubble__toolbar`：操作列，樣式沿用工具列元件。

#### 親和力

- 角色標示為可見文字，不靠顏色或對齊區分。
- 串流正文的播報由「即時宣告」元件分句代播，正文本身不掛任何 `aria-live`。
- 操作列沿用工具列模式：單一 Tab 停駐點、方向鍵移動。
- 讚/倒讚為互斥 toggle（`aria-pressed`），再按一次可取消。
- 操作列按鈕標籤（複製／重新生成／讚／倒讚）、工具列的 `aria-label="訊息操作"`，以及複製失敗時的提示文字，為刻意固定的無障礙輔助文字，目前不提供覆寫。

#### JavaScript

元件以 ES module 撰寫，載入必須加 `type="module"`。（若因架構需要跨網域載入，伺服器須提供 CORS 標頭，否則會靜默失敗。）路徑請依實際部署位置調整。

{{< code-example content=`<script type="module" src="js/components/message-bubble.js"></script>` >}}

- 本元件會自動載入同目錄的 [`toolbar.js`]({{< relURL "js/components/toolbar.js" >}})，部署時需一併放置；頁面需掛載[即時宣告]({{< ref "components/ai/live-announcer/_index.md" >}})元件。
- 複製成功後有 polite 播報；重新生成與讚/倒讚以 `message-bubble:regenerate`／`message-bubble:feedback` 事件通知外部，元件本體不重送請求。
- 無 JS 時：靜態氣泡（角色標題、正文）可讀；操作列（含讚/倒讚）維持隱藏。本元件未內建表單模式；若伺服器端支援表單提交，可自行將讚/倒讚改造為表單版本。

#### 多格式文字段落

- 氣泡正文可放入語意化 HTML（如表格、清單）：由伺服器或產品層渲染完成後置入，螢幕閱讀器以原生語意閱讀。
- `appendToken()` 僅支援純文字；含結構化內容的回覆，建議串流階段以純文字呈現，`complete()` 後由產品層替換正文內容。
- 即時宣告僅播純文字，表格與清單內容不會透過 live region 朗讀；建議完成時以文字摘要宣告（如「回覆包含表格」），內容由使用者於對話紀錄中瀏覽。
- 元件不會解析 Markdown；若由呼叫端自行轉換為 HTML 後傳入，該 HTML 須先經過淨化（sanitize）以避免 XSS 風險。

#### 參考

- [Defining 'Toast' Messages](https://adrianroselli.com/2020/01/defining-toast-messages.html) - Adrian Roselli
- [Accessible notifications with ARIA Live Regions (Part 2)](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/) - Sara Soueidan
- [Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) - ARIA Authoring Practices Guide

{{< asset-script "js/components/live-announcer.js" >}}
{{< asset-script "js/components/message-bubble.js" >}}
{{< asset-script "js/components/typing-indicator.js" >}}
{{< asset-script "js/demo/message-bubble.demo.js" >}}
{{< asset-script "js/demo/live-announcer.demo.js" >}}
