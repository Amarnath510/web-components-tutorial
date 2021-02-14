const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
  <style>
    div {
      background: #01344e;
    }
    h1 {
      margin: 0;
      padding: 16px;
      text-align: center;
    }
  </style>
  <div>
    <h1>Web Components - Design Systems Style Guide</h1>
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
