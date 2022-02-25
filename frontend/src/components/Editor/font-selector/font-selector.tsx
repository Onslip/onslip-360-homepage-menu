import { Component, Host, h, State, Element } from '@stencil/core';
import { GetData } from '../../utils/get';
import { PostData } from '../../utils/post';
import { Styleconfig } from '../../utils/utils';
@Component({
  tag: 'font-selector',
  styleUrl: 'font-selector.css',
  shadow: true,
})
export class FontSelector {
  @State() config: Styleconfig
  @State() selectedfont: string;
  @Element() element: HTMLElement;
  @State() initialvalue: string;
  @State() menu: boolean = false;
  @State() fonts = ['Arial, Helvetica, sans-serif',
    'Verdana, Geneva, Tahoma, sans-serif',
    `BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
    `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
    `'Times New Roman', Times, serif`,
    `Georgia, 'Times New Roman', Times, serif`,
    `'Courier New', Courier, monospace`]

  async componentWillLoad() {
    await GetData('http://localhost:8080/backgroundcolor')
      .then(response => this.config = response)
      .catch(err => console.log(`${err} Kunde inte hämta data`))
    this.initialvalue = this.config.font;

  }

  ChangeFont(font, element) {
    this.initialvalue = font;
    const menuelement = document.querySelector('homepage-menu-editor-component');
    menuelement.shadowRoot.querySelector(element).style.fontFamily = font;
    this.config.font = font;
    PostData('http://localhost:8080/backgroundcolor', this.config)
  }

  render() {
    return (
      <Host >
        <ion-row>

          <ion-select onIonChange={(event) => { this.ChangeFont(event.target.value, '.menuContainer'); }} class={this.menu ? 'is-open' : 'is-closed'} value={this.initialvalue} interface='action-sheet'>
            {this.fonts.map(x => <ion-select-option value={x}>{x}</ion-select-option>)}
          </ion-select>
          <ion-button onClick={() => { this.menu = !this.menu }} class='label'>
            <ion-icon name={this.menu ? 'arrow-back-sharp' : "text-sharp"}></ion-icon>
          </ion-button>
        </ion-row>
      </Host >
    );
  }
}
