import { Component, h, State, getAssetPath, Element } from '@stencil/core';
import { config, DBConnection, mainConfig } from '../../utils/utils';
import { PostData, PostImage } from '../../utils/post';
import { paths } from '../../utils/urlPaths';

@Component({
  tag: 'toolbar-component',
  styleUrl: 'toolbar-component.css',
  assetsDirs: ['../../../assets'],
  shadow: true,
})

export class ToolbarComponent {
  @State() menuopen: boolean = false
  @Element() element: HTMLElement;
  @State() locationsLoaded: boolean = false

  async menuClick() {
    this.menuopen = !this.menuopen
  }

  async useLogoPic(event) {
    config.Logo = event.detail.checked;
    await this.submitForm();
  }

  async useBanner(event) {
    config.banner = event.detail.checked;
    await this.submitForm();
  }

  async submitForm() {
    await PostData(paths.config, config);
    location.reload();
  }

  async selectLocation(event) {
    mainConfig.selectedLocation = event
    await PostData(paths.mainConfig, mainConfig)
      .then(() => location.reload())
  }

  async changeLogo(files) {
    const reader = new FileReader();
    let fd = new FormData()
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        fd.append('logo', files[0])
        const mainelement = document.querySelector('app-root').querySelector('homepage-menu-editor-component');
        mainelement.shadowRoot.querySelector('.header').querySelector('img').src = reader.result.toString();
        PostImage(paths.logo, fd);
      }
    };
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar class="toolbar">
          <ion-buttons slot="start">
            <ion-button id='menuButton' onClick={() => { this.menuClick() }}>
              <ion-icon name={this.menuopen ? "close-sharp" : "menu-sharp"}></ion-icon>
              <ion-label>MENY</ion-label>
            </ion-button>
            <selector-component value={config?.configId?.toString()} DropDownvalues={['1', '2', '3']} DisplayName="Config" IconName='brush-sharp' element='.menuContainer' type='preset'></selector-component>
          </ion-buttons>
          <img class="logo" slot="primary" src={getAssetPath('../../../assets/onslip-brand-full.png')}></img>
          <ion-title slot="end" class='ddmText'>Digital Dynamic Menu</ion-title>
        </ion-toolbar>

        <div class={this.menuopen ? "menu_box" : "menu_box closed"}>
          <ion-row>
            <ion-col class="menu-col">
              {DBConnection?.DatabaseConnected ? [
                <ion-row>
                  <modal-ovelay url={paths.backgroundImage} ImagePosition='Background' RenderType='image' buttonValue='Ändra bakgrund' buttonClass='menu-button' MaxWidth={1000} AspectRatio={1.77} format="image/jpg" iconName='image-sharp'></modal-ovelay>
                </ion-row>,
                <ion-row>
                  <modal-ovelay url={paths.banner} ImagePosition='Banner' RenderType='image' buttonValue='Ändra banner' buttonClass='menu-button' MaxWidth={500} AspectRatio={2} format="image/jpeg" iconName='image-sharp'></modal-ovelay>
                </ion-row>,
                <label class='menu-button'>Byt logo <ion-icon class='icon' name='image-sharp'></ion-icon>
                  <input type='file' onChange={(event: any) => this.changeLogo(event.target.files)} hidden></input>
                </label>,
              ]
                : null}
              <ion-row>
                <modal-ovelay RenderType='schedule-overlay' buttonValue='Tidsschema' buttonClass='menu-button' iconName='calendar-sharp'></modal-ovelay>
              </ion-row>
              <ion-row>
                <modal-ovelay RenderType='font-modal' buttonValue='Typsnitt och Färger' buttonClass='menu-button' iconName='color-palette-sharp'></modal-ovelay>
              </ion-row>
              <ion-row>
                <modal-ovelay RenderType='layout-overlay' buttonValue='Layout och placering' buttonClass='menu-button' iconName='settings-sharp'></modal-ovelay>
              </ion-row>
              <ion-row>
                <modal-ovelay RenderType='api-ui' buttonValue='Ändra API-nyckel' buttonClass='menu-button' iconName='settings-sharp'></modal-ovelay>
              </ion-row>
            </ion-col>
            {DBConnection?.DatabaseConnected ? [
              <ion-col class="menu-col">
                <ion-row>
                  <ion-item class="toggle">
                    <ion-label>Använd Logo:</ion-label>
                    <ion-toggle checked={config?.Logo ?? false} onIonChange={(ev) => { this.useLogoPic(ev) }} slot='end'></ion-toggle>
                  </ion-item>
                </ion-row>
                <ion-row>
                  <ion-item class="toggle">
                    <ion-label>Använd Banner:</ion-label>
                    <ion-toggle checked={config?.banner ?? false} onIonChange={(ev) => { this.useBanner(ev) }} slot='end'></ion-toggle>
                  </ion-item>
                </ion-row>
              </ion-col>] : null}
          </ion-row>
        </div >
      </ion-header>
    ];
  }
}
