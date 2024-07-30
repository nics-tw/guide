---
layout: main
title: 通知提示橫幅 (Cookie Banner)
maturity: "new"
---

### 說明

- 通知提示橫幅 (Cookie Banner) 是用來讓使用者接受或拒絕非必要的 cookie（使服務正常運作之外的 cookie），如果您的服務只有用到必要的 cookie，您可以選擇不顯示通知提示橫幅。
- 您不能將本頁面上的訊息視為法律建議，您的組織需對自己為了遵守數據保護法規而採取的行動負責。
- 非必要的 cookie 包含：
  - HTML5 local storage
  - service worker
  - 任何其他在使用者設備上存儲文件的技術

### 接受或拒絕

- 您可能需要另外建立一個 cookie 頁面，讓使用者可以稍後再到該頁面進行檢視或調整您的服務上的 cookie 策略。

{% capture html %}{% include cookie-banner/index.html %}{% endcapture %}
{% include example.html 
  content=html
%}

### 隱藏

- 使用者接受或拒絕後，可以顯示修改偏好設定的頁面，並顯示通知提示橫幅的隱藏按鈕。

{% capture html %}{% include cookie-banner/hide.html %}{% endcapture %}
{% include example.html 
  content=html
%}
