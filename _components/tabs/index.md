---
layout: main
title: 頁籤 (Tabs)
maturity: "new"
---

### 常見頁籤

{% capture html %}{% include tabs/tabs.html %}{% endcapture %}
{%
  include example.html content=html
%}

#### CSS

- `.tabs`：作為全部頁籤的容器。
- `label .tabs-label`：作為頁籤的標題。
- `.tabs-content`：作為頁籤的內容。

#### 親和力

- 使用 `.tabs-label`，必要使用 `for` 連接 `<input>` 元件中的 `id` 。
