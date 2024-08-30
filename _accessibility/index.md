---
layout: main
title: 開發網站無障礙模板與檢測工具導入文件
text_only: 1
---

為保有啟發性，「無障礙」雖為常見用詞，此份文件 accessibility, accessible 二詞將根據不同語境、詞態使用不同譯法。「親和力」涵蓋範圍遠多於「無障礙」，並非僅服務特定族群順利瀏覽網頁取得資訊，且親和力是可以不斷努力提升且沒有終點的。例如，基於追求親和力，使用 accessibility statement 作為宣示之外，也有助於提升親和力、吸引使用者親近數位服務，故有意識地譯為「親和力宣告」；涉及數位服務可及性，則依詞態使用「可及性」或「可及無礙」；「無障礙」則多半用於法規或各式規範脈絡下。

選擇首頁與意見回饋頁面，優先實作頁面範例。主要考量頁面功能性、展示現有共用元件如何應。
首頁、意見回饋頁面皆為服務進入點，而意見回饋頁面又可以展示表單欄位元件，這類元件常見於意見回饋、反映問題的管道。

首頁將使用到 [landmark](https://guide.nics.nat.gov.tw/components/landmark/index.html), [breadcrumb](https://guide.nics.nat.gov.tw/components/breadcrumb/index.html), [button and link](http://localhost:4000/components/button-and-link/index.html), [skip-to](http://localhost:4000/components/skip-to/index.html) 等共用元件。  

意見回饋頁面，將使用到 [landmark](https://guide.nics.nat.gov.tw/components/landmark/index.html), [breadcrumb](https://guide.nics.nat.gov.tw/components/breadcrumb/index.html), [button and link](http://localhost:4000/components/button-and-link/index.html), [form](https://guide.nics.nat.gov.tw/components/form/index.html), [checkable](https://guide.nics.nat.gov.tw/components/checkable/index.html), #NEW! [password-input](https://guide.nics.nat.gov.tw/components/password-input/index.html), [textarea](http://localhost:4000/components/textarea/index.html), [skip-to](http://localhost:4000/components/skip-to/index.html) 等共用元件。

### WAI-ARIA
針對 WAI-ARIA 技術依賴 javascript，從漸進式觀點處理方式可能是：
- server-side 先設 data-* attribute
- onload 改動為 aria-*
- [required-attribute-requirements](https://www.tpgi.com/required-attribute-requirements/#comment-1094)  
    作者：Scott O'Hara

{% capture html %}
<fieldset class="fieldset">
  <label for="name" class="field-label">姓名</label>
  <input type="text" id="name" autocomplete="name" class="field-input" data-required="true">
</fieldset>
{% endcapture %}
<div class="br3 mb4 overflow-hidden">{% include example-html.html content=html %}</div>

{% capture js %}<script>
  window.onload = function() {
    document.querySelectorAll('[data-required="true"]').forEach(function(input) {
      input.setAttribute('aria-required', 'true');
    });
  };
</script>
{% endcapture %}
<div class="br3 mb4 overflow-hidden">{% include example-html.html content=js %}</div>

### 說明頁面

{% capture path_demo_page %}{{ site.url }}{% link _accessibility/demo-page/index.md %}{% endcapture %}
[開發網站無障礙模板]({{ path_demo_page }})

{% capture path_a11y_tools %}{{ site.url }}{% link _accessibility/a11y_tools/index.md %}{% endcapture %}
[檢測工具導入文件]({{ path_a11y_tools }})

#### 延伸參考資料
- [雜談網頁親和力（一）淺談網頁親和力方針](https://ossf.denny.one/foss-forum/802.html)  
  作者：林克寰
- [web accessibility in your organisation](https://www.nldigitalgovernment.nl/document/web-accessibility-in-your-organisation/)  
  作者：DigiToegankelijk