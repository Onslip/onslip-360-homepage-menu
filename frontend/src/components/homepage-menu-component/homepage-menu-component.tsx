import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
import { productsWithCategory, Images, Banner } from '../../utils/utils';
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
  @State() banner: Banner;
  @State() private bannerUrl: string = 'http://localhost:8080/getbanner'
  @Element() element: HTMLElement

  @State() logoData: Images

  async componentWillLoad() {
    this.imagedata = await GetData(this.imageurl);
    this.banner = await GetData(this.bannerUrl);
    if (this.imagedata.backgroundcolor != null) {
      document.querySelector('body').style.backgroundImage = null;
      document.querySelector('body').style.backgroundColor = this.imagedata.backgroundcolor;
    }
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

