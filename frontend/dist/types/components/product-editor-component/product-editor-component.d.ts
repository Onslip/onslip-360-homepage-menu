import { DBproduct } from '../../utils/utils';
export declare class ProductEditorComponent {
  element: HTMLElement;
  product: DBproduct;
  url: 'http://localhost:8080/productimage-upload';
  componentWillLoad(): Promise<void>;
  loadImage(element: any): Promise<void>;
  uploadImage(file: any, element: any, id: any): Promise<void>;
  render(): any;
}
