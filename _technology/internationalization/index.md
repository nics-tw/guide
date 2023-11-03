---
title: 多國語系支援
layout: main
---

### 提供多國語系版本網站

在資源充裕的狀態下，理想上我們應盡量提供多國語系的頁面，確保我們能盡可能縮小在台灣生活的多元族群所得到的資訊落差。提供語言選單時，使用 <span lang="en">[`hreflang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang)</span> 標記指示語言之間的關係，以幫助翻譯服務將使用者導向適當的語言版本。

### 提供可準確被程式閱讀的網站

在無法有效提供多國語系的翻譯情況下，應盡量提提供可以讓輔助軟體（如 JAWS, NVDA, VoiceOver）和翻譯服務（如 Google Translate, Edge Translator）做出做精準的翻譯的網頁內容。

#### 用 `lang` 指定語言

在 HTML 中使用 `lang` 屬性來標識每個區塊的語言。這有助於翻譯服務識別和處理不同語言的內容。

{% capture html %}<div>事情</div>
會被念為ㄕˋㄑㄧㄥˊ。
<div lang="ja">事情</div>
會被念為じじょう。{% endcapture %}
{% include example.html content=html %}

#### 避免文字在圖像中

儘量避免將文字內容放在圖像中，因為這些文字無法被翻譯服務識別和翻譯。如果必須在圖像中包含文字，請提供相應的替代文字（`alt`）。

#### 使用 `alt` 屬性

在圖像 `<img>` 和多媒體內容，使用 `alt` 屬性提供描述性的文字。這有助於翻譯服務識別並翻譯這些文字。

#### 提供影片字幕檔案

透過 `<video>` 或外部服務在網頁上播放影片時，應該使用字幕檔案，如 `webvtt` 提供不同語系的內容，而非將字幕直接透過後製上在影片檔案內。
