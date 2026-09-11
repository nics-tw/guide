---
title: 知情同意 (Consent)
maturity: "new"
---

### 使用時機

知情同意用於在使用者提供對話資料前，告知資料蒐集目的、使用範圍與相關權益。本範例示範「告知 → 選擇 → 服務確認 → 才開放訊息輸入區」：只選取「同意」不代表選擇已保存，也不代表服務可開始處理訊息。

這是開始對話前的事前告知，不是長期資料偏好。持續管理資料用途請參考[資料授權 (Data Ownership)]({{< ref "components/ai/data-ownership/_index.md" >}})；Cookie Banner 處理網站 Cookie，不能代替特定 AI 對話功能在處理資料前的告知與選擇。

範例只處理使用者主動送出的對話資料，不鼓勵提供個人資料、機密內容或未經授權的他人資料。不同意時不提供對話資料，可改用服務說明、客服或臨櫃等其他服務管道。

### 基本範例

{{< live-example partial="ai/consent/basic.html" source="ai/consent/basic-source.html" >}}

- 蒐集目的、資料及使用範圍、保存假設與相關權益都在選項前直接可見，不只放在政策連結中。
- 不預選任何項目；選取 radio 不會傳送訊息、保存選擇或開放輸入區，仍須明確送出。

### 提交失敗後重試

{{< live-example partial="ai/consent/error.html" source="ai/consent/error-source.html" >}}

- 失敗頁由伺服器回填先前明確提交的合法值；範例保留「不同意」，但不把保存失敗、未選或非法值當成同意。
- 保存失敗是表單層級訊息，不代表 radio 值無效，因此不使用 `aria-invalid`、`role="alert"` 或自動聚焦。
- 勾選「模擬送出失敗」後，每次送出都會模擬失敗；關閉後可保留或更改選擇，再次送出查看對應流程。

### 採用與後端接線

每份表單的 `id` 必須在整頁唯一；同頁有多份表單時，也應依對話服務、目的或範例提供可區別的可見標題，不能只替換 `id`。`name="data_consent"` 與 `value="agree"`／`value="decline"` 是表單資料契約；`required` 讓未選狀態無法送出，`checked` 只可由伺服器依先前實際提交值回填。不同目的須分開選擇，不能將模型訓練等其他用途綑綁為開始對話的同意。

正式服務還必須：

- 由已驗證的使用者與本次對話工作判定資格，不信任任意 client ID。
- 由伺服器輸出 CSRF token、可信的表單版本及 opaque context，並核對呈現時與送出時的用途版本。
- 驗證允許值、權限與冪等性；保存同意且資格成立後，才提供真正的訊息輸入區。對話資料 endpoint 仍須重新驗證，不能把前端 `hidden` 當成安全邊界。
- 不同意、未選、非法值、過期用途、未授權、CSRF 失敗或保存失敗都不得進入對話資料處理。
- 依實際服務提供查詢、更正、刪除或停止後續處理的入口、可聯絡窗口與處理結果；不能保證停止後續處理會消除先前已完成的處理。

可採用 source 在無 JavaScript 時仍會原生 `POST` 到 <code>/conversations/<wbr>example/<wbr>consent</code>。本文件的 demo 為了在靜態網站展示，改用 `GET` 回到同頁；網址參數只帶回示範選項，固定說明不會把它冒充成已保存的選擇。

#### 後端成功頁

下列片段只能在伺服器驗證並保存後渲染。`decline` 代表不進入 AI 對話、不要求提供訊息；若保存 `agree`，也只能開放受控的訊息輸入區，不能宣稱訊息已提供或處理。

{{< code-example content=`<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8">
    <title>選擇已保存</title>
  </head>
  <body>
    <main>
      <h1>選擇已保存</h1>
      <p>你選擇不同意提供對話資料供本次 AI 服務使用。</p>
      <p>本次流程不會進入 AI 對話，也不會要求你提供訊息；你可以改用其他服務管道。</p>
      <p><a href="/conversations/example/data-policy">查看資料使用與權益說明</a></p>
    </main>
  </body>
</html>` class="mb3" >}}

<div id="consent-demo-fallback">

#### 靜態示範送出說明

靜態示範沒有保存選擇。停用 JavaScript 或 demo 模組載入失敗時，送出後只會以 `data_consent` 網址參數回到本頁；正式採用不得把這個 `GET` 流程當成後端保存。

</div>

<div id="consent-demo-policy">

#### 示範資料使用與權益說明

本頁假設對話資料只用於產生回覆及維持本次對話脈絡、不對外分享也不用於模型訓練，並在本次對話結束後刪除。這些是虛構條件，不是本網站的資料政策；本頁也沒有真實的權益處理窗口。正式服務必須提供實際處理範圍、保存方式、可聯絡窗口與處理結果。

</div>

#### CSS

- `.consent`：表單容器；`.consent__title`／`.consent__intro`／`.consent__description`／`.consent__alternative`：標題與事前告知。
- `.consent__details`：蒐集目的、資料及使用範圍、保存與相關權益；`.consent__choices`／`.consent__hint`／`.consent__choice`：必要單選群組與選項。
- `.consent__example-note`／`.consent__error`／`.consent__actions`：虛構條件警告、保存失敗訊息與送出區。
- `.guide-demo-consent__conversation`／`.guide-demo-consent__header`／`.guide-demo-consent__composer-preview`：文件頁的對話開始前情境示意，不屬於可採用 source。
- `.guide-demo-consent__next`：文件頁送出後的流程示意，不屬於可採用 source。

#### 親和力

- 使用原生 `form`、`fieldset`／`legend`、radio、label 與 submit；沒有自訂鍵盤操作。核心告知、不同意替代方式及政策入口都在選項之前可見。
- 選項不預選且視覺權重相同。改選本身不提交、不導頁，也不顯示或執行下一步。
- Consent 位於對話紀錄 `role="log"` 之外；服務確認、失敗與第一則對話訊息的播報責任由採用服務分別安排，避免重複播報。
- 文件 demo 的 `role="status"` 是唯一通知區，只回報同步流程示意；同意與不同意的下一步是非 live、互斥的可見內容，且不移動焦點。
- 輔助科技可能略過連續相同的 status 文字，文件 demo 不保證每次重送相同結果都會重新朗讀。
- 螢幕閱讀器、Safari、語音控制、權益理解及 200%／400% 真實縮放仍須在採用服務與整批發布前人工驗證；本頁不宣稱已通過 WCAG AA。

#### JavaScript

Consent 產品不需要核心 JavaScript 或 Custom Element。原生表單應直接連到服務後端；文件頁的 `consent.demo.js` 只模擬同步分支，不提供真實資料欄位、不執行網路請求、不保存資料，也不是可採用的 SDK。

#### 參考

- [Consent](https://www.shapeof.ai/patterns/consent) - Shape of AI
- [Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/) - W3C WAI
- [Understanding Success Criterion 3.2.2: On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html) - W3C WAI
- [User Notification](https://www.w3.org/WAI/tutorials/forms/notifications/) - W3C WAI
- [Radios](https://design-system.service.gov.uk/components/radios/) - GOV.UK Design System

{{< asset-script "js/demo/consent.demo.js" >}}
