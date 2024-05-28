---
layout: main
title: Footer
maturity: "alpha"
---

### 基本 Footer

{% capture html %}{% include footer/footer.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.footer`：作為整個 footer 的容器。
- `.width-container`：定義 footer 的寬度容器。
- `.footer__content`：作為 footer 內容的容器。
- `.footer__logo`：作為 footer 中 logo 的容器。
- `.footer__logo-img`：定義 logo 圖像的樣式。
- `.footer__info`：定義 footer 中的服務信息部分。
- `.footer__legal`：定義 footer 中的法律信息部分。

#### 親和力

- 使用 `.footer__link` 來確保連結的可用性和可訪問性。
- 確保所有圖片元素都有替代文字描述（`alt` 屬性），以便屏幕閱讀器用戶能夠理解圖片內容。
- 為電話號碼添加 `tel:` 協議，使其在移動設備上可點擊。

#### 建議使用時機

- 當需要展示機構標誌和基本聯絡信息時。
    > 當用戶需要快速找到聯絡信息和機構標誌時，純 Logo Footer 能提供清晰的展示。

#### 不建議使用時機

- 當需要展示更多的導航選項和支援連結時。
    > 如果需要展示更多導航選項，純 Logo Footer 可能無法滿足需求。

---

### Footer + 支援連結

{% capture html %}{% include footer/footer_link.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.footer__support-links`：作為 footer 中支援連結的容器。
- `.footer__inline-list`：定義支援連結的列表樣式。
- `.footer__inline-list-item`：定義支援連結的列表項目樣式。
- `.footer__divider`：定義 footer 中的分隔線樣式。

#### 親和力

- 使用 `.footer__link` 來確保連結的可用性和可訪問性。
- 確保所有連結都提供明確的文本描述，避免使用僅有圖標或圖片的連結。
- 使用 `visually-hidden` 類來隱藏對視覺用戶無關的標題，但對屏幕閱讀器可見。
- 為電話號碼添加 `tel:` 協議，使其在移動設備上可點擊。

#### 建議使用時機

- 當需要在 footer 中提供額外的支援連結時。
    > 支援連結 Footer 能夠幫助用戶快速找到幫助、聯絡信息和法律條款。

#### 不建議使用時機

- 當網站內容非常簡單且不需要額外的支援連結時。
    > 如果網站內容簡單，支援連結 Footer 可能顯得過於複雜。

---

### Footer + 多層次導航

{% capture html %}{% include footer/footer_service.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.footer__navigation`：作為 footer 中多層次導航的容器。
- `.footer__section`：定義 footer 中各個導航區塊的樣式。
- `.footer__heading`：定義導航區塊標題的樣式。
- `.footer__list`：定義導航區塊列表的樣式。
- `.footer__list-item`：定義單個導航項目的樣式。

#### 親和力

- 使用 `.footer__link` 來確保連結的可用性和可訪問性。
- 為每個導航區塊提供清晰的標題（使用 `h2` 標籤），以便屏幕閱讀器能夠識別各個部分。
- 確保導航列表的結構清晰，便於用戶理解和使用。
- 為電話號碼添加 `tel:` 協議，使其在移動設備上可點擊。

#### 建議使用時機

- 當需要在 footer 中提供多層次的導航選項時。
    > 多層次導航 Footer 能夠幫助用戶快速找到各個服務和信息，適合內容豐富的網站。

#### 不建議使用時機

- 當網站內容簡單且不需要多層次導航時。
    > 如果網站內容簡單，多層次導航 Footer 可能顯得過於複雜。
