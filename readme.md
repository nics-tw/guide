# 政府網站設計原則

## 目標

本文件所規劃之系統元件係以具備相容性、符合網頁標準之目標進行設計規劃，並最大化地使用網頁標準中所提供的元件加以優化，可供各機關及資通系統承包商直接採用及參考，減少對第三方元件及複雜前端開發框架的依賴，增加系統韌性、相容性及親和力。系統元件將會使用網頁標準元件作為根本基礎，因此即使各機關、廠商仍須使用前端開發框架，也不會有不相容的問題。

## CSS 元件使用方式

可直接[下載](/https://guide.nics.nat.gov.tw/assets/css.zip)，並使用下方程式碼匯入：

```
<link rel="stylesheet" href="../main.css">
```

請避免一切對原始碼的改動。使用設計系統的目的就在於一致性。若需要特殊的顯示方式，請另行撰寫 CSS，以免造成日後版本升級困難。

> [!WARNING]
> 本檔案暫時包含 <a href="https://tachyons.io/">Tachyons</a>，作為 Atomic CSS 的第三方程式。

### 多國語系支援

請依照[多國語系支援](https://guide.nics.nat.gov.tw/visual/internationalization/index.html)另外包含所需要的字體 CSS 檔案。

## JavaScript 元件使用方式

### [文字輸入區塊](https://guide.nics.nat.gov.tw/components/textarea/index.html)

下載 [character-count.js](/https://guide.nics.nat.gov.tw/assets/js/components/character-count.js) 檔案並選擇性使用下方程式碼匯入：

```
<script src="../character-count.js" defer>
```

### [公文元件](https://guide.nics.nat.gov.tw/components/official-document/index.html)

下載 [official-document-element.js](/https://guide.nics.nat.gov.tw/assets/js/components/official-document-element.js) 檔案並選擇性使用下方程式碼匯入：

```
<script src="../official-document-element.js" type="module">
```

### [互動資料表格](https://guide.nics.nat.gov.tw/components/table/index.html)

下載 [interactive-table-element.js](/https://guide.nics.nat.gov.tw/assets/components/interactive-table-element.js) 檔案並選擇性使用下方程式碼匯入：

```
<script src="../interactive-table-element.js" type="module">
```

### [互動資料表格](https://guide.nics.nat.gov.tw/components/skip-to/index.html)

下載 [skip-to-element.js](/https://guide.nics.nat.gov.tw/assets/components/skip-to-element.js) 檔案並選擇性使用下方程式碼匯入：

```
<script src="../skip-to-element.js" type="module">
```

## 開發

```
jekyll server -w
```

Run lighthouse locally:

```
npx @lhci/cli assert --url=http://localhost:4000/
```