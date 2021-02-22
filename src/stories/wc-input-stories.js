const wcInputStoriesTemplate = document.createElement('template');
wcInputStoriesTemplate.innerHTML = `
  <wc-story-header title="Input"></wc-story-header>

  <wc-input no-title="true" max-length="10"></wc-input>

  <wc-story-attr-header title="Component Inputs"></wc-story-attr-header>

  <wc-dropdown id="inputType" options="text|password">
    <span slot="title">Input Type</span>
  </wc-dropdown>

  <wc-dropdown id="sizes" options="small|medium|large">
    <span slot="title">Size</span>
  </wc-dropdown>

  <wc-dropdown id="maxLength" options="10|20|30">
    <span slot="title">Max Length</span>
  </wc-dropdown>

  <wc-story-attr-header title="Component Outputs"></wc-story-attr-header>

  <wc-output-properties id="typeEvent">
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
    const inputTypeOptionsEle = this.shadowRoot.getElementById('inputType');
    const sizesEle = this.shadowRoot.getElementById('sizes');
    const maxLengthEle = this.shadowRoot.getElementById('maxLength');
    const wcInputEle = this.shadowRoot.querySelector('wc-input');
    const typeEventEle = this.shadowRoot.querySelector('#typeEvent')
    const typedContentEle = document.createElement('span')
    typeEventEle.shadowRoot.append(typedContentEle)

    inputTypeOptionsEle.addEventListener('optionChanged', e => {
      wcInputEle.setAttribute('type', e.detail);
    });

    sizesEle.addEventListener('optionChanged', e => {
      wcInputEle.setAttribute('size', e.detail);
    });
    
    maxLengthEle.addEventListener('optionChanged', e => {
      wcInputEle.setAttribute('max-length', e.detail);
    });

    wcInputEle.addEventListener('inputChanged', e => {
      typedContentEle.innerHTML = e.detail;
    });
  }
}

customElements.define('wc-input-stories', WCInputStories);
