import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
import { config, DBConnection, location, locationsAndMenu, mainConfig } from '../../utils/utils';
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

  private imageurl: string = '/background';
  private bannerUrl: string = '/banner';
  private logoUrl: string = '/logo';
  @Element() element: HTMLElement;
  @State() loading: boolean = true;
  @State() toggle: boolean = true;
  @State() logoImage: string = ''
  @Prop() menuId: number;
  @State() locationsAndMenus: locationsAndMenu;
  @State() selectedLocation: location;

  async componentWillLoad() {
    if (DBConnection) {
      if (!config?.background?.enabled) {
        GetData(this.imageurl).then(response => this.LoadBackground(response)).catch(err => err);
      }
      if (config?.banner) {
        GetData(this.bannerUrl).then(response => this.LoadBanner(response, '.header')).catch(err => err);
      }
      if (config?.Logo) {
        GetData(this.logoUrl).then(response => this.LoadLogo(response)).catch(err => err);
      }
    }
    this.locationsAndMenus = await GetData('/locations');
  }

  private async LoadConfig() {
    document.documentElement.style.setProperty('--font', config?.font?.fontFamily)
    if (config?.font?.fontWeight) {
      document.documentElement.style.setProperty('--fontWeight', 'bold')
    }
    if (config?.font?.fontStyle) {
      document.documentElement.style.setProperty('--fontStyle', 'italic')
    }
    if (config?.font?.fontSize != undefined) {
      document.documentElement.style.setProperty('--fontSize', config?.font?.fontSize[1])
    }

    config.font.customFonts.forEach(font => {
      var link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', font.fontUrl)
      document.head.appendChild(link);
    })
  }

  async componentDidLoad() {
    this.LoadConfig();
  }

  private async LoadBackground(image) {
    if (!config.background.enabled) {
      const loadedImage = await loadImage(image.image.data).catch(err => err)
      document.querySelector('body').style.backgroundImage = `url(${loadedImage})`
    }
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

  private customPopoverOptions: any = {
    reference: "event",
  };

  changeLocation(event: any) {
    mainConfig.selectedLocation = event.target.value
  }
  changeMenu(event: any) {
    this.menuId = event.target.value
  }

  render() {
    return (
      <Host>
        <toolbar-component></toolbar-component>
        {
          config?.connect ?
            <div class='menuContainer'>
              <ion-accordion-group>
                <ion-accordion toggleIcon='chevron-down'>
                  <ion-item lines='none' slot='header' class='accordion-header'>
                    <ion-label>Platser</ion-label>
                  </ion-item>
                  <ion-list slot='content'>
                    {this.locationsAndMenus?.location?.map(x => <ion-item class='accordion-item' lines='none'>{x.name}</ion-item>)}
                  </ion-list>
                </ion-accordion>
                <ion-accordion toggleIcon='chevron-down'>
                  <ion-item slot='header' lines='none' class='accordion-header'>
                    <ion-label>Menyer</ion-label>
                  </ion-item>
                  <ion-list slot='content'>
                    {this.locationsAndMenus?.menu?.map(x =>
                      <ion-item lines='none' class='accordion-item'>
                        <ion-router-link href={`/menu/editor/${x.id}`}>{x.name}</ion-router-link>
                      </ion-item>
                    )}
                  </ion-list>
                </ion-accordion>
              </ion-accordion-group>
              <ion-item lines='none' class={config?.banner ? 'header' : 'header no-banner'}>
                <ion-button slot='start' onClick={() => this.change()} class='toggle'>Toggle</ion-button>
                <h2 class="header-text" hidden={config.Logo}>{mainConfig?.selectedLocation?.name}</h2>
                <img slot='end' src={this.logoImage} class="logo" hidden={!config.Logo}></img>
              </ion-item>
              <menu-editor-component toggle={this.toggle} menuId={this.menuId}></menu-editor-component>
              {/* <test-menu toggle={this.toggle}></test-menu> */}
            </div> :
            null
        }
        <div class='logoDiv'>
          <img src={getAssetPath(`../../../assets/Onslip.png`)} class='onslipLogo'></img>
        </div>
      </Host >
    )
  }
}

