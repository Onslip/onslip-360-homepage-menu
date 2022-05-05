import { Component, h, Prop } from '@stencil/core';
import { copyFile } from 'fs';
import { PostData } from '../../../utils/post';
import { config, DBConnection } from '../../../utils/utils'

@Component({
  tag: 'layout-overlay',
  styleUrls: ['layout-overlay.css'],
  shadow: true,
  assetsDirs: ['assets'],
})
export class LayoutOverlay {


  async componentWillLoad() {
    if (config.productImages.style == 'Background') {
      if (config.categoryImages.style == 'Background') {
        config.categoryImages.style = 'Banner'
      }
    }
  }

  async close() {
    await customElements.whenDefined('ion-modal')
    const modal = document.querySelector('ion-modal')
    await modal.dismiss();
  }

  async PostData() {
    await PostData('http://localhost:8080/config', config).then(() => location.reload())
  }

  render() {
    return (
      <div class="modal">
        <div class="header">
          <ion-title class="title">Ändra layout och placering av text och bilder</ion-title>
        </div>
        <div class="body">
          <div class="content">
            <ion-list>
              <ion-title class="title">Produkter</ion-title>
              <ion-radio-group onIonChange={(event) => config.productImages.style = event.detail.value} value={config?.productImages?.style}>
                <ion-list-header>
                  <ion-label>Bildstil</ion-label>
                </ion-list-header>
                <ion-item>
                  <ion-label>Logo</ion-label>
                  <ion-radio slot="start" value='Logo' disabled={!DBConnection}></ion-radio>
                </ion-item>
                <ion-item>
                  <ion-label>Bakgrund</ion-label>
                  <ion-radio slot="start" value='Background' disabled={!DBConnection}></ion-radio>
                </ion-item>
                <ion-item>
                  <ion-label>Avstängd</ion-label>
                  <ion-radio slot="start" value='Disabled' disabled={!DBConnection}></ion-radio>
                </ion-item>
              </ion-radio-group>
              <ion-radio-group value={config?.productImages?.placement} onIonChange={(event) => [config.productImages.placement = event.detail.value]} >
                <ion-list-header>
                  <ion-label>Bildplacering</ion-label>
                </ion-list-header>
                <ion-item>
                  <ion-label>Vänster</ion-label>
                  <ion-radio slot="start" value={'Left'} disabled={config?.productImages?.style == 'Disabled' || !DBConnection}></ion-radio>
                </ion-item>
                <ion-item>
                  <ion-label>Höger</ion-label>
                  <ion-radio slot="start" value={'Right'} disabled={config?.productImages?.style == 'Disabled' || !DBConnection}></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-list>
            <ion-list>
              <ion-title class="title">Kategorier</ion-title>
              <ion-radio-group value={config?.categoryImages?.style} onIonChange={(event) => config.categoryImages.style = event.detail.value}>
                <ion-list-header>
                  <ion-label>Bildplacering</ion-label>
                </ion-list-header>
                <ion-item>
                  <ion-label>Bakgrund</ion-label>
                  <ion-radio slot="start" value='Background' disabled={!DBConnection || config.productImages.style == 'Background'}></ion-radio>
                </ion-item>
                <ion-item>
                  <ion-label>Banner</ion-label>
                  <ion-radio slot="start" value='Banner' disabled={!DBConnection}></ion-radio>
                </ion-item>
                <ion-item>
                  <ion-label>Avstängd</ion-label>
                  <ion-radio slot="start" value='Disabled' disabled={!DBConnection}></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-list>
            <ion-list>
              <ion-title class="title">Utseende</ion-title>
              <ion-radio-group value={config?.menuType} onIonChange={(event) => config.menuType = event.detail.value}>
                <ion-list-header>
                  <ion-label>Produkt-layout</ion-label>
                </ion-list-header>
                <ion-item>
                  <ion-label>Kort</ion-label>
                  <ion-radio slot="start" value='card' disabled={!DBConnection}></ion-radio>
                </ion-item>
                <ion-item>
                  <ion-label>Lista</ion-label>
                  <ion-radio slot="start" value='inline' disabled={!DBConnection}></ion-radio>
                </ion-item>
                <ion-item>
                  <ion-label>Pappersmeny</ion-label>
                  <ion-radio slot="start" value='paper' disabled={!DBConnection}></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-list>
          </div>
        </div>
        <div class="footer">
          <button class='button save' onClick={this.PostData.bind(this)} type="submit">Spara</button>
          <button class='button close' type="submit" value="Submit" onClick={() => { this.close() }}>Avbryt</button>

        </div>
      </div>
    );
  }
}
