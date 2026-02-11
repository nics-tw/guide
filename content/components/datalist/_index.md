---
layout: main
title: 可搜尋選項列表 (Datalist)
maturity: "new"
---

### 說明

- 可搜尋選項列表（Datalist）必須與 `<input>` 搭配在一起使用，在 `<input>` 中要設定 `list` 屬性並對應到 `<datalist>` 的 `id` 屬性。
- 提供可搜尋功能，讓使用者在選項很多的時候，可以快速找到目標選項，如：國家列表；對於開發者來說，不需要寫額外的 JavaScript 就能有可搜尋功能。
- 可搜尋選項列表（Datalist）在瀏覽列表項目(`<option>`)的使用者體驗在手機裝置上，可能較不適用在使用者沒有明確的目標選項（需要瀏覽一下選項才能選擇）的狀況，如：餐點列表。
- 使用可搜尋選項列表（Datalist）前，需要考量一些親和力問題：
  - 無法自定義樣式，可搜尋選項列表（Datalist）的外觀皆由瀏覽器控制，開發者無法輕易修改選項的背景色及字體大小。
  - 呈上，也因此其字體大小不支援瀏覽器的縮放功能。
  - 某些瀏覽器上的可搜尋選項列表（Datalist）對幕報讀軟體支援度不佳。
  - 不同瀏覽器對可搜尋選項列表（Datalist）的實作方式存在差異，特別是在 iOS 和 Android 平台上呈現效果有所不同，製作教學圖文時需要特別留意這些差異。

### 基本樣式

{% capture html %}{% include datalist/index.html %}{% endcapture %}
{% include example.html content=html %}

- 可以分別試試輸入「tw」、「臺灣」看看

### 參考資料

- [`<datalist>` - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist#accessibility)
- [under-engineered-comboboxen](https://adrianroselli.com/2023/06/under-engineered-comboboxen.html#TLDR)
