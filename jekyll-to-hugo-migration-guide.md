# Jekyll 到 Hugo 遷移指南

## 目錄

1. [遷移概述](#遷移概述)
2. [主要差異摘要](#主要差異摘要)
3. [語法轉換對照表](#語法轉換對照表)
4. [Shortcodes 使用場景詳解](#shortcodes-使用場景詳解)
5. [新增文章的具體方法](#新增文章的具體方法)
6. [實際轉換範例](#實際轉換範例)
7. [常見問題解答](#常見問題解答)
8. [總結](#總結)

## 遷移概述

本專案已從 Jekyll 靜態網站生成器遷移至 Hugo。此遷移旨在提升建置效能、簡化語法結構，並提供更現代化的開發體驗。

### 遷移目標

- 保持原有功能和視覺設計不變
- 簡化模板語法和檔案結構
- 提升建置速度和開發效率
- 增強多語言支援能力

## 主要差異摘要

### 1. 檔案命名差異

- **Jekyll**: 使用 `index.md` 作為目錄首頁
- **Hugo**: 使用 `_index.md` 作為清單頁面（list page）

### 2. 語法系統差異

- **Jekyll**: 使用 Liquid 語法 `{% %}`
- **Hugo**: 使用 Go template 語法 `{{ }}` 和 shortcodes `{{< >}}`

### 3. Front Matter 簡化

- **Jekyll**: 必須指定 `layout: main`
- **Hugo**: 預設使用 `_default` 佈局，可省略 layout 設定

### 4. 路徑處理方式

- **Jekyll**: 使用 `absolute_url` 過濾器和 `{% link %}` 標籤
- **Hugo**: 使用相對路徑和內建函數如 `relURL`、`absURL`

### 5. 組件系統

- **Jekyll**: 使用 `{% include %}` 引入組件
- **Hugo**: 使用 shortcodes `{{< >}}` 和 partials 系統

### 6. 模板系統差異

#### 基礎模板架構

- **Jekyll**: 使用 `_layouts/default.html` 作為基礎佈局
- **Hugo**: 使用 `layouts/_default/baseof.html` 作為基礎模板

#### Block 系統

**Hugo** 採用更現代化的 block 系統：

- `baseof.html` 定義整體 HTML 結構和 blocks
- 使用 `{{ block "main" . }}{{ end }}` 定義內容區塊
- 子模板可透過 `{{ define "main" }}` 覆寫 blocks
- 自動繼承基礎模板的結構和樣式

#### Default Layout 行為

**Hugo** 的預設行為更簡潔：

- 所有頁面自動使用 `baseof.html` 作為基礎
- 無需在每個頁面的 Front Matter 指定 `layout`
- `_index.md` 和一般 `.md` 檔案共用相同基礎模板
- 特殊需求可透過 `layout` 參數或 `text_only: true` 覆寫

#### 模板查找順序

**Hugo** 有明確的模板查找優先順序：

1. 指定的 layout（如 Front Matter 中的 `layout: custom`）
2. `_default/single.html`（單頁內容）
3. `_default/list.html`（清單頁面）
4. `_default/baseof.html`（基礎模板，自動應用）

這種設計讓開發者能夠更靈活地管理模板，同時保持預設行為的簡潔性。

## 語法轉換對照表

### Front Matter 設定

#### Jekyll

```yaml
---
layout: main
title: 表單欄位 (Form)
maturity: "alpha"
---
```

#### Hugo

```yaml
---
title: 表單欄位 (Form)
maturity: "alpha"
---
```

### 引入組件語法

#### Jekyll - Include 語法

```liquid
{% capture html %}{% include form/form-elements.html %}{% endcapture %}
{% include example.html
  content=html
  i18n_selector="[for=name],[for=city]"
  i18n="en-US:Full name,City"
%}
```

#### Hugo - Shortcode 語法

```go
{{< live-example
  partial="form/form-elements.html"
  i18n_selector="[for=name],[for=city]"
  i18n="en-US:Full name,City"
>}}
```

### 路徑處理

#### Jekyll - Link 標籤

```liquid
{% capture path %}{{ site.url }}{% link _components/landmark/blank.html %}{% endcapture %}
[空白範本]({{ path }})
```

#### Hugo - 相對路徑

```markdown
[空白範本](/components/landmark/blank.html)
```

### 程式碼範例顯示

#### Jekyll - 複雜的 Capture 和 Include

```liquid
{% capture html %}
<skip-to>
  <a href="#main" class="skip-to">跳至主要內容區</a>
</skip-to>
{% endcapture %}
<div class="br3 mb4 overflow-hidden">{% include example-html.html content=html %}</div>
```

#### Hugo - 簡潔的 Shortcode

```go
{{< code-example content=`<skip-to>
  <a href="#main" class="skip-to">跳至主要內容區</a>
</skip-to>` >}}
```

## Shortcodes 使用場景詳解

在語法轉換時，我們高度仰賴 Hugo 的 shortcodes。以下是本專案常用的 shortcodes 說明與使用場景：

### 1. `live-example` - 互動式範例

```go
{{< live-example partial="form/form-elements.html" >}}
```

**使用場景**:

- 顯示可互動的組件範例
- 自動載入對應的 HTML partial
- 支援多語言切換功能

### 2. `code-example` - 程式碼範例

```go
{{< code-example content=`<div>HTML 內容</div>` >}}
```

**使用場景**:

- 顯示純程式碼範例
- 支援語法高亮
- 用於展示靜態程式碼片段

### 3. `asset-css` - CSS 資源載入

```go
{{< asset-css "css/components/tabs.css" >}}
```

**使用場景**:

- 動態載入 CSS 檔案
- 自動處理資源路徑
- 優化資源載入效能

### 4. `asset-script` - JavaScript 資源載入

```go
{{< asset-script "js/components/skip-to-element.js" >}}
```

**使用場景**:

- 載入 JavaScript 模組
- 自動添加 `type="module"` 屬性
- 處理相對路徑轉換

## 新增文章的具體方法

### 步驟 1: 確定文章類型和位置

#### 共用元件文章

```bash
content/components/新組件名稱/_index.md
```

#### 前端工程原則文章

```bash
content/technology/新技術主題/_index.md
```

#### 視覺設計文章

```bash
content/visual/新設計主題/_index.md
```

### 步驟 2: 建立檔案結構

```bash
# 範例：新增一個名為 "modal" 的組件
mkdir -p content/components/modal
touch content/components/modal/_index.md
```

### 步驟 3: 撰寫 Front Matter

```yaml
---
title: 模態視窗 (Modal)
maturity: "alpha"
---
```

### 步驟 4: 撰寫內容

使用 Hugo shortcodes 來展示範例：

```markdown
### 基本使用方式

{{< live-example partial="modal/basic.html" >}}

### 程式碼範例

{{< code-example content=`

<div class="modal">
  <div class="modal-content">
    <h3>標題</h3>
    <p>內容</p>
  </div>
</div>
` >}}
```

### 步驟 5: 建立相關 Partial（如需要）

```bash
# 建立對應的 partial 檔案
touch layouts/partials/modal/basic.html
```

### 步驟 6: 測試和預覽

```bash
hugo server -D
```

## 實際轉換範例

### 範例 1: 表單組件頁面

#### Jekyll 版本（`Jekyll/form/index.md`）

```markdown
---
layout: main
title: 表單欄位 (Form)
maturity: "alpha"
---

### 簡易欄位

{% capture html %}{% include form/form-elements.html %}{% endcapture %}
{% include example.html
  content=html
  i18n_selector="[for=name],[for=city],[for=desc]"
  i18n="en-US:Full name,City of residence,Description"
%}
```

#### Hugo 版本（`content/components/form/_index.md`）

```markdown
---
title: 表單欄位 (Form)
maturity: "alpha"
---

### 簡易欄位

{{< live-example
partial="form/form-elements.html"
i18n_selector="[for=name],[for=city],[for=desc]"
i18n="en-US:Full name,City of residence,Description"

> }}
```

### 範例 2: Skip-to 組件頁面

#### Jekyll 版本

```markdown
---
layout: main
title: 跳至主要內容區 (Skip-To)
maturity: "alpha"
---

### 基礎使用方式

{% capture html %}<skip-to>
<a href="#main" class="skip-to">跳至主要內容區</a>
</skip-to>{% endcapture %}

<div class="br3 mb4 overflow-hidden">{% include example-html.html content=html %}</div>

<script src="{{ "/assets/js/components/skip-to-element.js" | absolute_url }}" type="module"></script>
```

#### Hugo 版本

```markdown
---
title: 跳至主要內容區 (Skip-To)
maturity: "alpha"
---

### 基礎使用方式

{{< code-example content=`<skip-to>
  <a href="#main" class="skip-to">跳至主要內容區</a>
</skip-to>` >}}

{{< asset-script "js/components/skip-to-element.js" >}}
```

### 範例 3: Landmark 頁面路徑處理

#### Jekyll 版本

```markdown
{% capture path %}{{ site.url }}{% link _components/landmark/blank.html %}{% endcapture %}

[空白範本]({{ path }})原始碼。

<div class="bg-layer1 overflow-auto f6 ph3 pv3 highlight maxh br3 fs7">
  <pre data-fetch-url="{{ path }}"></pre>
</div>
```

#### Hugo 版本

```markdown
[空白範本](/components/landmark/blank.html)原始碼。

<div class="bg-layer1 overflow-auto f6 ph3 pv3 highlight maxh br3 fs7">
  <pre data-fetch-url="/components/landmark/blank.html"></pre>
</div>
```

## 常見問題解答

### Q1: 路徑連結失效怎麼處理？

**A**:

- 檢查檔案是否存在於正確位置
- 使用相對路徑而非絕對路徑
- 確認 Hugo 的 `baseURL` 設定正確

### Q2: CSS 或 JS 資源載入失敗？

**A**:

- 使用 `{{< asset-css >}}` 和 `{{< asset-script >}}` shortcodes
- 檢查資源檔案是否在 `assets/` 或 `static/` 目錄
- 確認路徑大小寫正確

### Q3: 多語言功能異常？

**A**:

- 檢查 `hugo.toml` 中的語言設定
- 確認 `i18n` 參數格式正確
- 驗證語言資源檔案存在

### Q4: Partial 模板找不到？

**A**:

- 檢查 partial 檔案是否在 `layouts/partials/` 目錄
- 確認檔案路徑和名稱正確
- 檢查 partial 模板語法是否正確

### Q5: 如何處理 Jekyll 的 `capture` 語法？

**A**:

- 大部分情況下可以直接使用 shortcode 替代
- 複雜的情況可以建立自訂 shortcode
- 簡單的可以直接內嵌 HTML

---

## 總結

從 Jekyll 遷移到 Hugo 主要是為了獲得更好的效能和更簡潔的語法。遷移過程中最重要的是：

1. **理解兩者的差異**: 特別是檔案命名和語法系統
2. **善用 Shortcodes**: 讓複雜的操作變得簡單

透過本指南，可以有效率地完成遷移工作，同時保持專案的完整性和功能性。

---

_最後更新：2025 年 6 月 17 日_
