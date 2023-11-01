---
layout: main
title: 跳至主要內容區
maturity: "alpha"
---

此為符合無障礙規範 A 等級所需要的元件。

{% capture html %}<skip-to><a href="#main" class="skip-to">跳至主要內容區</a></skip-to>{% endcapture %}
<div class="br3 mb4 overflow-hidden">{% include example-html.html content=html %}</div>

{% capture path %}{{ site.baseurl }}{% link _components/skip-to/skip-to.html %}{% endcapture %}
{% include iframe.html src=path height=360 %}
