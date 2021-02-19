const wcInputStoriesTemplate = document.createElement('template');
wcInputStoriesTemplate.innerHTML = `
  <wc-story-header title="Input"></wc-story-header>

  <wc-input no-title="true"></wc-input>

  <wc-story-attr-header title="Component Inputs"></wc-story-attr-header>

  <wc-dropdown id="inputType" options="text|password">
    <span slot="title">Input Type</span>
  </wc-dropdown>

  <wc-dropdown id="sizes" options="small|medium|large">
    <span slot="title">Size</span>
  </wc-dropdown>

  <wc-story-attr-header title="Component Outputs"></wc-story-attr-header>

  <wc-output-properties>
    <span slot="item">Type Event</span>
  </wc-output-properties>
`;

class WCInputStories extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wcInputStoriesTemplate.content.cloneNode(true));

    this.addEvents();
  }

  addEvents() {
    const inputTypeEle = this.shadowRoot.getElementById('inputType');
    const sizesEle = this.shadowRoot.getElementById('sizes');

    inputTypeEle.addEventListener('optionChanged', e => {
      const wcInputEle = this.shadowRoot.querySelector('wc-input');
      wcInputEle.setAttribute('type', e.detail);
    });

    sizesEle.addEventListener('optionChanged', e => {
      const wcInputEle = this.shadowRoot.querySelector('wc-input');
      wcInputEle.setAttribute('size', e.detail);
    });
  }
}

customElements.define('wc-input-stories', WCInputStories);
