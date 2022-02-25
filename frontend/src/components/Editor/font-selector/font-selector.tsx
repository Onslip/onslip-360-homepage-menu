import { Component, Host, h, State, Element } from '@stencil/core';

@Component({
  tag: 'font-selector',
  styleUrl: 'font-selector.css',
  shadow: true,
})
export class FontSelector {
  @State() selectedfont: string;
  @Element() element: HTMLElement;
  @State() menu: boolean;
  @State() fonts: Fonts;

  async ChangeFont(font, element) {
    console.log(font.value);
    document.querySelector('body').style.fontFamily = font.value
    this.element.shadowRoot.querySelector(element).style.fontfamily = font.value
    document.fonts.forEach(element => console.log(element));
    location.reload();
  }

  open() {
    this.menu;
  }

  render() {
    return (
      <Host>
        <button onClick={this.open.bind(this)}><ion-icon name="text-outline"></ion-icon></button>
        <slot>
          <select onChange={(event) => this.ChangeFont(event.target, '.asf')} class={this.menu ? 'is-close' : 'is-open'} >
            <option value={this.fonts[1]}>{this.fonts[1]}</option>
            <option value={this.fonts[2]}>{this.fonts[2]}</option>
            <option value={this.fonts[3]}>{this.fonts[3]}</option>
            <option value={this.fonts[4]}>{this.fonts[4]}</option>
            <option value={this.fonts[5]}>{this.fonts[5]}</option>
            <option value={this.fonts[6]}>{this.fonts[6]}</option>
            <option value={this.fonts[8]}>{this.fonts[8]}</option>
          </select>
        </slot>
      </Host >
    );
  }
}

interface Fonts {
  1: 'Arial, Helvetica, sans-serif',
  2: 'Verdana, Geneva, Tahoma, sans-serif',
  3: `BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
  4: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  5: `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
  6: `'Times New Roman', Times, serif`,
  7: `Georgia, 'Times New Roman', Times, serif`,
  8: `'Courier New', Courier, monospace`,
};

