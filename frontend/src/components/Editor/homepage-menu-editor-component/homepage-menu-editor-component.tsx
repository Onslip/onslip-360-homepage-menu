import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
import { config, DBConnection } from '../../utils/utils';
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

  @State() private imageurl: string = 'http://localhost:8080/background';
  @State() private bannerUrl: string = 'http://localhost:8080/banner';
  @State() private logoUrl: string = 'http://localhost:8080/logo';
  @State() private locationUrl: string = 'http://localhost:8080/location';
  @Element() element: HTMLElement;
  @State() loading: boolean = true;
  @State() toggle: boolean = true;

  async componentWillLoad() {
    if (!config?.background?.enabled && DBConnection) {
      GetData(this.imageurl).then(response => this.LoadBackground(response)).catch(err => err);
    }
    if (config?.banner && DBConnection) {
      GetData(this.bannerUrl).then(response => this.LoadBanner(response, '.header')).catch(err => err);
    }

    if (config?.Logo && DBConnection) {
      if (config?.banner) {
        GetData(this.logoUrl).then(response => this.LoadLogo(response, '.header')).catch(err => err);
      }
      else {
        GetData(this.logoUrl).then(response => this.LoadLogo(response, '.no-banner')).catch(err => err);

      }

    }
    else {
      GetData(this.locationUrl).then(response => {
        const node = document.createElement("h1");
        node.innerText = response;
        if (config?.banner) {
          this.element.shadowRoot.querySelector('.header').appendChild(node);
        }
        else {
          // const divnode = document.createElement("div");
          // divnode.className = "no-banner";
          // this.element.shadowRoot.querySelector('.menuContainer').appendChild(divnode);
          this.element.shadowRoot.querySelector('.no-banner').appendChild(node);
        }

      })
        .catch(err => console.log(err))
    }
  }

  private async LoadConfig(element, element1) {
    const component = document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component');
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

  private async LoadLogo(image, element) {
    const loadedImage = await loadImage(image.image.data)
    if (config.Logo) {
      const img = document.createElement('img');
      img.src = loadedImage.toString();
      this.element.shadowRoot.querySelector(element).appendChild(img);
    }
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
        <div>
        </div>
        <div class='menuContainer'>
          <div class={config?.banner ? 'header' : 'no-banner'}>
            {config?.connect ? <ion-button onClick={() => this.change()} class='toggle'>Toggle</ion-button> : null}
          </div>
          <menu-editor-component toggle={this.toggle}></menu-editor-component>
        </div>
        <div class='logoDiv'>
          <img src={getAssetPath(`../../../assets/Onslip.png`)} class='onslipLogo'></img>
        </div>
      </Host >
    )
  }
}

