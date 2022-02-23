import { r as registerInstance, h, i as Host, j as getAssetPath, k as getElement } from './index-fdd6f247.js';
import { P as PostData } from './post-1ac92717.js';

const toolbarComponentCss = ":host{display:block}.toolbar{--background:#a4d463;--color:white}.logo{width:6.5rem}ion-nav{position:fixed;height:min-content;z-index:2;overflow:visible}.menu_box_closed{font-size:large;display:block;position:fixed;transition-duration:.4s;transform:translateY(-100%);color:white;opacity:0;top:50px;left:0;z-index:1}.menu_box{font-size:large;display:inline-block;position:fixed;transition-duration:.4s;background-color:rgb(51, 51, 51);color:white;top:55px;left:0;z-index:1}.icon{float:right}.button-9{display:block;backface-visibility:hidden;border-width:0;box-sizing:border-box;cursor:pointer;font-family:-apple-system,system-ui,\"Segoe UI\",Roboto,\"Helvetica Neue\",Ubuntu,sans-serif;font-size:100%;line-height:1;outline:none;overflow:hidden;padding:15px 5px;text-transform:none;transition:all .2s,box-shadow .08s ease-in;user-select:none;-webkit-user-select:none;touch-action:manipulation;height:max-content;width:100%}.button-9:hover{background-color:var(--primary)}.toggle{font-size:large;--min-height:0;--background:transparent;--color:white;--border-style:none}ion-toggle{--background:var(--faded);--background-checked:var(--primary);--handle-background:var(--faded);--handle-background-checked:var(--primary);--border-radius:5px;--handle-border-radius:5px;--handle-width:15px}.menu-col{padding:0}api-ui{width:100%}";

let ToolbarComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.menuopen = false;
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
    return (h(Host, null, h("ion-nav", null, h("ion-header", null, h("ion-toolbar", { class: "toolbar" }, h("ion-title", { slot: "end" }, " Digital Dynamic Menu "), h("img", { slot: 'primary', class: "logo", src: getAssetPath('./assets/onslip-brand-full.png') }), h("ion-buttons", { slot: "start" }, h("ion-button", { onClick: () => { this.menuopen = !this.menuopen; } }, h("ion-icon", { name: this.menuopen ? "close-sharp" : "menu-sharp" })))))), h("div", { class: this.menuopen ? "menu_box" : "menu_box_closed" }, h("ion-row", null, h("ion-col", { class: "menu-col" }, h("ion-row", null, h("upload-image-button", { buttonvalue: this.value[3], URL: this.url3 })), h("ion-row", null, h("upload-image-button", { buttonvalue: this.value[2], URL: this.url2 })), h("ion-row", null, h("upload-image-button", { buttonvalue: this.value[1], URL: this.url1 })), h("ion-row", null, h("label", { id: 'asfd', htmlFor: 'color', class: 'button-9' }, "\u00C4ndra bakgrundsf\u00E4rg ", h("ion-icon", { class: "icon", name: "color-palette-sharp" })), h("input", { id: 'color', type: 'color', onChange: (event) => { this.color = event.target.value; this.changeColor(); }, hidden: true })), h("ion-row", null, h("api-ui", null))), h("ion-col", { class: "menu-row" }, h("ion-row", null, h("ion-item", { class: "toggle" }, h("ion-label", null, "Anv\u00E4nd Produktbilder:"), h("ion-toggle", null))))))));
  }
  static get assetsDirs() { return ["assets"]; }
  get element() { return getElement(this); }
};
ToolbarComponent.style = toolbarComponentCss;

export { ToolbarComponent as toolbar_component };
