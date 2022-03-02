<<<<<<< HEAD
import { r as registerInstance, h, i as Host } from './index-342c6706.js';
import { g as getIonMode } from './ionic-global-6c01899d.js';
=======
import { r as registerInstance, h, i as Host } from './index-788b94ef.js';
import { g as getIonMode } from './ionic-global-26489203.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29

const itemGroupIosCss = "ion-item-group{display:block}";

const itemGroupMdCss = "ion-item-group{display:block}";

let ItemGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { role: "group", class: {
        [mode]: true,
        // Used internally for styling
        [`item-group-${mode}`]: true,
        'item': true
      } }));
  }
};
ItemGroup.style = {
  ios: itemGroupIosCss,
  md: itemGroupMdCss
};

export { ItemGroup as ion_item_group };
