import { r as registerInstance, h, i as Host, j as getAssetPath, k as getElement } from './index-fdd6f247.js';
import { G as GetData } from './get-89eae738.js';

const homepageMenuComponentCss = ":host{display:block;align-content:center}.menuContainer{margin:100px auto;width:65%;border:2px solid rgb(94, 93, 93);box-shadow:3px 3px 1px #00000056;border-radius:2px;background:rgba(255, 255, 255, 0.6);backdrop-filter:blur(15px) saturate(120%) contrast(200%)}.logoDiv{flex:content;flex-direction:row;padding-left:90%}.onslipLogo{width:80%}.header{text-align:center;font-size:1.3rem;width:100%;height:200px;background-position:center;background-size:contain;background-repeat:no-repeat}.header img{width:100px;float:right;margin:auto}@media only screen and (max-width: 1000px){.menuContainer{width:90%}}@media only screen and (max-width: 700px){.menuContainer{width:100%}}";

let HomepageMenuComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.imageurl = 'http://localhost:8080/background';
    this.colorUrl = 'http://localhost:8080/backgroundcolor';
    this.bannerUrl = 'http://localhost:8080/banner';
    this.logoUrl = 'http://localhost:8080/logo';
  }
  async componentWillLoad() {
    this.background = await GetData(this.colorUrl);
    if (this.background.backgroundcolor != null) {
      document.querySelector('body').style.backgroundImage = null;
      document.querySelector('body').style.backgroundColor = this.background.backgroundcolor;
    }
    else {
      this.LoadBackground(this.imageurl);
    }
    this.LoadBanner(this.bannerUrl, '.header');
    this.LoadLogo(this.logoUrl, '.header');
  }
  async LoadBackground(url) {
    const background = await GetData(url);
    const backgroundbyte = new Uint8Array(background.image.data);
    const blob = new Blob([backgroundbyte.buffer]);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        document.querySelector('body').style.backgroundImage = image;
      }
    };
  }
  async LoadLogo(url, element) {
    const logo = await GetData(url).catch(() => {
      const node = document.createElement("h1");
      node.innerText = 'Martins Kolgrill';
      this.element.shadowRoot.querySelector(element).appendChild(node);
    });
    const logobyte = new Uint8Array(logo.image.data);
    const blob = new Blob([logobyte.buffer]);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        const img = document.createElement('img');
        img.src = reader.result.toString();
        this.element.shadowRoot.querySelector(element).appendChild(img);
      }
    };
  }
  async LoadBanner(url, element) {
    const banner = await GetData(url);
    const bannerbyte = new Uint8Array(banner.image.data);
    const blob = new Blob([bannerbyte.buffer]);
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
    return (h(Host, null, h("div", null, h("toolbar-component", null)), h("div", { class: 'menuContainer' }, h("div", { class: 'header' }), h("menu-component", null), h("div", { class: 'logoDiv' }, h("img", { src: getAssetPath(`./assets/Onslip.png`), class: 'onslipLogo' })))));
  }
  static get assetsDirs() { return ["assets"]; }
  get element() { return getElement(this); }
};
HomepageMenuComponent.style = homepageMenuComponentCss;

export { HomepageMenuComponent as homepage_menu_component };
