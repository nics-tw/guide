for (const limitedCount of document.querySelectorAll('[data-limit-phrase]')) {
  const textarea = limitedCount.querySelector('[data-character-limit]')
  const total = Number(textarea.getAttribute('data-character-limit'))
  const phrase = limitedCount.getAttribute('data-limit-phrase').replace('{total}', total)
  const notice = limitedCount.querySelector('[data-character-notice]')
  let lastRemaining = total
  
  textarea.addEventListener('input', (event) => {
    const remaining = total - textarea.value.length
    if (event.isComposing !== true) updateNotice()
  })

  textarea.addEventListener('keyup', (event) => {
    if (event.isComposing !== true) textarea.value = textarea.value.substring(0, total)
  })

  textarea.addEventListener('compositionend', updateNotice)

  function updateNotice() {
    const remaining = total - textarea.value.length
    lastRemaining = remaining
    notice.textContent = phrase.replace('|', '').replace('{remaining}', Math.max(0, remaining))
  }

  function conditionallyPreventInput(event) {
    const isReplacing = textarea.selectionStart !== textarea.selectionEnd
  
    if (lastRemaining <= 0 && event.isComposing !== true && !isReplacing) {
      event.preventDefault()
    }
  }

  textarea.addEventListener('drop', conditionallyPreventInput)
  textarea.addEventListener('keypress', conditionallyPreventInput)
  textarea.addEventListener('paste', conditionallyPreventInput)
}
