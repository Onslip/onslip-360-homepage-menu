import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
import { productsWithCategory, Colorconfig } from '../../utils/utils';
import '@ionic/core'
import { GetData } from '../../utils/get';

@Component({
  tag: 'homepage-menu-component',
  styleUrl: 'homepage-menu-component.css',
  shadow: true,
  assetsDirs: ['assets'],

})

export class HomepageMenuComponent {
  @State() background: Colorconfig
  @State() private imageurl: string = 'http://localhost:8080/background';
  @State() private colorUrl: string = 'http://localhost:8080/backgroundcolor'
  @State() private bannerUrl: string = 'http://localhost:8080/banner'
  @State() private logoUrl: string = 'http://localhost:8080/logo'
  @Element() element: HTMLElement;
  @State() logo



  async componentWillLoad() {
    this.background = await GetData(this.colorUrl);
    if (this.background.backgroundcolor != null) {
      document.querySelector('body').style.backgroundImage = null;
      document.querySelector('body').style.backgroundColor = this.background.backgroundcolor;
    }
    else {
      this.LoadBackground(this.imageurl);
    }

    this.LoadBanner(this.bannerUrl, '.header')

    this.LoadLogo(this.logoUrl, '.logo');
  }

  private async LoadBackground(url) {
    const background = await GetData(url);

    const backgroundbyte = new Uint8Array(background.image.data);

    const blob = new Blob([backgroundbyte.buffer]);

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        document.querySelector('body').style.backgroundImage = image
      }
    };
  }

  private async LoadLogo(url, element) {
    const logo = await GetData(url);
    const logobyte = new Uint8Array(logo.image.data);
    const blob = new Blob([logobyte.buffer]);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        this.element.shadowRoot.querySelector(element).src = reader.result;
      }
      else {
        const node = document.createElement("h1");
        node.innerText = 'Martins Kolgrill'
        this.element.shadowRoot.querySelector('.header').appendChild(node);
      }
    };
  }
  private async LoadBanner(url, element) {
    const banner = await GetData(url);
    const bannerbyte = new Uint8Array(banner.image.data);
    const blob = new Blob([bannerbyte.buffer]);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        this.element.shadowRoot.querySelector(element).style.backgroundImage = image;
      }
    };
  }


  render() {
    return (
      <Host>
        <div class={'menuContainer'}>
          <slot>
            <div class='header'>
              <img class='logo' src={this.logo} height='45'></img>
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

