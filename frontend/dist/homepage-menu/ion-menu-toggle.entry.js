<<<<<<< HEAD
import { r as registerInstance, h, i as Host } from './index-7693580e.js';
import { g as getIonMode } from './ionic-global-5a29f32f.js';
import { m as menuController } from './index-6c120177.js';
import { u as updateVisibility } from './menu-toggle-util-c16d3559.js';
import './hardware-back-button-68bb8b9b.js';
import './helpers-bc25ace2.js';
import './animation-585a999d.js';
=======
<<<<<<< HEAD
import { r as registerInstance, h, i as Host } from './index-342c6706.js';
import { g as getIonMode } from './ionic-global-6c01899d.js';
import { m as menuController } from './index-5e6aca1b.js';
import { u as updateVisibility } from './menu-toggle-util-67a8379c.js';
import './hardware-back-button-33350ee9.js';
import './helpers-730f41c7.js';
import './animation-c6a5635b.js';
=======
import { r as registerInstance, h, i as Host } from './index-788b94ef.js';
import { g as getIonMode } from './ionic-global-26489203.js';
import { m as menuController } from './index-e02d830d.js';
import { u as updateVisibility } from './menu-toggle-util-5c54bc3d.js';
import './hardware-back-button-6ebf44bb.js';
import './helpers-6b9231fe.js';
import './animation-e15eb3eb.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9

const menuToggleCss = ":host(.menu-toggle-hidden){display:none}";

let MenuToggle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.visible = false;
    /**
     * Automatically hides the content when the corresponding menu is not active.
     *
     * By default, it's `true`. Change it to `false` in order to
     * keep `ion-menu-toggle` always visible regardless the state of the menu.
     */
    this.autoHide = true;
    this.onClick = () => {
      return menuController.toggle(this.menu);
    };
  }
  connectedCallback() {
    this.visibilityChanged();
  }
  async visibilityChanged() {
    this.visible = await updateVisibility(this.menu);
  }
  render() {
    const mode = getIonMode(this);
    const hidden = this.autoHide && !this.visible;
    return (h(Host, { onClick: this.onClick, "aria-hidden": hidden ? 'true' : null, class: {
        [mode]: true,
        'menu-toggle-hidden': hidden,
      } }, h("slot", null)));
  }
};
MenuToggle.style = menuToggleCss;

export { MenuToggle as ion_menu_toggle };
