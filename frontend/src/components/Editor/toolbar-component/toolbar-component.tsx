import { Component, h, State, getAssetPath, Element } from '@stencil/core';
import { config, DBConnection, location, mainConfig } from '../../utils/utils';
import { PostData } from '../../utils/post';
import { GetData } from '../../utils/get';

@Component({
  tag: 'toolbar-component',
  styleUrl: 'toolbar-component.css',
  assetsDirs: ['../../../assets'],
  shadow: true,
})

export class ToolbarComponent {
  @State() menuopen: boolean = false
  private url1: string = 'http://localhost:8080/background'
  private url2: string = 'http://localhost:8080/banner';
  private url3: string = 'http://localhost:8080/logo';
  @Element() element: HTMLElement;
  @State() locations: location[];

  async componentWillLoad() {
    await GetData('http://localhost:8080/locations').then(res => this.locations = res);
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

  async changeColor() {
    config.background.enabled = true
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = config?.background.color;
    PostData('http://localhost:8080/config', config);
  }

  async ChangeFontColor() {
    this.submitForm();
  }

  async ChangeFontTitleColor() {
    this.submitForm();
  }

  async ChangeMenuColor(element) {
    document.querySelector('editor-visual-check').querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.background = config?.menuBackground;
    PostData('http://localhost:8080/config', config);
  }

  async submitForm() {
    await PostData('http://localhost:8080/config', config);
    location.reload();
  }

  async selectLocation(event) {
    mainConfig.selectedLocation = event
    await PostData('http://localhost:8080/mainconfig', mainConfig)
      .then(() => location.reload())
  }

  private customPopoverOptions: any = {
    reference: "event",
  };

  render() {
    return [
      <ion-header>
        <ion-toolbar class="toolbar">
          <ion-buttons slot="start">
            <ion-button onClick={() => { this.menuClick() }}>
              <ion-icon name={this.menuopen ? "close-sharp" : "menu-sharp"}></ion-icon>
              <ion-label>MENY</ion-label>
            </ion-button>
            {config ? [
              // <selector-component value={config?.font?.fontFamily} DropDownvalues={Fonts} IconName='text-sharp' element='.menuContainer' type='font'></selector-component>,
              <selector-component value={config?.configId?.toString()} DropDownvalues={['1', '2', '3']} DisplayName="Config" IconName='brush-sharp' element='.menuContainer' type='preset'></selector-component>,
              // <selector-component value={this.locations?.selectedLocation?.name} DropDownvalues={this.locations?.locations} IconName='location-sharp' element='.menuContainer' type='location'></selector-component>,
              <ion-item class="select">
                <ion-select onIonChange={(event: any) => { this.selectLocation(event.target.value) }} interface='popover' interfaceOptions={this.customPopoverOptions} placeholder='Välj' value={mainConfig.selectedLocation} selectedText={mainConfig.selectedLocation.name}>
                  {this.locations?.map(x => <ion-select-option value={x}>{x?.name}</ion-select-option>)}
                </ion-select>
              </ion-item>,
            ] : null}
          </ion-buttons>
          <img class="logo" slot="primary" src={getAssetPath('../../../assets/onslip-brand-full.png')}></img>
          <ion-title slot="end">Digital Dynamic Menu</ion-title>
        </ion-toolbar>

        <div class={this.menuopen ? "menu_box" : "menu_box closed"}>
          <ion-row>
            <ion-col class="menu-col">
              {DBConnection?.DatabaseConnected ? [<ion-row>
                <modal-ovelay url={this.url1} ImagePosition='Background' RenderType='image' buttonValue='Ändra bakgrund' buttonClass='menu-button' MaxWidth={1000} AspectRatio={1.77} format="image/jpg"></modal-ovelay>
              </ion-row>,
              <ion-row>
                <modal-ovelay url={this.url2} ImagePosition='Banner' RenderType='image' buttonValue='Ändra banner' buttonClass='menu-button' MaxWidth={500} AspectRatio={2} format="image/jpeg"></modal-ovelay>
              </ion-row>,
              <ion-row>
                <modal-ovelay url={this.url3} ImagePosition='Logo' RenderType='image' buttonValue='Ändra logo' buttonClass='menu-button' MaxWidth={300} AspectRatio={1.5} format="image/png"></modal-ovelay>
              </ion-row>] : null}
              <ion-row>
                <label htmlFor='color' class='menu-button'>Ändra bakgrundsfärg <ion-icon class="icon" name="color-palette-sharp"></ion-icon></label>
                <input id='color' type='color' onChange={(event: any) => { config.background.color = event.target.value; this.changeColor() }} hidden />
              </ion-row>
              <ion-row>
                <label htmlFor='menucolor' class='menu-button'>Ändra menyns färg <ion-icon class="icon" name="color-palette-sharp"></ion-icon></label>
                <input id='menucolor' type='color' onChange={(event: any) => { config.menuBackground = event.target.value; this.ChangeMenuColor(`.menuContainer`) }} hidden />
              </ion-row>
              <ion-row>
                <modal-ovelay RenderType='api-ui' buttonValue='Ändra API-nyckel' buttonClass='menu-button'></modal-ovelay>
              </ion-row>
              <ion-row>
                <modal-ovelay RenderType='layout-overlay' buttonValue='Layout och placering' buttonClass='menu-button'></modal-ovelay>
              </ion-row>
              <ion-row>
                <modal-ovelay RenderType='schedule-overlay' buttonValue='Tidsschema' buttonClass='menu-button'></modal-ovelay>
              </ion-row>
              <ion-row>
                <modal-ovelay RenderType='font-modal' buttonValue='Fonts' buttonClass='menu-button'></modal-ovelay>
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
