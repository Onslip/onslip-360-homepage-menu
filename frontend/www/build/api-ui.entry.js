import { r as registerInstance, h } from './index-7693580e.js';
import { P as PostData } from './post-ca7d728c.js';

const apiUiCss = ":host{display:block}.modal-wrapper{position:fixed;top:0;bottom:0;left:0;right:0;opacity:0;visibility:hidden;transition:visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;z-index:10}.modal-overlay{background:rgba(0, 0, 0, 0.6);height:100%;width:100%;position:absolute}.modal-wrapper .modal{background:white;width:20%;height:auto;position:absolute;left:50%;transform:translate(-50%, 0px);border-radius:4px;transition:visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s}.modal-wrapper .modal .header{padding:16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--mono-05)}.modal-wrapper .modal .header h6{margin:0;margin-left:10px;line-height:1;font-size:16px}.modal-wrapper .modal .header .close{height:24px;width:24px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;transition:0.1s ease-in-out}.modal-wrapper .modal .header .close:hover{background:var(--mono-10)}.modal-wrapper .modal .body{padding:16px;font-size:14px;line-height:21px;max-height:320px;height:auto;overflow-y:auto;color:var(--mono-50)}.modal-wrapper .modal .footer{padding:16px;display:flex;justify-content:flex-end;align-items:center;border-top:1px solid var(--mono-05)}.modal-wrapper .modal .footer apollo-button{margin:0 6px}.modal-wrapper .modal .footer apollo-button:first-child{margin:0 6px}.modal-wrapper .modal .footer apollo-button:last-child{margin:0 6px}.is-open{opacity:1;visibility:visible;transition:visbility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;color:black;z-index:10}.is-open .modal{transform:translate(-50%, 90px)}@media (max-width: 600px){.modal-wrapper .modal{width:100%;bottom:0;transform:translate(-50%, 100%);opacity:1}.is-open .modal{transform:translate(-50%, 0)}}.button-save{display:block;appearance:button;backface-visibility:hidden;background-color:#a4d463;border-radius:6px;border-width:0;box-shadow:rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;box-sizing:border-box;color:#fff;cursor:pointer;font-size:100%;line-height:1;outline:none;overflow:hidden;padding:15px 25px;text-transform:none;transition:all .2s,box-shadow .08s ease-in;user-select:none;-webkit-user-select:none;touch-action:manipulation;height:max-content;width:fit-content}.icon{float:right}.button-9{display:block;backface-visibility:hidden;border-width:0;box-sizing:border-box;cursor:pointer;font-size:100%;line-height:1;outline:none;overflow:hidden;padding:15px 5px;text-transform:none;transition:all .2s,box-shadow .08s ease-in;user-select:none;-webkit-user-select:none;touch-action:manipulation;height:max-content;width:100%}.button-9:hover{background-color:var(--primary)}.button-save:hover{background-color:#647c2e}#changekey{margin:12px 0 0;position:absolute}.button-9:disabled{cursor:default}.button-close{appearance:button;backface-visibility:hidden;background-color:#f54040;border-radius:6px;border-width:0;box-shadow:rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;box-sizing:border-box;color:#fff;cursor:pointer;font-family:-apple-system,system-ui,\"Segoe UI\",Roboto,\"Helvetica Neue\",Ubuntu,sans-serif;font-size:100%;height:30px;line-height:1;margin:5px 0 0;outline:none;overflow:hidden;padding:0 10px;text-align:center;text-transform:none;transform:translateZ(0);transition:all .2s,box-shadow .08s ease-in;user-select:none;-webkit-user-select:none;touch-action:manipulation;width:auto}.button-close:disabled{cursor:default}.button-close:focus{box-shadow:rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px}input{width:200px}.inputfield{padding-bottom:0.6rem;padding-top:0.6rem}";

let ApiUi = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.url = 'http://localhost:8080/updateapi';
    this.closeIcon = 'x.svg';
  }
  handleClick(ev) {
    if (ev.button === 1) {
      console.log('down arrow pressed');
    }
  }
  open() {
    this.isopen = true;
  }
  close() {
    this.isopen = false;
  }
  PostData() {
    const data = { base: this.base, realm: this.realm, id: this.id, key: this.key, uri: this.uri };
    PostData(this.url, data);
    this.close();
  }
  handleChangeRealm(event) {
    this.realm = event.target.value;
  }
  handleChangeBase(event) {
    this.base = event.target.value;
  }
  handleChangeId(event) {
    this.id = event.target.value;
  }
  handleChangeKey(event) {
    this.key = event.target.value;
  }
  handleChangeURI(event) {
    this.uri = event.target.value;
  }
  render() {
    return (h("div", null, h("div", null, h("label", { class: 'button-9', htmlFor: 'changekey' }, "\u00C4ndra API-nyckel ", h("ion-icon", { class: "icon", name: "settings-sharp" })), h("button", { id: 'changekey', onClick: this.open.bind(this), hidden: true }, "\u00C4ndra API-nyckel")), h("div", { class: this.isopen ? 'modal-wrapper is-open' : 'modal-wrapper' }, h("div", { class: "modal-overlay", onClick: this.close.bind(this) }), h("div", { class: "modal" }, h("div", { class: "header" }, h("h6", null, "\u00C4ndra api-nyckel"), h("button", { class: 'button-close', onClick: this.close.bind(this) }, h("ion-icon", { name: "close" }))), h("div", { class: "body" }, h("slot", null), h("div", { class: 'inputfield' }, h("label", null, "API-base"), h("input", { type: "text", value: this.base, onInput: (event) => this.handleChangeBase(event) })), h("div", { class: 'inputfield' }, h("label", null, "API-realm"), h("input", { type: "text", value: this.realm, onInput: (event) => this.handleChangeRealm(event) })), h("div", { class: 'inputfield' }, h("label", null, "API-id"), h("input", { type: "text", value: this.id, onInput: (event) => this.handleChangeId(event) })), h("div", { class: 'inputfield' }, h("label", null, "API-nyckel"), h("input", { type: "text", value: this.key, onInput: (event) => this.handleChangeKey(event) })), h("div", { class: 'inputfield' }, h("label", null, "Databas-Uri"), h("input", { type: "text", value: this.uri, onInput: (event) => this.handleChangeURI(event) }))), h("div", { class: "footer" }, h("button", { class: 'button-save', onClick: this.PostData.bind(this), type: "submit", value: "Submit" }, "Spara"))))));
  }
  static get assetsDirs() { return ["assets"]; }
};
ApiUi.style = apiUiCss;

export { ApiUi as api_ui };
