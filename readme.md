# 政府網站設計原則

## 目標

本文件所規劃之系統元件係以具備相容性、符合網頁標準之目標進行設計規劃，並最大化地使用網頁標準中所提供的元件加以優化，可供各機關及資通系統承包商直接採用及參考，減少對第三方元件及複雜前端開發框架的依賴，增加系統韌性、相容性及親和力。系統元件將會使用網頁標準元件作為根本基礎，因此即使各機關、廠商仍須使用前端開發框架，也不會有不相容的問題。

## CSS 元件使用方式

### 一般使用

直接以 `<link>` 引用或下載 [main.css](https://guide.nics.nat.gov.tw/main.css) 後置於專案靜態資源資料夾，並使用下方程式碼匯入：

```
<link rel="stylesheet" href="../main.css">
```

請避免一切對原始碼的改動。使用設計系統的目的就在於一致性。若需要特殊的顯示方式，請另行撰寫 CSS，以免造成日後版本升級困難。

> [!WARNING]
> 本檔案暫時包含 <a href="https://tachyons.io/">Tachyons</a>，作為 Atomic CSS 的第三方程式。

### 進階使用（SCSS）

若專案具備 SCSS build pipeline，可下載 [scss-source.zip](https://guide.nics.nat.gov.tw/zip/scss-source.zip)，解壓後內含：

- `css/` — SCSS 元件原始碼
- `svgs/` — 元件樣式所引用的 SVG 圖示（如 `accordion`）

部分元件 CSS 透過相對 URL（例如 `url("svgs/downarrow.svg")`）引用圖示，部署時請將 `svgs/` 置於與編譯後 CSS 相同層級，確保路徑可正確解析。

將進入點 `.scss` 置於 `css/` 目錄內（或以 `sass --load-path=css` 編譯），即可依需求 import 所需元件：

```scss
@import "variables";
@import "color";
@import "typography";
@import "components/accordion";
@import "components/modal";
```

### 多國語系支援

請依照[多國語系支援](https://guide.nics.nat.gov.tw/visual/internationalization/index.html)另外包含所需要的字體 CSS 檔案。

## JavaScript 元件使用方式

各 JS 元件採 Web Components / Custom Elements 設計，獨立分檔，使用時依需個別下載。所有 JS 元件統一以 ES module 載入：

```
<script src="../{檔名}.js" type="module"></script>
```

例如：

```
<script src="../character-count.js" type="module"></script>
<script src="../accordion.js" type="module"></script>
```

各 JS 元件的下載連結與完整使用方式，請參考 [共用元件](https://guide.nics.nat.gov.tw/components/index.html) 各元件頁面。

## 開發

```
hugo server
```

Run lighthouse locally:

```
npx @lhci/cli assert --url=http://localhost:1313/
```
