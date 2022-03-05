<<<<<<< HEAD
import { r as registerInstance, l as Build, h, i as Host, j as getElement } from './index-7693580e.js';
import { a as attachComponent } from './framework-delegate-077de7f3.js';
import './helpers-bc25ace2.js';
=======
<<<<<<< HEAD
import { r as registerInstance, o as Build, h, i as Host, j as getElement } from './index-342c6706.js';
import { a as attachComponent } from './framework-delegate-10d8e2b2.js';
import './helpers-730f41c7.js';
=======
import { r as registerInstance, l as Build, h, i as Host, j as getElement } from './index-788b94ef.js';
import { a as attachComponent } from './framework-delegate-727ec5ef.js';
import './helpers-6b9231fe.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9

const tabCss = ":host(.tab-hidden){display:none !important}";

let Tab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loaded = false;
    /** @internal */
    this.active = false;
  }
  async componentWillLoad() {
    if (Build.isDev) {
      if (this.component !== undefined && this.el.childElementCount > 0) {
        console.error('You can not use a lazy-loaded component in a tab and inlined content at the same time.' +
          `- Remove the component attribute in: <ion-tab component="${this.component}">` +
          ` or` +
          `- Remove the embedded content inside the ion-tab: <ion-tab></ion-tab>`);
      }
    }
    if (this.active) {
      await this.setActive();
    }
  }
  /** Set the active component for the tab */
  async setActive() {
    await this.prepareLazyLoaded();
    this.active = true;
  }
  changeActive(isActive) {
    if (isActive) {
      this.prepareLazyLoaded();
    }
  }
  prepareLazyLoaded() {
    if (!this.loaded && this.component != null) {
      this.loaded = true;
      try {
        return attachComponent(this.delegate, this.el, this.component, ['ion-page']);
      }
      catch (e) {
        console.error(e);
      }
    }
    return Promise.resolve(undefined);
  }
  render() {
    const { tab, active, component } = this;
    return (h(Host, { role: "tabpanel", "aria-hidden": !active ? 'true' : null, "aria-labelledby": `tab-button-${tab}`, class: {
        'ion-page': component === undefined,
        'tab-hidden': !active
      } }, h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["changeActive"]
  }; }
};
Tab.style = tabCss;

export { Tab as ion_tab };
