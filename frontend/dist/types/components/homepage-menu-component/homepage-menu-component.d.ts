import { Colorconfig } from '../../utils/utils';
import '@ionic/core';
export declare class HomepageMenuComponent {
  background: Colorconfig;
  private imageurl;
  private colorUrl;
  private bannerUrl;
  private logoUrl;
  element: HTMLElement;
  componentWillLoad(): Promise<void>;
  private LoadBackground;
  private LoadLogo;
  private LoadBanner;
  render(): any;
}
