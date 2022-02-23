import type { Components, JSX } from "../types/components";

interface ProductEditorComponent extends Components.ProductEditorComponent, HTMLElement {}
export const ProductEditorComponent: {
  prototype: ProductEditorComponent;
  new (): ProductEditorComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
