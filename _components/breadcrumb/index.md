---
layout: main
title: 麵包屑 (Breadcrumb)
maturity: "new"
---

### 說明

麵包屑（Breadcrumb）導航幫助使用者理解網站的多個層級並可在其之間移動，也有顯示使用者在目前網站中位置的作用。
麵包屑元件不適合套用在扁平結構的網站。

### 斜線分隔

{% capture html %}{% include breadcrumb/slash-separator.html %}{% endcapture %}
{% include example.html
  content=html
%}

### 箭頭分隔

{% capture html %}{% include breadcrumb/arrow-separator.html %}{% endcapture %}
{% include example.html
  content=html
%}

#### CSS

- `.arrow-separator`：頁面的分隔改用 V 型符號表示，預設為斜線。

#### 無障礙說明

- 使用 [nav](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html) 元素，讓麵包屑成為頁面地標架構，進而可以被更簡單的被定位。
- 使用 aria-label 屬性，填寫的「文字內容」作為麵包屑的標題，在瀏覽器中不可見的，但螢幕報讀器會朗讀。
- 針對目前所在連結（通常是麵包屑的最後一個項目），要加上 aria-current 屬性作為標示，值是 page，但如果當前所在位置只是「文字」，並非超連結的話，那麼這個屬性是選擇性。
- 避免螢幕報讀器閱讀出，僅作為視覺上的分隔用途的斜線或箭頭符號，將他們以 CSS 方式渲染。

### 參考資料

- [WAI-ARIA Patterns - Breadcrumb Example](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/examples/breadcrumb/)
- [GOV.UK Design System Components - Breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/#wcag-interact-breadcrumbs)
- [實作無障礙網頁功能：麵包屑 Breadcrumb](https://ithelp.ithome.com.tw/articles/10222429)
