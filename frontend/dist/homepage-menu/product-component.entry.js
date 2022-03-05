<<<<<<< HEAD
import { r as registerInstance, h, i as Host, j as getElement } from './index-7693580e.js';
import { c as config } from './utils-e05ad1e8.js';
=======
<<<<<<< HEAD
import { r as registerInstance, h, i as Host, j as getElement } from './index-342c6706.js';
=======
import { r as registerInstance, h, i as Host, j as getElement } from './index-788b94ef.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
import { c as config } from './utils-d9c92c24.js';
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9
import './get-282952cd.js';

const productComponentCss = ":host{display:block}.prodContainer-no-image{text-align:left;margin-bottom:0.5rem}.productContainer{text-align:center;margin-bottom:0.5rem}.productIcon{text-align:left;object-fit:cover;margin-bottom:0.5rem;background-image:url('https://cdn-icons-png.flaticon.com/512/198/198416.png');background-size:contain;background-repeat:no-repeat;height:80px}.productName{font-size:1rem}.productPrice{text-align:right;font-size:1rem}.productDesc{font-size:0.8rem;margin:0 10px}.uploadbutton{opacity:0;text-align:center;font-size:large;color:white;position:absolute;width:fit-content;height:100%;background:transparent;top:0;left:0;right:0;bottom:0;display:flex;font-size:1.5rem;justify-content:center;align-items:center;height:100%}.uploadbutton:hover{opacity:100%;background-color:rgba(0, 0, 0, 0.644);border:3px solid black}";

let ProductComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async componentWillLoad() {
    await this.loadImage('.productIcon');
  }
  async loadImage(element) {
    var _a;
    const backgroundbyte = new Uint8Array((_a = this.product.image[0]) === null || _a === void 0 ? void 0 : _a.data);
    const blob = new Blob([backgroundbyte.buffer]);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        this.element.shadowRoot.querySelector(element).style.backgroundImage = image;
      }
    };
  }
  render() {
    return (h(Host, null, h("ion-card-content", { class: config.useProductImages ? 'productContainer' : 'prodContainer-no-image' }, h("ion-row", null, h("ion-col", { hidden: !config.useProductImages, size: "1", class: 'productIcon' }), h("ion-col", { size: "10" }, h("ion-row", { class: "productName" }, h("ion-col", null, h("div", null, this.product.name))), h("ion-row", { class: 'productDesc' }, h("ion-col", null, h("div", null, this.product.description)))), h("ion-col", { size: "1", class: 'productPrice' }, h("div", null, this.product.price, "kr"))))));
  }
  get element() { return getElement(this); }
};
ProductComponent.style = productComponentCss;

export { ProductComponent as product_component };
