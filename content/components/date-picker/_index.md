---
title: 日期選擇 (Date Picker)
maturity: "new"
---

### 基本 Date Picker

{{< live-example partial="date-picker/basic.html" >}}

#### CSS

- `.dp__input--native`：原生 `<input type="date">`，無 JS 或觸控裝置時使用。
- `.dp__input--enhanced`：JS 增強後的 text input（`role="combobox"`）。
- `.dp__dialog`：月曆面板容器（`role="dialog"`）。
- `.dp__cell-btn`：日期格子按鈕，狀態由 `aria-current="date"`、`aria-selected`、`aria-disabled` 驅動。
- `.dp__feedback`：`<output>` 元素，選取日期後由輔助科技播報。

#### 親和力

- 採 combobox + dialog + grid 架構，符合 [W3C APG Date Picker Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/) 模式。
- 月曆開啟後方向鍵移動日期、Enter／Space 選取、ESC 關閉、Tab 焦點陷阱。月份與年度切換使用導覽按鈕。
- 超出 `data-min` / `data-max` 範圍的日期使用 `aria-disabled="true"`（非 HTML `disabled`），鍵盤仍可經過。
- 星期欄位由 `<th scope="col" aria-label="星期X">` 提供完整語境，日期格子由格線結構自動帶出星期與日期資訊。

#### JavaScript

- 使用 [`date-picker.js`]({{< relURL "js/components/date-picker.js" >}})。
- 無 JS 時：使用原生 `<input type="date">`。觸控裝置（`pointer: coarse`）不啟動自訂月曆，維持原生體驗。

#### 參考

- [Maybe You Don't Need a Date Picker](https://adrianroselli.com/2020/07/maybe-you-dont-need-a-date-picker.html) - Adrian Roselli
- [Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/) - ARIA Authoring Practices Guide
- [Ask users for dates](https://design-system.service.gov.uk/patterns/dates/) - UK GDS

{{< asset-css "css/components/date-picker.css" >}}
{{< asset-script "js/components/date-picker.js" >}}
