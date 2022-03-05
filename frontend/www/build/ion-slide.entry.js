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

const slideCss = "ion-slide{display:block;width:100%;height:100%}.slide-zoom{display:block;width:100%;text-align:center}.swiper-slide{display:flex;position:relative;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;font-size:18px;text-align:center;box-sizing:border-box}.swiper-slide img{width:auto;max-width:100%;height:auto;max-height:100%}";

let Slide = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { class: {
        [mode]: true,
        'swiper-slide': true,
        'swiper-zoom-container': true
      } }));
  }
};
Slide.style = slideCss;

export { Slide as ion_slide };
