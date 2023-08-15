---
layout: main
title: 表單欄位
iframe_page: ""
---

## 表單欄位

### 簡易欄位

{% capture html %}{% include form/field.html %}{% endcapture %}
{% include example.html content=html %}

#### CSS

- `.fields`：作為全部 `.fieldset` 的容器。
- `fieldset.fieldset`：作為單獨表單項目的容器。
- `label.field-label`：作為單獨表單項目的 `<label>`。
- `ul.field-description`：作為單獨表單項目說明文字。
- `.field-input`：作為輸入欄位。

#### 親和力

- 使用 `.field-label`，必要使用 `for` 和 `id` 連結 `<label>` 元件和 `<input>` 元件。
- 若有使用 `ul.field-description`，必要使用 `aria-describedby` 和 `id` 連結說明元件和 `<input>` 元件。


### 欄位及驗證錯誤內容

{% capture html %}{% include form/field-error.html %}{% endcapture %}
{% include example.html content=html %}

#### CSS

- `.fieldset-has-error`：作為欄位內容有錯誤的視覺辨識。

#### 親和力

- 在 `ul.field-description` 將錯誤訊息詳細說明，並用「錯誤：」做為開頭區分表單欄位說明。
- 伺服器端的表格內容驗證比瀏覽器端的表格驗證更為重要。因為 HTML 的內建表格驗證存在許多親和力的疑慮（請參考 [Avoid Default Field Validation](https://adrianroselli.com/2019/02/avoid-default-field-validation.html).），建議非必要時，盡量仰賴伺服器端驗證，並正確地保留使用者輸入的內容且顯示錯誤。

### 欄位加上頭尾文字

{% capture html %}{% include form/field-fixes.html %}{% endcapture %}
{% include example.html content=html %}

#### CSS

- `.field-input-fixes`：作為輸入欄位 prefix 及 suffix 的容器。
- `.field-input-prefix`：作為 prefix 文字。
- `.field-input-suffix`：作為 suffix 文字。

#### 親和力

- 使用 `.field-input-prefix` 或 `.field-input-suffix` 時，必要使用 `aria-describedby` 和 `id` 連結說明元件和 `<input>` 元件。

## 參考資料

- 沒有使用 [`aria-errormessage`](https://a11ysupport.io/tech/aria/aria-errormessage_attribute) 因為瀏覽器支援不足。
- 沒有使用 [`aria-invalid`](https://a11ysupport.io/tech/aria/aria-invalid_attribute) 因為元件暫時不支援客戶端驗證。
