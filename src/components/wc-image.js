const wcImageTemplate = document.createElement('template');
wcImageTemplate.innerHTML = `
  <style>

    .img {
      object-fit: cover;
      width: 220px;
      height: 220px;
    }

    .square {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    .circle  {
      border-radius: 50%;
    }

    .rhombus  {
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }

    .octagon {
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    }
  </style>

  <div class="wc-image">
    <img src="https://images.unsplash.com/photo-1603978547413-4d5d7be1ea2e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
    onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1589539148230-0a5b707cbd7d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80';"
      alt="random image"
      class="img"
    />
  </div>
`;

class WCImage extends HTMLElement {

  static get observedAttributes() {
    return ["shape"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (this.imgEle) {
      if (attrName == 'shape') {
        this.imgEle.classList.remove("square", "circle", "rhombus");
        this.imgEle.classList.add(newValue);
      }
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wcImageTemplate.content.cloneNode(true));
    this.imgEle = this.shadowRoot.querySelector('img');
    this.imgEle.classList.add(this.getAttribute('shape') || 'square');
  }
}

customElements.define('wc-image', WCImage);
