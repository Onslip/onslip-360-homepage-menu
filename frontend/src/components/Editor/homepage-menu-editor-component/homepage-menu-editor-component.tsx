import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
import { config } from '../../utils/utils';
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

  async componentWillLoad() {
    if (config?.background.enabled == false) {
      GetData(this.imageurl).then(response => this.LoadBackground(response)).catch(err => err);
    }
    if (config?.banner == true) {
      GetData(this.bannerUrl).then(response => this.LoadBanner(response, '.header')).catch(err => err);
    }
    if (config?.Logo == true) {
      GetData(this.logoUrl).then(response => this.LoadLogo(response, '.header')).catch(err => err);
    }
    else {
      GetData(this.locationUrl).then(response => {
        const node = document.createElement("h1");
        node.innerText = response;
        this.element.shadowRoot.querySelector('.header').appendChild(node)
      })
        .catch(err => console.log(err))
    }
  }

  private async LoadConfig(element, element1) {
    const component = document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component');
    component.shadowRoot.querySelector(element).style.fontFamily = config?.font?.fontFamily;
    if (config?.font.fontWeight == true) {
      component.shadowRoot.querySelector(element).style.fontWeight = 'bold';
    }
    if (config?.font.fontStyle == true) {
      component.shadowRoot.querySelector(element).style.fontStyle = 'italic';
    }
    document.querySelector(element1).style.fontSize = config.font.fontSize;

    component.shadowRoot.querySelector(element).style.background = config?.menuBackground;
    if (config?.font.fontOutline) {
      component.shadowRoot.querySelector(element).style.textShadow = "-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000";
    }
    if (config?.background.enabled == true) {
      document.querySelector('body').style.background = config?.background.color;
    }
  }

  async componentDidLoad() {
    this.LoadConfig('.menuContainer', ':root');
  }

  private async LoadBackground(image) {
    const loadedImage = await loadImage(image).catch(err => err)
    document.querySelector('body').style.backgroundImage = `url(${loadedImage})`
  }

  private async LoadLogo(image, element) {
    const loadedImage = await loadImage(image)
    const img = document.createElement('img');
    img.src = loadedImage.toString();
    this.element.shadowRoot.querySelector(element).appendChild(img);
  }

  private async LoadBanner(image, element) {
    const loadedImage = await loadImage(image).catch(err => err);
    if (config.banner) {
      this.element.shadowRoot.querySelector(element).style.backgroundImage = `url(${loadedImage})`;
    }
  }

  render() {
    return (
      <Host>
        <div>
          <toolbar-component></toolbar-component>
        </div>
        <div class='menuContainer' data-status={config?.preset}>
          <div class='header'></div>
          <menu-editor-component></menu-editor-component>
        </div>
        <div class='logoDiv'>
          <img src={getAssetPath(`../../../assets/Onslip.png`)} class='onslipLogo'></img>
        </div>
      </Host>
    )
  }
}
