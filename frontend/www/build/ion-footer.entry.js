<<<<<<< HEAD
import { l as readTask, m as writeTask, r as registerInstance, h, i as Host, j as getElement } from './index-342c6706.js';
import { g as getIonMode } from './ionic-global-6c01899d.js';
import { e as clamp, c as componentOnReady } from './helpers-730f41c7.js';
=======
import { m as readTask, o as writeTask, r as registerInstance, h, i as Host, j as getElement } from './index-788b94ef.js';
import { g as getIonMode } from './ionic-global-26489203.js';
import { e as clamp, c as componentOnReady } from './helpers-6b9231fe.js';
>>>>>>> 3b12805dad8fe72e499827a3b3e65f032a0e4e29

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const handleFooterFade = (scrollEl, baseEl) => {
  readTask(() => {
    const scrollTop = scrollEl.scrollTop;
    const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
    /**
     * Toolbar background will fade
     * out over fadeDuration in pixels.
     */
    const fadeDuration = 10;
    /**
     * Begin fading out maxScroll - 30px
     * from the bottom of the content.
     * Also determine how close we are
     * to starting the fade. If we are
     * before the starting point, the
     * scale value will get clamped to 0.
     * If we are after the maxScroll (rubber
     * band scrolling), the scale value will
     * get clamped to 1.
     */
    const fadeStart = maxScroll - fadeDuration;
    const distanceToStart = scrollTop - fadeStart;
    const scale = clamp(0, 1 - (distanceToStart / fadeDuration), 1);
    writeTask(() => {
      baseEl.style.setProperty('--opacity-scale', scale.toString());
    });
  });
};

const footerIosCss = "ion-footer{display:block;position:relative;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom, 0)}.footer-ios ion-toolbar:first-of-type{--border-width:0.55px 0 0}@supports (backdrop-filter: blur(0)){.footer-background{left:0;right:0;top:0;bottom:0;position:absolute;backdrop-filter:saturate(180%) blur(20px)}.footer-translucent-ios ion-toolbar{--opacity:.8}}.footer-ios.ion-no-border ion-toolbar:first-of-type{--border-width:0}.footer-collapse-fade ion-toolbar{--opacity-scale:inherit}";

const footerMdCss = "ion-footer{display:block;position:relative;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom, 0)}.footer-md::before{left:0;top:-2px;bottom:auto;background-position:left 0 top 0;position:absolute;width:100%;height:2px;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==\");background-repeat:repeat-x;content:\"\"}[dir=rtl] .footer-md::before,:host-context([dir=rtl]) .footer-md::before{left:unset;right:unset;right:0}[dir=rtl] .footer-md::before,:host-context([dir=rtl]) .footer-md::before{background-position:right 0 top 0}.footer-md.ion-no-border::before{display:none}";

let Footer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * If `true`, the footer will be translucent.
     * Only applies when the mode is `"ios"` and the device supports
     * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
     *
     * Note: In order to scroll content behind the footer, the `fullscreen`
     * attribute needs to be set on the content.
     */
    this.translucent = false;
    this.checkCollapsibleFooter = () => {
      const mode = getIonMode(this);
      if (mode !== 'ios') {
        return;
      }
      const { collapse } = this;
      const hasFade = collapse === 'fade';
      this.destroyCollapsibleFooter();
      if (hasFade) {
        const pageEl = this.el.closest('ion-app,ion-page,.ion-page,page-inner');
        const contentEl = (pageEl) ? pageEl.querySelector('ion-content') : null;
        this.setupFadeFooter(contentEl);
      }
    };
    this.setupFadeFooter = async (contentEl) => {
      if (!contentEl) {
        console.error('ion-footer requires a content to collapse. Make sure there is an ion-content.');
        return;
      }
      await new Promise(resolve => componentOnReady(contentEl, resolve));
      const scrollEl = this.scrollEl = await contentEl.getScrollElement();
      /**
       * Handle fading of toolbars on scroll
       */
      this.contentScrollCallback = () => { handleFooterFade(scrollEl, this.el); };
      scrollEl.addEventListener('scroll', this.contentScrollCallback);
      handleFooterFade(scrollEl, this.el);
    };
  }
  componentDidLoad() {
    this.checkCollapsibleFooter();
  }
  componentDidUpdate() {
    this.checkCollapsibleFooter();
  }
  destroyCollapsibleFooter() {
    if (this.scrollEl && this.contentScrollCallback) {
      this.scrollEl.removeEventListener('scroll', this.contentScrollCallback);
      this.contentScrollCallback = undefined;
    }
  }
  render() {
    const { translucent, collapse } = this;
    const mode = getIonMode(this);
    return (h(Host, { role: "contentinfo", class: {
        [mode]: true,
        // Used internally for styling
        [`footer-${mode}`]: true,
        [`footer-translucent`]: translucent,
        [`footer-translucent-${mode}`]: translucent,
        [`footer-collapse-${collapse}`]: collapse !== undefined,
      } }, mode === 'ios' && translucent &&
      h("div", { class: "footer-background" }), h("slot", null)));
  }
  get el() { return getElement(this); }
};
Footer.style = {
  ios: footerIosCss,
  md: footerMdCss
};

export { Footer as ion_footer };
