import { EventEmitter } from '../../stencil-public-runtime';
import '@ionic/core';
export declare class ImageUploader {
  onUploadCompleted: EventEmitter<Blob>;
  color: string;
  file: any;
  tempfile: string;
  checkImage: boolean;
  private url1;
  private url2;
  private url3;
  element: HTMLElement;
  value: buttonvalues;
  changeColor(): void;
  submitForm(): Promise<void>;
  render(): any;
}
export interface buttonvalues {
  1: string;
  2: string;
  3: string;
}
