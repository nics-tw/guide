---
title: 側邊導覽 (Side Navigation)
maturity: "new"
---

### 基本側邊導覽

- 單層子選單，可透過點擊或鍵盤展開/收合
- 以左側粗邊框標示目前頁面

{{< live-example partial="side-navigation/side_navigation_basic.html" >}}

### 多層巢狀導覽

- 支援三層以上的巢狀結構
- 子層以縮排與左側邊線區分層級

{{< live-example partial="side-navigation/side_navigation_nested.html" >}}

#### CSS

- `.side-navigation`：套用於 `<nav>` 容器
- `aria-current="page"`：目前頁面連結，自動套用粗體與左側指示邊框

#### JavaScript

- 使用 [`side-navigation.js`]({{< relURL "js/components/side-navigation.js" >}})。
- JavaScript 選擇器為 `.side-navigation`，負責切換 `<button>` 的 `aria-expanded` 狀態。


#### 親和力


- 使用原生 `<nav>` + `<ul>` + `<button>` 傳達結構、階層與互動狀態
- 當前頁面同時以粗體與左側邊框指示，不僅依賴色彩
- 所有互動均可透過 Tab + Enter/Space 操作
- DOM 順序即為焦點順序，與視覺呈現一致
- 鍵盤焦點有清楚的外框指示
- 原生元素自帶角色；`aria-expanded` 傳達展開狀態；`aria-current` 傳達目前頁面

### 參考資料

- [USWDS — Side Navigation](https://designsystem.digital.gov/components/side-navigation/)

{{< asset-script "js/components/side-navigation.js" >}}

