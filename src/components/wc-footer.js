const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
  <style>
    div {
      background: #01344e;
    }
    h3 {
      margin: 0;
      padding: 16px;
      text-align: center;
    }
  </style>
  <div>
    <h3>© Amarnath Chandana, 2021</h3>
  </div>
`;

class WCFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
  }
}

customElements.define('wc-footer', WCFooter);
