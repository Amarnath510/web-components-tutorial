const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
  <style>
    div {
      background: #01344e;
    }
    h1, h2 {
      margin: 0;
      padding: 16px;
      padding-bottom: 8px;
      text-align: center;
    }
  </style>
  <div>
    <h1>Web Components</h1>
    <h2>Design Systems Style Guide</h2>
  </div>
`;

class WCHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
  }
}

customElements.define('wc-header', WCHeader);
