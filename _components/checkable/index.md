---
layout: main
title: 表單選項
maturity: "alpha"
---

### 單選選項與追加欄位

{% capture html %}{% include checkable/radios-with-extra-elements.html %}{% endcapture %}
{% include example.html 
  content=html
  i18n_selector="[for=v-healthid-input],[for=v-moica-input],[for=v-phone-input]" 
  i18n="English:Health card ID,Digital Certificate,Cell phone"
%}

#### CSS

- `input.chcecked--extra-fields`：加到 `input[type=radio]` 或 `input[type=checkbox]` 後即可在勾選後，顯示後方的 `.fields` 元件。
