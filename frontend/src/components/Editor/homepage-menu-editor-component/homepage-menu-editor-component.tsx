import { Component, h, State, Host, Element } from '@stencil/core';
import { config, DBConnection } from '../../utils/utils';
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
  @Prop() menuId: number

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

  private async LoadConfig() {
    document.documentElement.style.setProperty('--font', config?.font.fontFamily)
    if (config?.font?.fontWeight) {
      document.documentElement.style.setProperty('--fontWeight', 'bold')
    }
    if (config?.font?.fontStyle) {
      document.documentElement.style.setProperty('--fontStyle', 'italic')
    }
    if (config.font.fontSize != undefined) {
      document.documentElement.style.setProperty('--fontSize', config?.font?.fontSize[1])
    }

    config.font.customFonts.forEach(font => {
      var link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', font.fontUrl)
      document.head.appendChild(link);
    }
    )
    document.documentElement.style.setProperty('--menuBackground', config?.menuBackground)
    if (config?.background?.enabled) {
      document.querySelector('body').style.background = config?.background?.color;
    }
  }

  async componentDidLoad() {
    this.LoadConfig();
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
        {/* <toolbar-component></toolbar-component> */}
        <div class='menuContainer'>
          {/* <ion-item lines='none' class={config?.banner ? 'header' : 'header no-banner'}>
            {config?.connect ? <ion-button slot='start' onClick={() => this.change()} class='toggle'>Toggle</ion-button> : null}
            <h2 class="header-text" hidden={config.Logo}>{mainConfig.selectedLocation.name}</h2>
            <img slot='end' src={this.logoImage} class="logo" hidden={!config.Logo}></img>
          </ion-item> */}
          {/* <menu-editor-component toggle={this.toggle} menuId={this.menuId}></menu-editor-component>  */}
          <test-menu toggle={this.toggle} menuId={this.menuId}></test-menu>
        </div>
        {/* <div class='logoDiv'> */}
        {/* <img src={getAssetPath(`../../../assets/Onslip.png`)} class='onslipLogo'></img> */}
        {/* </div> */}
      </Host>
    )
  }
}

