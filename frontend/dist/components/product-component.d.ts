import type { Components, JSX } from "../types/components";

interface ProductComponent extends Components.ProductComponent, HTMLElement {}
export const ProductComponent: {
  prototype: ProductComponent;
  new (): ProductComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
