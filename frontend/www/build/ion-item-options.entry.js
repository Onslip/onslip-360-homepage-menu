<<<<<<< HEAD
import { r as registerInstance, k as createEvent, h, i as Host, j as getElement } from './index-7693580e.js';
import { g as getIonMode } from './ionic-global-5a29f32f.js';
import { j as isEndSide } from './helpers-bc25ace2.js';
=======
<<<<<<< HEAD
import { r as registerInstance, k as createEvent, h, i as Host, j as getElement } from './index-342c6706.js';
import { g as getIonMode } from './ionic-global-6c01899d.js';
import { k as isEndSide } from './helpers-730f41c7.js';
=======
import { r as registerInstance, k as createEvent, h, i as Host, j as getElement } from './index-788b94ef.js';
import { g as getIonMode } from './ionic-global-26489203.js';
import { j as isEndSide } from './helpers-6b9231fe.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29
>>>>>>> 9cae828372239e49d614edeb6fb358732d904dc9

const itemOptionsIosCss = "ion-item-options{top:0;right:0;justify-content:flex-end;display:none;position:absolute;height:100%;font-size:14px;user-select:none;z-index:1}[dir=rtl] ion-item-options,:host-context([dir=rtl]) ion-item-options{justify-content:flex-start}[dir=rtl] ion-item-options:not(.item-options-end),:host-context([dir=rtl]) ion-item-options:not(.item-options-end){right:auto;left:0;justify-content:flex-end}.item-options-start{right:auto;left:0;justify-content:flex-start}[dir=rtl] .item-options-start,:host-context([dir=rtl]) .item-options-start{justify-content:flex-end}.item-options-start ion-item-option:first-child{padding-right:var(--ion-safe-area-left)}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){.item-options-start ion-item-option:first-child{padding-right:unset;-webkit-padding-end:var(--ion-safe-area-left);padding-inline-end:var(--ion-safe-area-left)}}.item-options-end ion-item-option:last-child{padding-right:var(--ion-safe-area-right)}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){.item-options-end ion-item-option:last-child{padding-right:unset;-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}[dir=rtl] .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end),:host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}.item-sliding-active-slide ion-item-options{display:flex;visibility:hidden}.item-sliding-active-slide.item-sliding-active-options-start .item-options-start,.item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start){width:100%;visibility:visible}.item-options-ios{border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)))}.item-options-ios.item-options-end{border-bottom-width:0.55px}.list-ios-lines-none .item-options-ios{border-bottom-width:0}.list-ios-lines-full .item-options-ios,.list-ios-lines-inset .item-options-ios.item-options-end{border-bottom-width:0.55px}";

const itemOptionsMdCss = "ion-item-options{top:0;right:0;justify-content:flex-end;display:none;position:absolute;height:100%;font-size:14px;user-select:none;z-index:1}[dir=rtl] ion-item-options,:host-context([dir=rtl]) ion-item-options{justify-content:flex-start}[dir=rtl] ion-item-options:not(.item-options-end),:host-context([dir=rtl]) ion-item-options:not(.item-options-end){right:auto;left:0;justify-content:flex-end}.item-options-start{right:auto;left:0;justify-content:flex-start}[dir=rtl] .item-options-start,:host-context([dir=rtl]) .item-options-start{justify-content:flex-end}.item-options-start ion-item-option:first-child{padding-right:var(--ion-safe-area-left)}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){.item-options-start ion-item-option:first-child{padding-right:unset;-webkit-padding-end:var(--ion-safe-area-left);padding-inline-end:var(--ion-safe-area-left)}}.item-options-end ion-item-option:last-child{padding-right:var(--ion-safe-area-right)}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){.item-options-end ion-item-option:last-child{padding-right:unset;-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}[dir=rtl] .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end),:host-context([dir=rtl]) .item-sliding-active-slide.item-sliding-active-options-start ion-item-options:not(.item-options-end){width:100%;visibility:visible}.item-sliding-active-slide ion-item-options{display:flex;visibility:hidden}.item-sliding-active-slide.item-sliding-active-options-start .item-options-start,.item-sliding-active-slide.item-sliding-active-options-end ion-item-options:not(.item-options-start){width:100%;visibility:visible}.item-options-md{border-bottom-width:0;border-bottom-style:solid;border-bottom-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))))}.list-md-lines-none .item-options-md{border-bottom-width:0}.list-md-lines-full .item-options-md,.list-md-lines-inset .item-options-md.item-options-end{border-bottom-width:1px}";

let ItemOptions = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionSwipe = createEvent(this, "ionSwipe", 7);
    /**
     * The side the option button should be on. Possible values: `"start"` and `"end"`. If you have multiple `ion-item-options`, a side must be provided for each.
     *
     */
    this.side = 'end';
  }
  /** @internal */
  async fireSwipeEvent() {
    this.ionSwipe.emit({
      side: this.side
    });
  }
  render() {
    const mode = getIonMode(this);
    const isEnd = isEndSide(this.side);
    return (h(Host, { class: {
        [mode]: true,
        // Used internally for styling
        [`item-options-${mode}`]: true,
        'item-options-start': !isEnd,
        'item-options-end': isEnd
      } }));
  }
  get el() { return getElement(this); }
};
ItemOptions.style = {
  ios: itemOptionsIosCss,
  md: itemOptionsMdCss
};

export { ItemOptions as ion_item_options };
