---
layout: main
title: 文字規範 (Typography)
maturity: "new"
---

### 說明

- 文字大小：現代網站最常使用的預設文字大小為16px或18px，考量政府網站需有較好的可近性，預設文字大小設為18px。
- 行距：一般而言中文行距介於1.5em到2em之間，設定1.7em最為舒適，故我們文字段落(p標籤)行距設定為1.7em。

### 標題

{% capture html %}{% include typography/headings.html %}{% endcapture %}
{% include example.html
  content=html
%}

### 文字段落

{% capture html %}{% include typography/paragraph.html %}{% endcapture %}
{% include example.html
  content=html
%}

### CSS

- `.heading1`~`.heading6`：這些 class 是對標題標籤 h1 到 h6 的別名，方便在 HTML 中使用這些 class 來套用到對應的標題樣式，而不需要直接使用標題標籤。例如，使用 `.heading1` 可以得到與 h1 相同的樣式。
- `.fs1`~`.fs6`：這些 class 專門用來設定與標題 h1 到 h6 的相同的字體大小，但不包含字體粗細（font-weight）。例如，`.fs1` 設定與 h1 相同的字體大小，但不會改變其字體粗細。
