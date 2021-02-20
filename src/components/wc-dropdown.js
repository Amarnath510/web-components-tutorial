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
      width: 160px;
      padding: 4px 2px;
      border: 1px solid lightgray;
      border-radius: 5px;
    }

    .small {
      width: 160px;
    }

    .medium {
      width: 180px;
    }

    .large {
      width: 200px;
    }
  </style>

  <div class="dropdown-menu">
    <div class="dropdown__title-wrapper">
      <slot name="title"></slot>
    </div>
    <select id="select" class="select small"></select>
  </div>
`;

class WCDropdown extends HTMLElement {

  static get observedAttributes() {
    return ['size'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == 'size') {
      this.selectEle.classList.remove("small", "medium", "large");
      this.selectEle.classList.add(newValue);
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(wcDropdownTemplate.content.cloneNode(true));
    this.selectEle = this.shadowRoot.getElementById('select');
    const options = (this.getAttribute('options') || "").split('|');
    options.forEach(option => {
      const text = option.charAt(0).toUpperCase() + option.slice(1);
      this.selectEle.options[this.selectEle.options.length] = new Option(text, option)
    });
    this.toggleTitle(this.getAttribute('hide-title') == 'true');

    const self = this;
    self.generateEvent(options[0]);
    this.selectEle.onchange = function() { self.generateEvent(this.value); }
  }

  generateEvent(val) {
    this.dispatchEvent(new CustomEvent('optionChanged', {detail: val}));
  }

  toggleTitle(hideTitle) {
    const displayProp = hideTitle ? 'none' : 'block';
    this.shadowRoot.querySelector('.dropdown__title-wrapper').style.display = displayProp;
  }
}

customElements.define('wc-dropdown', WCDropdown);
