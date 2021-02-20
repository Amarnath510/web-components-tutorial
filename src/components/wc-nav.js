const wcNavTemplate = document.createElement('template');
wcNavTemplate.innerHTML = `
  <style>
    .nav {
      height: 100%;
      background: #f0f1f1;
      border-radius: 4px;
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

    .active {
      background: #cfd3e0;
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
      <li class="item">
        <a class="item-link" href="/dropdowns">Dropdown</a>
      </li>
      <li class="item">
        <a class="item-link" href="/images">Image</a>
      </li>
      <li class="item">
        <a class="item-link" href="/cards">Cards</a>
      </li>
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
    const items = this.shadowRoot.querySelectorAll('.item');
    const links = this.shadowRoot.querySelectorAll('.item-link');

    // make first item(link) as active
    items[0].classList.add('active');

    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        let selectedTab = e.target.href.split('/')[3];
        selectedTab = (!selectedTab || selectedTab.trim().length === 0) ? 'buttons' : selectedTab;
        this.dispatchEvent(new CustomEvent('tabSelected', { detail: selectedTab }));
        items.forEach(item => item.classList.remove('active'));
        e.target.parentNode.classList.add('active');
      });
    });
  }

}

customElements.define('wc-nav', WCNav);
