---
title: 對話容器 (Chat Container)
maturity: "new"
---

### 靜態對話

{{< live-example partial="ai/chat-container/basic.html" source="ai/chat-container/basic-source.html" >}}

- 容器使用 `role="log"`，新加入的訊息由螢幕閱讀器自動朗讀（polite），無需設定 `aria-live`。
- 未使用螢幕閱讀器時，Tab 聚焦容器後可用方向鍵、PageUp／PageDown、Home／End 捲動；螢幕閱讀器使用者請以閱讀游標瀏覽訊息。
- 本頁 demo 使用簡潔形式 `<message-bubble variant="…">文字</message-bubble>`（由 JS 建構完整結構）；正式使用建議伺服器渲染完整結構，以保留無 JS 降級與可見角色標題，寫法參照[訊息氣泡]({{< ref "components/ai/message-bubble/_index.md" >}})說明頁。

### 動態訊息與捲動策略

{{< live-example partial="ai/chat-container/dynamic.html" source="ai/chat-container/dynamic-source.html" >}}

- 捲動位置在底部時，新訊息自動捲到底；上捲閱讀歷史時不打斷，改顯示「捲到最新訊息」按鈕。
- 「模擬新訊息」按鈕僅供文件示範。

#### 使用方式

{{< code-example content=`const container = document.querySelector('[data-chat-container]');
container.chatContainer.appendMessage(node); // 將訊息節點加入末端並依捲動策略處理` >}}

#### CSS

- `.chat-container`：對話容器本體；訊息子節點可為任意元素，示範使用[訊息氣泡]({{< ref "components/ai/message-bubble/_index.md" >}})。
- `.chat-container__jump-latest`：「捲到最新訊息」按鈕，需放在 log 元素外。

#### 親和力

- log 需有可及名稱：`aria-labelledby` 指向可見標題。
- 新訊息永不搶焦點；視覺捲動與鍵盤焦點分離。
- 容器 `tabindex="0"` 讓鍵盤使用者可聚焦捲動，聚焦時有可見 focus ring。
- 訊息的角色標示（「你」「客服助理」）由訊息氣泡元件以可見文字提供，角色區分不僅依賴視覺。

#### JavaScript

元件以 ES module 撰寫，載入必須加 `type="module"`。（若因架構需要跨網域載入，伺服器須提供 CORS 標頭，否則會靜默失敗。）路徑請依實際部署位置調整。

{{< code-example content=`<script type="module" src="js/components/chat-container.js"></script>` >}}

- 使用 [`chat-container.js`]({{< relURL "js/components/chat-container.js" >}})，自動初始化所有 `[data-chat-container]`。
- 自動初始化僅涵蓋腳本載入當時已存在的 `[data-*]` 節點；動態插入的情境請先於 DOM 備妥節點再載入腳本。
- 無 JS 時：靜態訊息仍可讀、容器聚焦後仍可鍵盤捲動；「捲到最新訊息」按鈕不會出現。

#### 參考

- [log role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/log_role) - MDN
- [ARIA23: Using role=log to identify sequential information updates](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA23) - W3C
- [Accessible notifications with ARIA Live Regions (Part 2)](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/) - Sara Soueidan

{{< asset-script "js/components/live-announcer.js" >}}
{{< asset-script "js/components/message-bubble.js" >}}
{{< asset-script "js/components/chat-container.js" >}}
{{< asset-script "js/demo/chat-container.demo.js" >}}
