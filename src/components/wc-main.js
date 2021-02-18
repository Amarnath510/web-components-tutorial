const mainTemplate = document.createElement('template');
mainTemplate.innerHTML = `
  <style>
    .main {
      height: 100%;
      width: 80%;
      margin: 0 auto;
      color: #000; 
    }

    .main__layout {
      display: flex;
      height: 100%;
    }

    .main__nav {
      flex-basis: 30%;
      height: 100%;
    }

    .main__content {
      flex-basis: 70%;
      height: 100%;
      padding: 0 12px 12px 16px;
    }
  </style>
  <div class="main">
    <div class="main__layout">
      <div class="main__nav">
        <wc-nav id="mainNav"></wc-nav>
      </div>
      <div class="main__content">
        <wc-content id="mainContent" type="buttons"></wc-content>
      </div>
    </div>
  </div>
`;

class WCMain extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true));

    this.addNavClickEvent();
  }

  addNavClickEvent() {
    const navEle = this.shadowRoot.getElementById('mainNav');
    const mainContentEle = this.shadowRoot.getElementById('mainContent');
    navEle.addEventListener('tabSelected', e => {
      mainContentEle.setAttribute('type', e.detail);
    });
  }
}

customElements.define('wc-main', WCMain);
