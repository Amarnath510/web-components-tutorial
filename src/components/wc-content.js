const wcContentTemplate = document.createElement('template');
wcContentTemplate.innerHTML = ``;

class WCContent extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'type' && oldValue != newValue) {
      this.loadContent(newValue);
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const type = this.getAttribute('type') || 'buttons';
    this.loadContent(type);
  }

  loadContent(type) {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `${this.getStory(type)}`;
    }
  }

  getStory(type) {
    if (type === 'buttons') {
      return `<wc-button-stories></wc-button-stories>`;
    } else if (type === 'dropdowns') {
      return `<wc-dropdown-stories></wc-dropdown-stories>`;
    } else if (type === 'inputs') {
      return `<wc-input-stories></wc-input-stories>`;
    } else {
      return `<wc-button-stories></wc-button-stories>`;
    }
  }
}

customElements.define('wc-content', WCContent);
