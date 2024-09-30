---
layout: main
title: 頁首 (Header)
maturity: "new"
---

### 基本頁首

- 頁首包含網站 logo、導覽列，幫助使用者快速了解網站內容和瀏覽不同頁面。

{% capture html %}{% include header/header.html %}{% endcapture %}
{% 
  include example.html content=html
%}

---

### 頁首附帶單連結

{% capture html %}{% include header/header_link.html %}{% endcapture %}
{% 
  include example.html content=html
%}
