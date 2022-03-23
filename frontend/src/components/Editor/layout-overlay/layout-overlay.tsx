import { Component, h, Prop } from '@stencil/core';
import { PostData } from '../../utils/post';
import { config } from '../../utils/utils'

@Component({
  tag: 'layout-overlay',
  styleUrl: 'layout-overlay.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class LayoutOverlay {

  componentWillLoad() {

  }

  @Prop() isopen: boolean;
  @Prop() closeIcon = 'x.svg';

  open() {
    this.isopen = true;
  }

  close() {
    this.isopen = false;
  }

  onCatChange(event) {
    config.categoryImages.style = event.detail.value
    if (event.detail.value == 'Disabled') {
      config.categoryImages.useCategoryImages = false;
    }
    else {
      config.categoryImages.useCategoryImages = true;
    }
  }

  onProductChange(event) {
    console.log(event)
    config.productImages.style = event.detail.value
    if (event.detail.value == 'Disabled') {
      config.productImages.useProductImages = false;
    }
    else {
      config.productImages.useProductImages = true;
    }
  }

  async PostData() {
    await PostData('http://localhost:8080/config', config).then(() => location.reload())
  }

  render() {
    return (
      <div>
        <div>
          <label class={'button-9'} htmlFor='changekey'>Layout och placering<ion-icon class="icon" name="settings-sharp"></ion-icon></label>
          <button id='changekey' onClick={this.open.bind(this)} hidden></button>
        </div>
        <div class={this.isopen ? 'modal-wrapper is-open' : 'modal-wrapper'}>
          <div class="modal-overlay" onClick={this.close.bind(this)}></div>
          <div class="modal">
            <div class="header">
              <h6>Ändra layout och placering av text och bilder</h6>
              <button class='button-close' onClick={this.close.bind(this)}>
                <ion-icon name="close"></ion-icon>
              </button>
            </div>
            <div class="body">
              <ion-list>
                <ion-radio-group onIonChange={(event) => this.onProductChange(event)} value={config?.productImages?.style}>
                  <ion-list-header>
                    <h3>Produkter</h3>
                  </ion-list-header>
                  <ion-list-header>
                    <ion-label>Bildstil</ion-label>
                  </ion-list-header>
                  <ion-item>
                    <ion-label>Logo</ion-label>
                    <ion-radio slot="start" value='Logo'></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Bakgrund</ion-label>
                    <ion-radio slot="start" value='Background'></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Avstängd</ion-label>
                    <ion-radio slot="start" value='Disabled'></ion-radio>
                  </ion-item>
                </ion-radio-group>
                <ion-radio-group value={config?.productImages?.placement} onIonChange={(event) => [config.productImages.placement = event.detail.value]} >
                  <ion-list-header>
                    <ion-label>Bildplacering</ion-label>
                  </ion-list-header>
                  <ion-item>
                    <ion-label>Vänster</ion-label>
                    <ion-radio slot="start" value={'Left'} disabled={!config?.productImages?.useProductImages}></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Höger</ion-label>
                    <ion-radio slot="start" value={'Right'} disabled={!config?.productImages?.useProductImages}></ion-radio>
                  </ion-item>
                </ion-radio-group>
              </ion-list>
              <ion-list>
                <ion-radio-group value={config?.categoryImages?.style} onIonChange={(event) => this.onCatChange(event)}>
                  <ion-list-header>
                    <h3>Kategorier</h3>
                  </ion-list-header>
                  <ion-list-header>
                    <ion-label>Bildplacering</ion-label>
                  </ion-list-header>
                  <ion-item>
                    <ion-label>Bakgrund</ion-label>
                    <ion-radio slot="start" value='Background'></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Banner</ion-label>
                    <ion-radio slot="start" value='Banner'></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Avstängd</ion-label>
                    <ion-radio slot="start" value='Disabled'></ion-radio>
                  </ion-item>
                </ion-radio-group>
              </ion-list>
            </div>
            <div class="footer">
              <button class='button-save' onClick={this.PostData.bind(this)} type="submit">Spara</button>
            </div>
          </div>
        </div >
      </div>
    );
  }
}
