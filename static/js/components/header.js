document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.headerfordemo');

    headers.forEach(function (header) {
        const decreaseFontButtons = header.querySelectorAll('#decreaseFont, #mobileDecreaseFont');
        const defaultFontButtons = header.querySelectorAll('#defaultFont, #mobileDefaultFont');
        const increaseFontButtons = header.querySelectorAll('#increaseFont, #mobileIncreaseFont');
        const body = document.body;
        let currentFontSize = 16;
        const minFontSize = 12;
        const maxFontSize = 24;

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

        const dropdownToggles = header.querySelectorAll('.js-dropdown-toggle');
        const dropdownMenus = header.querySelectorAll('.js-dropdown-menu');

        dropdownToggles.forEach(function (toggle, index) {
            toggle.addEventListener('click', function (event) {
                event.preventDefault();
                const menu = dropdownMenus[index];
                const isVisible = menu.classList.contains('is-visible');
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

        const menuButton = header.querySelector('.header-menu-button');
        const headerContent = header.querySelector('.header-content');

        if (menuButton && headerContent) {
            menuButton.addEventListener('click', function () {
                const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
                menuButton.setAttribute('aria-expanded', !isExpanded);
                headerContent.classList.toggle('is-visible');
            });
        }
    });
});