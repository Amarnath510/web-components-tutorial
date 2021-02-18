class WCStoryAttrHeader extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .story-attr-header__title {
          color: #3f3b3b;
        }
      </style>
      <h2 class="story-attr-header__title">${this.getAttribute('title') || 'Details'}</h2>
    `;
  }
}

customElements.define('wc-story-attr-header', WCStoryAttrHeader);
