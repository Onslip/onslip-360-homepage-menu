import { productsWithCategory } from '../../utils/utils';
import '@ionic/core';
export declare class MenuComponent {
  private url;
  responsedata: productsWithCategory[];
  loading: boolean;
  componentWillLoad(): Promise<void>;
  render(): any;
}
