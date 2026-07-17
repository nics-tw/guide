---
title: 輸入中提示 (Typing Indicator)
maturity: "new"
---

### 基本示範

{{< live-example partial="ai/typing-indicator/basic.html" source="ai/typing-indicator/basic-source.html" >}}

- 三點跳動動畫表示系統正在處理中。
- 「已宣告內容」面板僅供文件示範。

#### 使用方式

{{< code-example content=`const typing = document.querySelector('[data-typing-indicator]');
typing.typingIndicator.show(); // 送出請求時呼叫
typing.typingIndicator.hide(); // 首段回覆內容抵達時呼叫` >}}

- 播報文案可用 `data-typing-text` 屬性覆寫，預設「AI 正在輸入」。
- `show()` 有 300ms 延遲出現的防閃爍機制：回應在此窗口內抵達則不顯示、不播報（設計行為，非故障）；`hide()` 一律立即移除視覺，避免與已抵達的回覆內容並存。
- 若回覆內容也會經由即時宣告播報，建議等本元件發出 `typing-indicator:announced` 事件後再開始傳送內容，避免「正在輸入」被內容播報蓋掉（本頁示範即採此作法）。

#### CSS

- `.typing-indicator`／`__dot`：三點容器與圓點，跳動動畫由 CSS 控制。

#### 親和力

- 動畫節點整體 `aria-hidden="true"` 常駐，不承載任何輔助科技可讀的文字，也無可聚焦子元素；置於對話容器（`role="log"`）內亦不會觸發額外播報。
- 狀態由[即時宣告]({{< ref "components/ai/live-announcer/_index.md" >}})元件以 polite 等級播報「AI 正在輸入」恰一次；消失不宣告（回覆完成由訊息氣泡負責）。
- `prefers-reduced-motion: reduce` 下，跳動動畫改為輕微 opacity 脈動，保留「進行中」語意而非直接移除動畫。

#### JavaScript

元件以 ES module 撰寫，載入必須加 `type="module"`。（若因架構需要跨網域載入，伺服器須提供 CORS 標頭，否則會靜默失敗。）路徑請依實際部署位置調整。

{{< code-example content=`<script type="module" src="js/components/typing-indicator.js"></script>` >}}

- 使用 [`typing-indicator.js`]({{< relURL "js/components/typing-indicator.js" >}})，自動初始化所有 `[data-typing-indicator]`，頁面需掛載[即時宣告]({{< ref "components/ai/live-announcer/_index.md" >}})元件。
- 自動初始化僅涵蓋腳本載入當時已存在的 `[data-*]` 節點；動態插入的情境請先於 DOM 備妥節點再載入腳本。
- 無 JS 時：節點維持 `hidden`，不出現、不阻斷頁面其他內容。

#### 參考

- [status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role) - MDN
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) - MDN

{{< asset-script "js/components/live-announcer.js" >}}
{{< asset-script "js/components/chat-container.js" >}}
{{< asset-script "js/components/message-bubble.js" >}}
{{< asset-script "js/components/typing-indicator.js" >}}
{{< asset-script "js/demo/typing-indicator.demo.js" >}}
{{< asset-script "js/demo/live-announcer.demo.js" >}}
