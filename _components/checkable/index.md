---
layout: main
title: 表單選項
maturity: "alpha"
---

### 選項（橫式）

{% capture html %}{% include checkable/checkable-h.html %}{% endcapture %}
{% include example.html 
  content=html
  i18n_selector="[for=h-healthid],[for=h-moica],[for=h-phone]" 
  i18n="English:Health card ID,Digital Certificate,Cell phone"
%}

### 選項（直式）

{% capture html %}{% include checkable/checkable-v.html %}{% endcapture %}
{% include example.html 
  content=html
  i18n_selector="[for=v-healthid],[for=v-moica],[for=v-phone]" 
  i18n="English:Health card ID,Digital Certificate,Cell phone"
%}

### 單選選項與追加欄位

{% capture html %}{% include checkable/radios-with-extra-elements.html %}{% endcapture %}
{% include example.html 
  content=html
  i18n_selector="[for=v-healthid-input],[for=v-moica-input],[for=v-phone-input]" 
  i18n="English:Health card ID,Digital Certificate,Cell phone"
%}
