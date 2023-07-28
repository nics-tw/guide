---
layout: main
title: 表單欄位
iframe_page: ""
---

## 表單欄位

### 簡易欄位

{% include form/field.html %}

#### CSS

- `.fields`：作為全部 `.field` 的容器。
- `.fieldset`：作為單獨表單項目的容器。
- `.field-label`：作為單獨表單項目的 `<label>`。
- `.field-description`：作為單獨表單項目說明文字。
- `.field-input`：作為輸入欄位。

#### 親和力

- 使用 `.field-label`，必要使用 `for` 和 `id` 連結 `<label>` 元件和 `<input>` 元件。
- 若有使用 `.field-description`，必要使用 `aria-describedby` 和 `id` 連結說明元件和 `<input>` 元件。

### 欄位加上頭尾文字

{% include form/field-fixes.html %}

#### CSS

- `.field-input-fixes`：作為輸入欄位 prefix 及 suffix 的容器。
- `.field-input-prefix`：作為 prefix 文字。
- `.field-input-suffix`：作為 suffix 文字。

#### 親和力

- 使用 `.field-input-prefix` 或 `.field-input-suffix` 時，必要使用 `aria-describedby` 和 `id` 連結說明元件和 `<input>` 元件。