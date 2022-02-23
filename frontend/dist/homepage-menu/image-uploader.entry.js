import { r as registerInstance, l as createEvent, h, i as Host, k as getElement } from './index-fdd6f247.js';
import { P as PostData } from './post-1ac92717.js';

const imageUploaderCss = ":host{display:block}.upload{width:fit-content}.upload-edit{flex:content;display:flex;flex-direction:column}.colorupload{padding-top:5%}api-ui{width:100%}.icon{float:right}.button-9{display:block;backface-visibility:hidden;border-width:0;box-sizing:border-box;cursor:pointer;font-family:-apple-system,system-ui,\"Segoe UI\",Roboto,\"Helvetica Neue\",Ubuntu,sans-serif;font-size:100%;line-height:1;outline:none;overflow:hidden;padding:15px 5px;text-transform:none;transition:all .2s,box-shadow .08s ease-in;user-select:none;-webkit-user-select:none;touch-action:manipulation;height:max-content;width:100%}.button-9:hover{background-color:var(--primary)}.custom-file-input{width:15%}.label{background-color:indigo;color:white;padding:0.5rem;font-family:sans-serif;border-radius:0.3rem;cursor:pointer;margin-top:1rem}";

let ImageUploader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onUploadCompleted = createEvent(this, "onUploadCompleted", 7);
    this.url1 = 'http://localhost:8080/background';
    this.url2 = 'http://localhost:8080/banner';
    this.url3 = 'http://localhost:8080/logo';
    this.value = { '1': 'Ändra bakgrund', '2': 'Ändra banner', '3': 'Ändra logga' };
  }
  changeColor() {
    this.checkImage = false;
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = this.color;
    this.submitForm();
  }
  async submitForm() {
    let data;
    data = { backgroundcolor: this.color };
    await PostData('http://localhost:8080/backgroundcolor', data);
  }
  render() {
    return (h(Host, null, h("ion-col", null, h("ion-row", null, h("upload-image-button", { buttonvalue: this.value[3], URL: this.url3 })), h("ion-row", null, h("upload-image-button", { buttonvalue: this.value[2], URL: this.url2 })), h("ion-row", null, h("upload-image-button", { buttonvalue: this.value[1], URL: this.url1 })), h("ion-row", null, h("label", { id: 'asfd', htmlFor: 'color', class: 'button-9' }, "\u00C4ndra bakgrundsf\u00E4rg ", h("ion-icon", { class: "icon", name: "color-palette-sharp" })), h("input", { id: 'color', type: 'color', onChange: (event) => { this.color = event.target.value; this.changeColor(); }, hidden: true })), h("ion-row", null, h("api-ui", null)))));
  }
  get element() { return getElement(this); }
};
ImageUploader.style = imageUploaderCss;

export { ImageUploader as image_uploader };
