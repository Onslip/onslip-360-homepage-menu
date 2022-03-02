import { r as registerInstance, h, i as Host, q as getAssetPath, j as getElement } from './index-342c6706.js';
import { c as config } from './utils-d9c92c24.js';
import { G as GetData } from './get-282952cd.js';
import { l as loadImage } from './image-6bb4e6d8.js';

const homepageMenuComponentCss = ":host{display:block;align-content:center}.menuContainer{margin:auto;width:65%;border:2px solid rgb(94, 93, 93);box-shadow:3px 3px 1px #00000056;border-radius:2px;background:rgba(255, 255, 255, 0.6);backdrop-filter:blur(15px) saturate(120%) contrast(200%)}.logoDiv{flex:content;flex-direction:row;padding-left:90%}.onslipLogo{width:80%}.header{text-align:center;font-size:1.3rem;width:100%;height:200px;background-position:center;background-size:cover;background-repeat:no-repeat}.header img{width:100px;float:right;margin:auto}@media only screen and (max-width: 1000px){.menuContainer{width:90%}}@media only screen and (max-width: 700px){.menuContainer{width:100%}}";

let HomepageMenuComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.imageurl = 'http://localhost:8080/background';
    this.configurl = 'http://localhost:8080/config';
    this.bannerUrl = 'http://localhost:8080/banner';
    this.logoUrl = 'http://localhost:8080/logo';
  }
  async componentWillLoad() {
    var _a;
    if ((_a = config === null || config === void 0 ? void 0 : config.background) === null || _a === void 0 ? void 0 : _a.enabled) {
      document.querySelector('body').style.backgroundImage = null;
      document.querySelector('body').style.background = config.background.color;
    }
    else {
      await this.LoadBackground(this.imageurl);
    }
    this.LoadBanner(this.bannerUrl, '.header');
    this.LoadLogo(this.logoUrl, '.header');
  }
  LoadConfig(element) {
    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontFamily = config === null || config === void 0 ? void 0 : config.font;
    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.background = config === null || config === void 0 ? void 0 : config.menuBackground;
  }
  componentDidLoad() {
    this.LoadConfig('.menuContainer');
  }
  async LoadBackground(url) {
    const background = await GetData(url).catch(err => err);
    const image = await loadImage(background);
    if (image != null) {
      document.querySelector('body').style.backgroundImage = `url(${image})`;
    }
  }
  async LoadLogo(url, element) {
    const logo = await GetData(url).catch(() => {
      const node = document.createElement("h1");
      node.innerText = 'Martins Kolgrill';
      this.element.shadowRoot.querySelector(element).appendChild(node);
    });
    const image = await loadImage(logo);
    if (image != null) {
      const img = document.createElement('img');
      img.src = image.toString();
      this.element.shadowRoot.querySelector(element).appendChild(img);
    }
  }
  async LoadBanner(url, element) {
    const banner = await GetData(url);
    const image = await loadImage(banner);
    if (image != null) {
      // document.querySelector('homepage-menu-component').shadowRoot.querySelector(element).style.backgroundImage = `url(${image})`;
      this.element.shadowRoot.querySelector(element).style.backgroundImage = `url(${image})`;
    }
  }
  render() {
    return (h(Host, null, h("div", { class: 'menuContainer' }, h("div", { class: 'header' }), h("menu-component", null), h("div", { class: 'logoDiv' }, h("img", { src: getAssetPath(`../../../assets/Onslip.png`), class: 'onslipLogo' })))));
  }
  static get assetsDirs() { return ["../../../assets"]; }
  get element() { return getElement(this); }
};
HomepageMenuComponent.style = homepageMenuComponentCss;

export { HomepageMenuComponent as homepage_menu_component };
