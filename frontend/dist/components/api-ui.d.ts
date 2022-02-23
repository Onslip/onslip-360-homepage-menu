import type { Components, JSX } from "../types/components";

interface ApiUi extends Components.ApiUi, HTMLElement {}
export const ApiUi: {
  prototype: ApiUi;
  new (): ApiUi;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
