---
title: 注意事項 (Caveat)
maturity: "new"
---

### 用途與使用時機

注意事項是 AI 回覆的提醒寫作模式：以既有的訊息輸入區說明文字與警告文字樣式，告訴使用者 AI 回覆的限制與核對方式。本頁說明何時提醒、寫什麼與放在哪裡，不提供新的元件程式，也不需要 JavaScript。

| 情境 | 做法 |
|---|---|
| 提供訊息輸入區的 AI 對話服務 | 固定顯示基本提醒 |
| 服務能寫出具體限制、可能影響與核對管道 | 在該則回覆加上情境化提醒 |
| 只能說「AI 可能有誤」，沒有可核對的管道 | 只用基本提醒，不加情境化提醒 |
| 資料蒐集告知、模型訓練或長期資料偏好 | 改用[知情同意]({{< ref "components/ai/consent/_index.md" >}})或[資料授權]({{< ref "components/ai/data-ownership/_index.md" >}}) |

提醒不判斷 AI 回覆是否正確，也不代替服務驗證或人工判斷。兩個範例的「HTML」區只列採用者需要放入的提醒結構，不含靜態展示用的輸入區與訊息氣泡；其中的連結為示意網址，須改為服務的正式來源。

### 基本提醒

{{< live-example partial="ai/caveat/footer-demo.html" source="ai/caveat/composer-footer.html" >}}

- 固定文案：「AI 回覆可能不完整或有誤，請以正式資訊為準。」
- 放在訊息輸入欄之後、送出按鈕之前，位於 `role="log"` 之外；以唯一 `id` 關聯到送出按鈕的 `aria-describedby`，讓鍵盤使用者送出前可聽到提醒。
- 範例中的「送出訊息」為不可操作的靜態示意。

### 情境化提醒

{{< live-example partial="ai/caveat/output.html" source="ai/caveat/response-verification.html" >}}

情境化提醒放在該則回覆內、正文之後，並且一定要寫出下列三項：

| 項目 | 具體寫法 | 避免 |
|---|---|---|
| 限制 | AI 無法確認您是否符合資格，也無法查詢目前的受理狀態 | AI 可能有誤 |
| 可能影響 | 只依這則回覆準備資料，可能遺漏服務要求的條件或文件 | 可能造成問題 |
| 核對行動 | 由服務提供並維護的正式申辦頁連結 | 請自行查證，或由 AI 產生的網址 |

### 檢核清單

- 一則回覆最多一個情境化提醒，與回覆一起出現，不在事後另外補加。
- 情境化提醒提供基本提醒以外的資訊，不重複相同文案。
- 提醒直接可見，不提供關閉或「已讀」控制。
- 沒有情境化提醒的回覆，也不代表內容已經核實；基本提醒須持續顯示。
- 依頁面階層調整標題層級，不只靠顏色傳達限制。

#### 使用的既有樣式

- 基本提醒：[訊息輸入區]({{< ref "components/ai/chat-composer/_index.md" >}})的 `.chat-composer__hint`。
- 情境化提醒：[警告文字]({{< ref "components/warning-text/_index.md" >}})的 `.warning-text`；放在[訊息氣泡]({{< ref "components/ai/message-bubble/_index.md" >}})內時，正文加上 `.message-bubble__body--structured`，避免 HTML 縮排被保留為換行。

#### 親和力

- 基本提醒是原生段落；情境化提醒是原生 `section`、標題、具標籤的段落與連結。兩者都不新增 `alert`、live region 或自訂鍵盤操作。
- 提醒不另外發出通知；對話容器若使用 `role="log"`，由它新增內容時的既有行為決定是否播報。

#### 參考

- [Caveat](https://www.shapeof.ai/patterns/caveat) - Shape of AI
- [Explainability + Trust](https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/) - People + AI Research
- [Understanding Success Criterion 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) - W3C WAI
