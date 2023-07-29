---
layout: main
title: 按鈕及連結
iframe_page: ""
---

### 按鈕

{% capture button %}{% include ctas/button.html %}{% endcapture %}
{% include example.html content=button %}

#### CSS

- `.button`：作為全部按鈕的基底。
- `.button-primary`：作為主要或正面的動作視覺傳達。

### 連結

{% capture button %}{% include ctas/link.html %}{% endcapture %}
{% include example.html content=button %}

#### CSS

- 無。

#### 親和力

- 連結與文字必須用非顏色的方式做區分。一般網頁連結皆使用底線作為標注。見 Failure of [Success Criterion 1.4.1](https://w3c.github.io/wcag/understanding/use-of-color.html) due to [creating links that are not visually evident without color vision](https://www.w3.org/WAI/WCAG22/Techniques/failures/F73)
