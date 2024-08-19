---
layout: main
title: 頁首 (Header)
maturity: "alpha"
---

### 基本頁首

{% capture html %}{% include header/header.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.header`：作為整個 header 的容器。
- `.header__top`：作為 header 的頂部部分。
- `.header__divider`：分隔 header 的部分。
- `.header__bottom`：作為 header 的底部部分。
- `.header__logo`：作為 header 中 logo 的容器。
- `.header__logotype`：定義 logo 的樣式。

#### 建議使用時機

- 當需要展示網站的標誌和主要導覽連結時。
    > 當使用者需要快速訪問網站主要部分時，純 Logo Header 能幫助使用者迅速導覽。
- 當需要簡潔、直觀的導覽體驗時。
    > 純 Logo Header 提供了簡單而清晰的導覽，不會對使用者造成干擾。

#### 不建議使用時機

- 當需要更多的導覽選項和功能時。
    > 如果網站需要提供多個導覽選項和功能，純 Logo Header 可能無法滿足需求。

---

### 頁首附帶單連結

{% capture html %}{% include header/header_link.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.header__menu-button`：定義 menu 按鈕的樣式。
- `.header__content`：作為 header 中可選內容的容器。
- `.header__additional-links`：在移動視圖中顯示的額外連結。

#### 建議使用時機

- 當需要在桌面和移動設備上提供一致的導覽體驗時。
    > 單連結 Header 能夠在桌面和移動設備上提供一致的導覽體驗，適合不同設備的使用。
- 當需要提供多個導覽選項並且能夠在移動設備上顯示壓縮的導覽選單時。
    > 當使用者在移動設備上訪問網站時，Header 能自適應顯示壓縮的導覽選單。

#### 不建議使用時機

- 當網站內容非常簡單且不需要多個導覽選項時。
    > 如果網站內容簡單，單連結 Header 可能顯得過於複雜。
- 當需要展示大量的導覽選項和功能時。
    > 如果需要展示大量導覽選項和功能，單連結 Header 可能無法滿足需求。

---

### 頁首附帶階層式連結

{% capture html %}{% include header/header_linklevel.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.dropdown`：定義下拉選單的容器。
- `.header__navigation`：作為導覽列表的樣式。
- `.header__navigation-list`：定義導覽項目的列表樣式。
- `.header__navigation-item`：定義單個導覽項目的樣式。

#### 建議使用時機

- 當需要提供多層次的導覽選項時。
    > 階層式連結 Header 能夠提供多層次的導覽選項，適合內容豐富的網站。
- 當需要展示大量的導覽項目並且希望它們以層次結構顯示時。
    > 當使用者需要在不同層次的導覽項目之間快速切換時，階層式連結 Header 能夠提供便捷的操作。

#### 不建議使用時機

- 當網站內容簡單且不需要多層次導覽時。
    > 如果網站內容簡單，階層式連結 Header 可能顯得過於複雜。
- 當使用者主要在移動設備上訪問網站且需要簡化的導覽時。
    > 如果使用者主要在移動設備上訪問網站，階層式連結 Header 可能顯得過於複雜，不適合移動設備的操作。

---

### JavaScript

- 使用 [`header.js`](/assets/components/header.js)。

<script src="{{ "/assets/js/components/header.js" | absolute_url }}" type="module"></script>