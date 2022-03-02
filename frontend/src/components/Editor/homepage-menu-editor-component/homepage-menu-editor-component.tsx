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
  @Element() element: HTMLElement;
  @State() loading: boolean = true;

  async componentWillLoad() {
    GetData(this.imageurl).then(response => this.LoadBackground(response)).catch(err => err);
    GetData(this.bannerUrl).then(response => this.LoadBanner(response, '.header')).catch(err => err);
    GetData(this.logoUrl).then(response => this.LoadLogo(response, '.header')).catch(err => err);
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
      const node = document.createElement("h1");
      node.innerText = 'Martins Kolgrill'
      this.element.shadowRoot.querySelector(element).appendChild(node)
    })
    const img = document.createElement('img');
    img.src = loadedImage.toString();
    if (config.Logo) {
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
