---
title: 即時宣告 (Live Announcer)
maturity: "new"
---

### 基本示範

{{< live-example partial="ai/live-announcer/basic.html" source="ai/live-announcer/basic-source.html" >}}

- `<live-announcer>` 本體無任何視覺輸出，訊息寫入隱藏的 live region 由螢幕閱讀器朗讀。
- 「已宣告內容」面板僅供文件示範，非元件功能。

#### Custom Element

- 使用 [`<live-announcer>`]({{< relURL "js/components/live-announcer.js" >}})。

#### 使用方式

頁面所需的靜態標記僅此一行（其餘為示範按鈕與面板，非元件本體）：

{{< code-example content=`<live-announcer></live-announcer>` >}}

{{< code-example content=`const announcer = document.querySelector('live-announcer');

announcer.announce('回覆完成'); // 一般提示（polite）
announcer.alert('連線中斷，請重新整理頁面'); // 錯誤等必要中斷（assertive）` >}}

#### 親和力

- 請保持宣告訊息簡短、純文字，避免連結、清單或其他複雜結構。
- assertive 等級的 `alert()` 請僅用於錯誤、逾時等必須立即中斷的情況；其餘請改用 polite 等級的 `announce()`。
- 請於頁面載入時即掛載 `<live-announcer>`，避免等到要播報時才動態插入。輔助科技通常只會追蹤已存在於 DOM 的 live region，動態插入的區域可能錯過插入後立即發生的第一次播報。
- 全站僅掛載一個 `<live-announcer>`。
- 連續呼叫時，本元件會將前一則訊息保留約 1 秒才允許被取代，避免螢幕閱讀器來不及讀取；高頻更新請自行節流，呼叫間隔建議大於 1 秒。
- 連續兩次呼叫相同文字時，第二次仍會重新播報。
- 關鍵錯誤建議同時提供可見文字，不要只依賴 `alert()` 的語音播報。

#### JavaScript

元件以 ES module 撰寫，載入必須加 `type="module"`。（若因架構需要跨網域載入，伺服器須提供 CORS 標頭，否則會靜默失敗。）路徑請依實際部署位置調整。

{{< code-example content=`<script type="module" src="js/components/live-announcer.js"></script>` >}}

- 無 JS 時：元件靜默、不影響頁面其他內容。
- 極端無法取得元件執行個體的環境，可直接對內部 `[data-live-region="polite"]`／`[data-live-region="assertive"]` 節點寫入 `textContent`（最後手段）。

#### 參考

- [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) - MDN
- [Accessible notifications with ARIA Live Regions (Part 1)](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-1/) - Sara Soueidan
- [Accessible notifications with ARIA Live Regions (Part 2)](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/) - Sara Soueidan
- [Are we live?](https://www.scottohara.me/blog/2022/02/05/are-we-live.html) - Scott O'Hara

{{< asset-script "js/components/live-announcer.js" >}}
{{< asset-script "js/demo/live-announcer.demo.js" >}}
