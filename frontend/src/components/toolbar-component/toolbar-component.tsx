import { Component, Host, h, State, getAssetPath } from '@stencil/core';

@Component({
  tag: 'toolbar-component',
  styleUrl: 'toolbar-component.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class ToolbarComponent {

  @State() menuopen: boolean = false

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
          <div>
            <div class={this.menuopen ? "menu_box" : "menu_box_closed"}>
              <image-uploader></image-uploader>
            </div>
          </div>
        </ion-nav>

      </Host>
    );
  }

}
