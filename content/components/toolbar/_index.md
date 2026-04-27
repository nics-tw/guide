---
title: 工具列 (Toolbar)
maturity: "new"
---

### 基本工具列

{{< live-example partial="toolbar/basic.html" >}}

#### CSS

- `[aria-pressed="true"]`：切換按鈕的啟用狀態，CSS 透過此屬性驅動視覺樣式。
- `[aria-disabled="true"]`：不可用狀態（保留焦點可達性，不使用 HTML `disabled`）。
- `.toolbar__separator`：分隔線，使用 `role="separator"`，不進入鍵盤導覽。

#### 親和力

- 使用方向鍵（← →）在按鈕間移動，Tab 鍵只進入／離開整個工具列（Roving Tabindex 模式）。
- 圖示型按鈕使用 `<span class="visually-hidden">` 提供文字替代，而非 `aria-label`，以利多語系維護。
- 有可見標題時使用 `aria-labelledby`；無可見標題時使用 `aria-label`。

#### JavaScript

- 使用 [`toolbar.js`]({{< relURL "js/components/toolbar.js" >}})。
- 無 JS 時：所有按鈕仍可用 Tab 逐一到達並點擊，失去方向鍵導覽。

#### 參考

- [Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) - ARIA Authoring Practices Guide

{{< asset-script "js/components/toolbar.js" >}}
