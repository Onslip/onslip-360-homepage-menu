import { Component, Host, h, State, getAssetPath, Method } from '@stencil/core';
import { Styleconfig, buttonvalues } from '../../utils/utils';
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
  private config: Styleconfig

  async componentWillLoad() {
    await GetData('http://localhost:8080/backgroundcolor')
      .then(response => this.config = response)
      .catch(err => console.log(`${err} Kunde inte hämta data`))
  }

  async useProductImages(event) {
    this.config = await GetData('http://localhost:8080/backgroundcolor')
    this.config.useProductImages = event.detail.checked
    await this.submitForm()
    location.reload()
  }

  async changeColor() {
    this.config.background.enabled = true
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = this.config.background.color;
    this.submitForm();
  }

  async submitForm() {
    await PostData('http://localhost:8080/backgroundcolor', this.config);
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
                <font-selector></font-selector>
              </ion-buttons>
              <img class="logo" slot="primary" src={getAssetPath('../../../assets/onslip-brand-full.png')}></img>
              <ion-title slot="end"> Digital Dynamic Menu </ion-title>
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
                <label id='asfd' htmlFor='color' class='button-9'>Ändra bakgrundsfärg <ion-icon class="icon" name="color-palette-sharp"></ion-icon></label>
                <input id='color' type='color' onChange={(event: any) => { this.config.background.color = event.target.value; this.changeColor() }} hidden />
              </ion-row>
              <ion-row>
                <api-ui></api-ui>
              </ion-row>
            </ion-col>
            <ion-col class="menu-row">
              <ion-row>
                <ion-item class="toggle">
                  <ion-label>Använd Produktbilder:</ion-label>
<<<<<<< HEAD
    <ion-toggle checked={this.config.useProductImages} onIonChange={(ev) => { this.useProductImages(ev) }}></ion-toggle>
=======
                  <ion-toggle checked={this.config?.useProductImages ?? false} onIonChange={(ev) => { this.useProductImages(ev) }}></ion-toggle>
>>>>>>> 3d79c1b6f166f52accf1b7915fd10f928d20690a
                </ion - item >
              </ion - row >
            </ion - col >
          </ion - row >
        </div >
      </Host >
    );
  }

}
