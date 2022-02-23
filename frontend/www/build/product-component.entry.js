import { r as registerInstance, h, i as Host, k as getElement } from './index-fdd6f247.js';
import { C as CheckImage } from './image-2d09df0b.js';
import { a as PostImage } from './post-1ac92717.js';

const productComponentCss = ":host{display:block}.productContainer{text-align:center;border-bottom:solid tomato 2px;margin-bottom:0.5rem}.productIcon{text-align:left;object-fit:cover;margin-bottom:0.5rem;background-image:url('https://cdn-icons-png.flaticon.com/512/198/198416.png');background-size:contain;background-repeat:no-repeat;border-radius:10%;height:80px}.productName{font-size:1rem;text-decoration:underline}.productPrice{text-align:right;font-size:1rem;text-decoration:underline}.productDesc{font-size:0.8rem}.uploadbutton{opacity:0;text-align:center;font-size:large;color:white;position:absolute;width:fit-content;height:100%;background:transparent;top:0;left:0;right:0;bottom:0;display:flex;font-size:1.5rem;justify-content:center;align-items:center;height:100%}.uploadbutton:hover{opacity:100%;background-color:rgba(0, 0, 0, 0.644);border:3px solid black}";

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
  async uploadImage(file, element, id) {
    if (CheckImage(file[0])) {
      let fd = new FormData();
      fd.append('image', await file[0]);
      fd.append('id', await id);
      await PostImage('http://localhost:8080/productimage-upload', fd);
      const reader = new FileReader();
      reader.onload = () => {
        const image = `url(${reader.result})`;
        if (image != null) {
          this.element.shadowRoot.querySelector(element).style.backgroundImage = image;
        }
      };
      reader.readAsDataURL(file[0]);
    }
  }
  render() {
    return (h(Host, null, h("ion-card-content", { class: 'productContainer' }, h("ion-row", null, h("ion-col", { class: 'productIcon' }, h("label", { htmlFor: 'file', class: 'uploadbutton' }, "Upload"), h("input", { id: 'file', type: 'file', onChange: (event) => this.uploadImage(event.target.files, '.productIcon', this.product.name), hidden: true })), h("ion-col", null, h("ion-row", null, h("ion-col", { class: "productName" }, h("div", null, this.product.name))), h("ion-row", null, h("ion-col", { class: 'productDesc' }, h("div", null, this.product.description)))), h("ion-col", { class: 'productPrice' }, h("div", null, this.product.price, "kr"))))));
  }
  get element() { return getElement(this); }
};
ProductComponent.style = productComponentCss;

export { ProductComponent as product_component };
