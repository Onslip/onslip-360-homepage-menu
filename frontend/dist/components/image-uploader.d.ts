import type { Components, JSX } from "../types/components";

interface ImageUploader extends Components.ImageUploader, HTMLElement {}
export const ImageUploader: {
  prototype: ImageUploader;
  new (): ImageUploader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
