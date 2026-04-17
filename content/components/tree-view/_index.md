---
title: 樹狀檢視 (Tree View)
maturity: "new"
---

### 說明

樹狀檢視用於呈現具有階層關係的導覽結構，適用於側邊導覽選單。參考 [USWDS Side Navigation](https://designsystem.digital.gov/components/side-navigation/) 設計。

- 優先使用原生 HTML 語意，讓報讀軟體自動朗讀正確資訊
- `<nav aria-label>` — 報讀器朗讀「導覽區塊」
- `<ul>` / `<li>` — 報讀器朗讀「清單, 共 N 個項目」
- `<a>` — 報讀器朗讀「連結」
- `<button aria-expanded>` — 報讀器朗讀「按鈕, 已收合/已展開」
- 以 `aria-current="page"` 標示目前所在頁面

### 基本樹狀導覽

- 單層子選單，可透過點擊或鍵盤展開/收合
- 以左側粗邊框標示目前頁面

{{< live-example partial="tree-view/tree_view_basic.html" >}}

### 多層巢狀導覽

- 支援三層以上的巢狀結構
- 子層以縮排與左側邊線區分層級

{{< live-example partial="tree-view/tree_view_nested.html" >}}

#### CSS

- `.tree-view`：套用於 `<nav>` 容器
- `aria-current="page"`：目前頁面連結，自動套用粗體與左側指示邊框

#### JavaScript

- 使用 [`tree-view.js`]({{< relURL "js/components/tree-view.js" >}})。
- JavaScript 選擇器為 `.tree-view`，負責切換 `<button>` 的 `aria-expanded` 狀態。

#### 鍵盤操作

| 按鍵 | 說明 |
|---|---|
| `Tab` | 依序聚焦每個連結與按鈕 |
| `Enter` / `Space` | 觸發連結或展開/收合按鈕 |

#### HTML 結構說明

| 元素 | 用途 | 報讀器朗讀 |
|---|---|---|
| `<nav aria-label="…">` | 導覽區塊 | 「側邊導覽, 導覽區塊」 |
| `<ul>` | 清單容器 | 「清單, 共 N 個項目」 |
| `<a href>` | 葉節點連結 | 「○○○, 連結」 |
| `<button aria-expanded>` | 展開/收合父節點 | 「○○○, 按鈕, 已收合/已展開」 |
| `aria-current="page"` | 目前所在頁面 | 「目前頁面」 |

#### 親和力

| WCAG 2.2 條款 | 說明 |
|---|---|
| [1.3.1 資訊與關聯](https://www.w3.org/TR/WCAG22/#info-and-relationships) | 使用原生 `<nav>` + `<ul>` + `<button>` 傳達結構、階層與互動狀態 |
| [1.4.1 非僅以色彩傳達](https://www.w3.org/TR/WCAG22/#use-of-color) | 目前頁面同時以粗體與左側邊框指示，不僅依賴色彩 |
| [2.1.1 鍵盤](https://www.w3.org/TR/WCAG22/#keyboard) | 所有互動均可透過 Tab + Enter/Space 操作 |
| [2.4.3 焦點順序](https://www.w3.org/TR/WCAG22/#focus-order) | DOM 順序即為焦點順序，與視覺呈現一致 |
| [2.4.7 焦點可見](https://www.w3.org/TR/WCAG22/#focus-visible) | 鍵盤焦點有清楚的外框指示 |
| [4.1.2 名稱、角色、值](https://www.w3.org/TR/WCAG22/#name-role-value) | 原生元素自帶角色；`aria-expanded` 傳達展開狀態；`aria-current` 傳達目前頁面 |

### 參考資料

- [USWDS — Side Navigation](https://designsystem.digital.gov/components/side-navigation/)
- [WAI-ARIA — aria-current](https://www.w3.org/TR/wai-aria-1.2/#aria-current)

{{< asset-script "js/components/tree-view.js" >}}

