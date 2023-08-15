---
layout: main
title: 警告文字
iframe_page: ""
---

### 警告文字

{% capture html %}{% include warning-text/block.html %}{% endcapture %}
{% include example.html content=html %}

#### CSS

- `.warning-text` 為警告段落。
- `.warning-text-content` 為文字的容器。

警告圖示的大小會隨著 CSS 字體設定的大小變動。

