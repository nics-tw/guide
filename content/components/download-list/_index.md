---
title: 檔案下載清單 (Download List)
maturity: "new"
---

### 基本範例

{{< live-example partial="download-list/basic.html" >}}

- 檔案標題、格式與容量屬於同一個連結；格式與容量顯示在標題下一行。
- 無法下載的項目使用一般文字，不建立停用連結。

#### 使用方式

- 連結可能直接開啟或下載檔案，實際行為取決於瀏覽器、回應標頭與使用者設定。

#### CSS

- `.download-list`／`.download-list__item`：清單與項目。
- `.download-list__link`／`.download-list__title`：可用連結與不可用項目的標題。
- `.download-list__meta`／`.download-list__item--unavailable`：檔案資訊與不可用狀態。

#### 親和力

- 使用原生清單與連結，不加入額外 role 或自訂鍵盤操作；檔案標題應能單獨辨識。
- 將格式與容量放在同一個可見連結中，讓使用者只瀏覽連結時也能辨識檔案類型與大小。

#### 參考

- [Downloading resources](https://html.spec.whatwg.org/multipage/links.html#downloading-resources) - WHATWG
- [Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) - W3C
- [Attachment](https://components.publishing.service.gov.uk/component-guide/attachment) - GOV.UK Publishing Components
- [Disabling a link](https://www.scottohara.me/blog/2021/05/28/disabled-links.html) - Scott O’Hara
