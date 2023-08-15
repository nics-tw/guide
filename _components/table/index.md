---
layout: main
title: 表格
---

### 表格

{% capture html %}{% include table/table.html %}{% endcapture %}
{% include example.html content=html %}

#### HTML

- 使用 `<caption>` 傳遞表單內容為何。
- 使用 `<th scope="row/column">` 詳述表格抬頭的格式。

### 左右滑動表格

{% capture html %}{% include table/table-scrollable.html %}{% endcapture %}
{% include example.html content=html %}
