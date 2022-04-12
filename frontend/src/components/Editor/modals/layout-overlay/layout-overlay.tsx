import { Component, h, Prop } from '@stencil/core';
import { PostData } from '../../../utils/post';
import { config, DBConnection } from '../../../utils/utils'

@Component({
  tag: 'layout-overlay',
  styleUrl: 'layout-overlay.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class LayoutOverlay {

  @Prop() isopen: boolean;
  @Prop() closeIcon = 'x.svg';

  async componentWillLoad() {
    if (config.productImages.style == 'Background') {
      if (config.categoryImages.style == 'Background') {
        config.categoryImages.style = 'Banner'
      }
    }
  }

  open() {
    this.isopen = true;
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
              <h4>Ändra layout och placering av text och bilder</h4>
            </div>
            <div class="body">
              <ion-list>
                <ion-radio-group onIonChange={(event) => config.productImages.style = event.detail.value} value={config?.productImages?.style}>
                  <ion-list-header>
                    <h3>Produkter</h3>
                  </ion-list-header>
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
                <ion-radio-group value={config?.categoryImages?.style} onIonChange={(event) => config.categoryImages.style = event.detail.value}>
                  <ion-list-header>
                    <h3>Kategorier</h3>
                  </ion-list-header>
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
            </div>
            <div class="footer">
              <button class='button-save' onClick={this.PostData.bind(this)} type="submit">Spara</button>
              <button class='button-close' type="submit" value="Submit" onClick={() => { this.close() }}>Avbryt</button>

            </div>
          </div>
    );
  }
}
