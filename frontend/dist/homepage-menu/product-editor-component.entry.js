import { r as registerInstance, h, i as Host, j as getElement } from './index-342c6706.js';
import { C as CheckImage } from './image-6bb4e6d8.js';
import { a as PostImage } from './post-ca7d728c.js';
import { c as config } from './utils-d9c92c24.js';
import './get-282952cd.js';

const productEditorComponentCss = ":host{display:block}.prodContainer-no-image{text-align:left;margin-bottom:0.5rem}.productContainer{text-align:center;margin-bottom:0.5rem}.productIcon{text-align:left;background-image:url('https://cdn-icons-png.flaticon.com/512/198/198416.png');background-size:contain;background-repeat:no-repeat}.productName{font-size:1rem}.productPrice{text-align:right;font-size:1rem}.productDesc{font-size:0.8rem;margin:0 10px}.uploadbutton{opacity:0;text-align:center;font-size:large;color:white;position:absolute;width:fit-content;height:100%;background:transparent;top:0;left:0;right:0;bottom:0;display:flex;font-size:1.5rem;justify-content:center;align-items:center;height:100%}.uploadbutton:hover{opacity:100%;background-color:rgba(0, 0, 0, 0.644);border:3px solid black}";

let ProductEditorComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.url = 'http://localhost:8080/productimage-upload';
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
  async uploadImage(file, element, name) {
    if (CheckImage(file[0])) {
      let fd = new FormData();
      fd.append('image', await file[0]);
      fd.append('id', await name);
      await PostImage(this.url, fd);
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
    return (h(Host, null, h("ion-card-content", { class: config.useProductImages ? 'productContainer' : 'prodContainer-no-image' }, h("ion-row", null, h("ion-col", { size: "1", class: 'productIcon', hidden: !config.useProductImages }, h("label", { htmlFor: 'file', class: 'uploadbutton' }, "Upload"), h("input", { id: 'file', type: 'file', onChange: (event) => this.uploadImage(event.target.files, '.productIcon', this.product.name), hidden: true })), h("ion-col", { size: "10" }, h("ion-row", null, h("ion-col", { class: "productName" }, h("div", null, this.product.name))), h("ion-row", null, h("ion-col", { class: 'productDesc' }, h("div", null, this.product.description)))), h("ion-col", { size: "1", class: 'productPrice' }, h("div", null, this.product.price, "kr"))))));
  }
  get element() { return getElement(this); }
};
ProductEditorComponent.style = productEditorComponentCss;

export { ProductEditorComponent as product_editor_component };
