---
title: 注意事項 (Caveat)
maturity: "new"
---

### 用途與邊界

注意事項 (Caveat) 用來揭露 AI 服務限制與使用提醒，協助使用者理解回覆內容之參考性質。它固定放在對話輸入區下方，讓整個對話介面都有一致、可預期的提醒位置。

這不是讓採用端判讀模型品質的工具，也不隨特定回答、連結或服務行動出現。採用端不需要判斷回答是否正確、完整、過期或「風險高」；只要對話服務有可見的訊息輸入區，就在其後放入固定提示。

提示應直接可見，不提供關閉或「已讀」控制。使用者讀過提示不代表風險已消除，此模式也不能代替知情同意、服務驗證或人工判斷。

### 對話輸入區下方的注意事項

{{< live-example partial="ai/caveat/output.html" source="ai/caveat/composer-footer.html" >}}

- 同一個對話介面固定依序放置：**對話紀錄 → 訊息輸入區 → Caveat**。
- 範例以既有的訊息氣泡樣式呈現使用者提問與 AI 回覆；輸入區是靜態位置示意，不建立 `role="log"`、訊息操作或任何對話執行期行為。
- 「HTML」區只列緊接在實際訊息輸入區後方的 Caveat，不包含使用者提問、訊息氣泡或輸入控制項。
- 一個對話介面只放一則 Caveat；它不會因為回答內容、正式服務連結或下一輪訊息而重複出現。

### 採用方式

這份 partial 使用原生 HTML，視覺提示沿用 Chat Composer 的既有說明文字樣式。不需要另外下載 demo、runtime 腳本或 JavaScript。採用端只需確認：

1. 對話服務有可見的訊息輸入區。
2. 將 partial 放在輸入區後方，而不是 `role="log"` 或單一 AI 回覆中。
3. 同一個對話介面只輸出一則固定 Caveat，不隨訊息串流或回答內容重複加入。

固定提示為：「AI 回覆僅供參考，可能不完整或有誤，請以正式資訊為準。」如服務需要補充特定限制，應由回覆內容或正式服務流程說明；Caveat 保持固定，避免同時出現互相矛盾的通用提醒。

### 內容與位置檢核

- 不判斷 AI 回覆是否正確、完整、過期或「風險高」，也不建立偵測規則、信心分數、後端欄位、事件或通知邏輯。
- Caveat 是輸入區後方的靜態服務文字，不是每一則回覆的一部分。若對話容器使用 `role="log"`，Caveat 必須放在該容器外，且不另建 announcer。
- 不把 Caveat 用於 Consent、資料處理告知、模型訓練或長期資料偏好；這些是其他元件或服務流程的責任。
- 採用用 partial 不含 `id` 或互動控制，同頁不會有重複 ID 的額外負擔。不要只靠顏色傳達限制。

#### 親和力

- 採用用 partial 是原生段落，沒有新增 `alert`、live region 或自訂鍵盤操作。
- 靜態內容在無 JavaScript 時相同可讀；訊息串流、通知與焦點策略由對話服務負責，Caveat 不另建 announcer。
- 螢幕閱讀器、Safari、語音控制與 200%／400% 真實縮放仍須在整批發布前人工驗證；本頁不宣稱已通過 WCAG AA。

#### CSS

- `.chat-composer__hint`：沿用既有輸入區說明文字樣式；Caveat 不新增 class 或樣式資產。

#### JavaScript

不需要 JavaScript。Caveat 不建立 API、狀態、模型品質偵測或訊息事件。

#### 參考

- [Caveat](https://www.shapeof.ai/patterns/caveat) - Shape of AI
- [Explainability + Trust](https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/) - People + AI Research
- [Understanding Success Criterion 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) - W3C WAI
- [對話輸入區 (Chat Composer)]({{< ref "components/ai/chat-composer/_index.md" >}})
