---
title: 步驟指示器 (Progress Stepper)
maturity: "new"
---

### 說明

- 步驟指示器（Progress Stepper）用於向使用者呈現其在多步驟流程中的進度，例如線上申辦、多頁表單、結帳等情境。
- 適合用於有明確線性順序、且可拆分為 3 個以上階段的流程。

### 預設（含標籤）

{{< live-example partial="progress-stepper/progress-stepper_default.html" >}}

### 含編號

以數字圓圈強化「第幾步」的視覺暗示，適合需要強調步驟順序的流程。

{{< live-example partial="progress-stepper/progress-stepper_counters.html" >}}

### 無標籤

當步驟名稱過長或空間有限時使用。整個步驟清單以 `aria-hidden="true"` 隱藏避免螢幕報讀軟體朗讀無意義資訊，進度資訊仍由下方標題傳達。

{{< live-example partial="progress-stepper/progress-stepper_no-labels.html" >}}

#### CSS

- `.progress-stepper`：最外層容器。
- `.progress-stepper--counters`：數字編號變體。
- `.progress-stepper--no-labels`：無標籤變體。
- `.progress-stepper__segments`：步驟清單（`ol`）。
- `.progress-stepper__segment`：單一步驟項目（`li`）。
- `.progress-stepper__segment--complete`：已完成步驟。
- `.progress-stepper__segment--current`：目前步驟。
- `.progress-stepper__label`：步驟文字標籤。
- `.progress-stepper__counter`：數字編號圓圈（僅 `--counters` 變體）。
- `.progress-stepper__status-text`：視覺隱藏的完成狀態文字（供螢幕報讀軟體朗讀）。
- `.progress-stepper__heading`：步驟指示器下方的標題區。
- `.progress-stepper__heading-counter`：「第 N 步，共 M 步」文字。

#### 使用規範

- **明顯區別目前步驟**：目前步驟應是視覺上最為突出的，其次是已完成步驟，未完成步驟最弱；但未完成步驟仍需符合色彩對比規範，不應看起來像「停用」狀態。
- **使用簡短標籤**：標籤請用短詞或單一詞彙；若標籤過長，改採用無標籤版本。
- **導覽另外提供**：步驟指示器不負責頁面切換；請以「上一步／下一步」按鈕提供導覽。
- **標題放在指示器下方**：每個步驟頁面都應有明確的頁面標題；步驟指示器的標籤不足以作為頁面標題。
- **顯示「第 N 步，共 M 步」**：在標題旁顯示目前進度數字，強化使用者對流程的掌握。
- **避免過多步驟**：若步驟超過 6 個，應考慮拆分為多個子流程或改用其他呈現方式。

#### 親和力

- 使用 `<ol>` 原生有序清單語意呈現步驟。
- 以 `aria-current="step"` 標示目前所在的步驟項目，讓輔助科技使用者得知自己位於整個流程的何處。
- 每個步驟內以視覺隱藏的文字補上「已完成」「未完成」等完成狀態，避免僅以顏色傳達資訊。
- 目前步驟不加「已完成／未完成」狀態文字，避免重複朗讀。
- 無標籤變體將整個 `<ol>` 以 `aria-hidden="true"` 隱藏，因為其中無實質內容；進度資訊由下方的「第 N 步，共 M 步」與步驟名稱標題傳達，確保輔助科技使用者仍能獲得完整資訊。
- `--counters` 變體中的數字圓圈僅為視覺裝飾，以 `aria-hidden="true"` 隱藏，避免螢幕報讀軟體朗讀出與順序重複的數字。
- 步驟指示器本身不具互動功能，因此不需處理鍵盤焦點；若未來要將各步驟設計為可點擊回溯，應改為 `<a>` 或 `<button>`，並處理 `:focus-visible` 樣式。

### 參考資料

- [U.S. Web Design System - Step indicator](https://designsystem.digital.gov/components/step-indicator/)
- [デジタル庁デザインシステム - Step navigation](https://design.digital.go.jp/dads/components/step-navigation/)
- [MDN - aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
