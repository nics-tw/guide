---
layout: main
title: 反面教材
text_only: 1
---

就算你經常在各大網站上看到以下提及的做法，並<strong>不代表</strong>他們是好的典範。親和力設計專家 Heydon Pickering 在 [Listen To Me And Not Google](https://heydonworks.com/article/listen-to-me-not-google/) 就提及一個實際範例：他當時的客戶希望能夠比照 Google Material Design 的 `<input>` 樣式做設計，但他強烈反對那樣的視覺處理方式，認為會造成很大的使用障礙。但卻因為 Google 這樣大型企業提出了這樣的設計模式，造成他說服客戶上的困難。幾年後，Google 的團隊，如同 Heydon 一開始所提出的專業建議，發現過去的設計確實造成了很大的使用障礙，[透過許多研究後，重新設計了 `<input>`](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)。

在網頁設計中，有很多常見的互動設計在實作中具有**與生俱來難以排除的障礙**。以下是一些最常見且妨礙使用的元件和範例，包含它們各自可能帶來的問題，和建議採用的取代方法。

### 複雜的動畫

過多或過於複雜的動畫／動態效果，例如快速閃爍或造成持續運動感受的效果，可能對具有癲癇或前庭功能障礙的使用者造成抽搐痙攣或動暈不適。應避免這樣的動畫，不要設計成必然呈現的內容。最低標準是使用 `prefers-reduced-motion` media query 去偵測系統偏好，僅顯示動畫／動態效果給**支援此系統偏好且關閉此偏好**的裝置。

- 明確設定 `prefers-reduced-motion` 偏好：使用者已表示易受到動態效果傷害，不要呈現動態效果。
- 明確關閉 `prefers-reduced-motion` 偏好：使用者已表示不需要減少動態效果，可以呈現動態效果。
- 未支援 `prefers-reduced-motion` 偏好的系統：無法確認使用者的情況，為了安全起見，不要呈現動態效果。

#### 延伸參考資料

- [`prefers-reduced-motion`: Sometimes less movement is more](https://web.dev/articles/prefers-reduced-motion?hl=en)    
  作者：Thomas Steiner

### 跑馬燈（Marquee）和輪播（Carousels）

跑馬燈和輪播通常包括自動推進或更新的內容，對需要更多時間閱讀或與內容互動的使用者可能具有挑戰性。它們也可能難以使用鍵盤或輔助軟體進行瀏覽。即便增加許多程式功能後（大量增加開發和維護的負擔）可能可以讓它符合親和力規範，它仍然為難以閱讀的介面元件，非常不符合時間成本。建議：

- 跑馬燈 ➔ 改為隨機顯示單一訊息，並提供讀取下一則訊息的方法。
- 輪播 ➔ 改為僅顯示最新一則訊息、在讀取時隨機選擇最新的其中一則訊息、或切開 n 塊圖塊讓最新的 n 則訊息同時出現。

#### 延伸參考資料

- [Hero Images/Carousels](https://usability.yale.edu/usability-best-practices/hero-imagescarousels)    
  作者：耶魯大學 ITS
- [Should I Use A Carousel?](https://shouldiuseacarousel.com/)    
  作者：Jared Smith
- [Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility](https://www.nngroup.com/articles/auto-forwarding/)    
  作者：Jakob Nielsen

### 跳出的對話框

使用頁面跳出的對話框（`modal dialog`、甚至 HTML `<dialog>` 元件）常會造成使用上的困難，且要完成符合親和力的技術和開發需求相當高。就算完美達成了親和力需求，仍可能造成輔助科技使用者的困擾，因親和力需求必須控制住鍵盤焦點、報讀對話框內容，增加用者瀏覽上的複雜度。建議尤其在「填寫表單」類的功能，將表單放到新的頁面，不要放在「暫時性」的使用者介面中。

### 無限捲動（Infinite scroll）

無限捲動對各種使用者都可能造成很多障礙，因為它缺乏清晰的頁面邊界。這種做法可能令人困惑，例如不知道最終有多少筆資料，並妨礙使用者達到頁尾的內容。建議使用明確的分頁 (pagination) 介面，將內容分成多頁呈現。

#### 延伸參考資料

- [Infinite Scrolling & Role=Feed Accessibility Issues](https://www.deque.com/blog/infinite-scrolling-rolefeed-accessibility-issues/)    
  作者：Raghavendra Satish Peri
- [So You Think You’ve Built a Good Infinite Scroll](https://adrianroselli.com/2014/05/so-you-think-you-built-good-infinite.html)    
  作者：Adrian Roselli

### 仰賴滑鼠游標的互動行為（如 `:hover`）

在使用 `:hover` 風格時，必須考慮到不同的器材不一定有滑鼠游標概念。如果不要使用就盡量不要使用。以下兩個範例建議：

- 所有 `:hover` 會觸發的設計或行為，應同時在 `:focus` 狀態觸發。
- 元件不應該仰賴 `:hover` 時的視覺設計改變來傳達元件的特性。例如各種互動性元件（如連結、按鈕、所有可互動的元件）應該在非 `:hover` 狀態時就可以讓使用者直接看出來是連結。

### 工具提示（tooltip）

承上（仰賴滑鼠游標的互動行為），需要工具提示的使用者介面通常暗示著介面設計不夠直覺，建議改善使用者介面。若使用者介面上已經有過多資訊，應考慮減少頁面上的資訊內容。

尤其工具提示經常不是由「可互動元件（Interactive Content）」觸發，造成非常多的使用障礙。

#### 延伸參考資料

- [The problem with tooltips and what to do instead](https://adamsilver.io/blog/the-problem-with-tooltips-and-what-to-do-instead/)     
  作者：Adam Silver

### 單獨使用圖示（icon）

小圖示很有可能會被誤解，因為它們對於不同的文化和個人，可能以不同的理解方式造成不同意義。在這個狀況下，許多開發者會仰賴「工具提示」去補足這部分可能造成使用者的誤解。這樣子因為不佳的設計方式導致需要導入另外一個不佳的設計方式，只會每況愈下，和一再膨脹的開發及維護成本。

### 單用顏色傳達訊息

有許多使用者在分辨顏色的能力上發生障礙，除此之外，顏色也會因為螢幕的色調和對比而造成分辨困難。建議可使用明確的文字或是花樣、圖示同時來做輔助。

### 自訂表單控制項

使用自訂的表單元件取代原生的 HTML 元件，如 `<select>`，雖然可能在樣式上更有自訂空間，但非常容易缺乏輔助軟體所依賴的語義資訊（semantics）。在選擇要自行取代 HTML 元件時，應該考量相對的開發成本需求，像是如何有效率地重現所有瀏覽器和輔助軟體所有的行為，並持續更新到追蹤 ARIA 不同版本的需求。自訂元件在非絕對必要的狀況下強烈建議不要使用。就算有此需求，也建議先參考 [WHATWG](https://github.com/whatwg/html) 是否有類似的提案或是 polyfill。

### 複雜的表格

使用不正確標記和缺少標題的資料表格對輔助軟體來說可能很難理解。正確標記的表格，包括欄標題和列標題非常重要。必要時建議將複雜表格分開成多個表格。

### CAPTCHA 驗證碼挑戰

驗證碼挑戰，儘管旨在提供安全性，但對身心障礙者使用者經常不具有親和力。建議可以採用其他方式取代傳統 CAPTCHA，避免阻擋使用者操作卻又放行更多機器人。

- 以隱藏的 `<input type="checkbox">` 作為吸引機器人勾選的蜜罐陷阱 (honeypot)，並篩選掉這類存取需求。
- 其他更新技術的非互動型驗證技術，如 [Turnstile](https://www.cloudflare.com/zh-tw/products/turnstile/), [hCaptcha](https://hcaptcha.com/), [reCAPTCHA](https://hcaptcha.com/) 等等。
- 在伺服器端加上速率限制，例如同一 IP 僅能在一定時間內送出多少需求，且在失敗多少次之後列入拒絕名單。

#### 延伸參考資料

- [Spam-free accessible forms](https://webaim.org/blog/spam_free_accessible_forms/)     
  作者：Jared Smith

### 侵入性彈出視窗和通知

侵入性彈出內容和通知可能會干擾使用者體驗，特別是跳出的通知不容易關閉，或將使用者本來在閱讀的內容遮蓋掉。同時，很多視力障礙使用者可能將使用螢幕放大功能使用網站，只能看到局部畫面，可能無法發現後來跳出的訊息。

### PDF 或其他無親和力的文件格式

有障礙的 PDF 文件對於依賴輔助科技的使用者可能會帶來問題。在儲存及建立這些文件時，應該考量各種親和力需求，例如文字沒有被圖片化，仍然可以被選取等功能。或者應同時提供符合親和力的替代方法。

#### 延伸參考資料

- [PDF Accessibility](https://webaim.org/techniques/acrobat/)    
  作者：WebAIM
- [Creating Accessible PDFs](https://accessibility.huit.harvard.edu/pdf)    
  作者：哈佛大學
