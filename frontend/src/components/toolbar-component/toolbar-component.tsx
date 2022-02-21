import { Component, Host, h, State } from '@stencil/core';
import { hostname } from 'os';

@Component({
  tag: 'toolbar-component',
  styleUrl: 'toolbar-component.css',
  shadow: true,
})
export class ToolbarComponent {

  @State() menuopen: boolean = false

  render() {
    return (
      <Host>
        <ion-nav>
          <ion-header color="primary">
            <ion-toolbar>
              <ion-title slot="end"> The Title </ion-title>
              <ion-buttons slot="start">
                <ion-button onClick={() => { this.menuopen = !this.menuopen; console.log(this.menuopen) }}>
                  <ion-icon name={this.menuopen ? "arrow-back" : "menu"}></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
        </ion-nav>
        <div class={this.menuopen ? "menu_box" : "menu_box_closed"}>
          <image-uploader></image-uploader>
        </div>
      </Host>
    );
  }

}
