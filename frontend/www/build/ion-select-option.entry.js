<<<<<<< HEAD
import { r as registerInstance, h, i as Host, j as getElement } from './index-342c6706.js';
import { g as getIonMode } from './ionic-global-6c01899d.js';
=======
import { r as registerInstance, h, i as Host, j as getElement } from './index-788b94ef.js';
import { g as getIonMode } from './ionic-global-26489203.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29

const selectOptionCss = ":host{display:none}";

let SelectOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inputId = `ion-selopt-${selectOptionIds++}`;
    /**
     * If `true`, the user cannot interact with the select option. This property does not apply when `interface="action-sheet"` as `ion-action-sheet` does not allow for disabled buttons.
     */
    this.disabled = false;
  }
  render() {
    return (h(Host, { role: "option", id: this.inputId, class: getIonMode(this) }));
  }
  get el() { return getElement(this); }
};
let selectOptionIds = 0;
SelectOption.style = selectOptionCss;

export { SelectOption as ion_select_option };
