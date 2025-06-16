const langMap = new WeakMap()

const langPage= document.documentElement.lang

document.addEventListener('change', (event) => {
  const select = event.target.closest('select')
  if (!select || !select.hasAttribute('data-i18n-selector')) return
  const option = select.selectedOptions[0]
  const parent = option.closest('[data-example]')

  const selectors = select.getAttribute('data-i18n-selector').split(',')
  if (selectors.length > 1) {
    handleMultipleSelectors(parent, select, option, selectors)
  } else {
    handleSingleSelector(parent, select, option)
  }
})

function handleSingleSelector(parent, select, option) {
  const selector = select.getAttribute('data-i18n-selector')
  const elements = parent.querySelectorAll(selector)

  // save original i18n data
  if (!langMap.get(select)) {
    langMap.set(select, [...elements].map(e => getTextNode(e).data))
  }

  if (langPage != option.lang) {
    parent.setAttribute('lang', option.lang)
  }

  // get which i18n to switch
  const phrases = option.value === 'default'
    ? langMap.get(select)
    : option.getAttribute('data-phrases').split(',')

  // update text, which map phrases in DOM order
  elements.forEach((element, i) => {
    const textNode = getTextNode(element)
    textNode.replaceWith(phrases[i] || phrases[0])
  })
}

function handleMultipleSelectors(parent, select, option, selectors) {
  const selectorMap = new Map()
  const elements = parent.querySelectorAll(selectors.join(','))

  // create a selectorMap that can get a selector to map to the phrases
  elements.forEach(element => {
    const selector = selectors.find(s => element.matches(s))
    selectorMap.set(selector, {
      element,
      textNode: getTextNode(element)
    })
  })

  // save original i18n data
  if (!langMap.get(select)) {
    const originalTexts = new Map()
    for (const [selector, { textNode }] of selectorMap) {
      originalTexts.set(selector, textNode.data)
    }
    langMap.set(select, originalTexts)
  }

  if (langPage != option.lang) {
    parent.setAttribute('lang', option.lang)
  }

  // get which i18n to switch
  const phrases = option.value === 'default'
    ? langMap.get(select)
    : new Map(selectors.map((selector, i) => [
        selector,
        option.getAttribute('data-phrases').split(',')[i]
      ]))

  // update text
  for (const [selector, { textNode }] of selectorMap) {
    textNode.replaceWith(phrases.get(selector))
  }
}

function getTextNode(element) {
  return [...element.childNodes].find(e => e.nodeType === Node.TEXT_NODE)
}

async function setCode(el) {
  const url = el.getAttribute('data-fetch-url')
  const html = await (await fetch(url)).text()
  el.textContent = html
}

for (const boilerplateTarget of document.querySelectorAll('[data-fetch-url]')) {
  setCode(boilerplateTarget)
}
