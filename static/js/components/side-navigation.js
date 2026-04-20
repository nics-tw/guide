/**
 * Side Navigation
 *
 * 使用原生 HTML 語意實作側邊導覽結構：
 *   <nav>       — 導覽區塊（報讀器自動朗讀）
 *   <ul>/<li>   — 清單與項目（報讀器自動朗讀項目數）
 *   <a>         — 連結（報讀器朗讀「連結」）
 *   <button>    — 展開/收合（報讀器朗讀「按鈕, 已收合/已展開」）
 *
 * JS 僅負責切換 button 的 aria-expanded 狀態。
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.side-navigation').forEach(initSideNavigation)
})

function initSideNavigation (nav) {
  nav.addEventListener('click', (e) => {
    const button = e.target.closest('.side-navigation button[aria-expanded]')
    if (!button) return

    const expanded = button.getAttribute('aria-expanded') === 'true'
    button.setAttribute('aria-expanded', String(!expanded))
  })
}
