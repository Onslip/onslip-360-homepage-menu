<<<<<<< HEAD
import { r as registerInstance, h, i as Host } from './index-7693580e.js';
import { g as getIonMode } from './ionic-global-5a29f32f.js';
=======
<<<<<<< HEAD
import { r as registerInstance, h, i as Host } from './index-342c6706.js';
import { g as getIonMode } from './ionic-global-6c01899d.js';
=======
import { r as registerInstance, h, i as Host } from './index-788b94ef.js';
import { g as getIonMode } from './ionic-global-26489203.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9

const thumbnailCss = ":host{--size:48px;--border-radius:0;border-radius:var(--border-radius);display:block;width:var(--size);height:var(--size)}::slotted(ion-img),::slotted(img){border-radius:var(--border-radius);width:100%;height:100%;object-fit:cover;overflow:hidden}";

let Thumbnail = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { class: getIonMode(this) }, h("slot", null)));
  }
};
Thumbnail.style = thumbnailCss;

export { Thumbnail as ion_thumbnail };
