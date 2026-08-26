/**
 * formatted-date.js — 絕對日期時間格式化
 *
 * 採完整可見 fallback 的屬性掛載模式。只接受帶 Z 或明確 offset 的
 * 絕對日期時間，並允許採用端覆寫語系、曆法與目標時區。
 */

'use strict';

const SUPPORTED_CALENDARS = new Set(['gregory', 'roc']);
const DEFAULT_LOCALE = 'zh-TW';
const DEFAULT_CALENDAR = 'gregory';
const DEFAULT_TIME_ZONE = 'Asia/Taipei';
const failedElements = new WeakSet();
const absoluteDateTimePattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d{1,3})?)?(?:Z|[+-](\d{2}):(\d{2}))$/;

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function isValidAbsoluteDateTime(value) {
  const match = absoluteDateTimePattern.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6] || 0);
  const offsetHour = Number(match[7] || 0);
  const offsetMinute = Number(match[8] || 0);
  const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return year > 0
    && month >= 1
    && month <= 12
    && day >= 1
    && day <= daysInMonth[month - 1]
    && hour <= 23
    && minute <= 59
    && second <= 59
    && offsetHour <= 23
    && offsetMinute <= 59
    && !Number.isNaN(Date.parse(value));
}

function warnOnce(element, message) {
  if (failedElements.has(element)) return;
  failedElements.add(element);
  console.warn(`formatted-date：${message}，已保留原始文字。`, element);
}

function initFormattedDate(element) {
  if (element.hasAttribute('data-formatted-date-ready')) return;

  const value = element.getAttribute('datetime') || '';
  const inheritedLanguage = (element.closest('[lang]')?.getAttribute('lang') || '').trim();
  const locale = (element.getAttribute('data-locale') || '').trim()
    || inheritedLanguage
    || DEFAULT_LOCALE;
  const calendar = (element.getAttribute('data-calendar') || '').trim()
    || DEFAULT_CALENDAR;
  const timeZone = (element.getAttribute('data-time-zone') || '').trim()
    || DEFAULT_TIME_ZONE;

  if (!element.textContent.trim()) {
    warnOnce(element, '缺少可見的 fallback 文字');
    return;
  }

  if (!isValidAbsoluteDateTime(value)) {
    warnOnce(element, 'datetime 必須是有效且帶 Z 或 ±HH:MM 的絕對日期時間');
    return;
  }

  if (!SUPPORTED_CALENDARS.has(calendar)) {
    warnOnce(element, 'data-calendar 只支援 gregory 或 roc');
    return;
  }

  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat !== 'function') {
    warnOnce(element, '瀏覽器不支援 Intl.DateTimeFormat');
    return;
  }

  try {
    if (Intl.DateTimeFormat.supportedLocalesOf([locale]).length === 0) {
      warnOnce(element, 'data-locale 不受目前瀏覽器支援');
      return;
    }

    const formatter = new Intl.DateTimeFormat(locale, {
      calendar: calendar,
      timeZone: timeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZoneName: 'long',
    });

    if (formatter.resolvedOptions().calendar !== calendar) {
      warnOnce(element, 'data-calendar 不受目前瀏覽器支援');
      return;
    }

    element.textContent = formatter.format(new Date(value));
    element.setAttribute('lang', locale);
    element.setAttribute('data-formatted-date-ready', '');
  } catch (error) {
    warnOnce(element, error instanceof Error ? error.message : '格式化失敗');
  }
}

document.querySelectorAll('[data-formatted-date]').forEach(initFormattedDate);
