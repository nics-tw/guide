---
layout: main
title: 開發網站無障礙模板
maturity: "new"
---

### Read This First
{% capture warning %}{% include demo-page/warning-block.html %}{% endcapture %}
{{ warning }}

開發網站無障礙模板與釐清現行檢測工具之無障礙國際標準及技術分析。本項工作將彙整相關的技術規範和標準，提供統一的參考依據，與工具推動無障礙網路空間的發展與使用，提供政府機關、開發人員及內容提供者可遵循一致的參考依據。

### 首頁範本

{% capture path %}{{ site.url }}{% link _accessibility/demo-page/landing-page.html %}{% endcapture %}

[首頁範本]({{path}})原始碼。

<div class="bg-layer1 overflow-auto f6 ph3 pv3 highlight maxh br3 fs7">
  <pre data-fetch-url="{{path}}"></pre>
</div>

### 意見回饋頁範本

此頁面範本為常見的表單填寫、業務申辦等類型的數位服務情境，在操作目的較單純的情境應可簡化為單一頁面或單一操作元件。為確保範本足以因應複雜情境，並展示多項共用元件應用，且避免 [SC 3.3.4 Error Prevention (Legal, Financial, Data)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html) 使用障礙，故範本設計中融入了填寫資料前的同意宣告，以及填寫資料後、送出資料前的最終確認。

{% capture path %}{{ site.url }}{% link _accessibility/demo-page/form-page-s1.html %}{% endcapture %}

[意見回饋頁範本]({{path}})原始碼。

<div class="bg-layer1 overflow-auto f6 ph3 pv3 highlight maxh br3 fs7">
  <pre data-fetch-url="{{path}}"></pre>
</div>

#### 設計元件引用

意見回饋、申辦業務這類有步驟、順序的流程，通常需要呈現完整的流程資訊，讓使瀏覽者可以了解目前所處的流程點，以及尚有多少步驟才能夠達成目的。

