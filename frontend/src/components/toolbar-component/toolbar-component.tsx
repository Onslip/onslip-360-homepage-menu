import { Component, h } from '@stencil/core';

@Component({
  tag: 'toolbar-component',
  styleUrl: 'toolbar-component.css',
  shadow: true,
})
export class ToolbarComponent {


  render() {
    return (
      <ion-app>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot='start'>
              <ion-menu-button auto-Hide="false"></ion-menu-button>
            </ion-buttons>
            <ion-title slot="end">Onslip dynamic menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-menu side="start" menuId="first" contentId="main-content">
          <ion-header>
            <ion-toolbar>
              <ion-title>Menu</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content id="main-content">
            <ion-list>
              <ion-item>Menu Item</ion-item>
              <ion-item>Menu Item</ion-item>
            </ion-list>
          </ion-content>
        </ion-menu>
      </ion-app>
    );
  }

}
