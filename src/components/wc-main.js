const mainTemplate = document.createElement('template');
mainTemplate.innerHTML = `
  <style>
    .main {
      height: 100%;
      width: 80%;
      margin: 0 auto;
      color: #000; 
    }
  </style>
  <div class="main">
    <h2>Main Component Works</h2>
  </div>
`;

class WCMain extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true));
  }
}

customElements.define('wc-main', WCMain);
