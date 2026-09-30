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
- 若回覆內容也會經由即時宣告播報，請等本元件發出 `typing-indicator:settled` 後再開始傳送內容，避免「正在輸入」被內容播報蓋掉。每輪 `show()` 最多發出一次；`detail.announced` 為 `true` 表示已確認寫入宣告區域，為 `false` 表示 3 秒內未確認（例如被其他播報覆蓋）或頁面沒有 `<live-announcer>`，流程仍可繼續。只有確認寫入時才會另外發出 `typing-indicator:announced`。
- 使用者在等待期間停止時，移除 `typing-indicator:settled` 監聽並呼叫 `hide()`；`hide()` 會取消本輪確認，之後不再發出事件。已交給即時宣告元件的「AI 正在輸入」無法撤回。

{{< code-example content=`typing.addEventListener('typing-indicator:settled', () => {
  typing.typingIndicator.hide();
  startReply(); // 開始串流回覆
}, { once: true });
typing.typingIndicator.show();` >}}

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
{{< asset-script "js/components/chat-container.js" "scroll-follow-v5" >}}
{{< asset-script "js/components/message-bubble.js" >}}
{{< asset-script "js/components/typing-indicator.js" "settle-timeout-v1" >}}
{{< asset-script "js/demo/typing-indicator.demo.js" >}}
{{< asset-script "js/demo/live-announcer.demo.js" >}}
