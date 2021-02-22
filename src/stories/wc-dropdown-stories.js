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

  <wc-story-attr-header title="Component Outputs"></wc-story-attr-header>

  <wc-output-properties id="selectedItem">
    <span slot="item">Selected Item</span>
  </wc-output-properties>
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
    this.dropdownSizesEle.addEventListener('optionChanged',
      e => this.selectCompEle.setAttribute('size', e.detail));
    
    // For printing selected output
    const selectedItemEle = this.shadowRoot.querySelector('#selectedItem');
    const selectedItemContentEle = document.createElement('span');
    selectedItemEle.shadowRoot.append(selectedItemContentEle);

    this.selectCompEle.addEventListener('optionChanged', e => {
      selectedItemContentEle.innerText = e.detail;
    });
  }
}

customElements.define('wc-dropdown-stories', WCDropdownStories);
