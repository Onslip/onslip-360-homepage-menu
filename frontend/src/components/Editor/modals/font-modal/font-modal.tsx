import { IonicSafeString } from '@ionic/core';
import { Component, h, Element, State } from '@stencil/core';
import { PostData } from '../../../utils/post';
import { config, Fonts } from '../../../utils/utils';

@Component({
  tag: 'font-modal',
  styleUrl: 'font-modal.css',
  shadow: true,
})
export class FontModal {
  @Element() element: HTMLElement;
  @State() buttonPressed: boolean = false;
  @State() butpress: boolean = false;
  @State() buttonpress: boolean = false;
  @State() RenderButton: boolean;
  @State() FontSize: string;

  async close() {
    await customElements.whenDefined('ion-modal')
    const modal = document.querySelector('ion-modal')
    await modal.dismiss();
  }

  async PostData() {
    await PostData('http://localhost:8080/config', config).then(() => location.reload())
  }

  private customPopoverOptions: any = {
    reference: "event",
  };

  changeFont(element, ev) {

    this.element.shadowRoot.querySelector(element).style.fontFamily = ev.target.value;
  }

  changeFontSize(element, ev) {
    console.log(ev.target.value)
    if (ev.target.value == 5) {
      this.FontSize = 'clamp(10px, 4vw, 30px)'
    }
    else if (ev.target.value == 4) {
      this.FontSize = 'clamp(10px, 3.5vw, 25px)'
    }
    else if (ev.target.value == 3) {
      this.FontSize = 'clamp(10px, 3vw, 20px)'
    }
    else if (ev.target.value == 2) {
      this.FontSize = 'clamp(10px, 2.5vw, 15px)'
    }
    else {
      this.FontSize = 'clamp(10px, 2vw, 10px)'
    }
    this.element.shadowRoot.querySelector(element).style.fontSize = this.FontSize;
    console.log(this.element.shadowRoot.querySelector(element).style.fontSize)
  }

  setFontWeight(element) {
    const exampleDiv = this.element.shadowRoot.querySelector(element);
    if (config?.font?.fontWeight == false) {
      this.buttonPressed = true;
      config.font.fontWeight = true;
      exampleDiv.style.fontWeight = 'bold';
    }
    else if (config?.font?.fontWeight == true) {
      this.buttonPressed = false;
      config.font.fontWeight = false;
      exampleDiv.style.fontWeight = 'normal';
    }
  }

  setItalic(element) {
    const exampleDiv = this.element.shadowRoot.querySelector(element);

    if (config?.font?.fontStyle == false) {
      this.butpress = true;
      config.font.fontStyle = true;
      exampleDiv.style.fontStyle = 'italic';
    }
    else if (config?.font?.fontStyle == true) {
      this.butpress = false;
      config.font.fontStyle = false;
      exampleDiv.style.fontStyle = 'normal';
    }
  }

  changeColor(element, ev) {
    this.element.shadowRoot.querySelector(element).style.color = ev.target.value
  }

  changeBackgroundColor(element, ev) {
    this.element.shadowRoot.querySelector(element).style.background = ev.target.value
  }

  renderColors() {
    return (
      <ion-col>
        <ion-row>
          <ion-item class='slider'>
            <ion-range min={1} max={5} step={1} value={3} snaps={true} onIonChange={(event: any) => this.changeFontSize('.exampleDiv', event)}>
              <p class='small' slot='start'>A</p>
              <p class='big' slot='end'>A</p>
            </ion-range>
          </ion-item>
        </ion-row>
        <ion-row class='settings'>
          <ion-item class='row'>
            <ion-select onIonChange={(event: any) => this.changeFont('.exampleDiv', event)} class="select" interface='popover' placeholder='Välj' value={config?.font?.fontFamily} interfaceOptions={this.customPopoverOptions}>
              {Fonts.map(x => <ion-select-option value={x}>{x}</ion-select-option>)}
            </ion-select>
            <ion-button class={this.buttonPressed ? 'bold-button labelpressed' : 'bold-button label'} onClick={() => { this.setFontWeight('.exampleDiv') }}>B</ion-button>
            <ion-button class={this.butpress ? 'cursive-button labelpressed' : 'cursive-button label'} onClick={() => { this.setItalic('.exampleDiv') }}>I</ion-button>
          </ion-item>

        </ion-row>
        <ion-row>
          <ion-row>
            <ion-item class='inputRow'>
              <ion-label position='fixed'>Namn:</ion-label>
              <ion-input type="text"></ion-input>
            </ion-item>
            <ion-item class='inputRow'>
              <ion-label position='fixed'>URL:</ion-label>
              <ion-input type="text"></ion-input>
            </ion-item>
          </ion-row>

        </ion-row>
      </ion-col>)
  }

  renderFonts() {
    return (
      <ion-col>
        <ion-title class="title">
          Färger
        </ion-title>
        <ion-item>
          <ion-label position="fixed">Titelfärg:</ion-label>
          <input type='color' onChange={(event: any) => this.changeColor('.categoryTitle', event)} />
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Produktnamn-färg:</ion-label>
          <input type='color' onChange={(event: any) => this.changeColor('.productName', event)} />
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Produktbeskrivning-färg:</ion-label>
          <input type='color' onChange={(event: any) => this.changeColor('.productDesc', event)} />
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Produktpris-färg:</ion-label>
          <input type='color' onChange={(event: any) => this.changeColor('.productPrice', event)} />
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Bakgrundsfärg:</ion-label>
          <input type='color' onChange={(event: any) => this.changeBackgroundColor('.exampleDiv', event)} />
        </ion-item>
      </ion-col>
    )
  }

  render() {
    return (
      <div class="modal">
        <div class="header">
          <ion-col>
            <ion-row class='tabs'>
              <ion-title class="title">Ändra text-stil och-färg</ion-title>
            </ion-row>
            <ion-row class='tabs'>
              <button class='tab-button left' onClick={() => this.RenderButton = false}>Fonts</button>
              <button class='tab-button right' onClick={() => this.RenderButton = true}>Färger</button>
            </ion-row>
          </ion-col>
        </div>
        <div class="body">
          <div class="content">
            {
              this.RenderButton ? this.renderFonts() : this.renderColors()
            }
            <ion-title>Exempel</ion-title>
            <div class='exampleDiv'>
              <ion-card>
                <ion-card-header>
                  <ion-card-title class='categoryTitle'>Kategori exempel</ion-card-title>
                </ion-card-header>
                <div class='product'>
                  <div class="productName" slot="primary">Produkt-titel</div>
                  <div class="productDesc" slot="secondary">Det här är en produktbeskrivning som beskriver denna produkt väldigt bra! Tack för mig!</div>
                  <div class="productPrice" slot='end'>999kr</div>
                </div>
              </ion-card>
            </div>
          </div>
        </div>
        <div class="footer">
          <button class='button save' onClick={this.PostData.bind(this)} type="submit">Spara</button>
          <button class='button close' type="submit" value="Submit" onClick={() => { this.close() }}>Avbryt</button>
        </div>
      </div >
    );
  }
}