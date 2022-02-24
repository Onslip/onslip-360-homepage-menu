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
  @State() private value: buttonvalues
  private url1: string = 'http://localhost:8080/background'
  private url2: string = 'http://localhost:8080/banner';
  private url3: string = 'http://localhost:8080/logo';
  private config: Styleconfig

  async componentWillLoad() {
    await this.getConfig()
  }

  @Method() async getConfig() {
    this.config = await GetData('http://localhost:8080/backgroundcolor')
  }

  changeColor() {
    this.config.background.enabled = true
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = this.config.background.color;
    this.submitForm();
  }

  async submitForm() {
    await PostData('http://localhost:8080/backgroundcolor', this.config);
    location.reload()
  }

  render() {
    return (
      <Host>
        <ion-nav>
          <ion-header>
            <ion-toolbar class="toolbar">
              <ion-title slot="end"> Digital Dynamic Menu </ion-title>
              <img slot='primary' class="logo" src={getAssetPath('../../../assets/onslip-brand-full.png')}></img>
              <ion-buttons slot="start">
                <ion-button onClick={() => { this.menuopen = !this.menuopen }}>
                  <ion-icon name={this.menuopen ? "close-sharp" : "menu-sharp"}></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
        </ion-nav>
        <div class={this.menuopen ? "menu_box" : "menu_box_closed"}>
          <ion-row>
            <ion-col class="menu-col">
              <ion-row>
                <upload-image-button buttonvalue={this.value[3]} URL={this.url3}></upload-image-button>
              </ion-row>
              <ion-row>
                <upload-image-button buttonvalue={this.value[2]} URL={this.url2}></upload-image-button>
              </ion-row>
              <ion-row>
                <upload-image-button buttonvalue={this.value[1]} URL={this.url1}></upload-image-button>
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
                  <ion-toggle checked={this.config.useProductImages} onIonChange={(ev) => {this.config.useProductImages = ev.detail.checked; this.submitForm()}}></ion-toggle>
                </ion-item>
              </ion-row>
            </ion-col>
          </ion-row>
        </div>
      </Host>
    );
  }

}
