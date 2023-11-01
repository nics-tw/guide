---
title: 文字樣式
layout: main
maturity: "alpha"
---

### 樣式

{% capture html %}
設定了<strong>粗體</strong>的字。<br>
畫了<u>底線</u>的字。<br>
特殊<mark>標記</mark>字。
{% endcapture %}
{% include example.html content=html %}

#### 注意事項

* 中文不使用斜體字。
* 中英夾雜時務必在中文與英文數字之間加上空格。    
  例如「手續費 30 元」而非「手續費30元」。

### 文字寬度


<div class="w-100 relative flex flex-column gap2 items-start">

<code>.w-paragraph</code>
<span class="db">以基礎的純文字大小，使用 <code>.w-paragraph</code> 限制文字每行最多字數，確保文字易讀性。</span>

</div>

### 大小

<div class="ba br3 w-100 pa4 relative flex flex-column gap2 items-start">

<code>.fs1</code>
<span class="db fs1">文字大小一</span>

<code>.fs2</code>
<span class="db fs2">文字大小二</span>

<code>.fs3</code>
<span class="db fs3">文字大小三</span>

<code>.fs4</code>
<span class="db fs4">文字大小四</span>

<code>.fs5</code>
<span class="db fs5">文字大小五</span>

<code>.fs6</code>
<span class="db fs6">文字大小六</span>

</div>

### 標題

<div class="ba br3 w-100 pa4 relative flex flex-column gap2 items-start">

<code>&lt;h1&gt;</code>
<span class="db heading1">標題一</span>

<code>&lt;h2&gt;</code>
<span class="db heading2">標題二</span>

<code>&lt;h3&gt;</code>
<span class="db heading3">標題三</span>

<code>&lt;h4&gt;</code>
<span class="db heading4">標題四</span>

<code>&lt;h5&gt;</code>
<span class="db heading5">標題五</span>

<code>&lt;h6&gt;</code>
<span class="db heading6">標題六</span>

</div>