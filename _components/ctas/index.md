---
layout: main
title: 按鈕及連結
iframe_page: ""
maturity: "alpha"
---

### 常見按鈕

{% capture html %}{% include ctas/button.html %}{% endcapture %}
{% 
  include example.html 
  content=html 
  i18n_selector="button" 
  i18n="English:Submit,Delete,Cancel;日文:送信,削除,キャンセル;Tiếng Việt:Gửi,Xóa,Hủy;ไทย:ส่ง,ลบ,ยกเลิก"
%}

#### CSS

- `.button`：作為全部按鈕的基底。
- `.button-primary`：作為主要或正面的動作視覺傳達。
- `.button-danger`：作為有破壞性（如刪除資料）或負面的動作視覺傳達。

### 不可用的按鈕

{% capture html %}{% include ctas/button-disabled.html %}{% endcapture %}
{% 
  include example.html 
  content=html 
  i18n_selector="button" 
  i18n="English:Submit,Next;日文:送信,次へ;Tiếng Việt:Gửi,Kế tiếp;ไทย:ส่ง,ต่อไป"
%}

#### CSS

- `[disabled]`, `.button-disabled`：作為不可用的按鈕視覺。

### 按鈕尺寸

{% capture html %}{% include ctas/button-size.html %}{% endcapture %}
{% 
  include example.html 
  content=html 
  i18n_selector="button"
  i18n="English:Submit;日文:送信;Tiếng Việt:Gửi;ไทย:ส่ง"
%}

#### CSS

- `.button-large`：大按鈕。
- `.button-small`：小按鈕。
- `.button-mini`：迷你按鈕。

### 連結

{% capture html %}{% include ctas/link.html %}{% endcapture %}
{% include example.html content=html %}

#### CSS

- 無。

### 親和力

- 連結與文字必須用非顏色的方式做區分。一般網頁連結皆使用底線作為標注。見 Failure of [Success Criterion 1.4.1](https://w3c.github.io/wcag/understanding/use-of-color.html) due to [creating links that are not visually evident without color vision](https://www.w3.org/WAI/WCAG22/Techniques/failures/F73).
- 按鈕 CSS classes 不能使用在 `<a>` 上，因為 `<button>` 和 `<a>` 各有不同的使用、啟動方式，因此必須在視覺上做明顯的區分以便使用者分辨。
- 不可用的按鈕注意事項：
  - **可用於**剛送出的表單按鈕，以用於避免二次送出。
  - **不可用於**驗證錯誤的表單按鈕。
  - **不可用於**尚未填寫完的表單按鈕。

### 參考

- [Usability Pitfalls of Disabled Buttons, and How To Avoid Them](https://www.smashingmagazine.com/2021/08/frustrating-design-patterns-disabled-buttons/)
