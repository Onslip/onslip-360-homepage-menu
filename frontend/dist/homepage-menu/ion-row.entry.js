import { r as registerInstance, h, i as Host } from './index-fdd6f247.js';
import { g as getIonMode } from './ionic-global-49bac6cf.js';

const rowCss = ":host{display:flex;flex-wrap:wrap}";

let Row = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { class: getIonMode(this) }, h("slot", null)));
  }
};
Row.style = rowCss;

export { Row as ion_row };
