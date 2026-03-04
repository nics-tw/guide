document.addEventListener('DOMContentLoaded', function () {
    var headers = document.querySelectorAll('.headerfordemo');

    headers.forEach(function (header) {
        var decreaseFontButtons = header.querySelectorAll('#decreaseFont, #mobileDecreaseFont');
        var defaultFontButtons = header.querySelectorAll('#defaultFont, #mobileDefaultFont');
        var increaseFontButtons = header.querySelectorAll('#increaseFont, #mobileIncreaseFont');
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

        var dropdownToggles = header.querySelectorAll('.js-dropdown-toggle');
        var dropdownMenus = header.querySelectorAll('.js-dropdown-menu');

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

        var menuButton = header.querySelector('.header-menu-button');
        var headerContent = header.querySelector('.header-content');

        if (menuButton && headerContent) {
            menuButton.addEventListener('click', function () {
                var isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
                menuButton.setAttribute('aria-expanded', !isExpanded);
                headerContent.classList.toggle('is-visible');
            });
        }
    });
});