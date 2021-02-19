const wcCardTemplate = document.createElement('template');
wcCardTemplate.innerHTML = `
  <style>
    .card__main {
      border: 1px solid lightgray;
      width: 12rem;
      border-radius: 8px;
      padding: 16px;
    }

    .card__header__img {
      width: 10rem;
      height: 8rem;
      display: block;
      margin: 0 auto;
    }

    .card__header_title-no-img {
      margin-top: 4px;
    }
  </style>

  <div class="card">
    <section class="card__main">
      <header class="card__header">
        <div class="card__header-img-wrapper">
          <img class="card__header__img" src="" alt="card logo"/>
        </div>
        <div class="card__header-title-wrapper">
          <h3 class="card__header_title">
            Card Title
          </h3>
        </div>
      </header>
      <div class="card__content-wrapper">
        <p class="card__content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, at ut quidem minus perspiciatis accusantium!
        </p>
      </div>
      <footer class="card__footer">
        <wc-button type="primary" title="Click me" id="cardBtn"></wc-button>
      </footer>
    </div>
  </div>
`;

class WCCard extends HTMLElement {

  constructor() {
    super();
    this.defaultContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, at ut quidem minus perspiciatis accusantium!';
  }

  static get observedAttributes() {
    return ["img-src", "title", "btn-label", "content", "has-img"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue != newValue) {
      if (attrName == 'img-src') {
        this.setAttribute('src', newValue);
      } else if (attrName == 'title') {
        this.shadowRoot.querySelector('.card__header_title').textContent = newValue;
      } else if (attrName == 'btn-label') {
        this.shadowRoot.getElementById('cardBtn').setAttribute('title', newValue);
      } else if (attrName == 'content') {
        const newContent = newValue.trim().length != 0 ? newValue : this.defaultContent;
        this.shadowRoot.querySelector('.card__content').textContent = newContent;
      } else if (attrName == 'has-img') {
        const hasImageElement = this.shadowRoot.querySelector('.card__header-img-wrapper');
        const shouldHaveImage = newValue == 'yes';
        hasImageElement.style.display = shouldHaveImage ? 'block' : 'none';
        const cardHeaderTitleEle = this.shadowRoot.querySelector('.card__header_title');
        if (shouldHaveImage) {
          cardHeaderTitleEle.classList.remove('card__header_title-no-img');
        } else {
          cardHeaderTitleEle.classList.add('card__header_title-no-img');
        }
      }
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wcCardTemplate.content.cloneNode(true));

    this.cardImageEle = this.shadowRoot.querySelector('.card__header__img');
    this.cardImageEle.setAttribute('src', this.getAttribute('img-src') || 'https://dsys-angular01.herokuapp.com/assets/404.svg');

    // If no image use danger btn
    this.shadowRoot.getElementById('cardBtn').setAttribute('type', this.getAttribute('img-src') ? 'primary' : 'danger');
    this.addEvents();
  }

  addEvents() {
    const cardBtnEle = this.shadowRoot.getElementById('cardBtn');
    cardBtnEle.addEventListener('btnClicked', _ => alert('Fetch Card Details'))
  }
}

customElements.define('wc-card', WCCard);
