---
layout: main
title: 跳至主要內容區 (Skip-To)
maturity: "alpha"
---

此為符合無障礙規範 A 等級所需要的元件。

### 基礎使用方式

{{ $html1 := \`<skip-to>
  <a href="#main" class="skip-to">跳至主要內容區</a>
</skip-to>\` }}

<div class="br3 mb4 overflow-hidden">{{< example-html content=$html1 >}}</div>

<iframe src="{{< get_permalink "components/skip-to/skip-to.html" >}}" class="w-100 ba br3 mb3" style="height: 150px;" title="跳至主要內容區範例"></iframe>

#### Custom Element

- 使用 [<code><skip-to></code>]({{ "js/components/skip-to-element.js" | relURL }})。

#### 漸進增強規則

- 使用 [Document Fragment](https://developer.mozilla.org/en-US:/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#document_fragments) 連結至目的地，確保即使 JavaScript 沒有讀取出來，使用者仍然可以跳至目的地。

### 提供多個彈跳點

{{ $html2 := \`
<skip-to>
  <a href="#main" class="skip-to">跳至主要內容區</a>
  <a href="#navigation" class="skip-to">跳至主要連結表</a>
  <a href="#footer" class="skip-to">跳至頁尾</a>
</skip-to>\` }}

<div class="br3 mb4 overflow-hidden">{{< example-html content=$html2 >}}</div>

<iframe src="{{< get_permalink "components/skip-to/skip-to-multiple.html" >}}" class="w-100 ba br3 mb3" style="height: 360px;" title="提供多個彈跳點範例"></iframe>
