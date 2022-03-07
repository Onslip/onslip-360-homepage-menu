import type { Components, JSX } from "../types/components";

interface UploadImageButton extends Components.UploadImageButton, HTMLElement {}
export const UploadImageButton: {
  prototype: UploadImageButton;
  new (): UploadImageButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
