---
layout: main
title: Header
maturity: "alpha"
---

### 純 Logo Header

{% capture html %}{% include header/header.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.header`：作為整個 header 的容器。
- `.header__top`：作為 header 的頂部部分。
- `.header__divider`：分隔 header 的部分。
- `.header__bottom`：作為 header 的底部部分。
- `.header__logo`：作為 header 中 logo 的容器。
- `.header__logotype`：定義 logo 的樣式。

#### 親和力

- 使用 `.header__link` 來確保連結的可用性和可訪問性。
- 所有互動元素應有足夠的觸控範圍，避免過小的點擊區域。
- 為語言切換連結添加 `lang` 屬性，以便屏幕閱讀器識別。
- 為字體大小調整按鈕添加 `aria-label`，以描述其功能。
- 通過 `aria-live` 和 `aria-label` 屬性更新當前字體大小，讓屏幕閱讀器用戶能夠獲知變更。

#### 建議使用時機

- 當需要展示網站的標誌和主要導航連結時。
    > 當用戶需要快速訪問網站主要部分時，純 Logo Header 能幫助用戶迅速導航。
- 當需要簡潔、直觀的導航體驗時。
    > 純 Logo Header 提供了簡單而清晰的導航，不會對用戶造成干擾。

#### 不建議使用時機

- 當需要更多的導航選項和功能時。
    > 如果網站需要提供多個導航選項和功能，純 Logo Header 可能無法滿足需求。

---

### Header + 單連結

{% capture html %}{% include header/header_link.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.header__menu-button`：定義 menu 按鈕的樣式。
- `.header__content`：作為 header 中可選內容的容器。
- `.header__additional-links`：在移動視圖中顯示的額外連結。

#### 親和力

- 確保 menu 按鈕對所有用戶可見並可操作，使用 `aria-controls` 和 `aria-expanded` 屬性來提高可訪問性。
- 提供清晰的按鈕狀態反饋，讓用戶了解當前的導航狀態。
- 為語言切換連結添加 `lang` 屬性，以便屏幕閱讀器識別。
- 為字體大小調整按鈕添加 `aria-label`，以描述其功能。
- 通過 `aria-live` 和 `aria-label` 屬性更新當前字體大小，讓屏幕閱讀器用戶能夠獲知變更。

#### 建議使用時機

- 當需要在桌面和移動設備上提供一致的導航體驗時。
    > 單連結 Header 能夠在桌面和移動設備上提供一致的導航體驗，適合不同設備的使用。
- 當需要提供多個導航選項並且能夠在移動設備上顯示壓縮的導航選單時。
    > 當用戶在移動設備上訪問網站時，Header 能自適應顯示壓縮的導航選單。

#### 不建議使用時機

- 當網站內容非常簡單且不需要多個導航選項時。
    > 如果網站內容簡單，單連結 Header 可能顯得過於複雜。
- 當需要展示大量的導航選項和功能時。
    > 如果需要展示大量導航選項和功能，單連結 Header 可能無法滿足需求。

---

### Header + 階層式連結

{% capture html %}{% include header/header_linklevel.html %}{% endcapture %}
{% 
  include example.html content=html
%}

#### CSS

- `.dropdown`：定義下拉選單的容器。
- `.header__navigation`：作為導航列表的樣式。
- `.header__navigation-list`：定義導航項目的列表樣式。
- `.header__navigation-item`：定義單個導航項目的樣式。

#### 親和力

- 使用 `aria-label` 提供額外的導航信息，提升可訪問性。
- 確保下拉選單在點擊時顯示和隱藏，使用 `is-visible` 類進行控制。
- 為語言切換連結添加 `lang` 屬性，以便屏幕閱讀器識別。
- 為字體大小調整按鈕添加 `aria-label`，以描述其功能。
- 通過 `aria-live` 和 `aria-label` 屬性更新當前字體大小，讓屏幕閱讀器用戶能夠獲知變更。

#### 建議使用時機

- 當需要提供多層次的導航選項時。
    > 階層式連結 Header 能夠提供多層次的導航選項，適合內容豐富的網站。
- 當需要展示大量的導航項目並且希望它們以層次結構顯示時。
    > 當用戶需要在不同層次的導航項目之間快速切換時，階層式連結 Header 能夠提供便捷的操作。

#### 不建議使用時機

- 當網站內容簡單且不需要多層次導航時。
    > 如果網站內容簡單，階層式連結 Header 可能顯得過於複雜。
- 當用戶主要在移動設備上訪問網站且需要簡化的導航時。
    > 如果用戶主要在移動設備上訪問網站，階層式連結 Header 可能顯得過於複雜，不適合移動設備的操作。

---

### JavaScript 功能

以下是為 header 添加互動功能的 JavaScript 代碼：

```javascript
document.addEventListener('DOMContentLoaded', function () {
    var decreaseFontButtons = document.querySelectorAll('#decreaseFont, #mobileDecreaseFont');
    var defaultFontButtons = document.querySelectorAll('#defaultFont, #mobileDefaultFont');
    var increaseFontButtons = document.querySelectorAll('#increaseFont, #mobileIncreaseFont');
    var body = document.body;
    var currentFontSize = 16;
    var minFontSize = 12;
    var maxFontSize = 24;

    function updateFontSize(size) {
        body.style.fontSize = size + 'px';
        body.setAttribute('aria-live', 'polite');
        body.setAttribute('aria-label', 'Current font size: ' + size + ' pixels');
    }

    decreaseFontButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            if (currentFontSize > minFontSize) {
                currentFontSize -= 1;
                updateFontSize(currentFontSize);
            }
        });
    });

    defaultFontButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            currentFontSize = 16;
            updateFontSize(currentFontSize);
        });
    });

    increaseFontButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            if (currentFontSize < maxFontSize) {
                currentFontSize += 1;
                updateFontSize(currentFontSize);
            }
        });
    });

});
```

```javascript
document.addEventListener('DOMContentLoaded', function () {
    var menuButton = document.querySelector('.header__menu-button');
    var headerContent = document.querySelector('.header__content');

    menuButton.addEventListener('click', function () {
        var isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        headerContent.classList.toggle('is-visible');
    });

    var dropdownToggles = document.querySelectorAll('.js-dropdown-toggle');
    var dropdownMenus = document.querySelectorAll('.js-dropdown-menu');

    dropdownToggles.forEach(function (toggle, index) {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            var menu = dropdownMenus[index];
            var isVisible = menu.classList.contains('is-visible');
            dropdownMenus.forEach(function (menu) {
                menu.classList.remove('is-visible');
            });
            if (!isVisible) {
                menu.classList.add('is-visible');
            } else {
                menu.classList.remove('is-visible');
            }
        });
    });
});
```
