import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
import { Styleconfig, Presets } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { loadImage } from '../../utils/image';
import '@ionic/core'

@Component({
  tag: 'homepage-menu-editor-component',
  styleUrl: 'homepage-menu-editor-component.css',
  shadow: true,
  assetsDirs: ['../../../assets'],
})
export class HomepageMenuEditorComponent {

  @State() config: Styleconfig;
  @State() private imageurl: string = 'http://localhost:8080/background';
  @State() private configurl: string = 'http://localhost:8080/config';
  @State() private bannerUrl: string = 'http://localhost:8080/banner';
  @State() private logoUrl: string = 'http://localhost:8080/logo';
  @Element() element: HTMLElement;

  async componentWillLoad() {
    await GetData(this.configurl)
      .then(response => { this.config = response; this.dataIsOk() })
      .catch(err => console.log(`${err} Kunde inte hämta data`))
  }

  async dataIsOk() {
    if (this.config.background.enabled) {
      document.querySelector('body').style.backgroundImage = null;
      document.querySelector('body').style.background = this.config.background.color;
    }
    else {
      await this.LoadBackground(this.imageurl);
    }
    await this.LoadBanner(this.bannerUrl, '.header')
    await this.LoadLogo(this.logoUrl, '.header')
    await this.LoadConfig('.menuContainer');

  }
  private async LoadConfig(element) {
    document.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontFamily = this.config.font;
    document.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.background = this.config.menuBackground;
  }

  private async LoadBackground(url) {
    const background = await GetData(url);
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
      this.element.shadowRoot.querySelector(element).style.backgroundImage = `url(${image})`;
    }
  }

  render() {
    return (
      <Host>
        <div>
          <toolbar-component></toolbar-component>
        </div>
        <div class='mainMenu'>
          <div class='menuContainer' data-status={this.config.preset}>
            <div class='header'></div>
            <menu-editor-component></menu-editor-component>
            <div class='logoDiv'>
              <img src={getAssetPath(`../../../assets/Onslip.png`)} class='onslipLogo'></img>
            </div>
          </div>
        </div>
      </Host>
    )
  }
}
