---
layout: main
title: 可搜尋選項列表 (Datalist)
maturity: "new"
---

### 說明

- 可搜尋選項列表（Datalist）必須與 `<input>` 搭配在一起使用，在 `<input>` 中要設定 `list` 屬性並對應到 `<datalist>` 的 `id` 屬性。
- 提供可搜尋功能，讓使用者在選項很多的時候，可以快速找到目標選項，如：國家列表；對於開發者來說，不需要寫額外的 JavaScript 就能有可搜尋功能。
- 可搜尋選項列表（Datalist）在瀏覽列表項目(`<option>`)的使用者體驗在手機裝置上不是很好，可能較不適用在使用者沒有明確的目標選項（需要瀏覽一下選項才能選擇）的狀況，如：餐點列表。

### 基本樣式

{% capture html %}{% include datalist/index.html %}{% endcapture %}
{% include example.html content=html %}

- 可以分別試試輸入「tw」、「臺灣」看看
