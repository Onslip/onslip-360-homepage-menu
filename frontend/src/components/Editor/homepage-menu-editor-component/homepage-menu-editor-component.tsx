import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
import { config } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { loadImage } from '../../utils/image';
//import { compName } from '../../../../../backend/src/dhm-service'
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
    GetData(this.imageurl).then(response => this.LoadBackground(response)).catch(err => err);
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

  private LoadConfig(element) {
    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontFamily = config?.font?.fontFamily;
    if (config?.font.fontWeight == true) {
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontWeight = 'bold';
    }
    if (config?.font.fontStyle == true) {
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontStyle = 'italic';
    }
    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontSize = "x-large";

    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.background = config?.menuBackground;
  }

  componentDidLoad() {
    this.LoadConfig('.menuContainer');


  }
  private async LoadBackground(image) {
    if (config?.background?.enabled) {
      document.querySelector('body').style.background = config.background.color;
    }
    else {
      const loadedImage = await loadImage(image).catch(err => err)
      document.querySelector('body').style.backgroundImage = `url(${loadedImage})`
    }
  }

  private async LoadLogo(image, element) {
    const loadedImage = await loadImage(image).catch(() => {
      if (!config.Logo) {
        const node = document.createElement("h1");
        node.innerText = 'Martins Kolgrill'
        this.element.shadowRoot.querySelector(element).appendChild(node)
      }
    })
    if (config.Logo) {
      const img = document.createElement('img');
      img.src = loadedImage.toString();

      this.element.shadowRoot.querySelector(element).appendChild(img);

    }
  }

  private async LoadBanner(image, element) {
    const loadedImage = await loadImage(image).catch(err => err);
    if (config.banner) {
      this.element.shadowRoot.querySelector(element).style.backgroundImage = `url(${loadedImage})`;

    }
  }

  render() {

    return (
      < Host >
        <div>
          <toolbar-component></toolbar-component>
        </div>
        <div class='menuContainer' >
          <div class='header'></div>
          <menu-editor-component></menu-editor-component>
        </div>

        <div class='logoDiv'>
          <img src={getAssetPath(`../../../assets/Onslip.png`)} class='onslipLogo'></img>
        </div>
      </Host >
    )

  }
}
