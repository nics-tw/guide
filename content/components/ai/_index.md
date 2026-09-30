---
title: AI 元件 (AI Components)
---

AI 服務介面的共用元件，涵蓋對話互動、資料告知與回覆使用提醒，可依服務需求單獨或組合使用。

### 元件清單

#### 對話基礎

- [對話容器 (Chat Container)]({{< ref "components/ai/chat-container/_index.md" >}})：呈現依序更新的對話紀錄；閱讀舊訊息時不強制捲到最新內容。
- [訊息氣泡 (Message Bubble)]({{< ref "components/ai/message-bubble/_index.md" >}})：呈現使用者與 AI 的訊息，支援串流回覆與訊息操作。
- [訊息輸入區 (Chat Composer)]({{< ref "components/ai/chat-composer/_index.md" >}})：提供多行訊息輸入、送出與選用的檔案附件功能。
- [輸入中提示 (Typing Indicator)]({{< ref "components/ai/typing-indicator/_index.md" >}})：等待回覆時顯示處理狀態，並通知螢幕閱讀器。
- [即時宣告 (Live Announcer)]({{< ref "components/ai/live-announcer/_index.md" >}})：透過共用的隱藏播報區通知螢幕閱讀器狀態變化。

#### 回覆與補充資訊

- [思考區塊 (Thinking Block)]({{< ref "components/ai/thinking-block/_index.md" >}})：以可開合區塊呈現適合公開閱讀的摘要，支援逐段更新。
- [注意事項 (Caveat)]({{< ref "components/ai/caveat/_index.md" >}})：AI 回覆的提醒寫作模式，說明何時提醒、寫什麼與放在哪裡。
- [抽屜式面板 (Drawer)]({{< ref "components/ai/drawer/_index.md" >}})：與主區並排的非模態補充面板，本頁以 AI 回答的參考資料示範。

#### 資料與告知

- [知情同意 (Consent)]({{< ref "components/ai/consent/_index.md" >}})：在提供資料前，告知蒐集目的、使用範圍與相關權益。
- [資料授權 (Data Ownership)]({{< ref "components/ai/data-ownership/_index.md" >}})：讓使用者在對話中查看並管理資料用途的設定。
