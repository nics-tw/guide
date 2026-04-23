---
title: 分頁 (Pagination)
maturity: "new"
---

### 說明

- 分頁（Pagination）用於將大量內容拆分成多個頁面，並提供使用者在頁面間前後移動、或直接跳至特定頁面的導覽功能。
- 常見於搜尋結果、文章列表、資料表格等長內容清單。
- 元件設計為包含 7 個等寬且等距的元素，並排成一行以保持視覺穩定。

### 已知總頁數

適用於後端已知總筆數、能計算出總頁數的情境，例如搜尋結果、資料列表。

{{< live-example partial="pagination/pagination_bounded.html" >}}

### 未知總頁數

適用於無法預先得知總頁數的情境，例如串流資料、API 分頁。不顯示「最後一頁」，並在序列末端維持省略符號。

{{< live-example partial="pagination/pagination_unbounded.html" >}}

### 簡易分頁

頁數很少時，可省略省略符號與「最後一頁」：

{{< live-example partial="pagination/pagination_basic.html" >}}

#### CSS

- `.pagination`：最外層 `nav` 容器。
- `.pagination__list`：頁碼清單（`ul`）。
- `.pagination__item`：單一頁碼項目（`li`）。
- `.pagination__item--arrow`：上一頁、下一頁的項目。
- `.pagination__item--overflow`：省略中間頁碼的項目，用以顯示「…」符號。
- `.pagination__link`：頁碼連結（`a`）。
- `.pagination__link--prev`、`.pagination__link--next`：上一頁、下一頁連結。

#### 使用規範
- **頁數較少時縮減元素**：若總頁數少於 7 頁，應移除多餘的元素，僅顯示實際頁數。
- **標示當前頁面**：必須明確標示使用者當前所在的頁碼。
- **首末頁隱藏箭頭**：當位於第一頁時，隱藏「上一頁」連結；當位於最後一頁時，隱藏「下一頁」連結。
- **鄰近頁面**：在當前頁碼的左右兩側，必須始終顯示其相鄰的頁碼連結
- **使用省略號標示缺失頁面**：當頁碼序列不連續時，應使用省略符號來代表中間缺失的頁面。
- **已知總頁數的省略位置**：省略符號僅能出現在第一頁之後或最後一頁之前
- **未知總頁數的省略位置**：最後一個元素固定顯示為省略符號, 當頁碼進入第四頁以上時, 當前頁碼應固定出現在元件正中間


#### 親和力

- 使用 `<nav>` 元素並加上 `aria-label`（例如「搜尋結果分頁」），使其成為頁面地標（landmark），讓輔助科技使用者可快速定位。當頁面存在多組分頁時，務必以不同的 `aria-label` 加以區分。
- 頁碼以 `<ul>`／`<li>` 原生清單語意呈現。
- 每個頁碼連結透過 `aria-label` 補充完整語意。
- 目前所在頁碼以 `aria-current="page"` 標示，並於 `aria-label` 附加「目前頁面」。
- 上一頁、下一頁連結加上 `rel="prev"`、`rel="next"` 屬性，協助輔助科技理解頁面關係。
- 與省略符號以 `aria-hidden="true"` 隱藏，避免干擾朗讀；省略項目本身則以 `aria-label="省略中間頁碼"` 補上有意義的說明。
- 連結最小點擊區域不小於 2.5rem × 2.5rem。
- 提供清楚的鍵盤焦點外觀。

### 參考資料

- [U.S. Web Design System - Pagination](https://designsystem.digital.gov/components/pagination/)
- [デジタル庁デザインシステム - Page navigation](https://design.digital.go.jp/dads/components/page-navigation/)
