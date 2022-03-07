import { Component, Host, h, State, getAssetPath, Element } from '@stencil/core';
import { buttonvalues, Fonts, Presets, config } from '../../utils/utils';
import { PostData } from '../../utils/post';

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

  async useProductImages(event) {
    config.useProductImages = event.detail.checked
    await this.submitForm()
    // location.reload()
  }

  async useLogoPic(event) {
    config.Logo = event.detail.checked;
    await this.submitForm();
    // location.reload();
  }

  async useBanner(event) {
    config.banner = event.detail.checked;
    await this.submitForm();
    // location.reload();
  }

  async changeColor() {
    config.background.enabled = true
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = config?.background.color;
    PostData('http://localhost:8080/config', config);
  }

  async ChangeFontColor(element) {
    // const a = document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector('menu-editor-component').shadowRoot.querySelector(element);
    // a.style = { color: config.font.fontColor };
    this.submitForm();
  }

  async ChangeFontTitleColor(element) {
    this.submitForm();
  }

  async ChangeMenuColor(element) {
    console.log(config)
    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.background = config?.menuBackground;
    PostData('http://localhost:8080/config', config);
  }

  async submitForm() {
    PostData('http://localhost:8080/config', config);
    location.reload();
  }

  render() {
    return (
      <Host>
        <ion-nav>
          <ion-header>
            <ion-toolbar class="toolbar">
              <ion-buttons slot="start">
                <ion-button onClick={() => { this.menuopen = !this.menuopen }}>
                  <ion-icon name={this.menuopen ? "close-sharp" : "menu-sharp"}></ion-icon>
                  <ion-label>MENY</ion-label>
                </ion-button>
                {config ? [
                  <selector-component value={config?.font.fontFamily} DropDownvalues={Fonts} IconName='text-sharp' element='.menuContainer' type='font'></selector-component>,
                  <selector-component value={config?.preset} DropDownvalues={Presets} IconName='brush-sharp' element='.menuContainer' type='preset'></selector-component>
                ] : null}
              </ion-buttons>
              <img class="logo" slot="primary" src={getAssetPath('../../../assets/onslip-brand-full.png')}></img>
              <ion-title slot="end">Digital Dynamic Menu</ion-title>
            </ion-toolbar>
          </ion-header>
        </ion-nav>
        <div class={this.menuopen ? "menu_box" : "menu_box_closed"}>
          <ion-row>
            <ion-col class="menu-col">
              <ion-row>
                <upload-image-button buttonvalue={buttonvalues.logo} URL={this.url3}></upload-image-button>
              </ion-row>
              <ion-row>
                <upload-image-button buttonvalue={buttonvalues.banner} URL={this.url2}></upload-image-button>
              </ion-row>
              <ion-row>
                <upload-image-button buttonvalue={buttonvalues.background} URL={this.url1}></upload-image-button>
              </ion-row>
              <ion-row>
                <label htmlFor='color' class='button-9'>Ändra bakgrundsfärg <ion-icon class="icon" name="color-palette-sharp"></ion-icon></label>
                <input id='color' type='color' onChange={(event: any) => { config.background.color = event.target.value; this.changeColor() }} hidden />
              </ion-row>
              <ion-row>
                <label htmlFor='menucolor' class='button-9'>Ändra menyns färg <ion-icon class="icon" name="color-palette-sharp"></ion-icon></label>
                <input id='menucolor' type='color' onChange={(event: any) => { config.menuBackground = event.target.value; this.ChangeMenuColor(`.menuContainer`) }} hidden />
              </ion-row>
              <ion-row>
                <label htmlFor='fontColor' class='button-9'>Ändra textfärg <ion-icon class="icon" name="color-palette-sharp"></ion-icon></label>
                <input id='fontColor' type='color' onChange={(event: any) => { config.font.fontColor = event.target.value; this.ChangeFontColor(`.card`) }} hidden />
              </ion-row>
              <ion-row>
                <label htmlFor='fontTitleColor' class='button-9'>Ändra titelns textfärg <ion-icon class="icon" name="color-palette-sharp"></ion-icon></label>
                <input id='fontTitleColor' type='color' onChange={(event: any) => { config.font.fontTitleColor = event.target.value; this.ChangeFontTitleColor(`.card`) }} hidden />
              </ion-row>
              <ion-row>
                <api-ui></api-ui>
              </ion-row>
            </ion-col>
            <ion-col class="menu-row">
              <ion-row>
                <ion-item class="toggle">
                  <ion-label>Använd Produktbilder:</ion-label>
                  <ion-toggle checked={config?.useProductImages ?? false} onIonChange={(ev) => { this.useProductImages(ev) }} slot='end'></ion-toggle>
                </ion-item>
              </ion-row>
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
            </ion-col>
          </ion-row>
        </div >
      </Host >
    );
  }

}
