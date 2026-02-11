---
title: 前端工程原則
layout: main
text_only: 1
---

<blockquote lang="en">

Engineering has a direct and vital impact on the quality of life <b>for all people</b>. Accordingly, the services provided by engineers require honesty, impartiality, fairness, and equity, and must be dedicated to <b>the protection of the public health, safety, and welfare</b>.

</blockquote>

網頁工程相比於產品工程、建築工程等其他工程領域，還只能算是剛出生的寶寶。工程學的共同點都在於有嚴謹的約束和施工約束。

好比在設計一張椅子時不只有設計師發想、畫圖，之後還要建模、材料研究、材料選擇、材料測試、樣品測試、結構測試等等過程。在做網站的同時，我們也應該要考慮到一樣的步驟。設計的重要就在於它應該是在平衡工程和材料的限制後才作出的最後成品。

以韌性為重，我們應將特別著重於建置網站時所使用的**技術和方法**。

### 技術

當選擇前端網頁技術時，應該在評估上考量以下幾點要素，以重要性排序：

#### 可用性

- 效能：是否可以在最快的速度下完成使用者所想要達成的目的？
- 親和力：是否可以讓使用者在沒有障礙的流程中達成目的？
- 使用者經驗：使否可以在順暢的的方式達成目的？

#### 可維護性

- 程式複雜度：是否可以讓下一個工程團隊輕鬆接手？使用的程式技術通用性高嗎？程式有可能簡化嗎？
- 依賴外部程式：是否有必要依賴外部程式？是否可以輕鬆追蹤並控管外部程式的版本更新？

在決定技術時，原則上以 HTML 出發，建立出最基本的**可用**網站雛形，再加入 CSS、JavaScript，增進網頁的功能。在這之後，再考慮實驗性的 Web API 及其 polyfill。

若要因某些原因**必要**考慮第三方<mark>框架</mark>，照以上原則，在網頁前端部分以 HTML 元件為基底，而非使用第三方<mark>元件庫</mark>。這部分可以參考[漸進增強]({% link _technology/progressive_enhancement/index.md %})及[反面教材]({% link _technology/anti_patterns/index.md %})。

### 規範依據

- [HTML validator](https://validator.w3.org/)
- [Best practices](https://developer.chrome.com/en/docs/lighthouse/best-practices/)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WAI-ARIA standard](https://www.w3.org/TR/wai-aria/)

### 基礎要求

以 [Lighthouse](https://developer.chrome.com/en/docs/lighthouse/) 偵測報告為例，建造政府網站時應在效能部分最低標要求 90 分以上，親和力部分最低標要求 100 分，在最佳規範部分最低標要求 80 分以上。
