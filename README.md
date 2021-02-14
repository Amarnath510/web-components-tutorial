# Web components(WCs)

- Set of web platform API's that allow us to create custom, reusable and encapsulated html tags to use in web pages and web apps
- WCs don't need any 3rd party libraries or frameworks
- Any 3rd party library or framework can use WCs

## Building blocks of WCs

### Custom Elements
- Used to create custom elements using two ways,
  - Autonomous custom elements (a complete new element by extending `HTMLElement` class)
  - Customized built-in elements (a decorator element by extending existing element class like `HTMLButtonElement` class)
  - Example: Let's create a custom Input element
    ```
    class AppInput extends HTMLElement { ... } // Create custom input element
    window.customElements.define('app-input', AppInput); // Register this to global window object

    <!-- Finally use this in the HTML -->
    <app-input></app-input>
    <!-- NOTE: You can't use as AppElement -->
    ```
  - **![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Demo - simple component**: [codepen](https://codepen.io/Amarnath510/pen/gOLgZeq)
### WC life cycle methods
- `constructor`: Called when instance of the element is created. Don't write rendering logic here as it will be too early
- `connectedCallback`: Browser calls when the element is inserted into the DOM. Rendering logic should go here instead of in the constructor
- `disconnectedCallback`: Browser calls when the element is removed from the document
- `attributeChangedCallback`: Called when an attribute is added/removed/updated/replaced
- `static get observedAttributes()`: Array of attribute names to monitor for changes
### Shadow DOM
- Shadow DOM serves for encapsulation. It allows a component to have its very own “shadow” DOM tree, that can’t be accidentally accessed from the main document, may have local style rules, and more.
- Example: `<input type="range" />`. In order to see the Shadow DOM of this element we have to enable(in Chrome) Dev tools --> Settings --> Show user agent shadow DOM (in Elements section)
### Shadow Tree
- Light Tree: Regular DOM subtree, made of HTML children
- Shadow Tree: A hidden DOM subtree, not reflected in HTML (like input type="range" element)
- `this.attachShadow({ mode: 'open | closed' });` // Only one shadow root is created per element
    // "open": We can access shadow tree using "ele.shadowRoot" which returns element to which we can ad elements(<p>) using innerHTML
    // "closed": None can access shadow tree. "ele.shadowRoot" returns "null". Browser native shadow tree like <input type="range"> are closed
### Shadow Tree Encapsulation
- Shadow DOM elements are not visible to querySelector from the light DOM(actual DOM). Shadow DOM ids can be same as Light DOM but they have to be unique within Shadow DOM
- Shadow DOM has own Stylesheets. Style rules of outer DOM can't effect Shadow DOM styles
### HTML Templates
- Just like `<ng-template>` in Angular which is nothing but based on `<template>` tag of HTML where we can write a valid HTML snippet and put it inside `<template>` tag and use it based on the event/condition.
### Shadow DOM Slots, Composition
- Many components such as tabs, menus, image galleries need content to render. Just like `<select>` needs `<option>` items
- We can use `<slot>` element which can be used to fill the markup of our own (which we can pass from light DOM)
- Shadow DOM supports `<slot>` elements, that are automatically filled by the content from light DOM.  **Ques: But does it fill styles also?**
- **Composition**: Browser takes elements from the light DOM and renders them in the corresponding slots of the shadow DOM.
### Attributes vs Slot
- You can pass value via attribute to a component or an HTML using Slot. The difference is that if the component has a fixed HTML then your only option is to send data into the HTML so that the component replaces the identifiers with the passed attribute values
- But if you want to use your own HTML within the component then we have to go with Slot.


## Resources
- [JS Info](https://javascript.info/web-components)
- [Traversy Media](https://www.youtube.com/watch?v=PCWaFLy3VUo)
