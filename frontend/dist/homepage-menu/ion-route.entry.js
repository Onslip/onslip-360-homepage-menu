<<<<<<< HEAD
import { r as registerInstance, k as createEvent } from './index-7693580e.js';
=======
<<<<<<< HEAD
import { r as registerInstance, k as createEvent } from './index-342c6706.js';
=======
import { r as registerInstance, k as createEvent } from './index-788b94ef.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9

let Route = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionRouteDataChanged = createEvent(this, "ionRouteDataChanged", 7);
    /**
     * Relative path that needs to match in order for this route to apply.
     *
     * Accepts paths similar to expressjs so that you can define parameters
     * in the url /foo/:bar where bar would be available in incoming props.
     */
    this.url = '';
  }
  onUpdate(newValue) {
    this.ionRouteDataChanged.emit(newValue);
  }
  onComponentProps(newValue, oldValue) {
    if (newValue === oldValue) {
      return;
    }
    const keys1 = newValue ? Object.keys(newValue) : [];
    const keys2 = oldValue ? Object.keys(oldValue) : [];
    if (keys1.length !== keys2.length) {
      this.onUpdate(newValue);
      return;
    }
    for (const key of keys1) {
      if (newValue[key] !== oldValue[key]) {
        this.onUpdate(newValue);
        return;
      }
    }
  }
  connectedCallback() {
    this.ionRouteDataChanged.emit();
  }
  static get watchers() { return {
    "url": ["onUpdate"],
    "component": ["onUpdate"],
    "componentProps": ["onComponentProps"]
  }; }
};

export { Route as ion_route };
