---
layout: main
title: 密碼輸入欄位 (Password Input)
maturity: "new"
---

### 說明

- 密碼輸入欄位允許用戶輸入密碼，並提供選項顯示他們所輸入的明文密碼。讓使用者能在送出前檢查他們的密碼，幫助他們減少錯誤並選擇安全的密碼。
- 此元件預設隱藏密碼，使用者可以選擇點擊「顯示」按鈕顯示密碼。由於使用者在輸入或建立密碼時可能不在私人空間，因此應預設隱藏密碼。
- 「顯示」按鈕，一開始預設關閉，只有當 JavaScript 被執行的時候才會顯示，這樣可以避免關閉 JavaScript 的使用者看到這個無法作用的按鈕。

### 樣式

{% capture html %}{% include password-input/index.html %}{% endcapture %}
{% include example.html
  content=html
%}
