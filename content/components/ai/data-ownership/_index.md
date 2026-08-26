---
title: 資料授權 (Data Ownership)
maturity: "new"
---

### 對話中的使用時機

這個範例示範使用者在對話中管理資料用途的流程：

1. 入口放在對話輸入區附近，不阻擋使用者繼續對話。
2. 使用者按下「管理設定」，查看服務需要的資料處理及可自行決定的用途。
3. 使用者逐項選擇、儲存設定，再關閉面板繼續對話。

{{< live-example partial="ai/data-ownership/entry.html" source="ai/data-ownership/entry-source.html" >}}

- 上方範例沿用[互動視窗（Modal）]({{< ref "components/modal/_index.md" >}})；採用端也可連至專屬設定頁。這是持續管理資料用途的入口，不能取代資料送出前必須取得的知情選擇。
- 「查看原始碼」只顯示可重用的入口標記；其中 `href` 必須連至可實際管理設定的頁面。完整權限面板標記見下方基本範例。

### 基本範例

{{< live-example partial="ai/data-ownership/basic.html" source="ai/data-ownership/basic-source.html" >}}

- 各項資料用途應分別設定；範例預設未勾選，實際服務必須依後端目前儲存的設定輸出 `checked`。
- 「測試儲存狀態」只供文件頁模擬失敗，不屬於元件。

#### 使用方式

採用端監聽原生 `submit`，記錄本次提交的設定，再依後端結果呼叫控制器：

{{< code-example content=`const form = document.querySelector('[data-data-ownership]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const submission = form.dataOwnership.captureSubmission();
  form.dataOwnership.setBusy(true);

  try {
    await savePreferences(formData);
    form.dataOwnership.accept(submission);
  } catch (error) {
    form.dataOwnership.fail('設定未儲存，選擇已保留，請稍後再試。');
  }
});` class="mb3" >}}

| 方法 | 用途 |
|---|---|
| `captureSubmission()` | 記錄送出當下的 checkbox 狀態；提交資料仍由 `FormData` 取得 |
| `setBusy(isBusy)` | 控制儲存中狀態並阻擋重複送出 |
| `accept(submission, message)` | 接受已儲存的設定；若使用者在等待期間再次修改，保留新選擇並提示仍需儲存 |
| `fail(message)` | 保留目前選擇、顯示錯誤並允許重試 |
| `clearMessage()` | 清除成功或錯誤訊息，不改變設定 |

無 JavaScript 時，原生表單仍會送至 `action`。採用端必須提供真實的處理網址，並由伺服器重新輸出目前設定及儲存結果。

#### CSS

- `.data-ownership`：表單容器；`.data-ownership__choices`／`.data-ownership__choice`：用途群組與個別設定。
- `.data-ownership__status`／`.data-ownership__error`：儲存結果；`.data-ownership__actions`：操作列。
- `.data-ownership--modal`：與既有互動視窗組合時，讓外層 dialog 成為唯一外框，並在窄版保留可捲動內容與完整操作列。

#### 親和力

- 服務運作所需的資料處理以一般文字說明；可選用途使用原生 checkbox、`fieldset`／`legend`、可見 label 與用途說明。
- 儲存期間以按鈕文字與 `aria-disabled` 表達狀態；成功使用 `role="status"`，錯誤使用 `role="alert"`，元件不主動移動焦點。
- 互動視窗以標題建立名稱，介紹保留在內容閱讀順序中；表單不重複建立相同名稱。

#### JavaScript

元件以 ES module 撰寫，載入必須加 `type="module"`。跨網域載入時，伺服器必須提供 CORS 標頭。

{{< code-example content=`<script type="module" src="js/components/data-ownership.js"></script>` class="mb3" >}}

- 腳本會自動初始化頁面載入時已有的 `[data-data-ownership]`。表單必須包含具有 `name` 的 `[data-data-ownership-option]`，以及 `[data-data-ownership-submit]`、`[data-data-ownership-status]` 與 `[data-data-ownership-error]`；缺少時不會初始化。
- 元件不執行網路請求，也不自行儲存、刪除或停止使用資料。
- 對話情境若採用互動視窗，另載入 `modal.js`；獨立設定頁不需要這項依賴。

#### 參考

- [Data ownership](https://www.shapeof.ai/patterns/data-ownership) - Shape of AI

{{< asset-script "js/components/modal.js" >}}
{{< asset-script "js/components/data-ownership.js" >}}
{{< asset-script "js/demo/data-ownership.demo.js" >}}
{{< asset-css "css/demo/data-ownership.css" >}}
