import { Component, h, Element, State } from '@stencil/core';
import { PostData } from '../../../utils/post';
import { config, Fonts, Styleconfig, fontSize } from '../../../utils/utils';

@Component({
  tag: 'font-modal',
  styleUrl: 'font-modal.css',
  shadow: true,
})
export class FontModal {
  @Element() element: HTMLElement;
  @State() buttonPressed: boolean = config?.font?.fontWeight;
  @State() butpress: boolean = config?.font?.fontStyle;
  @State() buttonpress: boolean = false;
  @State() RenderButton: boolean;
  @State() NewFontName: string;
  @State() NewFontURL: string;
  @State() tempConf?: Styleconfig = config ?? null;

  async close() {
    await customElements.whenDefined('ion-modal')
    const modal = document.querySelector('ion-modal')
    await modal.dismiss();
  }

  async PostData() {
    this.setGlobalValues();
    await PostData('http://localhost:8080/config', this.tempConf).then(() => this.close())
  }

  setGlobalValues() {
    document.documentElement.style.setProperty('--font', this.tempConf.font.fontFamily)
    document.documentElement.style.setProperty('--fontSize', this.tempConf?.font.fontSize[1])
    document.documentElement.style.setProperty('--menuBackground', this.tempConf?.menuBackground)
    if (this.tempConf.font.fontStyle == true) {
      document.documentElement.style.setProperty('--fontStyle', 'italic')
    }
    else {
      document.documentElement.style.setProperty('--fontStyle', 'normal')

    }
    if (this.tempConf.font.fontWeight == true) {
      document.documentElement.style.setProperty('--fontWeight', 'bold')
    }
    else {
      document.documentElement.style.setProperty('--fontWeight', 'normal')
    }
  }

  private customPopoverOptions: any = {
    reference: "event",
  };

  changeFont(ev) {
    this.tempConf.font.fontFamily = ev.target.value;
    this.element.style.setProperty('--tempFont', this.tempConf.font.fontFamily)
  }

  changeFontSize(ev) {
    this.tempConf.font.fontSize = fontSize.find(x => x[0] == ev.target.value)
    this.element.style.setProperty('--tempSize', this.tempConf.font.fontSize[1])
  }

  setFontWeight() {
    if (this.tempConf.font.fontWeight == false) {
      this.buttonPressed = true;
      this.tempConf.font.fontWeight = true;
      this.element.style.setProperty('--fontWeight', 'bold')
    }
    else if (this.tempConf.font.fontWeight == true) {
      this.buttonPressed = false;
      this.tempConf.font.fontWeight = false;
      this.element.style.setProperty('--fontWeight', 'normal')
    }
  }

  setItalic() {
    if (this.tempConf.font.fontStyle == false) {
      this.butpress = true;
      this.tempConf.font.fontStyle = true;
      this.element.style.setProperty('--fontStyle', 'italic')
    }
    else if (this.tempConf.font.fontStyle == true) {
      this.butpress = false;
      this.tempConf.font.fontStyle = false;
      this.element.style.setProperty('--fontStyle', 'normal')
    }
  }

  changeColor(element, ev) {
    switch (element) {
      case ".categoryTitle":
        this.tempConf.font.colors.categoryTitle = ev.target.value
        break;
      case ".productName":
        this.tempConf.font.colors.productName = ev.target.value
        break;
      case ".productDesc":
        this.tempConf.font.colors.productDesc = ev.target.value
        break;
      case ".productPrice":
        this.tempConf.font.colors.productPrice = ev.target.value
        break;
      default:
        break;
    }
    this.element.shadowRoot.querySelector(element).style.color = ev.target.value
  }

  changeBackgroundColor(element, ev) {
    this.tempConf.menuBackground = ev.target.value
    this.element.shadowRoot.querySelector(element).style.background = ev.target.value
  }

  addCustomFont() {
    const regex = new RegExp(/(?<=\bfamily=)(.*?)(?=\b[:|$|&|@])/, 'g')
    console.log(regex)
    const nameArray = this.NewFontURL.match(regex)
    if (nameArray !== null) {
      const fontNames = nameArray.map(name => name.replace('+', ' '))

      if (this.tempConf.font.customFonts === undefined) {
        this.tempConf.font.customFonts = []
      }
      this.tempConf.font.customFonts.forEach(c =>
        c.names.forEach(n => {
          const element = this.tempConf.font.customFonts
          if (fontNames.includes(n)) {
            element.splice(element.indexOf(c), 1)
          }
        }))
      this.tempConf.font.customFonts.push({ names: fontNames, fontUrl: this.NewFontURL })
      var link = document.createElement('link');
      link.setAttribute('href', this.NewFontURL);
      document.head.appendChild(link);
    }
    this.NewFontURL = ''
    // document.documentElement.style.setProperty('--tempFont', `'${result}'`)

    // https://fonts.googleapis.com/css2?family=Macondo&display=swap
    // https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100&family=Mukta:wght@200&display=swap
  }

