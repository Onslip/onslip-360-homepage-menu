import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
import { config } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { loadImage } from '../../utils/image';
import '@ionic/core'

@Component({
  tag: 'homepage-menu-component',
  styleUrl: 'homepage-menu-component.css',
  shadow: true,
  assetsDirs: ['../../../assets'],
})

export class HomepageMenuComponent {
  @State() private imageurl: string = 'http://localhost:8080/background';
  @State() private configurl: string = 'http://localhost:8080/config';
  @State() private bannerUrl: string = 'http://localhost:8080/banner';
  @State() private logoUrl: string = 'http://localhost:8080/logo';
  @Element() element: HTMLElement;

  async componentWillLoad() {

    if (config?.background?.enabled) {
      document.querySelector('body').style.backgroundImage = null;
      document.querySelector('body').style.background = config.background.color;
    }
    else {
      await this.LoadBackground(this.imageurl);
    }
    this.LoadBanner(this.bannerUrl, '.header');
    this.LoadLogo(this.logoUrl, '.header');

  }

  private LoadConfig(element) {
    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontFamily = config?.font;
    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.background = config?.menuBackground;
  }
  componentDidLoad() {
    this.LoadConfig('.menuContainer');

  }
  private async LoadBackground(url) {
    const background = await GetData(url).catch(err => err);
    const image = await loadImage(background)
    if (image != null) {
      document.querySelector('body').style.backgroundImage = `url(${image})`
    }
  }

  private async LoadLogo(url, element) {
    const logo = await GetData(url).catch(() => {
      const node = document.createElement("h1");
      node.innerText = 'Martins Kolgrill'
      this.element.shadowRoot.querySelector(element).appendChild(node)
    });
    const image = await loadImage(logo)
    if (image != null) {
      const img = document.createElement('img');
      img.src = image.toString();
      this.element.shadowRoot.querySelector(element).appendChild(img);
    }
  }

  private async LoadBanner(url, element) {
    const banner = await GetData(url);
    const image = await loadImage(banner)
    if (image != null) {
      // document.querySelector('homepage-menu-component').shadowRoot.querySelector(element).style.backgroundImage = `url(${image})`;
      this.element.shadowRoot.querySelector(element).style.backgroundImage = `url(${image})`;
    }
  }


  render() {

    return (
      <Host>
        <div class={'menuContainer'}>
          <div class='header'></div>
          <menu-component></menu-component>
          <div class='logoDiv'>
            <img src={getAssetPath(`../../../assets/Onslip.png`)} class='onslipLogo'></img>
          </div>
        </div>
      </Host>
    )

  }
}

