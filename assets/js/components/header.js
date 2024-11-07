// document.addEventListener('DOMContentLoaded', function () {
//     var decreaseFontButton = document.getElementById('decreaseFont');
//     var defaultFontButton = document.getElementById('defaultFont');
//     var increaseFontButton = document.getElementById('increaseFont');
//     var body = document.body;
//     var currentFontSize = 16;
//     var minFontSize = 12;
//     var maxFontSize = 24;

//     function updateFontSize(size) {
//         body.style.fontSize = size + 'px';
//         body.setAttribute('aria-live', 'polite');
//         body.setAttribute('aria-label', 'Current font size: ' + size + ' pixels');
//     }

//     decreaseFontButton.addEventListener('click', function (event) {
//         event.preventDefault();
//         if (currentFontSize > minFontSize) {
//             currentFontSize -= 1;
//             updateFontSize(currentFontSize);
//         }
//     });

//     defaultFontButton.addEventListener('click', function (event) {
//         event.preventDefault();
//         currentFontSize = 16;
//         updateFontSize(currentFontSize);
//     });

//     increaseFontButton.addEventListener('click', function (event) {
//         event.preventDefault();
//         if (currentFontSize < maxFontSize) {
//             currentFontSize += 1;
//             updateFontSize(currentFontSize);
//         }
//     });
// });


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
            // menu.style.width = '20%';
        });
    });

    var menuButton = document.querySelector('.header__menu-button');
    var headerContent = document.querySelector('.header__content');

    menuButton.addEventListener('click', function () {
        var isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        headerContent.classList.toggle('is-visible');
    });
});