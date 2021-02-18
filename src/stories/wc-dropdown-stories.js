const wcDropdownStoriesTemplate = document.createElement('template');
wcDropdownStoriesTemplate.innerHTML = `
  <wc-story-header title="Dropdowns"></wc-story-header>
  <wc-dropdown options="yes|no">
    <h2 slot="title">Items</h2>
  </wc-dropdown>
`;

class WCDropdownStories extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wcDropdownStoriesTemplate.content.cloneNode(true));
  }
}

customElements.define('wc-dropdown-stories', WCDropdownStories);
