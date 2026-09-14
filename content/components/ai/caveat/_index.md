---
title: 注意事項 (Caveat)
maturity: "new"
---

### 用途與邊界

注意事項 (Caveat) 用來揭露 AI 服務限制與使用提醒，協助使用者理解回覆內容之參考性質。此變體只用在 AI 回覆後已有一個**正式服務行動群組**時，讓使用者在開始申辦、查詢進度、預約、繳費或下載正式表件前，知道必須回到正式服務頁面核對。

這不是所有可能有誤回答的萬用警語，也不是讓採用端判讀模型品質的工具。FAQ、一般公告、純參考連結與 AI 自行產生的網址，不是此變體的採用對象。沒有可追溯的正式服務行動群組時，不渲染 Caveat。

提示應直接可見，不提供關閉或「已讀」控制。使用者讀過提示不代表風險已消除，此模式也不能代替知情同意、服務驗證或人工判斷。

### 正式服務行動前的注意事項

{{< live-example partial="ai/caveat/output.html" >}}

- 同一則回覆固定依序放置：**回答 → Caveat → 正式服務行動群組 → 下一輪輸入**。
- 範例以既有的訊息氣泡樣式呈現使用者提問與 AI 回覆；它是靜態情境，不建立 `role="log"`、訊息操作或任何對話執行期行為。
- 一個正式服務行動群組可以有多個連結或按鈕，但群組前只放一則 Caveat；不要為每個連結重複提示。
- 範例中的服務連結均為虛構示範，不代表可使用的服務。採用服務必須自行提供並維護真正的正式服務頁面。

### 採用方式

這份 partial 使用原生 HTML，視覺提示沿用既有的 Warning Text 樣式。不需要另外下載 demo、runtime 腳本或 JavaScript。採用端只需確認：

1. 連結或按鈕是服務機關定義的正式服務行動，而非 AI 的建議或未驗證外部網址。
2. 它們被放在同一個正式服務行動群組，且群組前有固定 Caveat。
3. 正式服務頁面本身由內容所有者維護；Caveat 只引導核對，不替資格、連結或受理結果背書。

固定提示為：「AI 回覆不代表官方資格、受理狀態或最新規定。開始下一步前，請以正式服務頁面為準。」服務可補充具體事實，但不得只留下「AI 可能有誤」等泛用句。

### 內容與位置檢核

- 不判斷 AI 回覆是否正確、完整、過期或「風險高」，也不建立偵測規則、信心分數、後端欄位、事件或通知邏輯。
- Caveat 隨同該則完整回覆一次插入，不在回覆後非同步補加。若對話容器使用 `role="log"`，其既有新增內容播報是唯一可能的通知來源；Caveat 不另建 announcer。
- 不把 Caveat 用於 Consent、資料處理告知、模型訓練或長期資料偏好；這些是其他元件或服務流程的責任。
- 同頁重複使用時，為標題與行動群組建立唯一 `id`，並同步 `aria-labelledby`。不要只靠框線或警示色傳達限制。

#### 親和力

- 使用原生 `article`、`section`、標題、段落、清單與連結，沒有新增 `alert`、live region 或自訂鍵盤操作。
- 靜態內容在無 JavaScript 時相同可讀；若採用端動態加入完整回覆，通知與焦點策略由該流程負責，Caveat 不另建 announcer。
- 螢幕閱讀器、Safari、語音控制與 200%／400% 真實縮放仍須在整批發布前人工驗證；本頁不宣稱已通過 WCAG AA。

#### CSS

- `.warning-text`：沿用既有警告文字的框線與顏色；Caveat 不新增 class 或樣式資產。

#### JavaScript

不需要 JavaScript。正式服務行動使用服務既有的連結或按鈕結構；Caveat 不建立 API、狀態或模型品質偵測。

#### 參考

- [Caveat](https://www.shapeof.ai/patterns/caveat) - Shape of AI
- [Explainability + Trust](https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/) - People + AI Research
- [Understanding Success Criterion 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) - W3C WAI
- [警告文字 (Warning Text)]({{< ref "components/warning-text/_index.md" >}})
