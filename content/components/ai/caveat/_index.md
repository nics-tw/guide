---
title: 注意事項 (Caveat)
maturity: "new"
---

### 用途與邊界

注意事項 (Caveat) 用來揭露 AI 服務限制與使用提醒，協助使用者理解回覆內容之參考性質。請將具體限制、可能後果與核對行動放在相關輸入或輸出旁。

提示應直接可見，不提供關閉或「已讀」控制。使用者讀過提示不代表風險已消除，此模式也不能代替知情同意、服務驗證或人工判斷。

### 回覆旁的注意事項

{{< live-example partial="ai/caveat/output.html" >}}

- 在 AI 回覆旁說明內容僅供參考、不是正式公告，並指出 AI 無法查證後續異動、可能省略暫定條件。
- 核對清單將日期、地點與報名方式逐項對應到示範原始資料。

### 輸入前範例

{{< live-example partial="ai/caveat/input.html" >}}

- 短限制說明放在控制之前，並以 `aria-describedby` 關聯對應 textarea。
- 這是可編輯的原生輸入示範，不會送出、儲存或產生 AI 回答。

### 採用方式

兩份 partial 都是可直接採用的原生 HTML，內容結構使用原生元素，視覺提示沿用既有的 Warning Text 樣式。不需要另外下載 demo 或 runtime 腳本。採用端必須：

- 把虛構內容換成實際流程的能力範圍、資料缺口、可能後果與核對方法。
- 讓來源資料可追溯，不以 AI 自行產生的文字冒充原始來源。
- 同頁重複使用時，為每組標題、控制、說明與 fragment target 建立唯一 `id`，並同步 `for`、`aria-labelledby`、`aria-describedby` 及 `href`。
- 載入既有 Warning Text 樣式；不要只靠框線或警示色傳達限制。

### 內容與位置檢核

提示至少應回答：這次 AI 處理涵蓋什麼、可能缺少或誤解什麼、直接使用會有什麼後果，以及使用者如何核對。這是撰寫檢核，不要求介面固定拆成四個欄位。

限制應放在相關控制之前或輸出答案旁，避免使用者完成操作後才看見。若同一頁同時有輸入與輸出提示，應各自只說明所屬情境，不重複堆疊通用警語。

#### 親和力

- 使用原生 `section`／`article`、標題、label、textarea、段落、清單與同頁連結，沒有新增 `alert`、live region 或自訂鍵盤操作。
- 輸入欄位只關聯短限制段落，不把長篇來源資料重複當成 description。
- 靜態內容在無 JavaScript 時相同可讀；若採用端動態加入內容，通知與焦點策略由該流程負責，Caveat 不另建 announcer。
- 螢幕閱讀器、Safari、語音控制、fragment 閱讀位置及 200%／400% 真實縮放仍須在整批發布前人工驗證；本頁不宣稱已通過 WCAG AA。

#### CSS

- `.warning-text`：沿用既有警告文字的框線與顏色；Caveat 不新增 class 或樣式資產。

#### JavaScript

不需要 JavaScript。textarea 保留原生編輯與調整大小；同頁連結使用瀏覽器原生 fragment 行為。

#### 參考

- [Caveat](https://www.shapeof.ai/patterns/caveat) - Shape of AI
- [Explainability + Trust](https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/) - People + AI Research
- [ARIA1: Using the aria-describedby property to provide a descriptive label for user interface controls](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA1.html) - W3C WAI
- [Understanding Success Criterion 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) - W3C WAI
- [警告文字 (Warning Text)]({{< ref "components/warning-text/_index.md" >}})
