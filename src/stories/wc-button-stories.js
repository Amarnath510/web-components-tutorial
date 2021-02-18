const wcInputStoriesTemplate = document.createElement('template');
wcInputStoriesTemplate.innerHTML = `

  <wc-story-header title="Buttons"></wc-story-header>

  <wc-button
    type="primary"
    title="Primary">
  </wc-button>

  <wc-button
    type="secondary"
    title="secondary">
  </wc-button>

  <wc-button
    type="danger"
    title="danger">
  </wc-button>

  <wc-story-attr-header title="Component Inputs"></wc-story-attr-header>

  <wc-dropdown id="borderRadius" options="no|yes">
    <span slot="title">Border Radius</span>
  </wc-dropdown>

  <wc-dropdown id="sizes" options="small|medium|large">
    <span slot="title">Size</span>
  </wc-dropdown>

  <wc-input id="buttonTitle" placeholder="Type title">
    <span slot="title">Button Title</span>
  </wc-input>
`;

class WCButtonStories extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wcInputStoriesTemplate.content.cloneNode(true));

    this.addEvents();
  }

  addEvents() {
    const borderRadiusEle = this.shadowRoot.getElementById('borderRadius');
    const sizesEle = this.shadowRoot.getElementById('sizes');
    const btnTitleEle = this.shadowRoot.getElementById('buttonTitle');

    borderRadiusEle.addEventListener('optionChanged', e => {
      const wcButtonsEle = this.shadowRoot.querySelectorAll('wc-button');
      wcButtonsEle.forEach(wcBtn => wcBtn.setAttribute('border-radius', e.detail));
    });

    sizesEle.addEventListener('optionChanged', e => {
      const wcButtonsEle = this.shadowRoot.querySelectorAll('wc-button');
      wcButtonsEle.forEach(wcBtn => wcBtn.setAttribute('size', e.detail));
    });
    
    btnTitleEle.addEventListener('inputChanged', e => {
      const wcButtonsEle = this.shadowRoot.querySelectorAll('wc-button');
      wcButtonsEle.forEach(wcBtn => wcBtn.setAttribute('title', e.detail));
    });
  }
}

customElements.define('wc-button-stories', WCButtonStories);
