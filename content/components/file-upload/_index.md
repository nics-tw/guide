---
title: 檔案上傳 (File Upload)
maturity: "new"
---

### 說明

- 檔案上傳（File Upload）讓使用者選擇本機檔案並上傳至系統，支援以「點擊選擇」或「拖曳至上傳區」兩種方式選取檔案。
- 視覺風格方形虛線拖放區搭配 outline 樣式的「選擇檔案」按鈕，並保留 HTML 原生 input 的可及性與功能。

### 預設

{{< live-example partial="file-upload/file-upload_default.html" >}}

### 多檔案上傳

{{< live-example partial="file-upload/file-upload_multiple.html" >}}

### 已選取檔案的呈現

選取後以清單呈現所選檔案，每個項目提供「移除」按鈕。實際應用時需以 JavaScript 監聽 `change` 事件，動態更新清單。

{{< live-example partial="file-upload/file-upload_selected.html" >}}

### 錯誤狀態

{{< live-example partial="file-upload/file-upload_error.html" >}}

#### CSS

- `.file-upload`：拖放區外層容器。
- `.file-upload__input`：原生 `<input type="file">`，以絕對定位覆蓋整個拖放區、視覺透明，但仍是真正的互動元素。
- `.file-upload__dropzone`：拖放區內視覺裝飾內容，以 `aria-hidden="true"` 隱藏避免重複朗讀。
- `.file-upload__button`：仿造按鈕外觀的 `<span>`，僅供視覺呈現。
- `.file-upload__instruction`：拖放說明文字。
- `.file-upload--error`：錯誤狀態，搭配 `.fieldset-has-error` 與 `.field-error` 使用。
- `.file-upload--has-files`：已選擇檔案後的樣式。
- `.file-upload__file-list`/`.file-upload__file`：已選檔案清單與單一項目。
- `.file-upload__file-remove`：移除單一檔案的按鈕。

#### 使用規範

- **必要時才要求上傳**：上傳對使用者而言成本較高，僅在流程確實需要時才使用。
- **明確告知限制**：在 `field-hint` 中清楚列出可接受的檔案類型、單檔大小上限、檔案數量上限。
- **同時支援點擊與拖曳**：拖放區同時支援滑鼠點擊、鍵盤觸發、拖曳放置三種互動方式。
- **多檔案請使用 `multiple`**：在 `<input>` 加上 `multiple` 屬性即可支援；說明文字也應同步更新為複數。
- **限制檔案類型用 `accept`**：例如 `accept=".pdf,.jpg,.png"`；但仍須在伺服器端驗證，因為 `accept` 僅為前端篩選提示。
- **錯誤訊息要明確**：說明錯誤原因與下一步該怎麼做，例如「所選檔案大小超過 10MB，請選擇較小的檔案」。

#### 親和力

- **保留原生 Input**：所有自訂視覺外觀皆建構於原生 `<input>` 之上，並以絕對定位 + `opacity: 0` 覆蓋整個拖放區，使其同時：
  - 接收滑鼠點擊以開啟系統檔案對話框
  - 原生支援拖曳放置
  - 由 `<label>` 提供無障礙名稱，螢幕報讀軟體會朗讀「選擇檔案 按鈕，未選擇任何檔案」
  - 受鍵盤焦點，並由 `:focus-within` 將焦點輪廓延伸至視覺按鈕
- **裝飾內容以 `aria-hidden="true"` 隱藏**：拖放區內的視覺按鈕與「拖曳至此」說明文字，對螢幕報讀軟體而言會與 `<input>` 本身的朗讀重複，因此整個 `.file-upload__dropzone` 加上 `aria-hidden="true"`，避免雙重朗讀。
- **使用 `aria-describedby` 連結提示與錯誤訊息**：說明檔案類型大小限制的提示文字、以及錯誤訊息，皆以 `aria-describedby` 連結至 `<input>`，讓螢幕報讀軟體在朗讀欄位時一併朗讀。
- **錯誤狀態以 `aria-invalid="true"` 標示**：搭配視覺紅色邊框與「錯誤：」前綴文字，避免僅以顏色傳達錯誤狀態。
- **點擊目標 ≥ 2.5rem**：拖放區、按鈕、移除按鈕的點擊目標皆不小於 2.5rem × 2.5rem。
- **明顯的焦點外觀**：以 `:focus-within` 同時提示拖放區與內部視覺按鈕。
- **語音控制（Voice control）友善**：可見的「選擇檔案」文字與 `<label>` 文字一致，使用者可直接以語音指令啟動。
- **已選擇檔案以 `<ul aria-label>` 呈現**：螢幕報讀軟體可朗讀「已選擇的檔案，清單，共 N 項」，並可逐一朗讀檔名與大小。
- **「移除」按鈕補上完整 `aria-label`**：例如「移除檔案：身分證正面.jpg」，避免僅朗讀「移除」造成混淆。
- **漸進增強原則**：自訂行為（檔案清單、客製錯誤訊息、進度顯示）皆建構於原生 `<input type="file">` 之上；即使 JavaScript 失敗，使用者仍能以原生方式選擇與上傳檔案。

### 參考資料

- [デジタル庁デザインシステム - File upload／Drop area](https://design.digital.go.jp/dads/components/file-upload/)
- [GOV.UK Design System - File upload](https://design-system.service.gov.uk/components/file-upload/)
- [U.S. Web Design System - File input](https://designsystem.digital.gov/components/file-input/)
- [MDN - `<input type="file">`](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/input/file)
