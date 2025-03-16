const documentTemplate = document.createElement('template')
documentTemplate.innerHTML = `
  <div class="od-title"></div>
  <div class="od-metadata"><span class="od-date"></span><span class="od-num"></span></div>

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
      this.innerHTML = `<style>${this._css()}</style>`
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
    od.querySelector('.od-date').textContent = this._insertSpace(date)
    od.querySelector('.od-num').textContent = this._insertSpace(documentMeta)
    const dl = od.querySelector('dl')
    dl.innerHTML = `${this._dt('主旨', this._escapeHtml(title))}${this._dt('依據', this._escapeHtml(dependency))}${this._dt('公告事項', this._escapeHtml(items))}`
    od.querySelector('.od-admin').textContent = `${adminTitle}　${adminName}`

    return od
  }

  _insertSpace(text) {
    return text.replace(/([^0-9a-z])([0-9a-z])/g, '$1 $2').replace(/([0-9a-z])([^0-9a-z])/g, '$1 $2')
  }
  
  _dt(title, text) { 
    const splitTitle = title.split('').map(t => `<span>${t}</span>`).join('')
    return `<dt>${splitTitle}</dt><dd>${text}</dd>`
  }

  _escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }
    return text.replace(/[&<>"']/g, function(m) { return map[m] })
  }

  _css() {
    return `official-document.parsed {
  white-space: normal;
  padding-left: 2em;
  padding-top: 1em;
  padding-bottom: 1em;
  border-left: 1px dashed var(--borderColor);
  overflow: auto;
}

official-document .od-title {
  font-size: 1.2em;
}

official-document .od-admin {
  margin-top: 2em;
  margin-bottom: 0;
}

official-document .od-title,
official-document .od-admin {
  font-weight: bold;
}

official-document .od-metadata {
  display: inline-flex;
  flex-wrap: wrap;
  column-gap: 1.5em;
}

official-document .od-num,
official-document .od-date {
  font-size: 0.9em;
  color: var(--secondaryTextColor);
  font-variant-numeric: tabular-nums;
}

official-document dl.od-list {
  display: grid;
  width: 100%;
  grid-template-columns: max-content 1fr;
  column-gap: 1em;
  row-gap: 0.6em;  
}

official-document dt {
  display: flex;
  justify-content: space-between;
  margin-right: 0.2em;
  position: relative;

  &:after {
    content: '：';
    left: calc(100% + 2px);
    position: absolute;
  }
}

official-document dd {
  margin-left: 0;
  white-space: pre-wrap;
}
`
  }
}

window.customElements.define('official-document', OfficialDocumentElement)

export default OfficialDocumentElement
