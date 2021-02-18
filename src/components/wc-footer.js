const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
  <style>
    .footer {
      background: #01344e;
      padding: 16px;
    }
    .footer__msg {
      margin: 0;
      text-align: center;
    }
  </style>
  <div class="footer">
    <h4 class="footer__msg">© Amarnath Chandana, 2021</h4>
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
