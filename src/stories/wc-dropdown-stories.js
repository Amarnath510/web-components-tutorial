const wcDropdownStoriesTemplate = document.createElement('template');
wcDropdownStoriesTemplate.innerHTML = `

  <style>
    .dropdown-container {
      display: flex;
    }
  </style>

  <wc-story-header title="Dropdowns"></wc-story-header>

  <div class="dropdown__container">
    <wc-dropdown options="prop-1|prop-2|prop-3" hide-title="true" id="selectComp"></wc-dropdown>
  </div>

  <wc-story-attr-header title="Component Inputs"></wc-story-attr-header>

  <wc-dropdown options="small|medium|large" id="dropdownSizes">
    <slot slot="title">Size</slot>
  </wc-dropdown>
`;

class WCDropdownStories extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wcDropdownStoriesTemplate.content.cloneNode(true));

    this.selectCompEle = this.shadowRoot.getElementById('selectComp');
    this.dropdownSizesEle = this.shadowRoot.getElementById('dropdownSizes');
    this.dropdownSizesEle.addEventListener('optionChanged', e => this.selectCompEle.setAttribute('size', e.detail));
  }
}

customElements.define('wc-dropdown-stories', WCDropdownStories);
