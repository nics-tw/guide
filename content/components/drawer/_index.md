---
title: 抽屜式面板 (Drawer)
maturity: "new"
---

### 基本範例

{{< live-example partial="drawer/basic.html" >}}

#### 使用方式

- Drawer 是與主區共同排列的非模態補充區域；寬容器並排，窄容器依 DOM 順序排在主區下方。
- 面板只放補充資訊，不承擔主要任務或必讀內容。成功增強後預設收合；初始化時若焦點或 URL fragment 已在面板內則保持開啟。
- 每一組靜態 Drawer 使用獨立且唯一的 ID 與關聯。標題採頁面層級適合的 `<h2>`–`<h6>` 並設 `tabindex="-1"`；主區的 `data-drawer-return` 也須設 `tabindex="-1"`。請保留腳本管理的開關狀態與增強標記。

#### CSS

- `.drawer-layout`／`.drawer-layout__main`：負責主區與面板的並排、換行及局部焦點返回。
- `.drawer`／`.drawer__header`／`.drawer__title`／`.drawer__body`／`.drawer__close`：面板區塊與內容樣式。
- 使用編譯後的 [`main.css`]({{< relURL "main.css" >}}) 取得 Drawer 樣式。

#### 親和力

- 面板使用有名稱的 `<section>`；開啟後焦點移至標題，Tab 不限制在面板內。
- 在面板內按 Escape 可關閉。若焦點在面板內，關閉前會返回可用入口；入口不可用時則移至局部返回容器。
- JavaScript 未載入時，面板內容仍可閱讀，fallback 連結可移至面板標題。

#### JavaScript

- 使用 [`drawer.js`]({{< relURL "js/components/drawer.js" >}})，以 `<script type="module">` 在 HTTP(S) 環境依標準模組規則載入，不依賴其他腳本。
- 腳本只增強頁面初始已存在的 `[data-drawer-layout]`；未載入或結構無效時保留可讀內容。

{{< code-example content=`<script type="module" src="js/components/drawer.js"></script>` >}}

#### 參考

- [Drawer](https://design.cms.gov/components/drawer/) - CMS Design System
- [WAI-ARIA 1.2: region](https://www.w3.org/TR/wai-aria-1.2/#region) - W3C
- [WAI-ARIA 1.2: aria-expanded](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded) - W3C
- [Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) - W3C

{{< asset-script "js/components/drawer.js" >}}
