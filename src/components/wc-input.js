const wcInputTemplate = document.createElement('template');
wcInputTemplate.innerHTML = `
  <style>
    .input-menu {
      display: flex;
      margin-bottom: 18px;
    }

    input {
      border-radius: 4px;
      border:  1px solid lightgray;
    }

    .input-menu__title-wrapper {
      margin-right: 12px;
      display: flex;
      align-items: center;
      flex-basis: 20%;
    }

    .small {
      width: 170px;
      padding: 5px;
    }

    .medium {
      width: 200px;
      padding: 8px;
    }

    .large {
      width: 220px;
      padding: 10px;
    }
  </style>

  <div class="input-menu">
    <div class="input-menu__title-wrapper">
      <slot name="title"></slot>
    </div>
    <input id="hybrid" type="text" placeholder="Type content" maxlength="12" class="small"/>
  </div>
`;

class WCInput extends HTMLElement  {

  static get observedAttributes() {
    return ['type', 'size'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue != newValue) {
      if (attrName == 'type') {
        this.updateType(newValue);
      } else if (attrName == 'size') {
        this.updateSize(newValue);
        this.updateMaxLength(newValue);
      }
    }
  }

  updateType(type = 'text') {
    this.inputEle.setAttribute('type', type)
  }

  updateSize(size = 'small') {
    this.inputEle.classList.remove('small', 'medium', 'large');
    this.inputEle.classList.add(size);
  }

  updateMaxLength(size = 'small') {
    const len = size == 'medium' ? 16 : (size == 'large' ? 20 : 12);
    this.inputEle.setAttribute('maxlength', len)
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wcInputTemplate.content.cloneNode(true));
    this.inputEle = this.shadowRoot.querySelector('input');
    if (this.getAttribute('no-title') || false) {
      this.shadowRoot.querySelectorAll(".input-menu__title-wrapper")[0].remove();
    }
    this.inputEle.setAttribute('placeholder', this.getAttribute('placeholder') || 'Type content');

    this.addTypeEvent();
  }

  addTypeEvent() {
    this.inputEle.addEventListener('input', (e) => {
      this.dispatchEvent(new CustomEvent('inputChanged', { detail: e.target.value }))
    });
  }
}

customElements.define('wc-input', WCInput);
