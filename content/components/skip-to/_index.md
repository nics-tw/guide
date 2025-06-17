---
title: 跳至主要內容區 (Skip-To)
maturity: "alpha"
---

此為符合無障礙規範 A 等級所需要的元件。

### 基礎使用方式

{{< code-example content=`<skip-to>
  <a href="#main" class="skip-to">跳至主要內容區</a>
</skip-to>` >}}

<iframe src="components/skip-to/skip-to.html" class="w-100 ba br3 mb3" style="height: 150px;" title="跳至主要內容區範例"></iframe>

#### Custom Element

- 使用 [<code class="language-plaintext highlighter-rouge">&lt;skip-to&gt;</code>](/js/components/skip-to-element.js)。

#### 漸進增強規則

- 使用 [Document Fragment](https://developer.mozilla.org/en-US:/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#document_fragments) 連結至目的地，確保即使 JavaScript 沒有讀取出來，使用者仍然可以跳至目的地。

### 提供多個彈跳點

{{< code-example content=`
<skip-to>
  <a href="#main" class="skip-to">跳至主要內容區</a>
  <a href="#navigation" class="skip-to">跳至主要連結表</a>
  <a href="#footer" class="skip-to">跳至頁尾</a>
</skip-to>` >}}

<iframe src="{components/skip-to/skip-to-multiple.html" class="w-100 ba br3 mb3" style="height: 360px;" title="提供多個彈跳點範例"></iframe>

{{< asset-script "js/components/skip-to-element.js" >}}
