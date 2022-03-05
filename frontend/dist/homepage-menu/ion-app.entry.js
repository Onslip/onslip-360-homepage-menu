<<<<<<< HEAD
import { r as registerInstance, l as Build, h, i as Host, j as getElement } from './index-7693580e.js';
import { a as isPlatform, c as config, g as getIonMode } from './ionic-global-5a29f32f.js';
=======
<<<<<<< HEAD
import { r as registerInstance, o as Build, h, i as Host, j as getElement } from './index-342c6706.js';
import { a as isPlatform, c as config, g as getIonMode } from './ionic-global-6c01899d.js';
=======
import { r as registerInstance, l as Build, h, i as Host, j as getElement } from './index-788b94ef.js';
import { a as isPlatform, c as config, g as getIonMode } from './ionic-global-26489203.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9

const appCss = "html.plt-mobile ion-app{user-select:none}html.plt-mobile ion-app [contenteditable]{user-select:text}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}";

let App = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    if (Build.isBrowser) {
      rIC(async () => {
        const isHybrid = isPlatform(window, 'hybrid');
        if (!config.getBoolean('_testing')) {
          import('./tap-click-2b8f3b91.js').then(module => module.startTapClick(config));
        }
        if (config.getBoolean('statusTap', isHybrid)) {
<<<<<<< HEAD
          import('./status-tap-3cb59c15.js').then(module => module.startStatusTap());
=======
<<<<<<< HEAD
          import('./status-tap-eeaa4e21.js').then(module => module.startStatusTap());
=======
          import('./status-tap-0a50a740.js').then(module => module.startStatusTap());
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9
        }
        if (config.getBoolean('inputShims', needInputShims())) {
          import('./input-shims-972d5a52.js').then(module => module.startInputShims(config));
        }
        const hardwareBackButtonModule = await import('./hardware-back-button-68bb8b9b.js');
        if (config.getBoolean('hardwareBackButton', isHybrid)) {
          hardwareBackButtonModule.startHardwareBackButton();
        }
        else {
          hardwareBackButtonModule.blockHardwareBackButton();
        }
        if (typeof window !== 'undefined') {
          import('./keyboard-02ac0a24.js').then(module => module.startKeyboardAssist(window));
        }
        import('./focus-visible-adf10edc.js').then(module => this.focusVisible = module.startFocusVisible());
      });
    }
  }
  /**
   * @internal
   * Used to set focus on an element that uses `ion-focusable`.
   * Do not use this if focusing the element as a result of a keyboard
   * event as the focus utility should handle this for us. This method
   * should be used when we want to programmatically focus an element as
   * a result of another user action. (Ex: We focus the first element
   * inside of a popover when the user presents it, but the popover is not always
   * presented as a result of keyboard action.)
   */
  async setFocus(elements) {
    if (this.focusVisible) {
      this.focusVisible.setFocus(elements);
    }
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { class: {
        [mode]: true,
        'ion-page': true,
        'force-statusbar-padding': config.getBoolean('_forceStatusbarPadding'),
      } }));
  }
  get el() { return getElement(this); }
};
const needInputShims = () => {
  return isPlatform(window, 'ios') && isPlatform(window, 'mobile');
};
const rIC = (callback) => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback);
  }
  else {
    setTimeout(callback, 32);
  }
};
App.style = appCss;

export { App as ion_app };
