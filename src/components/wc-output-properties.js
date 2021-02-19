const wcOutputPropsTemplate = document.createElement('template');
wcOutputPropsTemplate.innerHTML = `

  <style>
    .output-properties__list {
      list-style: none;
      padding-left: 0;
    }
  </style>

  <div class="output-properties">
    <ul class="output-properties__list">
      <li>
        <slot name="item"></slot>
      </li>
    </ul>
  </div>
`;

class WCOutputProperties extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wcOutputPropsTemplate.content.cloneNode(true));
  }
}

customElements.define('wc-output-properties', WCOutputProperties);
