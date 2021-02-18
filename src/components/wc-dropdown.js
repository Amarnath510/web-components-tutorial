const wcDropdownTemplate = document.createElement('template');
wcDropdownTemplate.innerHTML = `
  <style>
    .dropdown-menu {
      display: flex;
      margin-bottom: 18px;
    }

    .dropdown__title {
      margin-right: 12px;
    }

    .dropdown__title-wrapper {
      margin-right: 12px;
      display: flex;
      align-items: center;
      flex-basis: 20%;
    }

    .select {
      width: 180px;
      padding: 4px 2px;
      border: 1px solid lightgray;
      border-radius: 5px;
    }
  </style>

  <div class="dropdown-menu">
    <div class="dropdown__title-wrapper">
      <slot name="title"></slot>
    </div>
    <select id="select" class="select"></select>
  </div>
`;

class WCDropdown extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(wcDropdownTemplate.content.cloneNode(true));
    const selectEle = this.shadowRoot.getElementById('select');
    const options = (this.getAttribute('options') || "").split('|');
    options.forEach(option => {
      const text = option.charAt(0).toUpperCase() + option.slice(1);
      selectEle.options[selectEle.options.length] = new Option(text, option)
    });
    const self = this;
    self.generateEvent(options[0]);
    selectEle.onchange = function() { self.generateEvent(this.value); }
  }

  generateEvent(val) {
    this.dispatchEvent(new CustomEvent('optionChanged', {detail: val}));
  }
}

customElements.define('wc-dropdown', WCDropdown);
