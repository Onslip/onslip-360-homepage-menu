import { r as registerInstance, l as createEvent, n as writeTask, h, i as Host, k as getElement } from './index-fdd6f247.js';
import { c as config, g as getIonMode } from './ionic-global-49bac6cf.js';
import { p as pointerCoord } from './helpers-730f41c7.js';
import { i as isRTL } from './index-7165887b.js';
import { c as createColorClasses, h as hostContext } from './theme-31a4dfd9.js';

const segmentIosCss = ":host{--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;position:relative;align-items:stretch;justify-content:center;width:100%;background:var(--background);font-family:var(--ion-font-family, inherit);text-align:center;contain:paint;user-select:none}:host(.segment-scrollable){justify-content:start;width:auto;overflow-x:auto}:host(.segment-scrollable::-webkit-scrollbar){display:none}:host{--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.065);border-radius:8px;overflow:hidden;z-index:0}:host(.ion-color){background:rgba(var(--ion-color-base-rgb), 0.065)}:host(.in-toolbar){margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;width:auto}@supports (margin-inline-start: 0) or (-webkit-margin-start: 0){:host(.in-toolbar){margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host(.in-toolbar:not(.ion-color)){background:var(--ion-toolbar-segment-background, var(--background))}:host(.in-toolbar-color:not(.ion-color)){background:rgba(var(--ion-color-contrast-rgb), 0.11)}";

const segmentMdCss = ":host{--ripple-color:currentColor;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;position:relative;align-items:stretch;justify-content:center;width:100%;background:var(--background);font-family:var(--ion-font-family, inherit);text-align:center;contain:paint;user-select:none}:host(.segment-scrollable){justify-content:start;width:auto;overflow-x:auto}:host(.segment-scrollable::-webkit-scrollbar){display:none}:host{--background:transparent}:host(.segment-scrollable) ::slotted(ion-segment-button){min-width:auto}";

