import { Component, h, State, getAssetPath, Element } from '@stencil/core';
import { Fonts, config, DBConnection } from '../../utils/utils';
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
  @State() locations;
  @State() menus;

  async componentWillLoad() {
    this.locations = await GetData('http://localhost:8080/setlocation');
    this.menus = await GetData('http://localhost:8080/listmenus');

    console.log(this.locations)
  }

  async menuClick(event: MouseEvent) {
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
    console.log(config)
    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.background = config?.menuBackground;
    PostData('http://localhost:8080/config', config);
  }

  async submitForm() {
    await PostData('http://localhost:8080/config', config);
    location.reload();
  }

  render() {
    return (
      <ion-header>
        <ion-toolbar class="toolbar">
          <ion-buttons slot="start">
            <ion-button onClick={(event: MouseEvent) => { this.menuClick(event) }}>
              <ion-icon name={this.menuopen ? "close-sharp" : "menu-sharp"}></ion-icon>
              <ion-label>MENY</ion-label>
            </ion-button>
            {config ? [
              <selector-component value={config?.font?.fontFamily} DropDownvalues={Fonts} IconName='text-sharp' element='.menuContainer' type='font'></selector-component>,
              <selector-component value={config?.configId?.toString()} DropDownvalues={['1', '2', '3']} DisplayName="Config" IconName='brush-sharp' element='.menuContainer' type='preset'></selector-component>,
              <selector-component value={this.locations.selectedLocation} DropDownvalues={this.locations.locations} IconName='location-sharp' element='.menuContainer' type='location'></selector-component>,
              // <selector-component value={this.menus.selectedMenu.name} DropDownvalues={this.menus.menuList} IconName='location-sharp' element='.menuContainer' type='menu'></selector-component>

            ] : null}
          </ion-buttons>
          <img class="logo" slot="primary" src={getAssetPath('../../../assets/onslip-brand-full.png')}></img>
          <ion-title slot="end">Digital Dynamic Menu</ion-title>
        </ion-toolbar>
        <div class={this.menuopen ? "menu_box" : "menu_box closed"}>
          <ion-row>
            <ion-col class="menu-col">
              {DBConnection ? [<ion-row>
                <modal-ovelay url={this.url1} ImagePosition='Background' RenderType='image' buttonValue='Ändra bakgrund' buttonClass='menu-button' MaxWidth={500} AspectRatio={1.77}></modal-ovelay>
              </ion-row>,
              <ion-row>
                <modal-ovelay url={this.url2} ImagePosition='Banner' RenderType='image' buttonValue='Ändra banner' buttonClass='menu-button' MaxWidth={500} AspectRatio={2}></modal-ovelay>
              </ion-row>,
              <ion-row>
                <modal-ovelay url={this.url3} ImagePosition='Logo' RenderType='image' buttonValue='Ändra logo' buttonClass='menu-button' MaxWidth={500} AspectRatio={1}></modal-ovelay>
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
                <label htmlFor='fontColor' class='menu-button'>Ändra textfärg <ion-icon class="icon" name="color-palette-sharp"></ion-icon></label>
                <input id='fontColor' type='color' onChange={(event: any) => { config.font.fontColor = event.target.value; this.ChangeFontColor() }} hidden />
              </ion-row>
              <ion-row>
                <label htmlFor='fontTitleColor' class='menu-button'>Ändra titelns textfärg <ion-icon class="icon" name="color-palette-sharp"></ion-icon></label>
                <input id='fontTitleColor' type='color' onChange={(event: any) => { config.font.fontTitleColor = event.target.value; this.ChangeFontTitleColor() }} hidden />
              </ion-row>
              <ion-row>
                <modal-ovelay RenderType='Api' buttonValue='Ändra API-nyckel' buttonClass='menu-button'></modal-ovelay>
              </ion-row>
              <ion-row>
                <modal-ovelay RenderType='layout-overlay' buttonValue='Layout och placering' buttonClass='menu-button'></modal-ovelay>
              </ion-row>
            </ion-col>
            {DBConnection ? [
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
    );
  }

}


