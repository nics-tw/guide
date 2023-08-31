const langMap = new WeakMap()

document.addEventListener('change', (event) => {
  const select = event.target.closest('select')
  if (!select.hasAttribute('data-i18n-selector')) return
  const option = select.selectedOptions[0]
  const selector = select.getAttribute('data-i18n-selector')
  const parent = option.closest('[data-example]')
  const elements = parent.querySelectorAll(selector)

  if (!langMap.get(select)) langMap.set(select, [...elements].map(e => getTextNode(e).data))
  let phrases

  if (option.value === 'default') {
    phrases = langMap.get(select)
  } else {
    phrases = option.getAttribute('data-phrases').split(',')
  }
  
  for (let i = 0; i < elements.length; i++) {
    const textNode = getTextNode(elements[i])
    textNode.replaceWith(phrases[i] || phrases[0])
  }
})

function getTextNode(element) {
  return [...element.childNodes].find(e => e.nodeType === Node.TEXT_NODE)
}
