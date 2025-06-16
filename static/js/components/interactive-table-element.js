class InteractiveTableElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this._applyCSS()
    this.ths = [...this.querySelectorAll('thead th')]
    this.trs = [...this.querySelectorAll('tbody tr')]
    this.sortableButtons = []
    this.sortableLabel = this.getAttribute('sortable-label') || '排序'
    for (let i = 0; i < this.ths.length; i++) {
      if (!this.ths[i].matches('[data-sortable][scope="col"]')) continue
      this.sortableButtons.push(this._addSortButton(this.ths[i], i))
    }

    this.filterable = this.querySelector('[data-filterable]')
    this.filterableColumnsIds = this.ths.map((e, index) => e.hasAttribute('data-filterable') ? index : null).filter(e => e)

    if (this.filterable) {
      this._addFilter()
    }
  }

  _addFilter() {
    const id = Math.random().toString().substring(2,6)
    const template = document.createElement('template')
    template.innerHTML = `
      <div class="flex gap2 items-center">
        <label for="filterable-${id}" class="nowrap">${this.getAttribute('filterable-label') || '篩選'}</label>
        <input id="filterable-${id}" class="flex-auto" data-filter-input>
        <div class="sr-only" role="status"></div>
      </div>
    `
    this.prepend(template.content.cloneNode(true))
    const input = this.querySelector('[data-filter-input]')
    
    input.addEventListener('input', (e) => {
      for (const tr of this.trs) {
        if (input.value === '') {
          tr.hidden = false
          continue
        }
        const filterableContent = this.filterableColumnsIds.length > 0 ? this.filterableColumnsIds.map(i => tr.cells[i].textContent).join('') : tr.textContent
        tr.hidden = !filterableContent.match(new RegExp(input.value, 'im'))
      }
    })
  }

  _addSortButton(th, index) {
    const button = document.createElement('button')
    const tbody = this.querySelector('tbody')
    th.setAttribute('aria-sort', 'none')
    button.type = 'button'
    button.classList.add('button', 'button-mini', 'ml3', 'float-right')
    button.textContent = '⇅'
    button.setAttribute('aria-label', `${th.textContent}${this.sortableLabel}`)
    button.setAttribute('aria-pressed', 'false')
    
    button.addEventListener('click', () => {
      for (const _button of this.sortableButtons) {
        if (_button === button) continue
        _button.closest('th').setAttribute('aria-sort', 'none')
        _button.setAttribute('aria-pressed', 'false')
      }

      const isPressed = button.getAttribute('aria-pressed') === 'true'
      button.setAttribute('aria-pressed', !isPressed ? 'true' : 'false')
      button.closest('th').setAttribute('aria-sort', isPressed ? 'ascending' : 'descending')

      function comparable(el) {
        const content = el.textContent || ''
        if (th.getAttribute('data-sortable') === 'date') return new Date(content)
        if (th.getAttribute('data-sortable') === 'numeric') return Number(content.replace(/[^0-9.-]/g,''))
        return content
      }

      tbody.append(...this.trs.sort((a, b) => {
        const aComparable = comparable(a.cells[index])
        const bComparable = comparable(b.cells[index])
        console.log(aComparable)
        if (aComparable > bComparable) return isPressed ? 1 : -1
        if (aComparable < bComparable) return !isPressed ? 1 : -1
        return 0
      }))
    })
    
    th.append(button)
    return button
  }

  _applyCSS() {
    const style = document.createElement('style')
    style.textContent = `
      interactive-table th[aria-sort] {
        white-space: nowrap;
      }

      interactive-table th[aria-sort]::before {
        content: '';
        margin-right: 0.6em;
        display: inline-block;
        vertical-align: text-bottom;
        height: 1.2em;
        width: 1.2em;
        line-height: 1.2em;
        font-size: 0.8em;
        border-radius: 50%;
        border: 1px solid var(--backgroundColorLayer1);
        text-align: center;
        background-color: var(--backgroundColorLayer1);
      }

      interactive-table th[aria-sort="ascending"]::before {
        background-color: transparent;
        border: 1px solid var(--borderColor);
        content: '↑'
      }

      interactive-table th[aria-sort="descending"]::before {
        background-color: transparent;
        border: 1px solid var(--borderColor);
        content: '↓'
      }
    `
    this.append(style)
  }
}

window.customElements.define('interactive-table', InteractiveTableElement)

export default InteractiveTableElement
