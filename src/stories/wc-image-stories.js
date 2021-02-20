class WCImageStories extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <wc-story-header title="Image"></wc-story-header>
      <wc-image shape="square"></wc-image>
      <wc-story-attr-header title="Component Inputs"></wc-story-attr-header>
      <wc-dropdown id="shapes" options="square|circle|rhombus|octagon">
        <span slot="title">Shape</span>
      </wc-dropdown>
    `;
    this.imgEle = this.shadowRoot.querySelector('wc-image');
    const shapeOptionEle = this.shadowRoot.querySelector('#shapes');
    shapeOptionEle.addEventListener('optionChanged', e => this.imgEle.setAttribute('shape', e.detail));
  }
}

customElements.define('wc-image-stories', WCImageStories);
