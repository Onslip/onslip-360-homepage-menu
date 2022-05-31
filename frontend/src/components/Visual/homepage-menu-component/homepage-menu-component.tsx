import { Component, h, State, Host, getAssetPath, Element } from '@stencil/core';
import { config, DBConnection, location, locationsAndMenu, mainConfig, Menu, Timetable } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { loadImage } from '../../utils/image';
import '@ionic/core'
import { Prop } from '@ionic/core/dist/types/stencil-public-runtime';
import { PostData } from '../../utils/post';
import { paths } from '../../utils/urlPaths';

@Component({
  tag: 'homepage-menu-component',
  styleUrl: 'homepage-menu-component.css',
  shadow: true,
  assetsDirs: ['../../../assets'],
})
export class HomepageMenuComponent {

  @Element() element: HTMLElement;
  @State() loading: boolean = true;
  @State() logoImage: string = ''
  @Prop({ mutable: true }) menuId: number;
  @Prop() locationId: number;
  @State() locationsAndMenus: locationsAndMenu;
  @State() selectedMenu: Menu
  @State() selectedLocation: location;

  async componentWillLoad() {
    this.locationsAndMenus = await GetData(paths.location);
    if (this.menuId == undefined) {
      const date = new Date()
      const schedule: Timetable[] = await GetData(paths.timetable)
      this.menuId = schedule.find(s => s.locationId == mainConfig.selectedLocation.id)?.days
        .find(d => d.Day == date.getDay())?.Times
        .find(t => t.time == date.getHours())?.menuid
    }
    this.selectedMenu = this.locationsAndMenus.menu.find(x => x.id == this.menuId);
  }

  componentDidRender() {
    if (DBConnection) {
      if (!config?.background?.enabled) {
        console.log('test')
        GetData(paths.backgroundImage).then(response => this.LoadBackground(response)).catch(err => err);
      }
      if (config?.banner) {
        GetData(paths.banner).then(response => this.LoadBanner(response, '.header')).catch(err => err);
      }
      if (config?.Logo) {
        GetData(paths.logo).then(response => this.LoadLogo(response)).catch(err => err);
      }
    }
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
    if (!config?.background?.enabled) {
      const loadedImage = await loadImage(image.image.data).catch(err => err)
      document.querySelector('body').style.backgroundImage = `url(${loadedImage})`
    }
  }

  private async LoadLogo(image) {
    this.logoImage = await (await loadImage(image.image.data)).toString()
  }

  private async LoadBanner(image, element) {
    const loadedImage = await loadImage(image.image.data).catch(err => err);
    if (config?.banner) {
      this.element.shadowRoot.querySelector(element).style.backgroundImage = `url(${loadedImage})`;
    }
  }

  changeMenu(event: any) {
    this.menuId = event.target.value
    location.reload()
  }

  async selectLocation(selectedLocation: location) {
    mainConfig.selectedLocation = selectedLocation
    await PostData(paths.mainConfig, mainConfig)
      .then(() => location.reload())
  }

  render() {
    return (
      <Host>
        <div class='group'>
          <ion-accordion-group class='left'>
            <ion-accordion toggleIcon='chevron-down'>
              <ion-item lines='none' slot='header' class='accordion-header'>
                <ion-label>Plats: {mainConfig?.selectedLocation?.name}</ion-label>
              </ion-item>
              <ion-list slot='content'>
                {this.locationsAndMenus?.location?.map(x =>
                  <ion-router-link href={`/menu/`}>
                    <ion-item class='accordion-item' lines='none' onClick={() => this.selectLocation(x)}>{x.name}</ion-item>
                  </ion-router-link>
                )}
              </ion-list>
            </ion-accordion>
          </ion-accordion-group>
          <ion-accordion-group class='right'>
            <ion-accordion toggleIcon='chevron-down'>
              <ion-item slot='header' lines='none' class='accordion-header'>
                <ion-label>Meny: {this.selectedMenu?.name}</ion-label>
              </ion-item>
              <ion-list slot='content'>
                {this.locationsAndMenus?.menu?.map(x =>
                  <ion-router-link href={`/menu/${x.id}`}>
                    <ion-item lines='none' class='accordion-item'>
                      {x.name}
                    </ion-item>
                  </ion-router-link>
                )}
              </ion-list>
            </ion-accordion>
          </ion-accordion-group>
        </div>
        {
          config?.connect ?
            <div class='menuContainer'>

              <ion-item lines='none' class={config?.banner ? 'header' : 'header no-banner'}>
                <h2 class="header-text" hidden={config.Logo}>{mainConfig?.selectedLocation?.name}</h2>
                <img slot='end' src={this.logoImage} class="logo" hidden={!config.Logo}></img>
              </ion-item>
              <menu-component menuId={this.menuId}></menu-component>
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

