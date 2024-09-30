---
layout: main
title: 頁尾 (Footer)
maturity: "new"
---

### 基本頁尾

- 頁尾提供網站的附加資訊，如版權聲明、聯繫方式或是網站的其他資訊。

{% capture html %}{% include footer/footer.html %}{% endcapture %}
{% 
  include example.html content=html
%}

### 頁尾與連結

{% capture html %}{% include footer/footer_link.html %}{% endcapture %}
{% 
  include example.html content=html
%}

### 頁尾與導覽

{% capture html %}{% include footer/footer_service.html %}{% endcapture %}
{% 
  include example.html content=html
%}
