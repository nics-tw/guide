'use strict'

const ROOT_SELECTOR = '[data-drawer-layout]'

function ownedElements (root, selector) {
  return Array.from(root.querySelectorAll(selector)).filter((element) => {
    return element.closest(ROOT_SELECTOR) === root
  })
}

function oneOwnedElement (root, selector) {
  const elements = ownedElements(root, selector)
  return elements.length === 1 ? elements[0] : null
}

function hasUniqueValidId (element) {
  const id = element.id
  if (!id || id.trim() !== id || /\s/u.test(id)) return false

  return Array.from(document.querySelectorAll('[id]')).filter((candidate) => {
    return candidate.id === id
  }).length === 1
}

function hasText (element) {
  return element.textContent.trim().length > 0
}

function localFragmentId (link) {
  const href = link.getAttribute('href')
  if (!href) return null

  try {
    const target = new URL(href, document.baseURI)
    const current = new URL(window.location.href)
    if (
      target.origin !== current.origin ||
      target.pathname !== current.pathname ||
      target.search !== current.search ||
      !target.hash
    ) {
      return null
    }

    return decodeURIComponent(target.hash.slice(1))
  } catch {
    return null
  }
}

function hasExplicitNegativeTabIndex (element) {
  return element.getAttribute('tabindex') === '-1'
}

function rootIdsAreUnique (root) {
  return Array.from(root.querySelectorAll('[id]')).every(hasUniqueValidId)
}

function findFragmentTarget () {
  if (!window.location.hash) return null

  try {
    const id = decodeURIComponent(window.location.hash.slice(1))
    return id ? document.getElementById(id) : null
  } catch {
    return null
  }
}

function isAvailableFocusTarget (element) {
  if (!element || !element.isConnected || typeof element.focus !== 'function') {
    return false
  }

  if (element.matches(':disabled')) return false
  if (element.closest('[hidden], [inert]')) return false

  const style = window.getComputedStyle(element)
  if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse') {
    return false
  }

  return element.getClientRects().length > 0
}

function focusIfAvailable (element) {
  if (!isAvailableFocusTarget(element)) return false

  element.focus()
  return document.activeElement === element
}

function getDrawerParts (root) {
  if (
    root.querySelector(ROOT_SELECTOR) ||
    (root.parentElement && root.parentElement.closest(ROOT_SELECTOR))
  ) {
    return null
  }

  const returnContainer = oneOwnedElement(root, '[data-drawer-return]')
  const panel = oneOwnedElement(root, '[data-drawer]')
  const title = oneOwnedElement(root, '[data-drawer-title]')
  const fallback = oneOwnedElement(root, '[data-drawer-fallback]')
  const trigger = oneOwnedElement(root, '[data-drawer-trigger]')
  const close = oneOwnedElement(root, '[data-drawer-close]')

  if (!returnContainer || !panel || !title || !fallback || !trigger || !close) {
    return null
  }

  if (
    panel.tagName !== 'SECTION' ||
    trigger.tagName !== 'BUTTON' ||
    close.tagName !== 'BUTTON' ||
    fallback.tagName !== 'A' ||
    !/^H[1-6]$/u.test(title.tagName) ||
    trigger.getAttribute('type') !== 'button' ||
    close.getAttribute('type') !== 'button' ||
    !hasExplicitNegativeTabIndex(title) ||
    !hasExplicitNegativeTabIndex(returnContainer)
  ) {
    return null
  }

  if (!rootIdsAreUnique(root)) return null
  if (!hasText(title) || !hasText(trigger) || !hasText(close) || !hasText(fallback)) {
    return null
  }

  if (
    trigger.dataset.drawerTrigger !== panel.id ||
    trigger.getAttribute('aria-controls') !== panel.id ||
    panel.getAttribute('aria-labelledby') !== title.id ||
    document.getElementById(panel.id) !== panel ||
    document.getElementById(title.id) !== title ||
    returnContainer.parentElement !== root ||
    panel.parentElement !== root ||
    !returnContainer.contains(trigger) ||
    !returnContainer.contains(fallback) ||
    !panel.contains(title) ||
    !panel.contains(close) ||
    localFragmentId(fallback) !== title.id ||
    fallback.textContent.trim() !== trigger.textContent.trim()
  ) {
    return null
  }

  return { returnContainer, panel, title, fallback, trigger, close }
}

function initDrawer (root) {
  if (root.hasAttribute('data-drawer-enhanced')) return

  const parts = getDrawerParts(root)
  if (!parts) return

  const { returnContainer, panel, title, fallback, trigger, close } = parts
  const activeElement = document.activeElement
  const fragmentTarget = findFragmentTarget()
  const keepOpen = panel.contains(activeElement) ||
    (fragmentTarget !== null && panel.contains(fragmentTarget))

  function setExpanded (expanded) {
    panel.hidden = !expanded
    trigger.setAttribute('aria-expanded', String(expanded))
  }

  function focusBeforeCollapse () {
    if (!panel.contains(document.activeElement)) return

    if (focusIfAvailable(trigger)) return
    focusIfAvailable(returnContainer)
  }

  function collapse () {
    focusBeforeCollapse()
    setExpanded(false)
  }

  function expand () {
    setExpanded(true)
    title.focus()
  }

  root.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return
    if (event.target.closest(ROOT_SELECTOR) !== root) return

    const clickedTrigger = event.target.closest('[data-drawer-trigger]')
    if (clickedTrigger === trigger) {
      if (panel.hidden) {
        expand()
      } else {
        collapse()
      }
      return
    }

    const clickedClose = event.target.closest('[data-drawer-close]')
    if (clickedClose === close) collapse()
  })

  panel.addEventListener('keydown', (event) => {
    if (
      event.key !== 'Escape' ||
      event.defaultPrevented ||
      event.isComposing ||
      !(event.target instanceof Element) ||
      event.target.closest('[data-drawer]') !== panel ||
      event.target.closest(ROOT_SELECTOR) !== root
    ) {
      return
    }

    event.preventDefault()
    collapse()
  })

  trigger.hidden = false
  close.hidden = false
  setExpanded(keepOpen)

  if (activeElement === fallback) trigger.focus()

  fallback.hidden = true
  root.setAttribute('data-drawer-enhanced', '')
}

function initDrawers () {
  document.querySelectorAll(ROOT_SELECTOR).forEach(initDrawer)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDrawers, { once: true })
} else {
  initDrawers()
}
