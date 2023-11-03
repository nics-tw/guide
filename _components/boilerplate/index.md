---
layout: main
title: 頁面地標架構
maturity: "alpha"
---

### 空白範本

{% capture path %}{{ site.baseurl }}{% link _components/boilerplate/blank.html %}{% endcapture %}

[空白範本]({{ path }})原始碼。

<div class="bg-layer1 overflow-auto f6 ph3 pv3 highlight maxh br3 fs7">
  <pre data-fetch-url="{{ path }}"></pre>
</div>

### 單欄位範本

{% capture path %}{{ site.baseurl }}{% link _components/boilerplate/one-column.html %}{% endcapture %}

[單欄位範本]({{ path }})。

<div class="bg-layer1 overflow-auto f6 ph3 pv3 highlight maxh br3 fs7">
  <pre data-fetch-url="{{ path }}"></pre>
</div>
