---
layout: main
title: 多重選擇及補充說明 (Checkable)
maturity: "alpha"
---

### 追加欄位

{% capture html %}{% include checkable/radios-with-extra-elements.html %}{% endcapture %}
{% include example.html 
  content=html
  i18n_selector='[for=v-healthid-input],[for=v-moica-input],[for=v-phone-input],[i18n-method],[i18n-tw-fido],[i18n-description]'
  i18n="en-US:NHI Card,Digital Certificate,Cell phone,Authentication method,TW FidO authentication,A natural person certificate can be used as an online ID to verify the identities of both parties during data exchange. The 'certificate' includes a 'digital signature' and a 'public key.'"
%}

#### CSS

- `input.chcecked--extra-fields`：加到 `input[type=radio]` 或 `input[type=checkbox]` 後即可在勾選後，顯示後方的 `.fields` 元件。
