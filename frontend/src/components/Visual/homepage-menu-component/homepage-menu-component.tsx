import { Component, h, State, Host, getAssetPath, Element, Prop } from '@stencil/core';
import { config, DBConnection, mainConfig } from '../../utils/utils';
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

  private imageurl: string = 'http://localhost:8080/background';
  private bannerUrl: string = 'http://localhost:8080/banner';
  private logoUrl: string = 'http://localhost:8080/logo';
  @Element() element: HTMLElement;
  @State() loading: boolean = true;
  @State() logoImage: string = ''
  @Prop() Id: number

  async componentWillLoad() {
    if (DBConnection) {
      if (!config?.background?.enabled) {
        GetData(this.imageurl).then(response => this.LoadBackground(response)).catch(err => err);
      }
      if (config?.banner) {
        GetData(this.bannerUrl).then(response => this.LoadBanner(response, '.header')).catch(err => err);
      }

      if (config?.Logo) {
        if (config?.banner) {
          GetData(this.logoUrl).then(response => this.LoadLogo(response)).catch(err => err);
        }
        else {
          GetData(this.logoUrl).then(response => this.LoadLogo(response)).catch(err => err);
        }
      }
    }
  }

  private async LoadConfig(element, element1) {
    const component = document.querySelector('editor-visual-check').querySelector('homepage-menu-component');
    component.shadowRoot.querySelector(element).style.fontFamily = config?.font?.fontFamily;
    if (config?.font?.fontWeight) {
      component.querySelector(element).style.fontWeight = 'bold';
    }
    if (config?.font?.fontStyle) {
      component.querySelector(element).style.fontStyle = 'italic';
    }
    document.querySelector(element1).style.fontSize = config?.font?.fontSize;
    component.shadowRoot.querySelector(element).style.background = config?.menuBackground;
    if (config?.background?.enabled) {
      document.querySelector('body').style.background = config?.background?.color;
    }
  }

  async componentDidLoad() {
    this.LoadConfig('.menuContainer', ':root');
  }

  private async LoadBackground(image) {
    const loadedImage = await loadImage(image.image.data).catch(err => err)
    document.querySelector('body').style.backgroundImage = `url(${loadedImage})`
  }

  private async LoadLogo(image) {
    this.logoImage = (await loadImage(image.image.data)).toString()
  }

  private async LoadBanner(image, element) {
    const loadedImage = await loadImage(image.image.data).catch(err => err);
    if (config.banner) {
      this.element.shadowRoot.querySelector(element).style.backgroundImage = `url(${loadedImage})`;
    }
  }

  

  render() {
    return (
      <Host>
        <div class='menuContainer'>
          <ion-item lines='none' class={config?.banner ? 'header' : 'header no-banner'}>
            <h2 class="header-text" hidden={config.Logo}>{mainConfig.selectedLocation.name}</h2>
            <img slot='end' src={this.logoImage} class="logo" hidden={!config.Logo}></img>
          </ion-item>
          <menu-component menuId={this.Id}></menu-component>
        </div>
        <div class='logoDiv'>
          <img src={getAssetPath(`../../../assets/Onslip.png`)} class='onslipLogo'></img>
        </div>
        
      </Host >
    )
  }
}

