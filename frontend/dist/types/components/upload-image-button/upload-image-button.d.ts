import '@ionic/core';
import { buttonvalues } from '../image-uploader/image-uploader';
export declare class UploadImageButton {
  buttonvalue: string;
  URL: string;
  element: HTMLElement;
  value: buttonvalues;
  post(file: any): Promise<void>;
  private LoadBackground;
  private LoadLogo;
  private LoadBanner;
  render(): any;
}
