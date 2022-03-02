<<<<<<< HEAD
import { r as registerInstance, h, i as Host, j as getElement } from './index-342c6706.js';
=======
import { r as registerInstance, h, i as Host, j as getElement } from './index-788b94ef.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
import { C as CheckImage } from './image-6bb4e6d8.js';
import { a as PostImage, P as PostData } from './post-ca7d728c.js';
import { b as buttonvalues, c as config } from './utils-d9c92c24.js';
import './get-282952cd.js';

const uploadImageButtonCss = ":host{display:block;width:100%}.icon{float:right;padding-left:50px}.button-9{display:block;backface-visibility:hidden;border-width:0;box-sizing:border-box;cursor:pointer;font-size:100%;line-height:1;outline:none;overflow:hidden;padding:15px 5px;text-transform:none;transition:all .2s,box-shadow .08s ease-in;user-select:none;-webkit-user-select:none;touch-action:manipulation;height:max-content;width:100%}.button-9:hover{background-color:var(--primary)}";

let UploadImageButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async post(file) {
    if (CheckImage(file[0])) {
      let fd = new FormData();
      fd.append('image', await file[0]);
      await PostImage(this.URL, fd);
      switch (this.buttonvalue) {
        case buttonvalues.background: {
          this.LoadBackground(file[0]);
          break;
        }
        case buttonvalues.banner: {
          this.LoadBanner(file[0], '.header');
          break;
        }
        case buttonvalues.logo: {
          this.LoadLogo(file[0], '.header');
          break;
        }
      }
    }
  }
  async LoadBackground(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        document.querySelector('body').style.backgroundImage = image;
        config.background.enabled = false;
        PostData('http://localhost:8080/config', config);
      }
    };
  }
  async LoadLogo(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        const img = document.createElement('img');
        const mainelement = document.querySelector('homepage-menu-editor-component');
        img.src = reader.result.toString();
        const a = mainelement.shadowRoot.querySelector(element);
        a.removeChild(a.childNodes[0]);
        mainelement.shadowRoot.querySelector(element).appendChild(img);
      }
    };
  }
  async LoadBanner(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        const mainelement = document.querySelector('homepage-menu-editor-component');
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
