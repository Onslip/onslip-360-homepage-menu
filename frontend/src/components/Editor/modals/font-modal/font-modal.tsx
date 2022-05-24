import { Component, h, Element, State } from '@stencil/core';
import { PostData } from '../../../utils/post';
import { config, Fonts, Styleconfig, fontSize } from '../../../utils/utils';

import Coloris from "@melloware/coloris";
import { GetData } from '../../../utils/get';
import { json } from 'stream/consumers';
Coloris.init()

@Component({
  tag: 'font-modal',
  styleUrl: 'font-modal.css',
  shadow: false,
})
export class FontModal {
  @Element() element: HTMLElement;
  @State() buttonPressed: boolean = config?.font?.fontWeight;
  @State() butpress: boolean = config?.font?.fontStyle;
  @State() buttonpress: boolean = false;
  @State() RenderButton: boolean;
  @State() NewFontName: string;
  @State() NewFontURL: string;
  @State() settingsHaveChanged: boolean = false
  private tempConfig: Styleconfig

  async componentWillLoad() {
    this.tempConfig = await GetData('http://localhost:8080/config')
  }

  componentDidRender() {
    Coloris({
      el: '.coloris',
      wrap: true,
      swatches: [
        '#000000',
        '#0000FF',
        '#808080',
        '#008000',
        '#800080',
        '#FF0000',
        '#FFFFFF',
        '#F0F8FF',
        '#FF7F50',
        '#B22222',
        '#FF69B4',
        '#FFFACD'
      ],
    })
    Coloris.close()
  }

  valueChanged() {
    JSON.stringify(this.tempConfig) === JSON.stringify(config) ?
      this.settingsHaveChanged = false :
      this.settingsHaveChanged = true
  }

  async close() {
    await customElements.whenDefined('ion-modal')
    const modal = document.querySelector('ion-modal')
    await modal.dismiss();
  }

  async PostData() {
    if (this.settingsHaveChanged) {
      this.setGlobalValues();
      await PostData('http://localhost:8080/config', config).then(() => this.close())
    }
  }

