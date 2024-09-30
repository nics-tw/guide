---
layout: main
title: 頁首 (Header)
maturity: "new"
---

### 基本頁首

{% capture html %}{% include header/header.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### 建議使用時機

- 當需要展示網站的標誌和主要導覽連結時。
  - 當使用者需要快速訪問網站主要部分時，純 Logo Header 能幫助使用者迅速導覽。
- 當需要簡潔、直觀的導覽體驗時。
  - 純 Logo Header 提供了簡單而清晰的導覽，不會對使用者造成干擾。

#### 不建議使用時機

- 當需要更多的導覽選項和功能時。
  - 如果網站需要提供多個導覽選項和功能，純 Logo Header 可能無法滿足需求。

---

### 頁首附帶單連結

{% capture html %}{% include header/header_link.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### 建議使用時機

- 當需要在桌面和移動設備上提供一致的導覽體驗時。
  - 單連結 Header 能夠在桌面和移動設備上提供一致的導覽體驗，適合不同設備的使用。
- 當需要提供多個導覽選項並且能夠在移動設備上顯示壓縮的導覽選單時。
  - 當使用者在移動設備上訪問網站時，Header 能自適應顯示壓縮的導覽選單。

#### 不建議使用時機

- 當網站內容非常簡單且不需要多個導覽選項時。
  - 如果網站內容簡單，單連結 Header 可能顯得過於複雜。
- 當需要展示大量的導覽選項和功能時。
  - 如果需要展示大量導覽選項和功能，單連結 Header 可能無法滿足需求。

---

### JavaScript

- 使用 [`header.js`](/assets/components/header.js)。

<script src="{{ "/assets/js/components/header.js" | absolute_url }}" defer></script>
