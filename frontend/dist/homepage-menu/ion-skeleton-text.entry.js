<<<<<<< HEAD
import { r as registerInstance, h, i as Host, j as getElement } from './index-7693580e.js';
import { c as config, g as getIonMode } from './ionic-global-5a29f32f.js';
import { h as hostContext } from './theme-6baffa69.js';
=======
<<<<<<< HEAD
import { r as registerInstance, h, i as Host, j as getElement } from './index-342c6706.js';
import { c as config, g as getIonMode } from './ionic-global-6c01899d.js';
import { h as hostContext } from './theme-31a4dfd9.js';
=======
import { r as registerInstance, h, i as Host, j as getElement } from './index-788b94ef.js';
import { c as config, g as getIonMode } from './ionic-global-26489203.js';
import { h as hostContext } from './theme-4c258838.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9

const skeletonTextCss = ":host{--background:rgba(var(--background-rgb, var(--ion-text-color-rgb, 0, 0, 0)), 0.065);border-radius:var(--border-radius, inherit);display:block;width:100%;height:inherit;margin-top:4px;margin-bottom:4px;background:var(--background);line-height:10px;user-select:none;pointer-events:none}span{display:inline-block}:host(.in-media){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;height:100%}:host(.skeleton-text-animated){position:relative;background:linear-gradient(to right, rgba(var(--background-rgb, var(--ion-text-color-rgb, 0, 0, 0)), 0.065) 8%, rgba(var(--background-rgb, var(--ion-text-color-rgb, 0, 0, 0)), 0.135) 18%, rgba(var(--background-rgb, var(--ion-text-color-rgb, 0, 0, 0)), 0.065) 33%);background-size:800px 104px;animation-duration:1s;animation-fill-mode:forwards;animation-iteration-count:infinite;animation-name:shimmer;animation-timing-function:linear}@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}";

let SkeletonText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * If `true`, the skeleton text will animate.
     */
    this.animated = false;
  }
  render() {
    const animated = this.animated && config.getBoolean('animated', true);
    const inMedia = hostContext('ion-avatar', this.el) || hostContext('ion-thumbnail', this.el);
    const mode = getIonMode(this);
    return (h(Host, { class: {
        [mode]: true,
        'skeleton-text-animated': animated,
        'in-media': inMedia
      } }, h("span", null, "\u00A0")));
  }
  get el() { return getElement(this); }
};
SkeletonText.style = skeletonTextCss;

export { SkeletonText as ion_skeleton_text };