  setGlobalValues() {
    document.documentElement.style.setProperty('--font', config.font.fontFamily)
    document.documentElement.style.setProperty('--fontSize', config.font.fontSize[1])
    document.documentElement.style.setProperty('--menuBackground', config.menuBackground)
    if (config.background.enabled) {
      document.documentElement.querySelector('body').style.backgroundImage = 'unset'
      document.documentElement.style.setProperty('--backgroundColor', config.background.color)
    }

    document.documentElement.style.setProperty('--prodTitle', config.font.colors.categoryTitle)
    document.documentElement.style.setProperty('--prodName', config.font.colors.productName)
    document.documentElement.style.setProperty('--prodDesc', config.font.colors.productDesc)
    document.documentElement.style.setProperty('--prodPrice', config.font.colors.productPrice)

    if (config.font.fontStyle == true) {
      document.documentElement.style.setProperty('--fontStyle', 'italic')
    }
    else {
      document.documentElement.style.setProperty('--fontStyle', 'normal')

    }
    if (config.font.fontWeight == true) {
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
    config.font.fontFamily = ev.target.value;
    this.element.style.setProperty('--tempFont', config.font.fontFamily)
    this.valueChanged()
  }

  changeFontSize(ev) {
    config.font.fontSize = fontSize.find(x => x[0] == ev.target.value)
    this.element.style.setProperty('--tempSize', config.font.fontSize[1])
    this.valueChanged()
  }

  setFontWeight() {
    this.buttonPressed = !this.buttonPressed;
    config.font.fontWeight = !config.font.fontWeight;
    config.font.fontWeight ?
      this.element.style.setProperty('--tempWeight', 'bold') :
      this.element.style.setProperty('--tempWeight', 'normal')
    this.valueChanged()
  }

  setItalic() {
    this.butpress = !this.butpress
    config.font.fontStyle = !config.font.fontStyle;
    config.font.fontStyle ?
      this.element.style.setProperty('--tempStyle', 'italic') :
      this.element.style.setProperty('--tempStyle', 'normal')
    this.valueChanged()
  }

  changeColor(element, ev) {
    switch (element) {
      case ".categoryTitle":
        config.font.colors.categoryTitle = ev.target.value
        break;
      case ".productName":
        config.font.colors.productName = ev.target.value
        break;
      case ".productDesc":
        config.font.colors.productDesc = ev.target.value
        break;
      case ".productPrice":
        config.font.colors.productPrice = ev.target.value
        break;
      default:
        break;
    }
    this.element.querySelector(element).style.color = ev.target.value
    this.valueChanged()
  }

  changeMenuBackgroundColor(ev) {
    config.menuBackground = ev.target.value
    this.element.style.setProperty('--tempColor', ev.target.value);
    this.valueChanged()
  }

  changeBackgroundColor(ev) {
    config.background.color = ev.target.value
    config.background.enabled = true
    this.element.style.setProperty('--tempBackground', ev.target.value);
    this.valueChanged()
  }

  addCustomFont() {
    const regex = new RegExp(/(?<=\bfamily=)(.*?)(?=\b[:|$|&|@])/, 'g')
    const nameArray = this.NewFontURL.match(regex)
    if (nameArray !== null) {
      const fontNames = nameArray.map(name => name.replace('+', ' '))

      if (config.font.customFonts === undefined) {
        config.font.customFonts = []
      }
      config.font.customFonts.forEach(c =>
        c.names.forEach(n => {
          const element = config.font.customFonts
          if (fontNames.includes(n)) {
            element.splice(element.indexOf(c), 1)
          }
        }))
      config.font.customFonts.push({ names: fontNames, fontUrl: this.NewFontURL })
      var link = document.createElement('link');
      link.setAttribute('href', this.NewFontURL);
      document.head.appendChild(link);
    }
    this.NewFontURL = ''

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
            <ion-range min={1} max={5} step={1} value={config.font?.fontSize != undefined ? config.font?.fontSize[0] : 3} snaps={true} onIonChange={(event: any) => this.changeFontSize(event)}>
              <p class='small' slot='start'>A</p>
              <p class='big' slot='end'>A</p>
            </ion-range>
          </ion-item>
        </ion-row>
        <ion-row class='settings'>
          <ion-item class='row'>
            <ion-label>Typsnitt:</ion-label>
            <ion-select onIonChange={(event: any) => this.changeFont(event)} class="select" interface='popover' placeholder='Välj' value={config.font.fontFamily} interfaceOptions={this.customPopoverOptions}>
              {Fonts.map(x => <ion-select-option value={x} style={{ fontFamily: x }}>{x}</ion-select-option>)}
              {config.font.customFonts.flatMap(x => {
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
      <ion-grid>
        <ion-row>
          <ion-col class='col'>
            <ion-item class='picker' lines='none'>
              <ion-label position='stacked'>Titel</ion-label>
              <input type='text' class='coloris' value={config.font.colors.categoryTitle} onInput={(event: any) => this.changeColor('.categoryTitle', event)} />
            </ion-item>
          </ion-col>
          <ion-col class='col'>
            <ion-item class='picker' lines='none'>
              <ion-label position='stacked'>Namn</ion-label>
              <input type='text' class='coloris' value={config.font.colors.productName} onInput={(event: any) => this.changeColor('.productName', event)} />
            </ion-item>
          </ion-col>
          <ion-col class='col'>
            <ion-item class='picker' lines='none'>
              <ion-label position='stacked'>Beskrivning</ion-label>
              <input type='text' class='coloris' value={config.font.colors.productDesc} onInput={(event: any) => this.changeColor('.productDesc', event)} />
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class='col'>
            <ion-item class='picker' lines='none'>
              <ion-label position='stacked'>Pris</ion-label>
              <input type='text' class='coloris' value={config.font.colors.productPrice} onInput={(event: any) => this.changeColor('.productPrice', event)} />
            </ion-item>
          </ion-col>
          <ion-col class='col'>
            <ion-item class='picker' lines='none'>
              <ion-label position='stacked' >Menyfärg</ion-label>
              <input type='text' class='coloris' value={config.menuBackground} onInput={(event: any) => this.changeMenuBackgroundColor(event)} />
            </ion-item>
          </ion-col>
          <ion-col class='col'>
            <ion-item class='picker' lines='none'>
              <ion-label position='stacked' >Bakgrundsfärg</ion-label>
              <input type='text' class='coloris' value={config.background.color} onInput={(event: any) => this.changeBackgroundColor(event)} />
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
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
            <div class='container'>
              <div class='exampleDiv'>
                <ion-card class='card'>
                  <ion-card-header>
                    <ion-card-title class='categoryTitle'>Kategori-titel exempel</ion-card-title>
                  </ion-card-header>
                  <ion-card-content >
                    <div class='product'>
                      <ion-row>
                        <ion-col class='font'>
                          <div class="productName">Produkt-titel exempel</div>
                        </ion-col>
                        <ion-col class='font'>
                          <div class="productPrice">$123</div>
                        </ion-col>
                      </ion-row>
                      <ion-row>
                        <ion-col class='font'>
                          <div class="productDesc">Det här är ett exempel på hur en produktbeskrivning kan se ut!</div>
                        </ion-col>
                      </ion-row>
                    </div>
                  </ion-card-content>

                </ion-card>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <button disabled={!this.settingsHaveChanged} class={this.settingsHaveChanged ? 'button save' : 'button disabled'} onClick={this.PostData.bind(this)} type="submit">Spara</button>
          <button class='button close' type="submit" value="Submit" onClick={() => { this.close() }}>Avbryt</button>
        </div>
      </div >
    );
  }
}
