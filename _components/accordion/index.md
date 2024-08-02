---
layout: main
title: 折疊選單 (Accordion)
maturity: "new"
---

### 常見基本折疊選單

- 預設一次僅可展開一個選單，點擊其他選單會自動關閉先前選單

{% capture html %}{% include accordion/accordion_single.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.accordion`：作為全部`.accordion-item`的容器。
- `.accordion-item`：作為單獨折疊選單的容器。
- `label`：作為單獨折疊選單的 `<label>`。
- `.accordion-body`：作為單獨折疊選單的內容。

### 長開折疊選單

- 展開選單需再次點擊關閉，使折疊選單在開啟另一個選單時保持開啟狀態。

{% capture html %}{% include accordion/accordion_multiple.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.accordion`：作為全部`.accordion-item`的容器。
- `.accordion-item`：作為單獨折疊選單的容器。
- `label`：作為單獨折疊選單的 `<label>`。
- `.accordion-body`：作為單獨折疊選單的內容。
- `data-behavior="multiple"`：作為設定是否可以常開選單的屬性。
- `.btn-toggle`：作為一鍵開合所有選單的元件(請設定於可點擊元件中 Ex: `<button>`)。

### 副標題(摘要)折疊選單

- 可在標題欄新增副標題(摘要)→請注意僅在實際需要時添加摘要行，避免按鈕文字太長。

{% capture html %}{% include accordion/accordion_subTitle.html %}{% endcapture %}
{% 
  include example.html content=html
%}
 
#### CSS

- `.accordion`：作為全部`.accordion-item`的容器。
- `.accordion-item`：作為單獨折疊選單的容器。
- `label`：作為單獨折疊選單的 `<label>`。
- `.accordion-body`：作為單獨折疊選單的內容。
- `.main-title`：作為主標題的內容。
- `.sub-title`：作為副標題的內容。

#### 建議使用時機

Accordion元件讓使用者在頁面上顯示與隱藏相關內容的部分。以下是適合使用 Accordion 的情況：

- 當需要查看多個相關部分的概述時。
    > 當使用者需要快速查看多個相關內容的概覽時，折疊選單能幫助使用者選擇性地展示與隱藏相關部分。
- 當使用者需要決定部分顯示與部分隱藏時。
    > 當使用者需要根據需求選擇性地顯示與隱藏部分內容時，折疊選單能提供更好的靈活性。
- 當使用者需要查看可能位於不同頁面上的資訊時。
    > 當使用者需要在本應位於不同頁面的資訊之間進行對比時，折疊選單可以幫助將相關資訊集中在一個頁面上。
- 經常使用的服務
    > 對於經常使用某些服務的使用者，例如處理案件的系統，使用者需要快速完成熟悉的任務時，折疊選單能提供更高效的操作體驗。

#### 不建議使用時機

Accordion元件會向使用者隱藏內容。因非所有使用者都會注意到它們或了解它們的工作原理。因此，開發者應該僅在特定情況下使用它們，切勿將Accordion用於所有使用者都需要查看的內容。如果你的使用者可能需要以下操作，請避免使用Accordion：

- 按順序閱讀所有內容，例如，理解逐步流程。
    > 當內容需要使用者按順序閱讀，例如步驟指南，折疊選單會使過程變得複雜，不利於使用者理解。
- 當 Accordion 包含的總內容量會使頁面載入緩慢時，請不要使用 Accordion 元件。
    > 如果折疊選單內包含大量內容，會使頁面載入速度變慢，影響整體性能。
- 巢狀使用折疊選單
    > 折疊選單內不應再包含折疊選單，這會使內容難以查找，降低使用者體驗。

---

#### 在頁籤 (Tabs) 與 折疊選單 (Accordion) 之間進行選擇

頁籤與折疊選單都會隱藏部分內容。開發者應根據使用情境挑選合適的元件。

* 考量因素
    - 如果使用者不需要同時查看多個部分，優先考慮使用頁籤 (Tabs)。
    - 如果使用者需要在部分之間快速切換，頁籤 (Tabs) 可以顯示內容而不會將其他部分推下頁面，這與折疊選單 (Accordion) 不同。
    - 如果有很多內容，頁籤 (Tabs) 可以容納較少的部分，因為它們是水平排列的，而折疊選單 (Accordion) 是垂直排列的。

* 總結
    - 使用 Tabs：當使用者不需要同時查看多個部分且需要快速切換時。
    - 使用 Accordion：當有較多部分且需要垂直排列時。

依據以上指南選擇適合的元件，有助於提升使用者體驗與頁面載入性能。
