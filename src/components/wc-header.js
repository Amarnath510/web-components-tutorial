const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
  <style>
    div {
      background: #01344e;
    }
    .header__title, .header__sub-title {
      margin: 0;
      padding: 4px;
      text-align: center;
    }

    .header__sub-title {
      padding-bottom: 12px;
    }
  </style>
  <div>
    <h1 class="header__title">Web Components</h1>
    <h2 class="header__sub-title">Design Systems - Style Guide</h2>
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
