import { r as registerInstance, h, i as Host, k as getElement } from './index-fdd6f247.js';
import { C as CheckImage } from './image-2d09df0b.js';
import { a as PostImage, P as PostData } from './post-1ac92717.js';

const uploadImageButtonCss = ":host{display:block;width:100%}.icon{float:right;padding-left:50px}.button-9{display:block;backface-visibility:hidden;border-width:0;box-sizing:border-box;cursor:pointer;font-family:-apple-system,system-ui,\"Segoe UI\",Roboto,\"Helvetica Neue\",Ubuntu,sans-serif;font-size:100%;line-height:1;outline:none;overflow:hidden;padding:15px 5px;text-transform:none;transition:all .2s,box-shadow .08s ease-in;user-select:none;-webkit-user-select:none;touch-action:manipulation;height:max-content;width:100%}.button-9:hover{background-color:var(--primary)}";

let UploadImageButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = { '1': 'Ändra bakgrund', '2': 'Ändra banner', '3': 'Ändra logga' };
  }
  async post(file) {
    if (CheckImage(file[0])) {
      let fd = new FormData();
      fd.append('image', await file[0]);
      await PostImage(this.URL, fd);
      if (this.buttonvalue == this.value[1]) {
        this.LoadBackground(file[0]);
      }
      if (this.buttonvalue == this.value[2]) {
        this.LoadBanner(file[0], '.header');
      }
      if (this.buttonvalue == this.value[3]) {
        this.LoadLogo(file[0], '.header');
      }
    }
  }
  LoadBackground(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        document.querySelector('body').style.backgroundImage = image;
        const data = { backgroundcolor: null };
        PostData('http://localhost:8080/backgroundcolor', data);
      }
    };
  }
  LoadLogo(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        const img = document.createElement('img');
        const height = '200px';
        const mainelement = document.querySelector('homepage-menu-component');
        mainelement.shadowRoot.querySelector(element).style.height = height;
        img.src = reader.result.toString();
        img.style.height = height;
        const a = mainelement.shadowRoot.querySelector(element);
        a.removeChild(a.childNodes[0]);
        mainelement.shadowRoot.querySelector(element).appendChild(img);
      }
    };
  }
  LoadBanner(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        const mainelement = document.querySelector('homepage-menu-component');
        mainelement.shadowRoot.querySelector(element).style.backgroundImage = image;
      }
    };
  }
  render() {
    return (h(Host, null, h("div", null, h("label", { class: 'button-9', htmlFor: 'file' }, this.buttonvalue, " ", h("ion-icon", { class: "icon", name: "folder-sharp" })), h("input", { type: 'file', id: 'file', name: 'files[]', accept: "image/*", onChange: (event) => this.post(event.target.files), hidden: true }))));
  }
  get element() { return getElement(this); }
};
UploadImageButton.style = uploadImageButtonCss;

export { UploadImageButton as upload_image_button };
