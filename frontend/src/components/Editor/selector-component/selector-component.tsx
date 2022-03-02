import { Component, Host, h, State, Prop, Element, getAssetPath } from '@stencil/core';
import { PostData } from '../../utils/post';
import { config } from '../../utils/utils';

@Component({
  tag: 'selector-component',
  styleUrl: 'selector-component.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class SelectorComponent {
  @Prop() DropDownvalues: string[];
  @Prop() value: string;
  @Prop() IconName: string
  @State() selectedfont: string;
  @State() menu: boolean;
  @Prop() element: string
  @Prop() type: string
  @State() buttonPressed: boolean = config.font.fontWeight;
  @State() butpress: boolean = config.font.fontStyle;

  async FontStyle(element) {
    if (config?.font.fontStyle == false) {
      this.butpress = true;
      config.font.fontStyle = true;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontStyle = 'italic';
    }
    else if (config?.font.fontStyle == true) {
      this.butpress = false;
      config.font.fontStyle = false;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontStyle = 'normal';
    }
    await PostData('http://localhost:8080/config', config)
  }

  async FontWeight(element) {
    if (config?.font.fontWeight == false) {
      this.buttonPressed = true;
      config.font.fontWeight = true;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontWeight = 'bold';
    }
    else if (config?.font.fontWeight == true) {
      this.buttonPressed = false;

      config.font.fontWeight = false;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontWeight = 'normal';
    }
    await PostData('http://localhost:8080/config', config)
  }

  async FontSize(value, element) {
    config.font.fontSize = value;
    document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontSize = value;
    await PostData('http://localhost:8080/config', config)
  }

  async action(event, element) {
    if (this.type == 'font') {
      console.log(event);
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontFamily = event;
      config.font.fontFamily = event;
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
      <Host >
        <ion-row>
          <ion-item class={this.menu ? 'is-open' : 'is-closed'} >
            <ion-select onIonChange={(event: any) => this.action(event.target.value, this.element)} value={this.value} interface='action-sheet'>
              {this.DropDownvalues.map(x => <ion-select-option value={x}>{x}</ion-select-option>)}
            </ion-select>
            {this.type == 'font' ? [
              <ion-button class={this.buttonPressed ? 'bold-button labelpressed' : 'bold-button label'} onClick={() => { this.FontWeight('.menuContainer') }}>B</ion-button>,
              <ion-button class={this.butpress ? 'cursive-button labelpressed' : 'cursive-button label'} onClick={() => { this.FontStyle('.menuContainer') }}>I</ion-button>,
              <ion-select onIonChange={(event: any) => this.FontSize(event.target.value, this.element)} value={getAssetPath('./assets/font-size.svg')} interface='action-sheet'>
                <ion-select-option value={'smaller'}>Smaller</ion-select-option>
                <ion-select-option value={'small'}>Small</ion-select-option>
                <ion-select-option value={'medium'}>Medium</ion-select-option>
                <ion-select-option value={'large'}>Large</ion-select-option>
                <ion-select-option value={'larger'}>Larger</ion-select-option>
              </ion-select>
            ]
              : null}
          </ion-item>
          <ion-button onClick={() => { this.menu = !this.menu }} class='label'>
            <ion-icon name={this.menu ? 'arrow-back-sharp' : this.IconName}></ion-icon>
          </ion-button>
        </ion-row>
      </Host >
    );
  }
}

