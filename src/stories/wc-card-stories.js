const wcCardStoriesTemplate = document.createElement('template');
wcCardStoriesTemplate.innerHTML = `

  <style>
    .card-stories {
      display: flex;
    }

    .card-stories__card {
      margin-right: 24px;
    }

    @media screen and (max-width: 800px) {
      .card-stories {
        flex-direction: column;
      }

      .card-stories__card {
        margin-right: 0;
        margin-bottom: 12px;
      }
    }
  </style>
  
  <wc-story-header title="Cards"></wc-story-header>
  
  <div class="card-stories">
  
    <div class="card-stories__card">
      <wc-card
        img-src="https://dsys-angular01.herokuapp.com/assets/profile-pic.svg"
        card-content=""
        has-image="yes"
        button-title="">
      </wc-card>
    </div>
    <div class="card-stories__card">
      <wc-card></wc-card>
    </div>

  </div>

  <wc-story-attr-header title="Component Inputs"></wc-story-attr-header>

  <wc-dropdown id="hasImage" options="yes|no">
    <span slot="title">Has Image</span>
  </wc-dropdown>

  <wc-input id="buttonLabel" placeholder="Type label">
    <span slot="title">Button Label</span>
  </wc-input>

  <wc-input id="cardTitle" placeholder="Type Card title" max-length="20">
    <span slot="title">Card Title</span>
  </wc-input>

  <wc-input id="cardContent" placeholder="Type content" max-length="110">
    <span slot="title">Card Content</span>
  </wc-input>

  <wc-story-attr-header title="Component Outputs"></wc-story-attr-header>
  <wc-output-properties>
    <span slot="item">Click Event</span>
  </wc-output-properties>
`;

class WCCardStories extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wcCardStoriesTemplate.content.cloneNode(true));
    
    const cardsEle = this.shadowRoot.querySelectorAll('wc-card');

    this.hasImageEle = this.shadowRoot.getElementById('hasImage');
    this.hasImageEle.addEventListener('optionChanged', e =>
      cardsEle.forEach(cardEle => cardEle.setAttribute('has-img', e.detail))
    );

    this.btnLabelEle = this.shadowRoot.getElementById('buttonLabel');
    this.btnLabelEle.addEventListener('inputChanged', e => {
        const btnLabelVal = e.detail.trim().length != 0 ? e.detail :  'Click me';
        cardsEle.forEach(cardEle => cardEle.setAttribute('btn-label', btnLabelVal))
    });

    this.cardTitleEle = this.shadowRoot.getElementById('cardTitle');
    this.cardTitleEle.addEventListener('inputChanged', e => {
      const cardTitleVal = e.detail.trim().length != 0 ? e.detail : 'Card Title';
      cardsEle.forEach(cardEle => cardEle.setAttribute('title', cardTitleVal))
    });

    this.cardContentEle = this.shadowRoot.getElementById('cardContent');
    this.cardContentEle.addEventListener('inputChanged', e => {
      cardsEle.forEach(cardEle => cardEle.setAttribute('content', e.detail))
    });
  }
}

customElements.define('wc-card-stories', WCCardStories);
