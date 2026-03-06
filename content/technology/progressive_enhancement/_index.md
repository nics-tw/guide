---
title: 漸進增強
---

請參考 [Wikipedia 漸進增強文件](https://zh.wikipedia.org/wiki/漸進增強)及 <span lang="en">[Progressive enhancement is still important](https://jakearchibald.com/2013/progressive-enhancement-still-important/)</span>。

### 開發範例

第一步：使用正確的 HTML 元件寫出最基本且**立即可用**的功能。

<!--prettier-ignore-start-->
{{< code-example
content=`<form action="/signup">
  <fieldset>
    <label for="username">使用者名稱</label>
    <input type="text" id="username" autocomplete="username">
  </fieldset>
</form>` 
  highlight="form,label,input,action"
>}}

第二步：加上需要的 CSS classes。

{{< code-example
content=`<form action="/signup">
  <div class="fields">
    <fieldset class="fieldset">
      <label for="username" class="field-label">使用者名稱</label>
      <input class="field-input" type="text" id="username" autocomplete="username">
    </fieldset>
  </div>
</form>`
  highlight="\"fieldset\",\"fields\",\"field-input\",\"field-label\""
>}}

第三步（若有需求）：選擇性用 selector （範例使用 `[data-auto-check]`）加上想要的 JavaScript 附加功能。

{{< code-example
content=`<form action="/signup">
  <div class="fields">
    <fieldset class="fieldset">
      <label for="username" class="field-label">使用者名稱</label>
      <input data-auto-check class="field-input" type="text" id="username" autocomplete="username">
    </fieldset>
  </div>
</form>

<script>
  document.querySelector('[data-auto-check]').addEventListener('input', ...)
</script>`
  highlight="data-auto-check,script"
>}}
<!--prettier-ignore-end-->

用這樣的開發模式，即可確認在 CSS 或 JavaScript 沒有讀取成功的狀態下，使用者仍然可以操作網站。並在 CSS 或 JavaScript 正常的狀況下，讓使用者用有最佳的體驗。
