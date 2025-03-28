---
layout: main
title: 折疊選單 (Accordion)
maturity: "new"
---

### 常見基本折疊選單

- 預設一次僅可展開一個選單，點擊其他選單會自動關閉先前選單

{% capture html %}{% include accordion/accordion_single.html %}{% endcapture %}
{%
  include example.html content=html
%}

### 長開折疊選單

- 展開選單需再次點擊關閉，使折疊選單在開啟另一個選單時保持開啟狀態。

{% capture html %}{% include accordion/accordion_multiple.html %}{% endcapture %}
{%
  include example.html content=html
%}

#### CSS

- `data-behavior="multiple"`：作為設定是否可以常開選單的屬性。
- `.btn-toggle`：作為一鍵開合所有選單的元件。

#### JavaScript

- 使用 [`accordion.js`](/assets/components/accordion.js)。

### 副標題(摘要)折疊選單

- 可在標題欄新增副標題(摘要)，請注意僅在實際需要時添加摘要行，避免按鈕文字太長。

{% capture html %}{% include accordion/accordion_subTitle.html %}{% endcapture %}
{%
  include example.html content=html
%}

<script src="{{ "/assets/js/components/accordion.js" | absolute_url }}" type="module"></script>
