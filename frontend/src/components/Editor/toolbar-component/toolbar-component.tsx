import { Component, h, State, getAssetPath, Element } from '@stencil/core';
import { config, DBConnection, locationsAndMenu, mainConfig } from '../../utils/utils';
import { PostData, PostImage } from '../../utils/post';
import { GetData } from '../../utils/get';

@Component({
  tag: 'toolbar-component',
  styleUrl: 'toolbar-component.css',
  assetsDirs: ['../../../assets'],
  shadow: true,
})

export class ToolbarComponent {
  @State() menuopen: boolean = false
  private url1: string = '/background'
  private url2: string = '/banner';
  private url3: string = '/logo';
  @Element() element: HTMLElement;
  private locations: locationsAndMenu;
  @State() locationsLoaded: boolean = false

  async componentWillLoad() {
    await GetData('/locations')
      .then(res => this.locations = res)
      .then(() => this.locationsLoaded = true)
      .catch(err => console.log(err));
  }

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
    await PostData('/config', config);
    location.reload();
  }

  async selectLocation(event) {
    mainConfig.selectedLocation = event
    await PostData('/mainconfig', mainConfig)
      .then(() => location.reload())
  }

  private customPopoverOptions: any = {
    reference: "event",
  };

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
        PostImage(this.url3, fd);
      }
    };
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar class="toolbar">
          <ion-buttons slot="start">
            <ion-button onClick={() => { this.menuClick() }}>
              <ion-icon name={this.menuopen ? "close-sharp" : "menu-sharp"}></ion-icon>
              <ion-label>MENY</ion-label>
            </ion-button>
            <selector-component value={config?.configId?.toString()} DropDownvalues={['1', '2', '3']} DisplayName="Config" IconName='brush-sharp' element='.menuContainer' type='preset'></selector-component>
            {/* {
              this.locationsLoaded ?
                <div>
                  <ion-item class="select">
                    <ion-select hidden={mainConfig == undefined} onIonChange={(event: any) => { this.selectLocation(event.target.value) }} interface='popover' interfaceOptions={this.customPopoverOptions} placeholder='Välj' value={mainConfig?.selectedLocation} selectedText={mainConfig?.selectedLocation?.name}>
                      {this.locations?.location?.map(x => <ion-select-option value={x}>{x.name}</ion-select-option>)}
                    </ion-select>
                  </ion-item>
                </div> : null
            } */}
          </ion-buttons>
          <img class="logo" slot="primary" src={getAssetPath('../../../assets/onslip-brand-full.png')}></img>
          <ion-title slot="end" class='ddmText'>Digital Dynamic Menu</ion-title>
        </ion-toolbar>

        <div class={this.menuopen ? "menu_box" : "menu_box closed"}>
          <ion-row>
            <ion-col class="menu-col">
              {DBConnection?.DatabaseConnected ? [
                <ion-row>
                  <modal-ovelay url={this.url1} ImagePosition='Background' RenderType='image' buttonValue='Ändra bakgrund' buttonClass='menu-button' MaxWidth={1000} AspectRatio={1.77} format="image/jpg" iconName='image-sharp'></modal-ovelay>
                </ion-row>,
                <ion-row>
                  <modal-ovelay url={this.url2} ImagePosition='Banner' RenderType='image' buttonValue='Ändra banner' buttonClass='menu-button' MaxWidth={500} AspectRatio={2} format="image/jpeg" iconName='image-sharp'></modal-ovelay>
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
