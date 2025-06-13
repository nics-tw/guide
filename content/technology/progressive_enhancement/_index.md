---
title: 漸進增強
text_only: 1
---

請參考 [Wikipedia 漸進增強文件](https://zh.wikipedia.org/wiki/漸進增強)及 <span lang="en">[Progressive enhancement is still important](https://jakearchibald.com/2013/progressive-enhancement-still-important/)</span>。

### 開發範例

第一步：使用正確的 HTML 元件寫出最基本且**立即可用**的功能。

<div class="br3 br--bottom overflow-hidden">
  {{< example-html content="<form action=\"/signup\">\n  <fieldset>\n    <label for=\"username\">使用者名稱</label>\n    <input type=\"text\" id=\"username\" autocomplete=\"username\">\n  </fieldset>\n</form>" highlight="form,label,input,action" >}}
</div>

第二步：加上需要的 CSS classes。

<div class="br3 br--bottom overflow-hidden">
  {{< example-html content="<form action=\"/signup\">\n  <div class=\"fields\">\n    <fieldset class=\"fieldset\">\n      <label for=\"username\" class=\"field-label\">使用者名稱</label>\n      <input class=\"field-input\" type=\"text\" id=\"username\" autocomplete=\"username\">\n    </fieldset>\n  </div>\n</form>" highlight="\"fieldset\",\"fields\",\"field-input\",\"field-label\"" >}}
</div>

第三步（若有需求）：選擇性用 selector （範例使用 `[data-auto-check]`）加上想要的 JavaScript 附加功能。

<div class="br3 br--bottom overflow-hidden">
  {{< example-html content="<form action=\"/signup\">\n  <div class=\"fields\">\n    <fieldset class=\"fieldset\">\n      <label for=\"username\" class=\"field-label\">使用者名稱</label>\n      <input data-auto-check class=\"field-input\" type=\"text\" id=\"username\" autocomplete=\"username\">\n    </fieldset>\n  </div>\n</form>\n\n<script>\n  document.querySelector('[data-auto-check]').addEventListener('input', ...)\n</script>" highlight="data-auto-check,script" >}}
</div>

用這樣的開發模式，即可確認在 CSS 或 JavaScript 沒有讀取成功的狀態下，使用者仍然可以操作網站。並在 CSS 或 JavaScript 正常的狀況下，讓使用者用有最佳的體驗。
