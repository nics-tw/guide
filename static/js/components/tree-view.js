/**
 * Tree View
 *
 * 依據 WAI-ARIA APG Tree View Pattern 與 GitHub 工程師文章的建議實作：
 *   https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-1a/
 *   https://github.blog/engineering/user-experience/considerations-for-making-a-tree-view-component-accessible/
 *
 * 設計原則：
 *   - 以原生 <ul> / <li> 作為語意基礎
 *   - 以 ARIA 屬性補足樹狀結構語意（tree / treeitem / group / aria-expanded / aria-selected / aria-level）
 *   - Roving tabindex 焦點管理（只有一個 treeitem tabindex="0"）
 *   - 支援完整 APG 鍵盤操作
 *
 * 鍵盤操作：
 *   ↓ / ↑         移動焦點至下一個 / 上一個可見節點
 *   →             已收合 → 展開；已展開 → 移至第一個子節點
 *   ←             已展開 → 收合；末端或已收合 → 移至父節點
 *   Home / End    移至第一個 / 最後一個可見節點
 *   Enter / Space 選取節點（aria-selected="true"）；若為分支節點則切換展開狀態
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[role="tree"].tree-view').forEach(initTreeView)
})

function initTreeView (tree) {
  const items = () => Array.from(tree.querySelectorAll(':scope [role="treeitem"]'))

  // ---- Visibility: a treeitem is visible if none of its ancestor treeitems are collapsed ----
  function isVisible (el) {
    let node = el.parentElement
    while (node && node !== tree) {
      if (node.matches('[role="treeitem"][aria-expanded="false"]')) return false
      node = node.parentElement
    }
    return true
  }

  function visibleItems () {
    return items().filter(isVisible)
  }

  // ---- Ensure a single roving tabindex="0" ----
  function ensureSingleTabstop () {
    const all = items()
    if (all.length === 0) return
    const hasFocusable = all.some(it => it.tabIndex === 0)
    all.forEach(it => {
      if (it.tabIndex !== 0 && it.tabIndex !== -1) it.tabIndex = -1
    })
    if (!hasFocusable) {
      // Per WAI-ARIA APG, if a node is already selected, place the initial
      // tabstop on it so keyboard users land on the current selection;
      // otherwise fall back to the first node.
      const selected = all.find(it => it.getAttribute('aria-selected') === 'true')
      ;(selected || all[0]).tabIndex = 0
    }
  }

  ensureSingleTabstop()

  // ---- Focus helpers ----
  function setFocus (item) {
    if (!item) return
    items().forEach(it => { it.tabIndex = -1 })
    item.tabIndex = 0
    item.focus()
  }

  function moveFocus (current, delta) {
    const vis = visibleItems()
    const idx = vis.indexOf(current)
    const next = vis[idx + delta]
    if (next) setFocus(next)
  }

  function firstChild (item) {
    const group = item.querySelector(':scope > [role="group"]')
    if (!group) return null
    return group.querySelector(':scope > [role="treeitem"]')
  }

  function parentItem (item) {
    const group = item.parentElement
    if (!group || group.getAttribute('role') !== 'group') return null
    return group.closest('[role="treeitem"]')
  }

  function isBranch (item) {
    return item.hasAttribute('aria-expanded')
  }

  function isExpanded (item) {
    return item.getAttribute('aria-expanded') === 'true'
  }

  function expand (item) { if (isBranch(item)) item.setAttribute('aria-expanded', 'true') }
  function collapse (item) { if (isBranch(item)) item.setAttribute('aria-expanded', 'false') }

  function select (item) {
    items().forEach(it => it.setAttribute('aria-selected', 'false'))
    item.setAttribute('aria-selected', 'true')
    tree.dispatchEvent(new CustomEvent('treeitemselect', {
      bubbles: true,
      detail: { item }
    }))
  }

  // ---- Keyboard handler (delegated on tree) ----
  tree.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
    const current = e.target.closest('[role="treeitem"]')
    if (!current || !tree.contains(current)) return

    let handled = true
    switch (e.key) {
      case 'ArrowDown':
        moveFocus(current, 1)
        break
      case 'ArrowUp':
        moveFocus(current, -1)
        break
      case 'ArrowRight':
        if (isBranch(current)) {
          if (isExpanded(current)) {
            const child = firstChild(current)
            if (child) setFocus(child)
          } else {
            expand(current)
          }
        }
        break
      case 'ArrowLeft':
        if (isBranch(current) && isExpanded(current)) {
          collapse(current)
        } else {
          const parent = parentItem(current)
          if (parent) setFocus(parent)
        }
        break
      case 'Home': {
        const vis = visibleItems()
        if (vis[0]) setFocus(vis[0])
        break
      }
      case 'End': {
        const vis = visibleItems()
        if (vis.length) setFocus(vis[vis.length - 1])
        break
      }
      case 'Enter':
      case ' ':
        select(current)
        if (isBranch(current)) {
          isExpanded(current) ? collapse(current) : expand(current)
        }
        break
      default:
        handled = false
    }

    if (handled) {
      e.preventDefault()
      e.stopPropagation()
    }
  })

  // ---- Click handler ----
  // 只處理點擊在 .tree-view__label 上的事件，避免點擊巢狀子群組
  // （ul[role="group"]）的縮排空白處或外邊距時，向上誤判為父節點 li。
  tree.addEventListener('click', (e) => {
    const label = e.target.closest('.tree-view__label')
    if (!label || !tree.contains(label)) return

    const current = label.closest('[role="treeitem"]')
    if (!current) return

    setFocus(current)
    select(current)

    // Toggle expand/collapse for branch nodes
    if (isBranch(current)) {
      isExpanded(current) ? collapse(current) : expand(current)
    }
  })
}
