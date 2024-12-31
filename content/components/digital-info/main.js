const previewContainer = document.querySelector('[data-preview]')
const form = document.querySelector('[data-generate-digital-info]')
const exportLink = document.querySelector('[data-export]')

form.addEventListener('input', () => {
  if (form.checkValidity()) generateHTML()
})
form.addEventListener('invalid', () => {
  previewContainer.innerHTML = resetHTML
  previewContainer.setAttribute('data-default', '')
}, true)

form.addEventListener('submit', function(e) {
  e.preventDefault()
  generateHTML()
})

function generateHTML() {
  previewContainer.removeAttribute('data-default')
  
  for (const el of [...form.elements]) {
    if (!el.name) continue
    const textEl = previewContainer.querySelector(`[data-${el.name}]`)
    const label = previewContainer.querySelector(`[data-${el.name}-label]`)
    if (el.value.trim() === '') {
      textEl.hidden = true
      if(label) label.hidden = true
      continue
    }
    if(label) label.hidden = false
    textEl.hidden = false
    textEl.textContent = el.value
  }

  exportLink.href = `data:text/html,${encodeURIComponent(inlineStyle(previewContainer.innerHTML))}`
  exportLink.download = `${document.querySelector('[data-full-name]').textContent}.html`
  exportLink.hidden = false
}

function generateVCard() {
  let vcard = `BEGIN:VCARD
VERSION:3.0
KIND:individual
LANG:zh-TW
N:${document.querySelector('[data-full-name]').textContent};;;
FN:${document.querySelector('[data-full-name]').textContent}
ORG:${document.querySelector('[data-organization]').textContent};
TITLE:${document.querySelector('[data-title]').textContent}\n`
  const email = document.querySelector('[data-email]')
  if (email.textContent) { vcard += `EMAIL;TYPE=work:${email.textContent}\n` }
  const phone = document.querySelector('[data-phone]')
  if (phone.textContent) { vcard += `TEL:${phone.textContent}\n` }
  const address = document.querySelector('[data-address]')
  if (address.textContent) { vcard += `ADR;TYPE=work:${address.textContent};;;;\n` }
  vcard += `END:VCARD`
  return vcard
}

const properties = [
  'font-size',
  'font-family',
  'line-height',
  'color',
  'margin',
  'padding',
  'background-color',
  'border',
  'border-radius',
  'text-align',
  'overflow',
  'max-width',
  'width',
  'display'
]

function inlineStyle(html) { 
  const cloned = previewContainer.cloneNode(true)
  document.body.append(cloned)
  const vcardLink = cloned.querySelector('[data-vcard]')
  vcardLink.hidden = false
  vcardLink.href = `data:text/vcard,${encodeURIComponent(generateVCard())}`
  vcardLink.download = `${document.querySelector('[data-full-name]').textContent}.vcf`
  for(const el of [...cloned.querySelectorAll('*')]) {
    const styles = window.getComputedStyle(el)
    const style = properties.map(prop => `${prop}:${styles.getPropertyValue(prop)}`).join(';')
    el.setAttribute('style', style)
    el.removeAttribute('class')
  }
  cloned.remove()
  return cloned.innerHTML
}

const resetHTML = previewContainer.innerHTML
form.addEventListener('reset', function(e) {
  previewContainer.innerHTML = resetHTML
  previewContainer.setAttribute('data-default', '')
})