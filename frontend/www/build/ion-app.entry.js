import { r as registerInstance, q as Build, h, i as Host, k as getElement } from './index-fdd6f247.js';
import { a as isPlatform, c as config, g as getIonMode } from './ionic-global-49bac6cf.js';

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
          import('./tap-click-53a0539d.js').then(module => module.startTapClick(config));
        }
        if (config.getBoolean('statusTap', isHybrid)) {
          import('./status-tap-4be0c1dd.js').then(module => module.startStatusTap());
        }
        if (config.getBoolean('inputShims', needInputShims())) {
          import('./input-shims-4cf8f5bc.js').then(module => module.startInputShims(config));
        }
        const hardwareBackButtonModule = await import('./hardware-back-button-33350ee9.js');
        if (config.getBoolean('hardwareBackButton', isHybrid)) {
          hardwareBackButtonModule.startHardwareBackButton();
        }
        else {
          hardwareBackButtonModule.blockHardwareBackButton();
        }
        if (typeof window !== 'undefined') {
          import('./keyboard-0b669d15.js').then(module => module.startKeyboardAssist(window));
        }
        import('./focus-visible-bbde0d61.js').then(module => this.focusVisible = module.startFocusVisible());
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
