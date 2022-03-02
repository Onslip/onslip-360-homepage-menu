import { r as registerInstance, h, i as Host } from './index-342c6706.js';

const categoryComponentCss = ":host{display:block}.categoryTitle{color:black;font-size:1.5rem;margin:0;border-bottom:2px solid black;text-align:center;font-weight:bold}";

let CategoryComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("ion-card-header", null, h("ion-card-title", { class: 'categoryTitle' }, this.category.name))));
  }
};
CategoryComponent.style = categoryComponentCss;

export { CategoryComponent as category_component };
