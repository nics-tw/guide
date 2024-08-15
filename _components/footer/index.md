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
- `.footer__info`：定義 footer 中的服務資訊部分。
- `.footer__legal`：定義 footer 中的法律資訊部分。

#### 建議使用時機

- 當需要展示機構標誌和基本聯絡資訊時。
    > 當使用者需要快速找到聯絡資訊和機構標誌時，純 Logo Footer 能提供清晰的展示。

#### 不建議使用時機

- 當需要展示更多的導覽選項和支援連結時。
    > 如果需要展示更多導覽選項，純 Logo Footer 可能無法滿足需求。

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

#### 建議使用時機

- 當需要在 footer 中提供額外的支援連結時。
    > 支援連結 Footer 能夠幫助使用者快速找到幫助、聯絡資訊和法律條款。

#### 不建議使用時機

- 當網站內容非常簡單且不需要額外的支援連結時。
    > 如果網站內容簡單，支援連結 Footer 可能顯得過於複雜。

---

### Footer + 多層次導覽

{% capture html %}{% include footer/footer_service.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.footer__navigation`：作為 footer 中多層次導覽的容器。
- `.footer__section`：定義 footer 中各個導覽區塊的樣式。
- `.footer__heading`：定義導覽區塊標題的樣式。
- `.footer__list`：定義導覽區塊列表的樣式。
- `.footer__list-item`：定義單個導覽項目的樣式。

#### 建議使用時機

- 當需要在 footer 中提供多層次的導覽選項時。
    > 多層次導覽 Footer 能夠幫助使用者快速找到各個服務和資訊，適合內容豐富的網站。

#### 不建議使用時機

- 當網站內容簡單且不需要多層次導覽時。
    > 如果網站內容簡單，多層次導覽 Footer 可能顯得過於複雜。
