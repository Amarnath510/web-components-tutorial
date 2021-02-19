class WCButton extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['border-radius', 'size', 'title', 'type'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue != newValue) {
      if (attrName == 'border-radius') {
        this.updateRadius(newValue == 'yes');
      } else if (attrName == 'size') {
        this.updateSize(newValue);
      } else if (attrName == 'title') {
        this.updateTitle(newValue);
      } else if (attrName == 'type') {
        if (this.buttonEle) {
          this.buttonEle.classList.remove("primary", "secondary", "danger");
          this.buttonEle.classList.add(newValue);
        }
      }
    }
  }

  updateRadius(applyBorderRadius) {
    if (applyBorderRadius) {
      this.buttonEle.classList.add('borderRadius');
    } else {
      this.buttonEle.classList.remove('borderRadius');
    }
  }

  updateSize(size = 'small') {
    this.buttonEle.classList.remove('small', 'medium', 'large');
    this.buttonEle.classList.add(size);
  }

  updateTitle(newTitle) {
    if (this.buttonEle) {
      if (newTitle.trim().length == 0) {
        newTitle = this.type == 'primary' ? 'Primary' : (this.type == 'secondary' ? 'Secondary' : 'Danger')
      }
      this.buttonEle.textContent = newTitle;
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.type = this.getAttribute('type') || 'primary';
    this.title = this.getAttribute('title') || 'primary';
    this.shadowRoot.innerHTML = `
      <style>
        button {
          border: none;
          padding: 12px;
          margin-right: 16px;
          text-transform: capitalize;
          width: 120px;
          background: #FFF;
          color: #FFF;
        }
        .primary {
          background-color: #0053b9;
        }
        .secondary {
          color: #007bff;
          border: 1px solid #007bff;
        }
        .danger {
          background: #dc3545;
        }
        .borderRadius {
          border-radius: 10px;
        }
        .small {
          width: 100px;
          padding: 10px;
          font-size: 90%;
        }
        .medium {
          width: 120px;
          padding: 12px;
          font-size: 100%;
        }
        .large {
          width: 140px;
          padding: 14px;
          font-size: 105%;
        }
      </style>
      <button type="button" class="${this.type}">${this.title}</button>
    `;
    this.buttonEle = this.shadowRoot.querySelector('button');
    this.buttonEle.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('btnClicked', { detail: this.type }));
    });
    this.updateSize(this.getAttribute('size') || 'small');
    this.updateRadius(this.getAttribute('border-radius') || 'yes');
  }
}

customElements.define('wc-button', WCButton);


