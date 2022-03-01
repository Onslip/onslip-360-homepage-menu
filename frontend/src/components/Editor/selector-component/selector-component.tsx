import { Component, Host, h, State, Prop, Element } from '@stencil/core';
import { PostData } from '../../utils/post';
import { config } from '../../utils/utils';

@Component({
  tag: 'selector-component',
  styleUrl: 'selector-component.css',
  shadow: true,
})
export class SelectorComponent {

  @Prop() DropDownvalues: string[];
  @Prop() value: string;
  @Prop() IconName: string
  @State() selectedfont: string;
  @State() menu: boolean;
  @Prop() element: string
  @Prop() type: string

  async FontStyle(element) {
    if (config?.font.fontStyle == false) {
      config.font.fontStyle = true;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontStyle = 'italic';
    }
    else if (config?.font.fontStyle == true) {
      config.font.fontStyle = false;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontStyle = 'normal';
    }
    await PostData('http://localhost:8080/config', config)
  }

  async FontWeight(element) {
    if (config?.font.fontWeight == false) {
      config.font.fontWeight = true;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontWeight = 'bold';
    }
    else if (config?.font.fontWeight == true) {
      config.font.fontWeight = false;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontWeight = 'normal';
    }
    await PostData('http://localhost:8080/config', config)
  }

  async action(event, element) {
    if (this.type == 'font') {
      console.log(event);
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontFamily = event;
      config.font = event;
    }
    else if (this.type == 'preset') {
      console.log(event);
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style = event;
      config.preset = event;
    }
    await PostData('http://localhost:8080/config', config)
  }

  render() {
    return (
      <Host>
        <ion-row>
          <ion-select onIonChange={(event: any) => this.action(event.target.value, this.element)} class={this.menu ? 'is-open' : 'is-closed'} value={this.value} interface='action-sheet'>
            {this.DropDownvalues.map(x => <ion-select-option value={x}>{x}</ion-select-option>)}
          </ion-select>
          {this.type == 'font' ? [
            <ion-button class='bold-button' onIonClick={() => { this.FontWeight('.menuContainer') }}>B</ion-button>,
            <ion-button class='cursive-button' onIonClick={() => { this.FontStyle('.menuContainer') }}>F</ion-button>]
            : null}
          <ion-button onClick={() => { this.menu = !this.menu }} class='label'>
            <ion-icon name={this.menu ? 'arrow-back-sharp' : this.IconName}></ion-icon>
          </ion-button>
        </ion-row>
      </Host>
    );
  }
}