  renderFonts() {
    return (
      <ion-col class='modalContent'>
        <ion-row>
          <ion-label>Justera Typsnitt:</ion-label>

          <ion-item class='slider'>
            <ion-label>Textstorlek:</ion-label>
            <ion-range min={1} max={5} step={1} value={this?.tempConf?.font?.fontSize != undefined ? this?.tempConf?.font?.fontSize[0] : 3} snaps={true} onIonChange={(event: any) => this.changeFontSize(event)}>
              <p class='small' slot='start'>A</p>
              <p class='big' slot='end'>A</p>
            </ion-range>
          </ion-item>
        </ion-row>
        <ion-row class='settings'>
          <ion-item class='row'>
            <ion-label>Typsnitt:</ion-label>
            <ion-select onIonChange={(event: any) => this.changeFont(event)} class="select" interface='popover' placeholder='Välj' value={this.tempConf.font.fontFamily} interfaceOptions={this.customPopoverOptions}>
              {Fonts.map(x => <ion-select-option value={x} style={{ fontFamily: x }}>{x}</ion-select-option>)}
              {this.tempConf.font.customFonts.flatMap(x => {
                return (
                  x.names.map(n => {
                    return (
                      <ion-select-option value={n}>{n} *</ion-select-option>
                    )
                  }))
              })}
            </ion-select>
            <button class={this.buttonPressed ? 'button bold activated' : 'button bold deactivated'} onClick={() => { this.setFontWeight() }}>B</button>
            <button class={this.butpress ? 'button cursive activated' : 'button cursive deactivated'} onClick={() => { this.setItalic() }}>I</button>
          </ion-item>
        </ion-row>
        <ion-row class='row'>
          {/* <ion-item class='inputRow'>
            <ion-label position='fixed'>Namn:</ion-label>
            <ion-input type="text" value={this.NewFontName} onIonChange={(event: any) => this.NewFontName = event.target.value}></ion-input>
          </ion-item> */}
          <ion-label>Importera Typsnitt:</ion-label>
          <ion-item class='inputRow'>
            <ion-label position='fixed'>URL:</ion-label>
            <ion-input type="text" value={this.NewFontURL} onIonChange={(event: any) => this.NewFontURL = event.target.value}></ion-input>
          </ion-item>
          <button disabled={this.NewFontURL == ''} type='submit' onClick={() => this.addCustomFont()} class='button add'>Lägg till <ion-icon class='icon' name="add-circle-sharp" /></button>
        </ion-row>
      </ion-col>)
  }

  renderColors() {
    return (
      <ion-col>
        <ion-item>
          <ion-label>Kategorititel:</ion-label>
          <input slot='end' type='color' value={this.tempConf.font.colors.categoryTitle} onChange={(event: any) => this.changeColor('.categoryTitle', event)} />
        </ion-item>
        <ion-item>
          <ion-label >Produktnamn:</ion-label>
          <input type='color' slot='end' value={this.tempConf.font.colors.productName} onChange={(event: any) => this.changeColor('.productName', event)} />
        </ion-item>
        <ion-item>
          <ion-label >Produktbeskrivning:</ion-label>
          <input type='color' slot='end' value={this.tempConf.font.colors.productDesc} onChange={(event: any) => this.changeColor('.productDesc', event)} />
        </ion-item>
        <ion-item>
          <ion-label >Produktpris:</ion-label>
          <input type='color' slot='end' value={this.tempConf.font.colors.productPrice} onChange={(event: any) => this.changeColor('.productPrice', event)} />
        </ion-item>
        <ion-item>
          <ion-label >Bakgrund:</ion-label>
          <input type='color' slot='end' value={this.tempConf.menuBackground} onChange={(event: any) => this.changeBackgroundColor('.exampleDiv', event)} />
        </ion-item>
      </ion-col>
    )
  }

  render() {
    return (
      <div class="modal">
        <div class="header">
          <ion-tabs>
            <ion-tab-bar>
              <ion-tab-button class={!this.RenderButton ? 'focus' : null} selected={!this.RenderButton} onClick={() => this.RenderButton = false}>
                <ion-icon name="text-sharp"></ion-icon>
                <ion-label>Typsnitt</ion-label>
              </ion-tab-button>
              <ion-tab-button class={this.RenderButton ? 'focus' : null} selected={this.RenderButton} onClick={() => this.RenderButton = true}>
                <ion-icon name="color-palette-sharp"></ion-icon>
                <ion-label>Färger</ion-label>
              </ion-tab-button>
            </ion-tab-bar>
          </ion-tabs>
        </div>
        <div class="body">
          <div class="content">
            {
              this.RenderButton ? this.renderColors() : this.renderFonts()
            }
            <div class='exampleDiv' style={{ color: this.tempConf.menuBackground }}>
              <ion-card class='card'>
                <ion-card-header>
                  <ion-card-title class='categoryTitle' style={{ color: this.tempConf.font.colors.categoryTitle }}>Kategori exempel</ion-card-title>
                </ion-card-header>
                <ion-card>
                  <div class='product'>
                    <div class="productName" slot="primary" style={{ color: this.tempConf.font.colors.productName }}>Produkt-titel</div>
                    <div class="productDesc" slot="secondary" style={{ color: this.tempConf.font.colors.productDesc }}>Det här är en produktbeskrivning som beskriver denna produkt väldigt bra! Tack för mig!</div>
                    <div class="productPrice" slot='end' style={{ color: this.tempConf.font.colors.productPrice }}>999kr</div>
                  </div>
                </ion-card>
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