[麵包屑（Breadcrumb）](https://guide.nics.nat.gov.tw/components/breadcrumb/index.html)  
本元件設計時，即考量到呈現導覽列結構資訊，透過報讀軟體瀏覽會報讀「麵包屑  導覽區 地標  清單  有 4 項  Step 1.同意聲明  到訪過  連結    Step 2.填寫資料  到訪過  連結    目前頁  Step 3.最終確認  Step 4.送出結果」，可以應用於此類情境。

[按鈕及連結 (Button and Link)](https://guide.nics.nat.gov.tw/components/button-and-link/index.html)  
根據不同操作目的，調整 `button` 的 `type`, `formaction`, `formmethod` 等屬性值，例如：使用 `type="reset"` 實作清除輸入內容目的；使用 `formaction=URL formmethod="get"` 實作回到上一步目的。儘可能應用 HTML 原生的機制實現不同操作目的。

[頁面地標架構 (Landmark)](https://guide.nics.nat.gov.tw/components/landmark/index.html)  
使用地標架構確保透過輔助科技瀏覽，可以清楚掌握頁面結構，並受益於輔助科技的快捷鍵操作功能，參考 [WAI APG landmarks pattern](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/)。

[跳至主要內容區 (Skip-To)](https://guide.nics.nat.gov.tw/components/skip-to/index.html)  
使用 Skip-to 元件，避免 [SC 2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks) 相關使用障礙。  

[警告文字 (Warning Text)](https://guide.nics.nat.gov.tw/components/warning-text/index.html)  
使用警告文字呈現「個人資料蒐集、處理、利用同意書」等類具法律效果內容，樣式有助於在視覺上一般內文文字區隔，並達到引導視線效果。

[表格（Table）](https://guide.nics.nat.gov.tw/components/table/index.html)  
應用於表單輸入內容最終確認步驟，便於使用者對前一步輸入的資訊二次確認，並支援輔助科技瀏覽操作，參考 [UK.gov Smart Answer 範例](https://www.gov.uk/additional-commodity-code)。

#### 元件客製化調整

##### HTML  
<div class="warning-text">
  <p>
    ！注意：元件 HTML 調整應符合 <a href="https://html.spec.whatwg.org/multipage/">HTML Standard</a> 與原則設計的 class 階層，確保未引入使用障礙、設計制度樣式能正確套用。
  </p>
</div>

針對本案例應用情境，微調元件的結構，例如：流程點之間具有順序性，所以未完成步驟1則無法操作後續步驟，故目前頁面之後的步驟調整為不可操作的 `span` 元素。  
引用[特殊標記文字](https://guide.nics.nat.gov.tw/visual/typography/index.html)及粗體文字樣式標示目前頁面，避免單純使用單一種感知元素（如形狀、顏色、大小、視覺位置、方向或聲音等）標示，產生 [SC 1.3.3 Sensory Characteristics](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html) 相關使用障礙。  

本設計原則文件使用 Jekyll 框架，若使用相同技術架構開發網站，可以透過 Liquid 模板語法的迴圈快速應用 [breadcrumb](https://guide.nics.nat.gov.tw/components/breadcrumb/index.html) 元件，產生步驟導覽列。  
透過 include 同步宣告 `path` 用來設定步驟或流程點名稱，`current` 用來設定目前頁面。
<div class="bg-layer1 overflow-auto f6 ph3 pv3 highlight maxh br3 fs7">
  {% raw %}
    <!-- Liquid templating syntax in Jekyll -->
      {% include  demo-page/breadcrumb-step.html
        path="Step 1.同意聲明;Step 2.填寫資料;Step 3.最終確認;Step 4.送出結果"
        current=2
      %}
  {% endraw %}
</div>
`path` 格式為使用分號(;)分隔的字串，用 `split` filter 分隔後，可透過迴圈設定步驟或流程點名稱。
<div class="bg-layer1 overflow-auto f6 ph3 pv3 highlight maxh br3 fs7">
  {% raw %}
    <!-- Liquid templating syntax in Jekyll -->
        {% assign pages = include.path | split: ';' %}
    {% endraw %}
</div>
透過邏輯判斷 `current` 與 `forloop.index` 數值大小關係，可區分 3 種樣式（含目前頁、可操作的先前步驟、不可操作的後續步驟）。
<div class="bg-layer1 overflow-auto f6 ph3 pv3 highlight maxh br3 fs7">
  {% raw %}
    <!-- Liquid templating syntax in Jekyll -->
     {% for p in pages %}  
        {% if include.current >= forloop.index  %}  
          {% if include.current == forloop.index  %}  
            <mark>{{ p }}</mark>
          {% else %}  
            <a href="./">{{ p }}</a>
          {% endif %}  
        {% else %}  
          <span>{{ p }}</span>
        {% endif %}  
      {% endfor %}  
  {% endraw %}
</div>

##### Server side  
- 流程點或步驟之間相依性、邏輯控制
- 表單輸入內容格式驗證
- 自動化程式防護

##### Client Side
<div class="warning-text">
  <p>
    ！注意：引入越多增強功能，容易對數位服務韌性產生影響，應注意符合漸進式增強原則。
  </p>
</div>

- 跨頁狀態保存
- Optional: add semantic feature
- Optional: add keyboard feature

##### CSS
<div class="warning-text">
  <p>
    ！注意：使用客製化樣式應符合整體設計制度，並確保樣式可維護性、便於系統性調整，避免產生已知的使用障礙。
  </p>
</div>

- 根據機關設計制度調整 CSS 色彩變數值，例如：調整 `--primaryColor` 為機關主視覺色彩。
- Optional: customize style

#### 漸進式增強原則考量

從漸進式增強原則觀點，本案例做了以下技術選擇：
- 採用靜態生成架構。
- 每個流程點獨立一個分頁，而非採取單一頁面依賴 JavaScript 動態生成內容。
- 全網站導覽列直接可見，沒有用任何方式摺疊或需要透過按鈕展開。
- 表單輸入內容透過 HTTP 協定方式提交。
- 適當使用 WAI-ARIA 轉傳語意資訊給輔助科技，並參考[技術論壇建議](https://www.tpgi.com/required-attribute-requirements/#comment-1094)。

#### Accessible features

語音報讀軟體（[NVDA](https://www.nvaccess.org/) + Edge 輔助科技與瀏覽器組合為例）
- 使用快捷鍵 `NVDA + F7` 列出頁面地標清單
- 使用快捷鍵 `d`, `Shift + d` 快速在頁面地標之間移動
- 使用快捷鍵 `i`, `Shift + i` 快速在流程點之間移動
- 使用快捷鍵 `f`, `Shift + f` 快速在輸入欄位之間移動
- 進到麵包屑導覽區地標時，報讀以下資訊：
    - 流程點或步驟總數，例如「清單 有 4 項」
    - 目前所處的流程點或步驟，例如「Step 2.填寫資料  到訪過  連結    目前頁」
    - 後續流程點或步驟名稱，但不可以操作，例如「Step 3.最終確認」

鍵盤瀏覽
- 使用 `Tab` 在流程點與輸入欄位元素之間移動
- 使用 `Enter`, `Space` 在聚焦到按鈕時可以觸發動作

#### Testing tools
- [HTML validator](https://validator.nu/)
- [Lighthouse (12.0.0)](https://developer.chrome.com/docs/lighthouse/overview)
- [Freego (Apr 15 2024)](https://accessibility.moda.gov.tw/Download/Detail/2763?Category=70)
