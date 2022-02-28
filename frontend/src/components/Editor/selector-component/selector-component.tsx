import { Component, Host, h, State, Prop, Element } from '@stencil/core';
import { GetData } from '../../utils/get';
import { PostData } from '../../utils/post';
import { Styleconfig } from '../../utils/utils';

@Component({
  tag: 'selector-component',
  styleUrl: 'selector-component.css',
  shadow: true,
})
export class SelectorComponent {

  @Prop() DropDownvalues: string[];
  @Prop() value: string;
  @Prop() IconName: string
  @State() config: Styleconfig
  @State() selectedfont: string;
  @State() menu: boolean;
  @Prop() element: string
  @Prop() type: string
  @Element() asf: HTMLElement;

  async componentWillLoad() {
    await GetData('http://localhost:8080/config')
      .then(response => this.config = response)
      .catch(err => console.log(`${err} Kunde inte hämta data`))
  }


  async action(event, element) {
    this.componentWillLoad();
    // this.asf.shadowRoot.querySelector('homepage-menu-editor-component').querySelector(element).style.fontFamily;

    if (this.type == 'font') {
      console.log(event);
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontFamily = event;
      this.config.font = event;
    }

    else if (this.type == 'preset') {
      console.log(event);
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style = event;
      this.config.preset = event;
    }
    await PostData('http://localhost:8080/config', this.config)

  }

  render() {
    return (
      <Host >
        <ion-row>
          <ion-select onIonChange={(event: any) => this.action(event.target.value, this.element)} class={this.menu ? 'is-open' : 'is-closed'} value={this.value} interface='action-sheet'>
            {this.DropDownvalues.map(x => <ion-select-option value={x}>{x}</ion-select-option>)}
          </ion-select>
          <ion-button onClick={() => { this.menu = !this.menu }} class='label'>
            <ion-icon name={this.menu ? 'arrow-back-sharp' : this.IconName}></ion-icon>
          </ion-button>
        </ion-row>
      </Host >
    );
  }

}
