---
title: 共用元件
layout: main
text_only: 1
---

### 目標

本文件所規劃之系統元件係以具備相容性、符合網頁標準之目標進行設計規劃，並最大化地使用網頁標準中所提供的元件加以優化，可供各機關及資通系統承包商直接採用及參考，減少對第三方元件及複雜前端開發框架的依賴，增加系統韌性、相容性及親和力。系統元件將會使用網頁標準元件作為根本基礎，因此即使各機關、廠商仍須使用前端開發框架，也不會有不相容的問題。

### CSS 元件使用方式

可直接[下載](/assets/css.zip)，並使用下方程式碼匯入：

{% capture html %}<link rel="stylesheet" href="../main.css">{% endcapture %}
{% include example-html.html content=html %}

請避免一切對原始碼的改動。使用設計系統的目的就在於一致性。若需要特殊的顯示方式，請另行撰寫 CSS，以免造成日後版本升級困難。

<div class="warning-text">
  <p>
    本檔案暫時包含 <a href="https://tachyons.io/">Tachyons</a>，作為 Atomic CSS 的第三方程式。
  </p>
</div>

#### 多國語系支援

請依照[多國語系支援]({% link _visual/internationalization/index.md %})另外包含所需要的字體 CSS 檔案。

### JavaScript 元件使用方式

#### [文字輸入區塊]({% link _components/textarea/index.md %})

下載 [character-count.js](/assets/js/components/character-count.js) 檔案並選擇性使用下方程式碼匯入：

{% capture html %}<script src="../character-count.js" defer>{% endcapture %}
{% include example-html.html content=html %}

#### [公文元件]({% link _components/official-document/index.md %})

下載 [official-document-element.js](/assets/js/components/official-document-element.js) 檔案並選擇性使用下方程式碼匯入：

{% capture html %}<script src="../official-document-element.js" type="module">{% endcapture %}
{% include example-html.html content=html %}

#### [互動資料表格]({% link _components/table/index.md %})

下載 [interactive-table-element.js](/assets/components/interactive-table-element.js) 檔案並選擇性使用下方程式碼匯入：

{% capture html %}<script src="../interactive-table-element.js" type="module">{% endcapture %}
{% include example-html.html content=html %}


#### [互動資料表格]({% link _components/skip-to/index.md %})

下載 [skip-to-element.js](/assets/components/skip-to-element.js) 檔案並選擇性使用下方程式碼匯入：

{% capture html %}<script src="../skip-to-element.js" type="module">{% endcapture %}
{% include example-html.html content=html %}
