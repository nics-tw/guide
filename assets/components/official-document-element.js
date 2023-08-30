const documentTemplate = document.createElement('template')
documentTemplate.innerHTML = `
  <div class="od-title"></div>
  <p class="od-meta"></p>

  <dl class="od-list">
  </dl>

  <p class="od-admin"></p>
`

class OfficialDocumentElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    let parsed 
    try {
      parsed = this.parsed()
      this.innerText = ''
      this.classList.add('parsed')
      this.append(parsed)
    } catch {
      this.innerText = this.innerText.trim()
    }
  }

  parsed() {
    const text = this.textContent.trim()
    const lines = text.split('\n')
    const department = lines[0]
    const date = lines[1]
    const documentMeta = lines[2]
    const title = lines[4].split('：')[1]
    const dependency = lines[5].split('：')[1]
    const items = lines[6].split('：')[1] + lines.slice(7, lines.length - 3).join('\n')
    const adminTitle = lines[lines.length - 2]
    const adminName = lines[lines.length - 1]
    
    const od = documentTemplate.content.cloneNode(true)
    
    od.querySelector('.od-title').textContent = department
    od.querySelector('.od-meta').textContent = `${date}　${documentMeta}`
    const dl = od.querySelector('dl')
    dl.innerHTML = `${this._dt('主旨', title)}${this._dt('依據', dependency)}${this._dt('公告事項', items)}`
    od.querySelector('.od-admin').textContent = `${adminTitle}　${adminName}`

    return od
  }
  
  _dt(title, text) { 
    const splitTitle = title.split('').map(t => `<span>${t}</span>`).join('')
    return `<dt>${splitTitle}</dt><dd>${text}</dd>`
  }
}

window.customElements.define('official-document', OfficialDocumentElement)

export default OfficialDocumentElement
