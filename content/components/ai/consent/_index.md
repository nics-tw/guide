---
title: 知情同意 (Consent)
maturity: "new"
---

### 使用時機

Consent 適合在處理會議錄音或逐字稿之前，讓每位參與者閱讀同一目的的告知，明確選擇同意或不同意，再自行送出。它不適合代替長期資料用途設定，也不能讓發起人代替全體參與者同意；持續管理用途請參考[資料授權 (Data Ownership)]({{< ref "components/ai/data-ownership/_index.md" >}})。Cookie Banner 處理網站 Cookie 的告知與選擇，本元件則處理具體 AI 錄音目的及每位參與者的決定，兩者不能互相替代。

下列服務條件只是假設情境。採用端必須改成可履行的用途、保存期限、拒絕替代方案及撤回流程，並確認符合自身的法遵要求。

### 基本範例

{{< live-example partial="ai/consent/basic.html" source="ai/consent/basic-source.html" >}}

- 不預選任何項目；選取 radio 不會送出表單或啟用 AI 紀錄。
- `action` 是占位網址。正式服務必須使用 `POST`，在伺服器完成身分、用途版本、允許值及 CSRF 驗證後才保存選擇。

### 保存失敗後重試

{{< live-example partial="ai/consent/error.html" source="ai/consent/error-source.html" >}}

- 失敗頁由伺服器回填先前明確送出的合法值；範例保留「不同意」，但不把保存失敗或缺少選擇當成同意。
- 保存失敗是表單層級訊息，不代表 radio 值無效，因此不使用 `aria-invalid`、`role="alert"` 或自動聚焦。
- 勾選「模擬送出失敗」後，每次送出都會模擬失敗；關閉後可保留或更改選擇，再次送出查看正常結果。

### 採用與後端接線

每份表單的 `id` 必須在整頁唯一；同頁有多份表單時，也應依會議、目的或範例提供可區別的可見標題，不能只替換 `id`。`name="recording_consent"` 與 `value="agree"`／`value="decline"` 是表單資料契約；`required` 讓未選狀態無法送出，`checked` 只可由伺服器依先前實際提交值回填。多個目的必須拆成不同選擇，不可用一項同意綑綁模型訓練等其他用途。

正式服務還必須：

- 由已驗證的 session 或 route 辨識參與者與會議，不信任任意 client ID。
- 由伺服器輸出 CSRF token、可信的表單版本及 opaque context，並核對呈現時與送出時的用途版本。
- 驗證允許值、權限與冪等性；保存完成後才顯示成功。全體條件成立前不得啟用 AI 處理。
- 提供可達的撤回與替代流程。不同意、未選、非法值、過期用途、未授權、CSRF 失敗或保存失敗都不得觸發錄音。

可採用 source 在無 JavaScript 時仍會原生 `POST`。本文件的 demo 為了在靜態網站展示，改用 `GET` 回到同頁；網址參數會帶回示範選項，但固定說明不會把它冒充成已保存的選擇。

#### 後端成功頁

下列片段只能在伺服器驗證並保存後渲染。即使保存 `agree`，也只能確認目前參與者的選擇，不能宣告全體已完成。

{{< code-example content=`<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8">
    <title>選擇已保存</title>
  </head>
  <body>
    <main>
      <h1>選擇已保存</h1>
      <p>你選擇不同意本次 AI 紀錄。</p>
      <p>本次會議不會因你的選擇啟用 AI 錄音，將改採人工紀錄流程。</p>
      <p><a href="/meetings/example/recording-policy">查看或撤回本次選擇</a></p>
    </main>
  </body>
</html>` class="mb3" >}}

<div id="consent-demo-fallback">

#### 靜態示範送出說明

靜態示範沒有保存選擇。停用 JavaScript 或 demo 模組載入失敗時，送出後只會以 `recording_consent` 網址參數回到本頁；正式採用不得把這個 `GET` 流程當成後端保存。

</div>

<div id="consent-demo-policy">

#### 示範政策與撤回方式

本頁假設錄音只用於產生本次會議逐字稿、不用於模型訓練，並在逐字稿確認後刪除。這不是本網站的資料政策。正式服務必須提供實際政策、撤回入口與可聯絡的服務窗口；撤回後的處理方式也必須由服務明確說明。

</div>

#### CSS

- `.consent`：表單容器；`.consent__title`／`.consent__intro`／`.consent__description`／`.consent__alternative`：標題與告知內容。
- `.consent__choices`／`.consent__hint`／`.consent__choice`：必要單選群組、短說明與選項。
- `.consent__example-note`／`.consent__error`／`.consent__actions`：示範政策警告、保存失敗訊息與送出區。

#### 親和力

- 使用原生 `form`、`fieldset`／`legend`、radio、label 與 submit；沒有自訂鍵盤操作。完整告知、拒絕替代路徑及政策入口都在選項之前可見。
- 選項不預選且視覺權重相同。使用者必須明確送出；改選本身不提交、不導頁，也不啟用資料處理。
- 伺服器回覆應以新頁面的 `title`／`h1` 表達結果並保留合法輸入。文件 demo 的 `role="status"` 只回報同步模擬結果，不移動焦點。
- 輔助科技可能略過連續相同的 status 文字，文件 demo 不保證每次重送相同結果都會重新朗讀。
- 螢幕閱讀器、Safari、語音控制及 200%／400% 真實縮放仍須在採用服務與整批發布前人工驗證；本頁不宣稱已通過 WCAG AA。

#### JavaScript

Consent 產品不需要核心 JavaScript 或 Custom Element。原生表單應直接連到服務後端；文件頁的 `consent.demo.js` 只模擬同步結果，不執行網路請求、不保存資料，也不是可採用的 SDK。

#### 參考

- [Consent](https://www.shapeof.ai/patterns/consent) - Shape of AI
- [Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/) - W3C WAI
- [Understanding Success Criterion 3.2.2: On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html) - W3C WAI
- [User Notification](https://www.w3.org/WAI/tutorials/forms/notifications/) - W3C WAI
- [Radios](https://design-system.service.gov.uk/components/radios/) - GOV.UK Design System

{{< asset-script "js/demo/consent.demo.js" >}}
