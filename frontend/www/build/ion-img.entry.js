<<<<<<< HEAD
import { r as registerInstance, k as createEvent, h, i as Host, j as getElement } from './index-7693580e.js';
import { g as getIonMode } from './ionic-global-5a29f32f.js';
import { i as inheritAttributes } from './helpers-bc25ace2.js';
=======
<<<<<<< HEAD
import { r as registerInstance, k as createEvent, h, i as Host, j as getElement } from './index-342c6706.js';
import { g as getIonMode } from './ionic-global-6c01899d.js';
=======
import { r as registerInstance, k as createEvent, h, i as Host, j as getElement } from './index-788b94ef.js';
import { g as getIonMode } from './ionic-global-26489203.js';
import { i as inheritAttributes } from './helpers-6b9231fe.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9

const imgCss = ":host{display:block;object-fit:contain}img{display:block;width:100%;height:100%;object-fit:inherit;object-position:inherit}";

let Img = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionImgWillLoad = createEvent(this, "ionImgWillLoad", 7);
    this.ionImgDidLoad = createEvent(this, "ionImgDidLoad", 7);
    this.ionError = createEvent(this, "ionError", 7);
    this.inheritedAttributes = {};
    this.onLoad = () => {
      this.ionImgDidLoad.emit();
    };
    this.onError = () => {
      this.ionError.emit();
    };
  }
  srcChanged() {
    this.addIO();
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['draggable']);
  }
  componentDidLoad() {
    this.addIO();
  }
  addIO() {
    if (this.src === undefined) {
      return;
    }
    if (typeof window !== 'undefined' &&
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'isIntersecting' in window.IntersectionObserverEntry.prototype) {
      this.removeIO();
      this.io = new IntersectionObserver(data => {
        /**
         * On slower devices, it is possible for an intersection observer entry to contain multiple
         * objects in the array. This happens when quickly scrolling an image into view and then out of
         * view. In this case, the last object represents the current state of the component.
         */
        if (data[data.length - 1].isIntersecting) {
          this.load();
          this.removeIO();
        }
      });
      this.io.observe(this.el);
    }
    else {
      // fall back to setTimeout for Safari and IE
      setTimeout(() => this.load(), 200);
    }
  }
  load() {
    this.loadError = this.onError;
    this.loadSrc = this.src;
    this.ionImgWillLoad.emit();
  }
  removeIO() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }
  render() {
    const { loadSrc, alt, onLoad, loadError, inheritedAttributes } = this;
    const { draggable } = inheritedAttributes;
    return (h(Host, { class: getIonMode(this) }, h("img", { decoding: "async", src: loadSrc, alt: alt, onLoad: onLoad, onError: loadError, part: "image", draggable: isDraggable(draggable) })));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "src": ["srcChanged"]
  }; }
};
/**
 * Enumerated strings must be set as booleans
 * as Stencil will not render 'false' in the DOM.
 * The need to explicitly render draggable="true"
 * as only certain elements are draggable by default.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable.
 */
const isDraggable = (draggable) => {
  switch (draggable) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return undefined;
  }
};
Img.style = imgCss;

export { Img as ion_img };
