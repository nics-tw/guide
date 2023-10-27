---
layout: main
title: 單選選項
maturity: "alpha"
---

### 單選選項（橫式）

{% capture html %}{% include radio/radios-h.html %}{% endcapture %}
{% include example.html 
  content=html
  i18n_selector="[for=city],[for=id],[for=name],[for=desc],[for=items]" 
  i18n="English:City of residence,ID type,Full name,Description,Applications"
%}

### 單選選項（直式）

{% capture html %}{% include radio/radios-v.html %}{% endcapture %}
{% include example.html 
  content=html
  i18n_selector="[for=city],[for=id],[for=name],[for=desc],[for=items]" 
  i18n="English:City of residence,ID type,Full name,Description,Applications"
%}

### 單選選項與追加欄位

{% capture html %}{% include radio/radios-with-extra-elements.html %}{% endcapture %}
{% include example.html 
  content=html
  i18n_selector="[for=city],[for=id],[for=name],[for=desc],[for=items]" 
  i18n="English:City of residence,ID type,Full name,Description,Applications"
%}
