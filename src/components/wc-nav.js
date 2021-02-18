const wcNavTemplate = document.createElement('template');
wcNavTemplate.innerHTML = `
  <style>
    .nav {
      height: 100%;
      background: #f0f1f1;
      border-radius: 16px;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .item {
      border-bottom: 1px solid lightgray;
    }

    .item-link {
      text-decoration: none;
      color: #0053b9;
      padding: 16px;
      display: block;
    }
  </style>
  <div class="nav">
    <ul class="list">
      <li class="item">
        <a class="item-link" href="/buttons">Buttons</a>
      </li>
      <li class="item">
        <a class="item-link" href="/inputs">Inputs</a>
      </li>
      <!-- <li class="item">
        <a class="item-link" href="/dropdowns">Dropdown</a>
      </li>-->
    </ul>
  </div>
`;

class WCNav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wcNavTemplate.content.cloneNode(true));
    this.addClickEvent();
  }

  addClickEvent() {
    const links = this.shadowRoot.querySelectorAll('.item-link');
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        let selectedTab = e.target.href.split('/')[3];
        selectedTab = (!selectedTab || selectedTab.trim().length === 0) ? 'buttons' : selectedTab;
        this.dispatchEvent(new CustomEvent('tabSelected', { detail: selectedTab }));
      });
    });
  }

}

customElements.define('wc-nav', WCNav);
