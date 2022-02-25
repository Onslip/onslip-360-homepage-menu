import { Component, Host, h, State, Element } from '@stencil/core';

@Component({
  tag: 'font-selector',
  styleUrl: 'font-selector.css',
  shadow: true,
})
export class FontSelector {
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


  ChangeFont(font, element) {
    document.querySelector('body').style.fontFamily = font;
    const menuelement = document.querySelector('menu-editor-component');
    // menuelement.shadowRoot.querySelector(element).style.fontFamily = font;
    document.querySelector('menu-editor-compoennt').shadowRoot.querySelector('.menu').setAttribute('style', `font-family:${font}`);

  }


  render() {
    return (
      <Host >

        <ion-row>

          <ion-select onIonChange={(event) => { this.ChangeFont(event.target.value, '.menu'); }} class={this.menu ? 'is-open' : 'is-closed'} >
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