let Segment = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ionChange = createEvent(this, "ionChange", 7);
    this.ionSelect = createEvent(this, "ionSelect", 7);
    this.ionStyle = createEvent(this, "ionStyle", 7);
    this.didInit = false;
    this.activated = false;
    /**
     * If `true`, the user cannot interact with the segment.
     */
    this.disabled = false;
    /**
     * If `true`, the segment buttons will overflow and the user can swipe to see them.
     * In addition, this will disable the gesture to drag the indicator between the buttons
     * in order to swipe to see hidden buttons.
     */
    this.scrollable = false;
    /**
     * If `true`, users will be able to swipe between segment buttons to activate them.
     */
    this.swipeGesture = true;
    /**
     * If `true`, navigating to an `ion-segment-button` with the keyboard will focus and select the element.
     * If `false`, keyboard navigation will only focus the `ion-segment-button` element.
     */
    this.selectOnFocus = false;
    this.onClick = (ev) => {
      const current = ev.target;
      const previous = this.checked;
      // If the current element is a segment then that means
      // the user tried to swipe to a segment button and
      // click a segment button at the same time so we should
      // not update the checked segment button
      if (current.tagName === 'ION-SEGMENT') {
        return;
      }
      this.value = current.value;
      if (this.scrollable || !this.swipeGesture) {
        if (previous) {
          this.checkButton(previous, current);
        }
        else {
          this.setCheckedClasses();
        }
      }
      this.checked = current;
    };
    this.getSegmentButton = (selector) => {
      const buttons = this.getButtons().filter(button => !button.disabled);
      const currIndex = buttons.findIndex(button => button === document.activeElement);
      switch (selector) {
        case 'first':
          return buttons[0];
        case 'last':
          return buttons[buttons.length - 1];
        case 'next':
          return buttons[currIndex + 1] || buttons[0];
        case 'previous':
          return buttons[currIndex - 1] || buttons[buttons.length - 1];
        default:
          return null;
      }
    };
  }
  colorChanged(value, oldValue) {
    /**
     * If color is set after not having
     * previously been set (or vice versa),
     * we need to emit style so the segment-buttons
     * can apply their color classes properly.
     */
    if ((oldValue === undefined && value !== undefined) ||
      (oldValue !== undefined && value === undefined)) {
      this.emitStyle();
    }
  }
  swipeGestureChanged() {
    this.gestureChanged();
  }
  valueChanged(value, oldValue) {
    this.ionSelect.emit({ value });
    if (oldValue !== '' || this.didInit) {
      if (!this.activated) {
        this.ionChange.emit({ value });
      }
      else {
        this.valueAfterGesture = value;
      }
    }
  }
  disabledChanged() {
    this.gestureChanged();
    const buttons = this.getButtons();
    for (const button of buttons) {
      button.disabled = this.disabled;
    }
  }
  gestureChanged() {
    if (this.gesture) {
      this.gesture.enable(!this.scrollable && !this.disabled && this.swipeGesture);
    }
  }
  connectedCallback() {
    this.emitStyle();
  }
  componentWillLoad() {
    this.emitStyle();
  }
  async componentDidLoad() {
    this.setCheckedClasses();
    this.ensureFocusable();
    this.gesture = (await import('./index-8b0b4762.js')).createGesture({
      el: this.el,
      gestureName: 'segment',
      gesturePriority: 100,
      threshold: 0,
      passive: false,
      onStart: ev => this.onStart(ev),
      onMove: ev => this.onMove(ev),
      onEnd: ev => this.onEnd(ev),
    });
    this.gestureChanged();
    if (this.disabled) {
      this.disabledChanged();
    }
    this.didInit = true;
  }
  onStart(detail) {
    this.activate(detail);
  }
  onMove(detail) {
    this.setNextIndex(detail);
  }
  onEnd(detail) {
    this.setActivated(false);
    const checkedValidButton = this.setNextIndex(detail, true);
    detail.event.stopImmediatePropagation();
    if (checkedValidButton) {
      this.addRipple(detail);
    }
    const value = this.valueAfterGesture;
    if (value !== undefined) {
      this.ionChange.emit({ value });
      this.valueAfterGesture = undefined;
    }
  }
  getButtons() {
    return Array.from(this.el.querySelectorAll('ion-segment-button'));
  }
  /**
   * The gesture blocks the segment button ripple. This
   * function adds the ripple based on the checked segment
   * and where the cursor ended.
   */
  addRipple(detail) {
    const useRippleEffect = config.getBoolean('animated', true) && config.getBoolean('rippleEffect', true);
    if (!useRippleEffect) {
      return;
    }
    const buttons = this.getButtons();
    const checked = buttons.find(button => button.value === this.value);
    const root = checked.shadowRoot || checked;
    const ripple = root.querySelector('ion-ripple-effect');
    if (!ripple) {
      return;
    }
    const { x, y } = pointerCoord(detail.event);
    ripple.addRipple(x, y).then(remove => remove());
  }
  /*
   * Activate both the segment and the buttons
   * due to a bug with ::slotted in Safari
   */
  setActivated(activated) {
    const buttons = this.getButtons();
    buttons.forEach(button => {
      if (activated) {
        button.classList.add('segment-button-activated');
      }
      else {
        button.classList.remove('segment-button-activated');
      }
    });
    this.activated = activated;
  }
  activate(detail) {
    const clicked = detail.event.target;
    const buttons = this.getButtons();
    const checked = buttons.find(button => button.value === this.value);
    // Make sure we are only checking for activation on a segment button
    // since disabled buttons will get the click on the segment
    if (clicked.tagName !== 'ION-SEGMENT-BUTTON') {
      return;
    }
    // If there are no checked buttons, set the current button to checked
    if (!checked) {
      this.value = clicked.value;
      this.setCheckedClasses();
    }
    // If the gesture began on the clicked button with the indicator
    // then we should activate the indicator
    if (this.value === clicked.value) {
      this.setActivated(true);
    }
  }
  getIndicator(button) {
    const root = button.shadowRoot || button;
    return root.querySelector('.segment-button-indicator');
  }
  checkButton(previous, current) {
    const previousIndicator = this.getIndicator(previous);
    const currentIndicator = this.getIndicator(current);
    if (previousIndicator === null || currentIndicator === null) {
      return;
    }
    const previousClientRect = previousIndicator.getBoundingClientRect();
    const currentClientRect = currentIndicator.getBoundingClientRect();
    const widthDelta = previousClientRect.width / currentClientRect.width;
    const xPosition = previousClientRect.left - currentClientRect.left;
    // Scale the indicator width to match the previous indicator width
    // and translate it on top of the previous indicator
    const transform = `translate3d(${xPosition}px, 0, 0) scaleX(${widthDelta})`;
    writeTask(() => {
      // Remove the transition before positioning on top of the previous indicator
      currentIndicator.classList.remove('segment-button-indicator-animated');
      currentIndicator.style.setProperty('transform', transform);
      // Force a repaint to ensure the transform happens
      currentIndicator.getBoundingClientRect();
      // Add the transition to move the indicator into place
      currentIndicator.classList.add('segment-button-indicator-animated');
      // Remove the transform to slide the indicator back to the button clicked
      currentIndicator.style.setProperty('transform', '');
    });
    this.value = current.value;
    this.setCheckedClasses();
  }
  setCheckedClasses() {
    const buttons = this.getButtons();
    const index = buttons.findIndex(button => button.value === this.value);
    const next = index + 1;
    // Keep track of the currently checked button
    this.checked = buttons.find(button => button.value === this.value);
    for (const button of buttons) {
      button.classList.remove('segment-button-after-checked');
    }
    if (next < buttons.length) {
      buttons[next].classList.add('segment-button-after-checked');
    }
  }
  setNextIndex(detail, isEnd = false) {
    const rtl = isRTL(this.el);
    const activated = this.activated;
    const buttons = this.getButtons();
    const index = buttons.findIndex(button => button.value === this.value);
    const previous = buttons[index];
    let current;
    let nextIndex;
    if (index === -1) {
      return;
    }
    // Get the element that the touch event started on in case
    // it was the checked button, then we will move the indicator
    const rect = previous.getBoundingClientRect();
    const left = rect.left;
    const width = rect.width;
    // Get the element that the gesture is on top of based on the currentX of the
    // gesture event and the Y coordinate of the starting element, since the gesture
    // can move up and down off of the segment
    const currentX = detail.currentX;
    const previousY = rect.top + (rect.height / 2);
    /**
     * Segment can be used inside the shadow dom
     * so doing document.elementFromPoint would never
     * return a segment button in that instance.
     * We use getRootNode to which will return the parent
     * shadow root if used inside a shadow component and
     * returns document otherwise.
     */
    const root = this.el.getRootNode();
    const nextEl = root.elementFromPoint(currentX, previousY);
    const decreaseIndex = rtl ? currentX > (left + width) : currentX < left;
    const increaseIndex = rtl ? currentX < left : currentX > (left + width);
    // If the indicator is currently activated then we have started the gesture
    // on top of the checked button so we need to slide the indicator
    // by checking the button next to it as we move
    if (activated && !isEnd) {
      // Decrease index, move left in LTR & right in RTL
      if (decreaseIndex) {
        const newIndex = index - 1;
        if (newIndex >= 0) {
          nextIndex = newIndex;
        }
        // Increase index, moves right in LTR & left in RTL
      }
      else if (increaseIndex) {
        if (activated && !isEnd) {
          const newIndex = index + 1;
          if (newIndex < buttons.length) {
            nextIndex = newIndex;
          }
        }
      }
      if (nextIndex !== undefined && !buttons[nextIndex].disabled) {
        current = buttons[nextIndex];
      }
    }
    // If the indicator is not activated then we will just set the indicator
    // to the element where the gesture ended
    if (!activated && isEnd) {
      current = nextEl;
    }
    /* tslint:disable-next-line */
    if (current != null) {
      /**
       * If current element is ion-segment then that means
       * user tried to select a disabled ion-segment-button,
       * and we should not update the ripple.
       */
      if (current.tagName === 'ION-SEGMENT') {
        return false;
      }
      if (previous !== current) {
        this.checkButton(previous, current);
      }
    }
    return true;
  }
  emitStyle() {
    this.ionStyle.emit({
      'segment': true
    });
  }
  onKeyDown(ev) {
    const rtl = isRTL(this.el);
    let keyDownSelectsButton = this.selectOnFocus;
    let current;
    switch (ev.key) {
      case 'ArrowRight':
        ev.preventDefault();
        current = rtl ? this.getSegmentButton('previous') : this.getSegmentButton('next');
        break;
      case 'ArrowLeft':
        ev.preventDefault();
        current = rtl ? this.getSegmentButton('next') : this.getSegmentButton('previous');
        break;
      case 'Home':
        ev.preventDefault();
        current = this.getSegmentButton('first');
        break;
      case 'End':
        ev.preventDefault();
        current = this.getSegmentButton('last');
        break;
      case ' ':
      case 'Enter':
        ev.preventDefault();
        current = document.activeElement;
        keyDownSelectsButton = true;
      default:
        break;
    }
    if (!current) {
      return;
    }
    if (keyDownSelectsButton) {
      const previous = this.checked || current;
      this.checkButton(previous, current);
    }
    current.focus();
  }
  /* By default, focus is delegated to the selected `ion-segment-button`.
   * If there is no selected button, focus will instead pass to the first child button.
  **/
  ensureFocusable() {
    var _a;
    if (this.value !== undefined) {
      return;
    }
    ;
    const buttons = this.getButtons();
    (_a = buttons[0]) === null || _a === void 0 ? void 0 : _a.setAttribute('tabindex', '0');
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { role: "tablist", onClick: this.onClick, class: createColorClasses(this.color, {
        [mode]: true,
        'in-toolbar': hostContext('ion-toolbar', this.el),
        'in-toolbar-color': hostContext('ion-toolbar[color]', this.el),
        'segment-activated': this.activated,
        'segment-disabled': this.disabled,
        'segment-scrollable': this.scrollable
      }) }, h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "color": ["colorChanged"],
    "swipeGesture": ["swipeGestureChanged"],
    "value": ["valueChanged"],
    "disabled": ["disabledChanged"]
  }; }
};
Segment.style = {
  ios: segmentIosCss,
  md: segmentMdCss
};

export { Segment as ion_segment };
