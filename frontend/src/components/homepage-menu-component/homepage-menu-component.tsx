import { Component, h, Host, State, getAssetPath } from '@stencil/core';
import { productsWithCategory, Images } from '../../utils/utils';
import '@ionic/core'
import { GetData } from '../../utils/get';

@Component({
  tag: 'homepage-menu-component',
  styleUrl: 'homepage-menu-component.css',
  shadow: true,
  assetsDirs: ['assets'],

})

export class HomepageMenuComponent {
  @State() imagedata: Images
  @State() private imageurl: string = 'http://localhost:8080/getimage';
  @State() banner: string;
  @State() private bannerUrl: string = 'http://localhost:8080/'

  @State() logoData: Images

  async componentWillLoad() {
    this.imagedata = await GetData(this.imageurl);
    this.banner = await GetData(this.bannerUrl);
    document.querySelector('body').style.backgroundColor = this.imagedata.backgroundcolor;
    document.querySelector('body').style.backgroundImage = this.imagedata.backgroundImage;
  }

  render() {
    return (
      <Host>
        <div class={'menuContainer'}>
          <slot>
            <div class='header'>
              <company-logo></company-logo>
              <div id='logohere'></div>
            </div>
          </slot>
          <slot>
            <div>
              <company-banner class='header'></company-banner>
            </div>
          </slot>
          <slot>
            <menu-component></menu-component>
          </slot>
          <slot>
            <div class='logoDiv'>
              <img src={getAssetPath(`./assets/Onslip.png`)} class='onslipLogo' ></img>
            </div>
          </slot>
        </div>
      </Host>
    )
  }
}

