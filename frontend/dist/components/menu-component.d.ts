import type { Components, JSX } from "../types/components";

interface MenuComponent extends Components.MenuComponent, HTMLElement {}
export const MenuComponent: {
  prototype: MenuComponent;
  new (): MenuComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
