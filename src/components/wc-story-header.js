class WCStoryHeader extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .story-header__title {
          margin-top: 0;
          color: #0053b9;
        }
      </style>
      <h2 class="story-header__title">${this.getAttribute('title') || 'Details' }</h2>
    `;
  }
}

customElements.define('wc-story-header', WCStoryHeader);
