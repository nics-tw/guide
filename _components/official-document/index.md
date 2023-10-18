---
layout: main
title: 公文
iframe_page: ""
---

{% capture html %}{% include official-document/main.html %}{% endcapture %}
{% 
  include example.html 
  content=html
%}

### Custom Element

- 使用 [`<official-document>`](/assets/js/components/official-document-element.js)。

### 使用方式

1. 例如「行政院公報資訊網」上的網頁文字版公告，以[數位政府字第 11140006811 號](https://gazette2.nat.gov.tw/EG_FileManager/eguploadpub/eg029001/ch05/type3/gov87/num13/Eg.htm)為例。
2. 將純文字文字內容放置到 `<official-document>` 內文，並按照範例斷行。
3. `<official-document>` 即會自動讀取內文並排版。
4. 若讀取文字格式不符合需求，將會保留原本純文字版本。

#### 純文字格式需求

{% capture html %}
<!-- 部門，如「數位發展部」 -->公告
<!-- 公告日期，如「中華民國112年1月3日」 -->
<!-- 公告編號號碼，如「數位政府字第 11140006811 號」-->

主旨：<!-- 公文主旨 -->
依據：<!-- 公文依據 -->
公告事項：
<!-- 公告事項內文（多行） -->

<!-- 長官職稱 -->
<!-- 長官姓名 -->
{% endcapture %}
{% include example-html.html content=html %}

<script src="/assets/js/components/official-document-element.js" type="module">
