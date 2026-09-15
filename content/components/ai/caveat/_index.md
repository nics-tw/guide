---
title: 注意事項 (Caveat)
maturity: "new"
---

### 用途與邊界

注意事項 (Caveat) 用來揭露 AI 服務限制與使用提醒，協助使用者理解回覆內容之參考性質。它提供兩個互補變體：提供訊息輸入區的對話服務可使用的基本提醒，以及只在有具體限制與核對行動時使用的情境化提醒。

兩個變體都不處理模型品質判讀、信心分數或自動風險分類。基本提醒不需要服務提供額外資料；情境化提醒只有在服務本來就能提供三項具體事實時才使用：AI 無法確認的事項、因此可能造成的影響，以及使用者可前往核對的正式管道或明確下一步。

提示應直接可見，不提供關閉或「已讀」控制。使用者讀過提示不代表風險已消除，此模式也不能代替知情同意、服務驗證或人工判斷。

### 基本提醒

{{< live-example partial="ai/caveat/footer-demo.html" source="ai/caveat/composer-footer.html" >}}

- 放在訊息輸入區下方，作為整個對話服務的固定提醒。
- 適用於提供訊息輸入區的對話服務；不需要由 AI 判斷或產生內容，也不需要服務情境、連結或後端欄位。
- 「HTML」區只列採用端放在輸入區後方的文字，不包含靜態展示用的輸入區。
- 固定提示為：「AI 回覆可能不完整或有誤，請以正式資訊為準。」它不代替個別回答中的事實、正式來源或服務流程說明。

### 情境化提醒（有具體核對事項時）

{{< live-example partial="ai/caveat/output.html" source="ai/caveat/response-verification.html" >}}

- 同一則回覆固定依序放置：**回答 → Caveat → 下一輪輸入**。
- 範例以既有的訊息氣泡樣式呈現使用者提問與 AI 回覆；它是靜態情境，不建立 `role="log"`、訊息操作或任何對話執行期行為。
- 「HTML」區只列採用端放進該則 AI 回覆的 Caveat 結構，不包含使用者提問、訊息氣泡或輸入控制項。
- 一則回覆最多一個 Caveat。不要把同一個限制拆成多張提示，也不要用它取代回覆正文或正式服務說明。

### 採用方式

兩個變體都使用原生 HTML，不需要另外下載 demo、runtime 腳本或 JavaScript。採用端只需確認：

1. 在提供訊息輸入區的對話服務中，基本提醒固定放在訊息輸入區下方，不需要呼叫 AI 或提供額外資料。
2. 情境化提醒只有在服務能明確寫出限制、可能影響與核對行動時使用；不得只寫「AI 可能有誤」。
3. 情境化提醒的正式管道或下一步由服務提供；不得虛構連結或要求 AI 自行產生網址。

`限制`、`可能影響`與`核對行動`是情境化提醒的必要結構，不是由使用者在介面中輸入的欄位。原始碼中的連結是 placeholder；採用服務必須改為其提供並維護的正式來源。

### 內容與位置檢核

- 不判斷 AI 回覆是否正確、完整、過期或「風險高」，也不建立偵測規則、信心分數、後端欄位、事件或通知邏輯。
- 基本提醒放在 `role="log"` 外，作為輸入區後方的靜態服務文字。情境化提醒與該則完整回覆一起插入，不在回覆後非同步補加；若對話容器使用 `role="log"`，其既有新增內容播報是唯一可能的通知來源。
- 不把 Caveat 用於 Consent、資料處理告知、模型訓練或長期資料偏好；這些是其他元件或服務流程的責任。
- 兩種提醒可以同時可見，但情境化提醒必須提供基本提醒以外的具體資訊或核對行動；不要重複相同文案。
- 採用用 partial 不含 `id` 或互動控制；依周邊文件階層調整標題層級。不要只靠顏色傳達限制。

#### 親和力

- 基本提醒是原生段落；情境化提醒是原生 `section`、標題、具標籤的段落與連結。兩者都沒有新增 `alert`、live region 或自訂鍵盤操作。
- 靜態內容在無 JavaScript 時相同可讀；訊息串流、通知與焦點策略由對話服務負責，Caveat 不另建 announcer。
- 螢幕閱讀器、Safari、語音控制與 200%／400% 真實縮放仍須在整批發布前人工驗證；本頁不宣稱已通過 WCAG AA。

#### CSS

- `.chat-composer__hint`：基本提醒沿用既有輸入區說明文字樣式。
- `.warning-text`：情境化提醒沿用既有警告文字的框線與顏色；Caveat 不新增 class 或樣式資產。

#### JavaScript

不需要 JavaScript。Caveat 不建立 API、狀態、模型品質偵測或訊息事件。

#### 參考

- [Caveat](https://www.shapeof.ai/patterns/caveat) - Shape of AI
- [Explainability + Trust](https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/) - People + AI Research
- [Understanding Success Criterion 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) - W3C WAI
- [對話輸入區 (Chat Composer)]({{< ref "components/ai/chat-composer/_index.md" >}})
- [警告文字 (Warning Text)]({{< ref "components/warning-text/_index.md" >}})
