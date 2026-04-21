---
title: 樹狀檢視 (Tree View)
maturity: "new"
---

### 說明

樹狀檢視用於呈現具有階層關係的資料結構，例如檔案目錄、組織架構等。

### 基本範例

- 以原生 `<ul>` / `<li>` 為語意基礎，再以 ARIA 屬性補足樹狀結構語意
- 支援完整鍵盤操作（方向鍵、Home / End、Enter / Space）
- 採用 Roving tabindex 焦點管理：整個樹狀檢視只佔一個 Tab 停靠點

{{< live-example partial="tree-view/tree_view_basic.html" >}}


#### ARIA 屬性

| 屬性 | 套用於 | 說明 |
|---|---|---|
| `role="tree"` | 最外層 `<ul>` | 標示此為樹狀檢視元件 |
| `role="group"` | 巢狀 `<ul>` | 標示子節點群組 |
| `role="treeitem"` | `<li>` | 標示每個節點 |
| `aria-expanded` | 分支節點 `<li>` | `true` 已展開 / `false` 已收合；葉節點**不**加此屬性 |
| `aria-selected` | `<li>` | 是否為·目前選取的節點 |
| `aria-level` | 每個 `<li>` | 明確宣告層級，修正部分報讀器無法自動計算層級的問題 |
| `aria-labelledby` | `<li>` | 指向內部文字的 `id`，解決 VoiceOver 對 `<li>` 內部複雜結構的相容性問題 |
| `aria-current="true"` | `<li>` | 深連結（deep link）到此節點時使用 |
| `tabindex` | `<li>` | Roving tabindex：僅目前焦點節點為 `0`，其餘為 `-1` |

#### JavaScript

- 使用 [`tree-view.js`]({{< relURL "js/components/tree-view.js" >}})。
- JavaScript 選擇器為 `[role="tree"].tree-view`，同時具備 class 與 role 才會初始化。

#### 鍵盤操作

| 按鍵 | 說明 |
|---|---|
| `↓` / `↑` | 移動焦點至下一個 / 上一個可見節點 |
| `→` | 若為已收合的分支節點則展開；若為已展開的分支節點則移至第一個子節點 |
| `←` | 若為已展開的分支節點則收合；若為葉節點或已收合節點則移至父節點 |
| `Home` / `End` | 移至第一個 / 最後一個可見節點 |
| `Enter` / `Space` | 選取節點；若為分支節點則同時切換展開 / 收合 |

#### 親和力

- 以原生 `<ul>` / `<li>` 作為語意基礎
- 整個元件包在一個 Tab 停靠點中，避免大型樹狀結構造成過多 Tab 停留
- `aria-level` 明確宣告層級，不依賴瀏覽器自動推算
- `aria-labelledby` 指向節點文字元素，確保 VoiceOver on macOS / iOS 能正確朗讀名稱
- 鍵盤焦點有清楚的外框指示
- 不依賴色彩傳達選取狀態

### 參考資料

- [WAI-ARIA APG — Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)
- [GitHub — Considerations for making a tree view component accessible](https://github.blog/engineering/user-experience/considerations-for-making-a-tree-view-component-accessible/)
- [Primer — Tree View](https://primer.style/components/tree-view)

{{< asset-script "js/components/tree-view.js" >}}

