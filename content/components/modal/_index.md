---
title: 互動視窗 (Modal)
maturity: "new"
---

### 基本 Modal

{{< live-example partial="modal/basic.html" >}}

#### CSS

- `data-modal-trigger="[id]"`：觸發按鈕，對應 `<dialog>` 的 `id`。
- `data-modal-close`：關閉按鈕。
- `data-modal-no-backdrop-close`：加在 `<dialog>` 上，停用點擊遮罩關閉行為（適用於含表單的 Modal）。
- `.modal-header` / `.modal-body` / `.modal-footer`：Modal 內容區塊。

#### 親和力

- 使用原生 `<dialog>` 元素搭配 `showModal()`，瀏覽器原生提供 focus trap 與 ESC 關閉。
- 開啟時焦點移至 `<dialog>` 本身（需設 `tabindex="-1"`），使螢幕閱讀器先宣告標題後再讓使用者操作。
- 關閉時焦點還原至觸發按鈕。
- 圖示型關閉按鈕須加 `aria-label="關閉"`；使用文字「關閉」則不需要。

#### JavaScript

- 使用 [`modal.js`]({{< relURL "js/components/modal.js" >}})。

#### 參考

- [Having an open dialog](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html) - Scott O'Hara
- [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) - ARIA Authoring Practices Guide
- [Dialog focus in screen readers](https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html) - Adrian Roselli

{{< asset-script "js/components/modal.js" >}}
