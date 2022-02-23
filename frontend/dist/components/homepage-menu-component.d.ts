import type { Components, JSX } from "../types/components";

interface HomepageMenuComponent extends Components.HomepageMenuComponent, HTMLElement {}
export const HomepageMenuComponent: {
  prototype: HomepageMenuComponent;
  new (): HomepageMenuComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
