class SkipToElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const links = Array.from(this.querySelectorAll('a.skip-to'))
    this.addEventListener('click', (event) => {
      if (!links.includes(event.target)) return
      const target = document.querySelector(event.target.hash)
      if (!target) return

      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1')
        target.addEventListener('blur', () => {
          target.removeAttribute('tabindex')
        }, { once: true })
      }

      target.focus()
    })
  }

}

window.customElements.define('skip-to', SkipToElement)

export default SkipToElement
