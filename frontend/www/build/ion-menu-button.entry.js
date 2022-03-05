<<<<<<< HEAD
import { r as registerInstance, h, i as Host, j as getElement } from './index-7693580e.js';
import { m as menuOutline, j as menuSharp } from './index-46b049a1.js';
import { g as getIonMode, c as config } from './ionic-global-5a29f32f.js';
import { i as inheritAttributes } from './helpers-bc25ace2.js';
import { m as menuController } from './index-6c120177.js';
import { c as createColorClasses, h as hostContext } from './theme-6baffa69.js';
import { u as updateVisibility } from './menu-toggle-util-c16d3559.js';
import './hardware-back-button-68bb8b9b.js';
import './animation-585a999d.js';
=======
<<<<<<< HEAD
import { r as registerInstance, h, i as Host, j as getElement } from './index-342c6706.js';
import { m as menuOutline, j as menuSharp } from './index-b1e35e86.js';
import { g as getIonMode, c as config } from './ionic-global-6c01899d.js';
import { i as inheritAttributes } from './helpers-730f41c7.js';
import { m as menuController } from './index-5e6aca1b.js';
import { c as createColorClasses, h as hostContext } from './theme-31a4dfd9.js';
import { u as updateVisibility } from './menu-toggle-util-67a8379c.js';
import './hardware-back-button-33350ee9.js';
import './animation-c6a5635b.js';
=======
import { r as registerInstance, h, i as Host, j as getElement } from './index-788b94ef.js';
import { m as menuOutline, j as menuSharp } from './index-b1e35e86.js';
import { g as getIonMode, c as config } from './ionic-global-26489203.js';
import { i as inheritAttributes } from './helpers-6b9231fe.js';
import { m as menuController } from './index-e02d830d.js';
import { c as createColorClasses, h as hostContext } from './theme-4c258838.js';
import { u as updateVisibility } from './menu-toggle-util-5c54bc3d.js';
import './hardware-back-button-6ebf44bb.js';
import './animation-e15eb3eb.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9

const menuButtonIosCss = ":host{--background:transparent;--color-focused:currentColor;--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;overflow:hidden;user-select:none;z-index:0;appearance:none}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-inner{display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;z-index:1}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-hidden){display:none}:host(.menu-button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:\"\";opacity:0}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity, 0)}}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.in-toolbar:not(.in-toolbar-color)){color:var(--ion-toolbar-color, var(--color))}:host{--background-focused:currentColor;--background-focused-opacity:.1;--border-radius:4px;--color:var(--ion-color-primary, #3880ff);--padding-start:5px;--padding-end:5px;height:32px;font-size:31px}:host(.ion-activated){opacity:0.4}@media (any-hover: hover){:host(:hover){opacity:0.6}}";

const menuButtonMdCss = ":host{--background:transparent;--color-focused:currentColor;--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;overflow:hidden;user-select:none;z-index:0;appearance:none}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){.button-native{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-inner{display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;z-index:1}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-hidden){display:none}:host(.menu-button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:\"\";opacity:0}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity, 0)}}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.in-toolbar:not(.in-toolbar-color)){color:var(--ion-toolbar-color, var(--color))}:host{--background-focused:currentColor;--background-focused-opacity:.12;--background-hover:currentColor;--background-hover-opacity:.04;--border-radius:50%;--color:initial;--padding-start:8px;--padding-end:8px;width:48px;height:48px;font-size:24px}:host(.ion-color.ion-focused)::after{background:var(--ion-color-base)}@media (any-hover: hover){:host(.ion-color:hover) .button-native::after{background:var(--ion-color-base)}}";

let MenuButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inheritedAttributes = {};
    this.visible = false;
    /**
     * If `true`, the user cannot interact with the menu button.
     */
    this.disabled = false;
    /**
     * Automatically hides the menu button when the corresponding menu is not active
     */
    this.autoHide = true;
    /**
     * The type of the button.
     */
    this.type = 'button';
    this.onClick = async () => {
      return menuController.toggle(this.menu);
    };
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }
  componentDidLoad() {
    this.visibilityChanged();
  }
  async visibilityChanged() {
    this.visible = await updateVisibility(this.menu);
  }
  render() {
    const { color, disabled, inheritedAttributes } = this;
    const mode = getIonMode(this);
    const menuIcon = config.get('menuIcon', mode === 'ios' ? menuOutline : menuSharp);
    const hidden = this.autoHide && !this.visible;
    const attrs = {
      type: this.type
    };
    const ariaLabel = inheritedAttributes['aria-label'] || 'menu';
    return (h(Host, { onClick: this.onClick, "aria-disabled": disabled ? 'true' : null, "aria-hidden": hidden ? 'true' : null, class: createColorClasses(color, {
        [mode]: true,
        'button': true,
        'menu-button-hidden': hidden,
        'menu-button-disabled': disabled,
        'in-toolbar': hostContext('ion-toolbar', this.el),
        'in-toolbar-color': hostContext('ion-toolbar[color]', this.el),
        'ion-activatable': true,
        'ion-focusable': true
      }) }, h("button", Object.assign({}, attrs, { disabled: disabled, class: "button-native", part: "native", "aria-label": ariaLabel }), h("span", { class: "button-inner" }, h("slot", null, h("ion-icon", { part: "icon", icon: menuIcon, mode: mode, lazy: false, "aria-hidden": "true" }))), mode === 'md' && h("ion-ripple-effect", { type: "unbounded" }))));
  }
  get el() { return getElement(this); }
};
MenuButton.style = {
  ios: menuButtonIosCss,
  md: menuButtonMdCss
};

export { MenuButton as ion_menu_button };
