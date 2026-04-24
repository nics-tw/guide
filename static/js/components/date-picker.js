/**
 * Date Picker 元件
 *
 * 架構：combobox + dialog + grid（符合 W3C APG 推薦模式）
 *
 * 降級策略：
 *   - 無 JS：HTML 預設 <input type="date">，瀏覽器提供原生 date picker
 *   - 觸控裝置（pointer: coarse）：不增強，維持原生 <input type="date">
 *   - 桌面（pointer: fine）：增強為自訂 combobox + 月曆 dialog
 *
 * 支援屬性：
 *   - data-min="YYYY-MM-DD"：最小可選日期
 *   - data-max="YYYY-MM-DD"：最大可選日期
 */

(function () {
  'use strict';

  // ── 工具函式 ────────────────────────────────────────────────

  /**
   * 安全解析 YYYY-MM-DD 字串為 Date 物件（避免 Safari ISO 時區偏移 bug）
   * Safari 對 new Date('YYYY-MM-DD') 會當成 UTC 午夜，getDate() 可能回傳前一天
   * 改用 new Date(year, month-1, day) 強制使用本地時間
   * @param {string} isoStr - YYYY-MM-DD
   * @returns {Date}
   */
  function parseISODate(isoStr) {
    var parts = isoStr.split('-');
    return new Date(
      parseInt(parts[0], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[2], 10)
    );
  }

  /**
   * 驗證 YYYY-MM-DD 格式並確認為合法日期（含日期溢位檢查）
   * @param {string} value
   * @returns {boolean}
   */
  function isValidDate(value) {
    if (!value) return false;
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) return false;
    var parts = value.split('-');
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var d = parseInt(parts[2], 10);
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > getDaysInMonth(y, m - 1)) return false;
    return true;
  }

  /**
   * 將 Date 物件格式化為 YYYY-MM-DD 字串
   * @param {Date} date
   * @returns {string}
   */
  function formatISO(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  /**
   * 產生輔助科技播報用的日期文字（如「2026年3月19日，星期四」）
   * @param {string} dateStr - YYYY-MM-DD
   * @returns {string}
   */
  function formatDateLabel(dateStr) {
    if (!isValidDate(dateStr)) return dateStr;
    var date = parseISODate(dateStr);
    return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(date);
  }

  /**
   * 產生月份標題文字（如「2026年3月」）
   * @param {number} year
   * @param {number} month - 0-based
   * @returns {string}
   */
  function formatMonthLabel(year, month) {
    return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: 'long',
    }).format(new Date(year, month, 1));
  }

  /**
   * 取得某月份的天數
   * @param {number} year
   * @param {number} month - 0-based
   * @returns {number}
   */
  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  /**
   * 比較兩個 ISO date 字串大小
   * @param {string} a
   * @param {string} b
   * @returns {number} 負數表示 a < b，0 表示相等，正數表示 a > b
   */
  function compareDate(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  // ── DatePicker 類別 ─────────────────────────────────────────

  /**
   * @param {HTMLElement} container - [data-date-picker] 容器
   */
  function DatePicker(container) {
    this.container = container;

    // DOM refs
    this.nativeInput = container.querySelector('.dp__input--native');
    this.toggleBtn   = container.querySelector('.dp__button');
    this.dialog      = container.querySelector('.dp__dialog');
    this.prevYearBtn = container.querySelector('.dp__nav-btn--prev-year');
    this.nextYearBtn = container.querySelector('.dp__nav-btn--next-year');
    this.prevBtn     = container.querySelector('.dp__nav-btn--prev');
    this.nextBtn     = container.querySelector('.dp__nav-btn--next');
    this.monthLabel  = container.querySelector('.dp__month-heading');
    this.monthLive   = container.querySelector('.dp__month-live');
    this.grid        = container.querySelector('.dp__grid tbody');
    this.closeBtn    = container.querySelector('.dp__close-btn');
    this.feedback    = container.querySelector('.dp__feedback');


    // 支援 data-min / data-max
    this.minDate = container.dataset.min || null;
    this.maxDate = container.dataset.max || null;

    // 狀態
    var today = new Date();
    this.state = {
      isOpen: false,
      year: today.getFullYear(),
      month: today.getMonth(),     // 0-based
      selectedDate: null,          // YYYY-MM-DD 或 null
      focusedDate: null,           // YYYY-MM-DD 或 null
    };

    this._textInput = null;              // JS 動態建立的 text input
    this._clickOutsideHandler = null;    // 供移除監聽器用

    this._enhance();
    this._bindEvents();
  }

  // ── 初始化增強 ────────────────────────────────────────────

  DatePicker.prototype._enhance = function () {
    var self = this;
    var nativeId = this.nativeInput.id; // 保存原始 id，失敗時可還原

    try {
      // 建立 text input（combobox）
      var textInput = document.createElement('input');
      textInput.type = 'text';
      textInput.id = nativeId;             // 繼承 id（對應 label for）
      textInput.name = this.nativeInput.name || 'date';
      textInput.className = 'dp__input dp__input--enhanced';
      textInput.setAttribute('placeholder', 'YYYY-MM-DD');
      textInput.setAttribute('role', 'combobox');
      textInput.setAttribute('aria-haspopup', 'grid');
      textInput.setAttribute('aria-expanded', 'false');
      textInput.setAttribute('aria-controls', 'dp-dialog');
      textInput.setAttribute('aria-autocomplete', 'none');
      textInput.setAttribute('inputmode', 'numeric');
      textInput.setAttribute('spellcheck', 'false');
      textInput.setAttribute('autocomplete', 'off');

      // 若原生 input 已有值，同步
      if (this.nativeInput.value && isValidDate(this.nativeInput.value)) {
        textInput.value = this.nativeInput.value;
        this.state.selectedDate = this.nativeInput.value;
      }

      // 先插入 text input（label 先對應新 input），再移除原生 input 的 id
      // 確保任何時刻 label for 都指向一個可見 input
      this.nativeInput.parentNode.insertBefore(textInput, this.nativeInput.nextSibling);
      this._textInput = textInput;

      // text input 已在 DOM 中接管 id 後，才隱藏原生 input
      this.nativeInput.removeAttribute('id');
      this.nativeInput.setAttribute('aria-hidden', 'true');
      this.nativeInput.setAttribute('tabindex', '-1');
      this.nativeInput.style.display = 'none';

      // 顯示觸發按鈕
      this.toggleBtn.removeAttribute('hidden');

      // 標記 wrapper 為已增強（供 SCSS 切換顯示邏輯）
      this.container.setAttribute('data-js-enhanced', '');
    } catch (err) {
      // 增強失敗：還原原生 input id，確保 label 不懸空
      this.nativeInput.id = nativeId;
      if (this._textInput && this._textInput.parentNode) {
        this._textInput.parentNode.removeChild(this._textInput);
      }
      this._textInput = null;
      // 靜默降級：維持原生 date input 運作
    }
  };

  // ── 事件綁定 ──────────────────────────────────────────────

  DatePicker.prototype._bindEvents = function () {
    var self = this;

    // 觸發按鈕：開關面板
    this.toggleBtn.addEventListener('click', function () {
      self.togglePanel();
    });

    // text input 點擊：開啟面板
    this._textInput.addEventListener('click', function () {
      if (!self.state.isOpen) self.openDialog();
    });

    // text input 鍵盤：Enter/Space 開啟，其他鍵不攔截（允許手動輸入）
    this._textInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        self.togglePanel();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!self.state.isOpen) self.openDialog();
      }
    });

    // text input blur：驗證格式
    this._textInput.addEventListener('blur', function () {
      self._validateInput(self._textInput.value);
    });

    // 上/下年按鈕
    this.prevYearBtn.addEventListener('click', function () { self.prevYear(); });
    this.nextYearBtn.addEventListener('click', function () { self.nextYear(); });

    // 上個月 / 下個月按鈕
    this.prevBtn.addEventListener('click', function () { self.prevMonth(); });
    this.nextBtn.addEventListener('click', function () { self.nextMonth(); });

    // 關閉按鈕
    this.closeBtn.addEventListener('click', function () { self.closeDialog(true); });

    // Grid 鍵盤事件（委派）
    this.dialog.addEventListener('keydown', function (e) {
      self._handleDialogKeydown(e);
    });

    // Grid 點擊事件（委派）
    this.dialog.querySelector('table').addEventListener('click', function (e) {
      var cell = e.target.closest('.dp__cell');
      if (!cell) return;
      if (cell.getAttribute('aria-disabled') === 'true') return;
      self.selectDate(cell.dataset.date);
    });

    // 點擊外部關閉
    this._clickOutsideHandler = function (e) {
      if (self.state.isOpen && !self.container.contains(e.target)) {
        self.closeDialog(false);
      }
    };
    document.addEventListener('click', this._clickOutsideHandler);
  };

  // ── 面板開關 ──────────────────────────────────────────────

  DatePicker.prototype.togglePanel = function () {
    if (this.state.isOpen) {
      this.closeDialog(true);
    } else {
      this.openDialog();
    }
  };

  DatePicker.prototype.openDialog = function () {
    this.state.isOpen = true;

    // 決定初始顯示月份：優先已選取日期，其次今天
    var focusTarget;
    if (this.state.selectedDate) {
      var parts = this.state.selectedDate.split('-');
      this.state.year  = parseInt(parts[0], 10);
      this.state.month = parseInt(parts[1], 10) - 1;
      focusTarget = this.state.selectedDate;
    } else {
      var today = new Date();
      this.state.year  = today.getFullYear();
      this.state.month = today.getMonth();
      focusTarget = formatISO(today);
    }

    this.state.focusedDate = focusTarget;

    // 更新 aria 與顯示
    this.dialog.removeAttribute('hidden');
    this.toggleBtn.setAttribute('aria-expanded', 'true');
    this._textInput.setAttribute('aria-expanded', 'true');

    this.renderCalendar();

    // 移動焦點至目標日期
    var self = this;
    // 使用 rAF 確保 DOM 渲染完成後再聚焦
    requestAnimationFrame(function () {
      self._focusDate(focusTarget);
    });
  };

  DatePicker.prototype.closeDialog = function (returnFocus) {
    this.state.isOpen = false;

    this.dialog.setAttribute('hidden', '');
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this._textInput.setAttribute('aria-expanded', 'false');

    if (returnFocus) {
      this.toggleBtn.focus();
    }
  };

  // ── 月份渲染 ──────────────────────────────────────────────

  DatePicker.prototype.renderCalendar = function () {
    var year  = this.state.year;
    var month = this.state.month;

    // 更新月份標題（清空後重設，確保 aria-live 重新觸發播報）
    var label = formatMonthLabel(year, month);
    this.monthLive.textContent = '';
    var self = this;
    setTimeout(function () {
      self.monthLive.textContent = label;
    }, 50);

    var today       = formatISO(new Date());
    var selected    = this.state.selectedDate;
    var focused     = this.state.focusedDate;
    var minDate     = this.minDate;
    var maxDate     = this.maxDate;

    // 計算月份首日是星期幾（0=日）
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = getDaysInMonth(year, month);

    // 清空 tbody
    var tbody = this.grid;
    tbody.innerHTML = '';

    var cellCount = 0;
    var totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    var row;
    for (var i = 0; i < totalCells; i++) {
      if (i % 7 === 0) {
        row = document.createElement('tr');
        tbody.appendChild(row);
      }

      var td = document.createElement('td');
      td.className = 'dp__cell';

      var dateStr, dayNum, isOtherMonth;

      if (i < firstDay) {
        isOtherMonth = true;
      } else if (i >= firstDay + daysInMonth) {
        isOtherMonth = true;
      } else {
        // 本月日期
        dayNum = i - firstDay + 1;
        dateStr = formatISO(new Date(year, month, dayNum));
        isOtherMonth = false;
      }

      // 非本月日期不顯示內容，也不設互動屬性
      if (isOtherMonth) {
        // 空白 <td>：無文字、無 tabindex、無 data-date，AT 跳過
        row.appendChild(td);
        continue;
      }

      td.textContent = dayNum;
      td.dataset.date = dateStr;
      td.setAttribute('tabindex', '-1');
      td.setAttribute('aria-selected', 'false');

      // 今天
      if (dateStr === today) {
        td.setAttribute('aria-current', 'date');
        td.classList.add('dp__cell--today');
      }

      // 已選取
      if (dateStr === selected) {
        td.setAttribute('aria-selected', 'true');
        td.classList.add('dp__cell--selected');
      }

      // min/max 超出範圍
      var disabled = false;
      if (minDate && compareDate(dateStr, minDate) < 0) disabled = true;
      if (maxDate && compareDate(dateStr, maxDate) > 0) disabled = true;
      if (disabled) {
        td.setAttribute('aria-disabled', 'true');
        td.classList.add('dp__cell--disabled');
      }

      // roving tabindex：只有 focusedDate 的 gridcell 為 tabindex="0"
      if (dateStr === focused) {
        td.setAttribute('tabindex', '0');
      }

      row.appendChild(td);
    }
  };

  // ── 焦點管理 ──────────────────────────────────────────────

  /**
   * 取得月曆中指定日期的 button 元素
   * @param {string} dateStr - YYYY-MM-DD
   * @returns {HTMLButtonElement|null}
   */
  DatePicker.prototype._getCellBtn = function (dateStr) {
    return this.dialog.querySelector('[data-date="' + dateStr + '"]');
  };

  /**
   * 將焦點移至指定日期的 button
   * 若該日期不在當前渲染月份中，先切換月份再聚焦
   * @param {string} dateStr - YYYY-MM-DD
   */
  DatePicker.prototype._focusDate = function (dateStr) {
    if (!dateStr) return;

    var parts = dateStr.split('-');
    var year  = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;

    // 若目標月份與當前不同，切換後重新渲染
    if (year !== this.state.year || month !== this.state.month) {
      this.state.year  = year;
      this.state.month = month;
      this.state.focusedDate = dateStr;
      this.renderCalendar();
    }

    var btn = this._getCellBtn(dateStr);
    if (btn) {
      // 更新 roving tabindex
      var current = this.dialog.querySelector('.dp__cell[tabindex="0"]');
      if (current && current !== btn) {
        current.setAttribute('tabindex', '-1');
      }
      btn.setAttribute('tabindex', '0');
      btn.focus();
    }
  };

  // ── 鍵盤事件（Dialog 內） ─────────────────────────────────

  DatePicker.prototype._handleDialogKeydown = function (e) {
    var focused = this.state.focusedDate;
    if (!focused) return;

    var date = parseISODate(focused);
    var newDate;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 1);
        this._moveFocusTo(formatISO(newDate));
        break;

      case 'ArrowRight':
        e.preventDefault();
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        this._moveFocusTo(formatISO(newDate));
        break;

      case 'ArrowUp':
        e.preventDefault();
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 7);
        this._moveFocusTo(formatISO(newDate));
        break;

      case 'ArrowDown':
        e.preventDefault();
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 7);
        this._moveFocusTo(formatISO(newDate));
        break;

      case 'Enter':
      case ' ':
        // 只在焦點位於日期格子時才攔截，導覽按鈕與關閉按鈕交由瀏覽器原生 click 處理
        if (document.activeElement && document.activeElement.classList.contains('dp__cell')) {
          e.preventDefault();
          if (document.activeElement.getAttribute('aria-disabled') !== 'true') {
            this.selectDate(document.activeElement.dataset.date);
          }
        }
        break;

      case 'Escape':
        e.preventDefault();
        this.closeDialog(true);
        break;

      case 'Tab':
        // 焦點陷阱：在 prev → grid → close 之間循環
        this._handleTabTrap(e);
        break;
    }
  };

  /**
   * 移動焦點至指定日期，並更新 state.focusedDate
   * @param {string} dateStr
   */
  DatePicker.prototype._moveFocusTo = function (dateStr) {
    this.state.focusedDate = dateStr;
    this._focusDate(dateStr);
  };

  /**
   * 切換上下月，並嘗試維持同一天的焦點
   * @param {number} delta - -1 上月, +1 下月
   */
  /**
   * @param {number} delta - -1 上月, +1 下月
   * @param {boolean} [moveFocusToGrid=true] - 是否將焦點移至日期格子
   *   PageUp/PageDown 時為 true（焦點已在 grid 中）；
   *   按鈕觸發時為 false（焦點應留在按鈕上，方便連續操作）
   */
  DatePicker.prototype._navigateMonth = function (delta, moveFocusToGrid) {
    if (moveFocusToGrid === undefined) moveFocusToGrid = true;

    var date = parseISODate(this.state.focusedDate || formatISO(new Date()));
    var day  = date.getDate();

    var newMonth = this.state.month + delta;
    var newYear  = this.state.year;

    if (newMonth < 0) { newYear--; newMonth = 11; }
    if (newMonth > 11) { newYear++; newMonth = 0; }

    // 同一天若超出新月份天數，移至最後一天
    var maxDay = getDaysInMonth(newYear, newMonth);
    if (day > maxDay) day = maxDay;

    this.state.year  = newYear;
    this.state.month = newMonth;
    this.state.focusedDate = formatISO(new Date(newYear, newMonth, day));

    this.renderCalendar();

    if (moveFocusToGrid) {
      var self = this;
      requestAnimationFrame(function () {
        self._focusDate(self.state.focusedDate);
      });
    }
  };

  /**
   * Tab 鍵焦點陷阱：在 prevYearBtn → prevBtn → nextBtn → nextYearBtn → focusedGridCell → closeBtn 之間循環
   * 明確列舉焦點節點，避免 querySelectorAll 依 DOM 順序造成非預期循環
   */
  DatePicker.prototype._handleTabTrap = function (e) {
    var focusedCell = this.dialog.querySelector('.dp__cell[tabindex="0"]');
    var focusable = [this.prevYearBtn, this.prevBtn, this.nextBtn, this.nextYearBtn, focusedCell, this.closeBtn].filter(Boolean);

    if (focusable.length === 0) return;

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  // ── 年份導覽 ──────────────────────────────────────────────

  /**
   * @param {number} delta - -1 上年, +1 下年
   * @param {boolean} [moveFocusToGrid=true]
   */
  DatePicker.prototype._navigateYear = function (delta, moveFocusToGrid) {
    if (moveFocusToGrid === undefined) moveFocusToGrid = true;

    var date = parseISODate(this.state.focusedDate || formatISO(new Date()));
    var day  = date.getDate();

    var newYear  = this.state.year + delta;
    var newMonth = this.state.month;

    var maxDay = getDaysInMonth(newYear, newMonth);
    if (day > maxDay) day = maxDay;

    this.state.year  = newYear;
    this.state.month = newMonth;
    this.state.focusedDate = formatISO(new Date(newYear, newMonth, day));

    this.renderCalendar();

    if (moveFocusToGrid) {
      var self = this;
      requestAnimationFrame(function () {
        self._focusDate(self.state.focusedDate);
      });
    }
  };

  // ── 導覽按鈕 ──────────────────────────────────────────────

  DatePicker.prototype.prevYear = function () {
    this._navigateYear(-1, false);
  };

  DatePicker.prototype.nextYear = function () {
    this._navigateYear(1, false);
  };

  DatePicker.prototype.prevMonth = function () {
    this._navigateMonth(-1, false);
  };

  DatePicker.prototype.nextMonth = function () {
    this._navigateMonth(1, false);
  };

  // ── 選取日期 ──────────────────────────────────────────────

  /**
   * 選取日期並關閉 dialog
   * @param {string} dateStr - YYYY-MM-DD
   */
  DatePicker.prototype.selectDate = function (dateStr) {
    if (!dateStr) return;

    this.state.selectedDate = dateStr;

    // 更新 text input 顯示值
    this._textInput.value = dateStr;

    // 同步更新 hidden native input（供表單送出使用）
    this.nativeInput.value = dateStr;

    // 更新 aria-selected
    var prevSelected = this.dialog.querySelector('.dp__cell[aria-selected="true"]');
    if (prevSelected) {
      prevSelected.setAttribute('aria-selected', 'false');
      prevSelected.classList.remove('dp__cell--selected');
    }
    var newSelected = this._getCellBtn(dateStr);
    if (newSelected) {
      newSelected.setAttribute('aria-selected', 'true');
      newSelected.classList.add('dp__cell--selected');
    }

    // 更新即時回饋 output
    this._updateFeedback('已選取 ' + formatDateLabel(dateStr));

    // 關閉 dialog，焦點回觸發按鈕
    this.closeDialog(true);
  };

  // ── 輸入驗證 ──────────────────────────────────────────────

  /**
   * 驗證手動輸入的日期格式
   * 格式錯誤或超出範圍時清除輸入值
   * @param {string} value
   */
  DatePicker.prototype._validateInput = function (value) {
    if (!value) {
      this.state.selectedDate = null;
      this.nativeInput.value = '';
      return;
    }

    if (!isValidDate(value)) {
      this._updateFeedback('日期格式不正確，請輸入 YYYY-MM-DD 格式。');
      return;
    }

    if (this.minDate && compareDate(value, this.minDate) < 0) {
      this._updateFeedback('所選日期早於最小可選日期 ' + this.minDate + '。');
      return;
    }

    if (this.maxDate && compareDate(value, this.maxDate) > 0) {
      this._updateFeedback('所選日期晚於最大可選日期 ' + this.maxDate + '。');
      return;
    }

    this.state.selectedDate = value;
    this.nativeInput.value  = value;
    this._updateFeedback('已輸入日期：' + formatDateLabel(value));
  };

  // ── 即時回饋 ──────────────────────────────────────────────

  /**
   * 更新 <output> 的文字內容（輔助科技 aria-live 播報）
   * @param {string} message
   */
  DatePicker.prototype._updateFeedback = function (message) {
    var self = this;
    // 清空後重設，確保相同訊息也會觸發播報
    this.feedback.textContent = '';
    setTimeout(function () {
      self.feedback.textContent = message;
    }, 50);
  };

  // ── 銷毀（選用） ──────────────────────────────────────────

  DatePicker.prototype.destroy = function () {
    if (this._clickOutsideHandler) {
      document.removeEventListener('click', this._clickOutsideHandler);
      this._clickOutsideHandler = null;
    }
  };

  // ── 初始化入口 ────────────────────────────────────────────

  function init() {
    // 偵測觸控裝置：若為 pointer: coarse，不進行 JS 增強
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    var containers = document.querySelectorAll('[data-date-picker]');
    containers.forEach(function (el) {
      // 避免重複初始化
      if (!el.dataset.jsEnhanced) {
        new DatePicker(el);
      }
    });
  }

  // DOM 就緒後初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
