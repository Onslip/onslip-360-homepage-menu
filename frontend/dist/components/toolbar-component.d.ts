import type { Components, JSX } from "../types/components";

interface ToolbarComponent extends Components.ToolbarComponent, HTMLElement {}
export const ToolbarComponent: {
  prototype: ToolbarComponent;
  new (): ToolbarComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
