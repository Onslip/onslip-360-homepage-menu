import { r as registerInstance, h, i as Host } from './index-788b94ef.js';
import { g as getIonMode } from './ionic-global-26489203.js';

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
