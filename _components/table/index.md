---
layout: main
title: 表格 (Table)
maturity: "alpha"
---

### 一般表格

{% capture html %}{% include table/table.html %}{% endcapture %}
{% include example.html content=html %}

#### HTML

- 使用 `<caption>` 傳遞表單內容為何。
- 使用 `<th scope="row/column">` 詳述表格抬頭的格式。

### 左右滑動表格

{% capture html %}{% include table/table-scrollable.html %}{% endcapture %}
{% include example.html content=html %}

#### CSS

- `.scroll-table-wrapper`

### 明顯分線表格

{% capture html %}{% include table/table-cells.html %}{% endcapture %}
{% include example.html content=html %}

#### CSS

- `.table-separator`

### 互動資料表格

{% capture html %}{% include table/table-interactive.html %}{% endcapture %}
{% include example.html content=html %}

#### Custom Element

- 使用 [`<interactive-table>`](/assets/js/components/interactive-table-element.js)。
- 可提供 `<th scope="col" data-filterable>` 作為可篩選的欄位，或將 `data-filterable` 加註於 `<table>` 上，即會篩選所有欄位。
- 可提供 `<th scope="col" data-sortable>` 作為可排序的欄位。`data-sortable` 可接受值為 `date`（使用 `new Date()` 編譯）或 `numeric`（使用 `Number()` 編譯）。預設為純文字。
- 可提供 `<interactive-table sortable-label="升降冪">` 作為排序按鈕的報讀名稱。預設為「排序」。
- 可提供 `<interactive-table filterable-label="搜尋">` 作為排序按鈕的報讀名稱。預設為「篩選」。

#### 注意事項

- 如果表單資料有分頁顯示、或是數量龐大，建議使用伺服器直接透過資料庫抓出排序、篩選後的資料，而非使用此元件。

#### 親和力

- 語音識別系統（Dragon NaturallySpeaking, MacOS/iOS Voice Control）

<script src="/assets/js/components/interactive-table-element.js" type="module">
