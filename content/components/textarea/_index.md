---
layout: main
title: 文字輸入區塊 (Textarea)
maturity: "alpha"
---

{% capture html %}{% include textarea/index.html %}{% endcapture %}
{% include example.html content=html %}

### JavaScript

- 使用 [`character-count.js`](/assets/components/character-count.js)。

### JavaScript 行為使用的 data-attributes

- `fieldset[data-limit-phrase="{string}"]`: 如「尚餘 {remaining} 字，\|內容上限 {total} 字。」將剩餘數字寫在前面，便報讀軟體優先宣報給使用者聽。
- `li[data-character-notice][aria-live="polite"][aria-atomic="true"]`：用來放置字數限制的規範。這行字將會隨著使用者輸入一邊立即更新。
- `textarea[data-character-limit="{number}"]`：限制的字數量。

### 漸進增強規則

- `<li>` 預設就請放入 `data-limit-phrase` 的後半部上限提醒。
- 無論如何，伺服器接收內容時仍須再次驗證字數。

<script src="{{ "/assets/js/components/character-count.js" | absolute_url }}" type="module"></script>
