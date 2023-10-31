---
layout: main
title: 網頁範本
maturity: "alpha"
---

### 空白範本

{% capture path %}{{ site.baseurl }}{% link _components/boilerplate/blank.html %}{% endcapture %}

使用方式：複製[空白範本]({{ path }})原始碼。

{% include iframe.html src=path height=100 %}

### 單欄位範本

{% capture path %}{{ site.baseurl }}{% link _components/boilerplate/one-column.html %}{% endcapture %}

使用方式：複製[單欄位範本]({{ path }})原始碼。

{% include iframe.html src=path height=600 %}