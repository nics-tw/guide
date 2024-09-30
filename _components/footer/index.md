---
layout: main
title: 頁尾 (Footer)
maturity: "new"
---

### 基本頁尾

- 頁尾提供有關您的服務的版權、許可和其他資訊。

{% capture html %}{% include footer/footer.html %}{% endcapture %}
{% 
  include example.html content=html
%}

---

### 頁尾附帶支援連結

{% capture html %}{% include footer/footer_link.html %}{% endcapture %}
{% 
  include example.html content=html
%}

---

### 頁尾附帶多層次導覽

{% capture html %}{% include footer/footer_service.html %}{% endcapture %}
{% 
  include example.html content=html
%}
