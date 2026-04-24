---
title: 搜尋回饋 (Search Feedback)
maturity: "new"
---

搜尋回饋元件提供搜尋狀態的無障礙通知，讓螢幕閱讀器使用者在搜尋過程中能即時得知「搜尋中」、「找到 N 筆結果」、「無結果」或「錯誤」等狀態變化。

元件提供兩種示範：

- **提交搜尋** — 送出表單、等待伺服器回應後顯示結果。
- **即時篩選** — 輸入文字時即時過濾頁面上的既有清單。

### 提交搜尋

搜尋完成後，焦點移至結果標題（`data-results-heading`），引導使用者前往結果區域。

{{< live-example partial="search-feedback/submit-demo.html" source="search-feedback/submit.html" >}}

### 即時篩選

每次按鍵觸發篩選，搭配 300ms debounce 避免過於頻繁播報。使用中文輸入法（注音、拼音）時，組字期間不觸發篩選，待選字確定後才執行。

{{< live-example partial="search-feedback/live-filter-demo.html" source="search-feedback/live-filter.html" >}}


#### CSS

- `.search-feedback__status`：狀態容器，需在初始 HTML 就存在，初始內容為空。
- `.search-feedback__status--loading` / `--found` / `--not-found` / `--error`：各狀態 modifier class，由 JS 自動管理。

#### 親和力

- 狀態容器使用 `role="status"`（隱含 `aria-live="polite"`），搜尋結果變動時自動播報。
- 無結果與錯誤使用 `role="alert"`（隱含 `aria-live="assertive"`），立即通知使用者。
- 宣告文字使用 `textContent` 插入（含關鍵字時避免 XSS），不使用 `innerHTML`。

#### JavaScript

使用 [`search-feedback.js`]({{< relURL "js/components/search-feedback.js" >}})，提供以下函式：

- **`updateStatus(statusEl, state, message)`** — 更新 `role="status"` 容器。`state` 可為 `'loading'`、`'found'`、`'not-found'`、`'error'` 或 `''`（清空）。內部以 100ms 延遲重設文字，確保螢幕閱讀器重複播報相同訊息。
- **`updateAlert(alertEl, state, message)`** — 更新 `role="alert"` 容器，用於無結果或錯誤等需立即通知的狀態。`state` 可為 `'not-found'`、`'error'` 或 `''`。
- **`debounce(fn, delay)`** — 延遲執行函式，避免即時篩選時每次按鍵都觸發播報。

#### 參考

- [Accessible Notifications with ARIA Live Regions](https://www.scottohara.me/blog/2022/02/05/are-we-live.html) - Scott O'Hara
- [ARIA22: Using role=status to present status messages](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22) - W3C

{{< asset-script "js/components/search-feedback.js" >}}
{{< asset-script "js/demo/search-feedback.demo.js" >}}
