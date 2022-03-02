import type { Components, JSX } from "../types/components";

interface CategoryComponent extends Components.CategoryComponent, HTMLElement {}
export const CategoryComponent: {
  prototype: CategoryComponent;
  new (): CategoryComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
