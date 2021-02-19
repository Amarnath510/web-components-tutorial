const wcInputStoriesTemplate = document.createElement('template');
wcInputStoriesTemplate.innerHTML = `

  <style>
    .button-stories__buttons {
      display: flex;
    }

    @media screen and (max-width: 800px) {
      .button-stories__buttons {
        flex-direction: column;
      }

      .button-stories__button {
        margin-bottom: 12px;
      }
  </style>

  <wc-story-header title="Buttons"></wc-story-header>

  <div class="button-stories__buttons">
    <wc-button class="button-stories__button"
      type="primary"
      title="Primary">
    </wc-button>

    <wc-button class="button-stories__button"
      type="secondary"
      title="secondary">
    </wc-button>

    <wc-button class="button-stories__button"
      type="danger"
      title="danger">
    </wc-button>
  </div>

  <wc-story-attr-header title="Component Inputs"></wc-story-attr-header>

  <wc-dropdown id="borderRadius" options="yes|no">
    <span slot="title">Border Radius</span>
  </wc-dropdown>

  <wc-dropdown id="sizes" options="small|medium|large">
    <span slot="title">Size</span>
  </wc-dropdown>

  <wc-input id="buttonTitle" placeholder="Type title">
    <span slot="title">Button Title</span>
  </wc-input>

  <wc-story-attr-header title="Component Outputs"></wc-story-attr-header>
  
  <wc-output-properties>
    <span slot="item">Click Event</span>
  </wc-output-properties>
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
    const wcButtonsEle = this.shadowRoot.querySelectorAll('wc-button');

    borderRadiusEle.addEventListener('optionChanged', e => {
      wcButtonsEle.forEach(wcBtn => wcBtn.setAttribute('border-radius', e.detail));
    });

    sizesEle.addEventListener('optionChanged', e => {
      wcButtonsEle.forEach(wcBtn => wcBtn.setAttribute('size', e.detail));
    });
    
    btnTitleEle.addEventListener('inputChanged', e => {
      wcButtonsEle.forEach(wcBtn => wcBtn.setAttribute('title', e.detail));
    });

    wcButtonsEle.forEach(wcBtn =>
      wcBtn.addEventListener('btnClicked', e => alert(e.detail + ' clicked')));
  }
}

customElements.define('wc-button-stories', WCButtonStories);
