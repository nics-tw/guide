---
title: 知情同意 (Consent)
maturity: "new"
---

### 使用時機

知情同意用於使用者提供對話資料前，告知蒐集目的、使用範圍與相關權益。流程為「告知 → 選擇 → 服務確認 → 開放訊息輸入區」，只選取「同意」不代表選擇已保存。它是開始對話前的事前告知，不是長期資料偏好（持續管理請改用[資料授權 (Data Ownership)]({{< ref "components/ai/data-ownership/_index.md" >}})），也不能以網站的 Cookie Banner 代替。

### 基本範例

{{< live-example partial="ai/consent/basic.html" source="ai/consent/basic-source.html" >}}

- 告知與不同意時的替代管道在選項前可見；初始不預選，改選也不會送出。
- 明確送出後顯示並聚焦對應的「下一步」標題。表單下方「示範設定」中的「模擬送出失敗」可檢查錯誤訊息與重試；本頁沒有真實對話服務。

<div id="consent-demo-policy">

#### 範例資料說明

表單中的資料用途與保存方式都是虛構條件，並非本網站的資料政策。正式服務須提供實際處理範圍、保存方式與權益聯絡窗口。

</div>

<div id="consent-demo-fallback">

#### 停用 JavaScript 時

靜態示範只會以網址參數返回本頁，不會保存選擇；正式服務須由後端接收並保存。

</div>

### 採用方式

可採用的 HTML 以原生表單 `POST` 至服務後端（本頁示範改用 `GET`，只為了在沒有後端時返回本頁）。請把表單中的資料條件、提交網址與政策連結換成服務的實際內容。

- 表單 `id` 在頁面中唯一，並有可區別的可見標題；保留 `name="data_consent"`、`agree`／`decline` 值與 `required`，初始不預選，只依伺服器收到的合法選擇回填 `checked`。
- 不同資料用途各自提供明確選擇，不把模型訓練等其他用途綁成開始對話的條件。
- 同意是否成立由服務端判斷：驗證實際提交的值與告知版本（使用者同意時所見告知內容的版本），確認已保存後才開放訊息輸入。未同意、選擇無效、版本過期或保存失敗時，不處理對話資料；訊息 API 也須自行確認同意狀態，不能只靠畫面鎖定。
- 保存失敗時保留先前實際提交的合法選擇，在表單內的 `.consent__error` 顯示「選擇尚未保存，請重試。」並移除 `hidden`，允許重試；這是表單層級錯誤，不要把選項標為 `aria-invalid`。
- `.consent`（含 `.consent__error`）是可採用的樣式；`.guide-demo-consent`、`consent.demo.js` 與表單外的示範結果區（`[data-consent-demo-result]`）只供本頁示範，正式服務不需要。

#### 親和力

- 使用原生 `form`、`fieldset`／`legend`、radio、label 與 submit，避免選取時自動提交或導頁。
- Consent 應置於對話紀錄 `role="log"` 之外；成功、失敗與第一則訊息的播報由服務協調，避免重複。
- 若以 JavaScript 在同一頁顯示保存結果、不重新載入頁面，可比照本頁示範：成功後將焦點移至下一步的標題，失敗時移至錯誤訊息。

#### 參考

- [Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/) - W3C WAI
- [Understanding Success Criterion 3.2.2: On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html) - W3C WAI
- [User Notification](https://www.w3.org/WAI/tutorials/forms/notifications/) - W3C WAI

{{< asset-script "js/demo/consent.demo.js" "short-error-v3" >}}
