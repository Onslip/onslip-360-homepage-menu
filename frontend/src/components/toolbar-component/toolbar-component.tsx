import { Component, Host, h, State, getAssetPath, Event, EventEmitter, Element } from '@stencil/core';
import { Colorconfig } from '../../utils/utils';
import { PostData } from '../../utils/post';

@Component({
  tag: 'toolbar-component',
  styleUrl: 'toolbar-component.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class ToolbarComponent {

  @State() menuopen: boolean = false
  @Event() onUploadCompleted: EventEmitter<Blob>;
  @State() color: string;
  @State() file;
  @State() tempfile: string;
  @State() checkImage: boolean;
  @State() private url1: string = 'http://localhost:8080/background'
  @State() private url2: string = 'http://localhost:8080/banner';
  @State() private url3: string = 'http://localhost:8080/logo';
  @Element() element: HTMLElement;
  @State() value: buttonvalues = { '1': 'Ändra bakgrund', '2': 'Ändra banner', '3': 'Ändra logga' }

  changeColor() {
    this.checkImage = false;
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = this.color;
    this.submitForm();
  }

  async submitForm() {
    let data: Colorconfig;

    data = { backgroundcolor: this.color }

    await PostData('http://localhost:8080/backgroundcolor', data);
  }

  render() {
    return (
      <Host>
        <ion-nav>
          <ion-header>
            <ion-toolbar class="toolbar">
              <ion-title slot="end"> Digital Dynamic Menu </ion-title>
              <img slot='primary' class="logo" src={getAssetPath('./assets/onslip-brand-full.png')}></img>
              <ion-buttons slot="start">
                <ion-button onClick={() => { this.menuopen = !this.menuopen; console.log(this.menuopen) }}>
                  <ion-icon name={this.menuopen ? "close-sharp" : "menu-sharp"}></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
            <div class={this.menuopen ? "menu_box" : "menu_box_closed"}>
              <ion-col>
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
                  <input id='color' type='color' onChange={(event: any) => { this.color = event.target.value; this.changeColor() }} hidden />
                </ion-row>
                <ion-row>
                  <api-ui></api-ui>
                </ion-row>
              </ion-col>
            </div>
        </ion-nav>
      </Host>
    );
  }

}

export interface buttonvalues {
  1: string;
  2: string;
  3: string;
}
