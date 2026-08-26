---
title: 時間戳記 (Formatted Date)
maturity: "new"
---

### 自動格式化日期與時間

{{< live-example partial="formatted-date/date-time.html" >}}

將含時區的絕對時間顯示為完整日期、24 小時制時間與時區名稱，例如「台北標準時間」。預設使用繁體中文、西元曆與臺北時區。

#### 使用

{{< code-example content=`<time
  datetime="2026-08-20T06:30:00Z"
  data-formatted-date
  data-calendar="roc"
>
  2026-08-20 06:30 UTC
</time>` >}}

{{< code-example content=`<script type="module" src="js/components/formatted-date.js"></script>` class="mb3" >}}

| 屬性 | <span class="nowrap">必要性</span> | 說明 |
|---|---|---|
| `data-formatted-date` | 必要 | 啟用自動格式化，不需填值 |
| `datetime` | 必要 | 絕對時間，需含 `Z` 或 `±HH:MM` |
| `data-locale` | 選用 | 顯示語系；預設沿用頁面或區塊的 `lang`，沒有則為 `zh-TW` |
| `data-calendar` | 選用 | 可用值為 `gregory`、`roc`；預設 `gregory` |
| `data-time-zone` | 選用 | IANA 時區，預設 `Asia/Taipei` |

請由同一筆時間資料產生 `datetime` 與 `<time>` 內的人可閱讀 UTC 文字，例如 `2026-08-20 06:30 UTC`。JavaScript 未載入或資料無效時，畫面仍會顯示這段文字。

#### 限制

- 腳本執行後才加入頁面的元素不會自動格式化。

#### 親和力

- 使用原生 `<time>`，不需額外設定 role 或 ARIA；元件會依顯示語系設定 `lang`。

#### 參考

- [The time element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element) - WHATWG
- [Intl.DateTimeFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) - MDN

{{< asset-script "js/components/formatted-date.js" >}}
