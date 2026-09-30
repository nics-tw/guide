---
title: 抽屜式面板 (Drawer)
maturity: "new"
aliases:
  - /components/drawer/index.html
---

### AI 回答與參考資料

Drawer 歸在 AI 元件，是因為本頁示範 AI 回答的參考資料；底層元件仍可用於其他非模態補充內容。

<div class="guide-demo-drawer">
{{< live-example partial="ai/drawer/basic.html" >}}
</div>

- [開啟獨立寬版預覽]({{< ref "components/ai/drawer/demo.html" >}})

#### 使用方式

- Drawer 是與主區共同排列的非模態補充區域；寬容器並排，窄容器依 DOM 順序排在主區下方。
- 面板只放補充資訊，不承擔主要任務或必讀內容。增強後預設收合；頁面載入時若焦點或網址錨點（URL fragment）已在面板內，則保持開啟。
- 增強成功後，腳本會顯示入口與關閉按鈕、隱藏 fallback 連結，並改由入口按鈕開關面板。

腳本在頁面載入時檢查一次下列啟用條件；任一項不符即不會完成增強。腳本不會修正錯誤標記，也不檢查下一段的初始狀態，因此這些條件不代表所有錯誤標記都會保留可讀的面板。

1. `[data-drawer-layout]` 容器不可位於另一個 `[data-drawer-layout]` 內，也不可包含另一個，且尚未帶有 `data-drawer-enhanced`。
2. 主區 `[data-drawer-return]` 與面板 `[data-drawer]` 各一個，且都是容器的直接子項。
3. 主區內有一個入口按鈕 `[data-drawer-trigger]` 與一個 fallback 連結 `[data-drawer-fallback]`；面板內有一個標題 `[data-drawer-title]` 與一個關閉按鈕 `[data-drawer-close]`。
4. 面板為 `<section>`，標題為依頁面層級選用的 `<h1>`–`<h6>`，入口與關閉按鈕為 `<button type="button">`，fallback 為 `<a>`。
5. 主區與標題都設 `tabindex="-1"`。
6. 入口的 `data-drawer-trigger` 與 `aria-controls` 都等於面板的 `id`；面板的 `aria-labelledby` 等於標題的 `id`；fallback 的 `href` 指向本頁的 `#標題 id`。
7. 容器內所有 `id` 在整頁唯一，且不含空白。
8. 標題、入口、關閉按鈕與 fallback 的文字內容（`textContent`）不可為空，且 fallback 與入口的文字相同；腳本不檢查文字是否實際可見。
9. 腳本移除入口的 `hidden` 後，入口須能顯示並取得焦點；否則保留 fallback 連結，之後即使入口恢復可用，也不會重新增強。

無 JavaScript 備援的初始標記：沒有 JavaScript、腳本未載入或啟用條件不符時，頁面依初始標記呈現。請維持下列初始狀態，讓面板可讀、fallback 連結可跳至面板標題；腳本不檢查這些狀態。

- 入口與關閉按鈕初始加上 `hidden`，避免沒有 JavaScript 時出現無作用的按鈕。
- 面板與 fallback 連結初始不要加 `hidden`，讓沒有 JavaScript 時仍可閱讀面板並跳至標題。
- 不要自行加上 `data-drawer-enhanced`；入口的 `aria-expanded` 與面板開關由腳本在增強時設定。

#### CSS

- `.drawer-layout`／`.drawer-layout__main`：負責主區與面板的並排、換行及局部焦點返回。
- `.drawer`／`.drawer__header`／`.drawer__title`／`.drawer__body`／`.drawer__close`：面板區塊與內容樣式。
- 使用編譯後的 [`main.css`]({{< relURL "main.css" >}}) 取得 Drawer 樣式；本頁展示樣式不屬於元件採用需求。

#### 親和力

- 面板使用有名稱的 `<section>`；開啟後焦點移至標題，Tab 不限制在面板內。
- 在面板內按 Escape 可關閉。若焦點在面板內，關閉前會返回可用入口；入口不可用時則移至局部返回容器。
- 沒有 JavaScript 時的呈現，依「使用方式」中的無 JavaScript 備援初始標記。

#### JavaScript

- 使用 [`drawer.js`]({{< relURL "js/components/drawer.js" >}})，以 `<script type="module">` 在 HTTP(S) 環境依標準模組規則載入，不依賴其他腳本。
- 腳本只在初始化時掃描當下已有的 `[data-drawer-layout]`；之後插入的容器不會自動增強。

{{< code-example content=`<script type="module" src="js/components/drawer.js"></script>` >}}

#### 參考

- [Drawer](https://design.cms.gov/components/drawer/) - CMS Design System
- [WAI-ARIA 1.2: region](https://www.w3.org/TR/wai-aria-1.2/#region) - W3C
- [WAI-ARIA 1.2: aria-expanded](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded) - W3C
- [Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) - W3C

{{< asset-script "js/components/drawer.js" >}}
{{< asset-css "css/demo/drawer.css" >}}
