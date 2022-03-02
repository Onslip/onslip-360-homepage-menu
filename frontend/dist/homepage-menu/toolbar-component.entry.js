import { r as registerInstance, h, i as Host, q as getAssetPath } from './index-342c6706.js';
import { c as config, F as Fonts, P as Presets, b as buttonvalues } from './utils-d9c92c24.js';
import { P as PostData } from './post-ca7d728c.js';
import './get-282952cd.js';

const toolbarComponentCss = ":host{display:block}.toolbar{--background:#a4d463;--color:white}.logo{position:absolute;left:50%;transform:translateX(-50%)}ion-nav{position:fixed;height:min-content;z-index:2;overflow:visible}.menu_box_closed{font-size:large;display:block;position:fixed;transition-duration:.4s;transform:translateY(-100%);color:white;opacity:0;top:50px;left:0;z-index:1}.menu_box{font-size:large;display:inline-block;position:fixed;transition-duration:.4s;background-color:rgb(51, 51, 51);color:white;top:55px;left:0;z-index:1}.icon{float:right}.button-9{display:block;backface-visibility:hidden;border-width:0;box-sizing:border-box;cursor:pointer;font-size:100%;line-height:1;outline:none;overflow:hidden;padding:15px 5px;text-transform:none;transition:all .2s,box-shadow .08s ease-in;user-select:none;-webkit-user-select:none;touch-action:manipulation;height:max-content;width:100%}.button-9:hover{background-color:var(--primary)}.toggle{font-size:large;--min-height:0;--background:transparent;--color:white;--border-style:none}ion-toggle{--background:var(--faded);--background-checked:var(--primary);--handle-background:var(--faded);--handle-background-checked:var(--primary);--border-radius:5px;--handle-border-radius:5px;--handle-width:15px}ion-button:hover{background-color:var(--primary)}.menu-col{padding:0}api-ui{width:100%}.fontselector{--color:white;--background:none;max-width:100px;font-family:unset}";

let ToolbarComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.menuopen = false;
    this.url1 = 'http://localhost:8080/background';
    this.url2 = 'http://localhost:8080/banner';
    this.url3 = 'http://localhost:8080/logo';
  }
  async useProductImages(event) {
    config.useProductImages = event.detail.checked;
    await this.submitForm();
    location.reload();
  }
  async useLogoPic(event) {
    config.Logo = event.detail.checked;
    await this.submitForm();
    location.reload();
  }
  async useBanner(event) {
    config.banner = event.detail.checked;
    await this.submitForm();
    location.reload();
  }
  async changeColor() {
    config.background.enabled = true;
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = config === null || config === void 0 ? void 0 : config.background.color;
    this.submitForm();
  }
  async ChangeMenuColor(element) {
    console.log(config);
    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.background = config === null || config === void 0 ? void 0 : config.menuBackground;
    this.submitForm();
  }
  async submitForm() {
    PostData('http://localhost:8080/config', config);
  }
  render() {
    var _a, _b, _c;
    return (h(Host, null, h("ion-nav", null, h("ion-header", null, h("ion-toolbar", { class: "toolbar" }, h("ion-buttons", { slot: "start" }, h("ion-button", { onClick: () => { this.menuopen = !this.menuopen; } }, h("ion-icon", { name: this.menuopen ? "close-sharp" : "menu-sharp" }), h("ion-label", null, "MENY")), config ? [
      h("selector-component", { value: config === null || config === void 0 ? void 0 : config.font, DropDownvalues: Fonts, IconName: 'text-sharp', element: '.menuContainer', type: 'font' }),
      h("selector-component", { value: config === null || config === void 0 ? void 0 : config.preset, DropDownvalues: Presets, IconName: 'brush-sharp', element: '.menuContainer', type: 'preset' })
    ] : null), h("img", { class: "logo", slot: "primary", src: getAssetPath('../../../assets/onslip-brand-full.png') }), h("ion-title", { slot: "end" }, "Digital Dynamic Menu")))), h("div", { class: this.menuopen ? "menu_box" : "menu_box_closed" }, h("ion-row", null, h("ion-col", { class: "menu-col" }, h("ion-row", null, h("upload-image-button", { buttonvalue: buttonvalues.logo, URL: this.url3 })), h("ion-row", null, h("upload-image-button", { buttonvalue: buttonvalues.banner, URL: this.url2 })), h("ion-row", null, h("upload-image-button", { buttonvalue: buttonvalues.background, URL: this.url1 })), h("ion-row", null, h("label", { htmlFor: 'color', class: 'button-9' }, "\u00C4ndra bakgrundsf\u00E4rg ", h("ion-icon", { class: "icon", name: "color-palette-sharp" })), h("input", { id: 'color', type: 'color', onChange: (event) => { config.background.color = event.target.value; this.changeColor(); }, hidden: true })), h("ion-row", null, h("label", { htmlFor: 'menucolor', class: 'button-9' }, "\u00C4ndra menyns f\u00E4rg ", h("ion-icon", { class: "icon", name: "color-palette-sharp" })), h("input", { id: 'menucolor', type: 'color', onChange: (event) => { config.menuBackground = event.target.value; this.ChangeMenuColor(`.menuContainer`); }, hidden: true })), h("ion-row", null, h("api-ui", null))), h("ion-col", { class: "menu-row" }, h("ion-row", null, h("ion-item", { class: "toggle" }, h("ion-label", null, "Anv\u00E4nd Produktbilder:"), h("ion-toggle", { checked: (_a = config === null || config === void 0 ? void 0 : config.useProductImages) !== null && _a !== void 0 ? _a : false, onIonChange: (ev) => { this.useProductImages(ev); } }))), h("ion-row", null, h("ion-item", { class: "toggle" }, h("ion-label", null, "Anv\u00E4nd Logo:"), h("ion-toggle", { checked: (_b = config === null || config === void 0 ? void 0 : config.Logo) !== null && _b !== void 0 ? _b : false, onIonChange: (ev) => { this.useLogoPic(ev); } }))), h("ion-row", null, h("ion-item", { class: "toggle" }, h("ion-label", null, "Anv\u00E4nd Banner:"), h("ion-toggle", { checked: (_c = config === null || config === void 0 ? void 0 : config.banner) !== null && _c !== void 0 ? _c : false, onIonChange: (ev) => { this.useBanner(ev); } }))))))));
  }
  static get assetsDirs() { return ["../../../assets"]; }
};
ToolbarComponent.style = toolbarComponentCss;

export { ToolbarComponent as toolbar_component };
