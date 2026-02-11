---
layout: main
title: 跳至主要內容區 (Skip-To)
maturity: "alpha"
---

此為符合無障礙規範 A 等級所需要的元件。

### 基礎使用方式

{% capture html %}<skip-to>
  <a href="#main" class="skip-to">跳至主要內容區</a>
</skip-to>{% endcapture %}
<div class="br3 mb4 overflow-hidden">{% include example-html.html content=html %}</div>

{% capture path %}{{ site.url }}{% link _components/skip-to/skip-to.html %}{% endcapture %}
{% include iframe.html src=path %}

#### Custom Element

- 使用 [`<skip-to>`](/assets/js/components/skip-to-element.js)。

#### 漸進增強規則

- 使用 [Document Fragment](https://developer.mozilla.org/en-US:/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#document_fragments) 連結至目的地，確保即使 JavaScript 沒有讀取出來，使用者仍然可以跳至目的地。

### 提供多個彈跳點

{% capture html %}
<skip-to>
  <a href="#main" class="skip-to">跳至主要內容區</a>
  <a href="#navigation" class="skip-to">跳至主要連結表</a>
  <a href="#footer" class="skip-to">跳至頁尾</a>
</skip-to>
{% endcapture %}
<div class="br3 mb4 overflow-hidden">{% include example-html.html content=html %}</div>

{% capture path %}{{ site.url }}{% link _components/skip-to/skip-to-multiple.html %}{% endcapture %}
{% include iframe.html src=path height=360 %}
