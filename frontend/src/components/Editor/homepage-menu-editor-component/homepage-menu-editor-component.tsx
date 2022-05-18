import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
import { config, DBConnection, mainConfig } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { loadImage } from '../../utils/image';
import '@ionic/core'
import { Prop } from '@ionic/core/dist/types/stencil-public-runtime';

@Component({
  tag: 'homepage-menu-editor-component',
  styleUrl: 'homepage-menu-editor-component.css',
  shadow: true,
  assetsDirs: ['../../../assets'],
})
export class HomepageMenuEditorComponent {

  private imageurl: string = 'http://localhost:8080/background';
  private bannerUrl: string = 'http://localhost:8080/banner';
  private logoUrl: string = 'http://localhost:8080/logo';
  @Element() element: HTMLElement;
  @State() loading: boolean = true;
  @State() toggle: boolean = true;
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
    const component = document.querySelector('editor-visual-check').querySelector('homepage-menu-editor-component');
    component.shadowRoot.querySelector(element).style.fontFamily = config?.font?.fontFamily;
    if (config?.font?.fontWeight) {
      component.shadowRoot.querySelector(element).style.fontWeight = 'bold';
    }
    if (config?.font?.fontStyle) {
      component.shadowRoot.querySelector(element).style.fontStyle = 'italic';
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
    this.logoImage = await (await loadImage(image.image.data)).toString()
  }

  private async LoadBanner(image, element) {
    const loadedImage = await loadImage(image.image.data).catch(err => err);
    if (config.banner) {
      this.element.shadowRoot.querySelector(element).style.backgroundImage = `url(${loadedImage})`;
    }
  }

  change() {
    if (this.toggle) {
      this.toggle = false;
    }
    else {
      this.toggle = true;
    }
  }

  render() {
    return (
      <Host>
        <toolbar-component></toolbar-component>
        <div class="content-container">
        <video id='Bvideo' autoplay={true} muted loop={true}  preload="auto" playsinline><source src={getAssetPath(`../../../assets/meny.mp4`)}></source></video>

        <div class='menuContainer'>

          <ion-item lines='none' class={config?.banner ? 'header' : 'header no-banner'}>
            {config?.connect ? <ion-button slot='start' onClick={() => this.change()} class='toggle'>Toggle</ion-button> : null}
            <h2 class="header-text" hidden={config.Logo}>{mainConfig.selectedLocation.name}</h2>
            <img slot='end' src={this.logoImage} class="logo" hidden={!config.Logo}></img>
          </ion-item>
          <menu-editor-component toggle={this.toggle} menuId={this.Id}></menu-editor-component>
          {/* <test-menu></test-menu> */}
          
        </div>
        {/* <div class='logoDiv'>
          <img src={getAssetPath(`../../../assets/Onslip.png`)} class='onslipLogo'></img>
        </div> */}
        </div>
      </Host >
    )
  }
}

