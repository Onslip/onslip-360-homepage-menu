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
  @State() private imageurl: string = 'http://localhost:8080/getbackgroundcolor';
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
    else {
      this.uploadImage();
    }
  }
  private async uploadImage() {
    const result = await GetData('http://localhost:8080/getimage');
    const bytes = new Uint8Array(result.image.data);
    const blob = new Blob([bytes.buffer]);
    const reader = new FileReader();
    let image;
    reader.readAsDataURL(blob);
    console.log(blob);
    reader.onload = () => {
      image = `url(${reader.result})`;
      document.querySelector('body').style.backgroundImage = image
    };
  }

  render() {
    return (
      <Host>
        <div class={'menuContainer'}>
          <slot>
            <div class='header'>
              <h1>Martins kolgrill</h1>
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

