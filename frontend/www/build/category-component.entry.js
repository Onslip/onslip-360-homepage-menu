<<<<<<< HEAD
import { r as registerInstance, h, i as Host } from './index-7693580e.js';
=======
<<<<<<< HEAD
import { r as registerInstance, h, i as Host } from './index-342c6706.js';
=======
import { r as registerInstance, h, i as Host } from './index-788b94ef.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9

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
