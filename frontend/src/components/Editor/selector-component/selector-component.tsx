import { Component, Host, h, State, Element, Prop } from '@stencil/core';
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

  async componentWillLoad() {
    await GetData('http://localhost:8080/config')
      .then(response => this.config = response)
      .catch(err => console.log(`${err} Kunde inte hämta data`))
  }

  action(event, element) {
    if (this.value == this.config.font) {
      console.log(event);
      this.componentWillLoad();
      const menuelement = document.querySelector('homepage-menu-editor-component');
      menuelement.shadowRoot.querySelector(element).style.fontFamily = event;
      this.config.font = event;

      PostData('http://localhost:8080/config', this.config)

    }
    if (this.value == this.config.preset) {
      this.componentWillLoad();
      const menuelement = document.querySelector('homepage-menu-editor-component');
      menuelement.shadowRoot.querySelector(element).style = event;
      this.config.preset = event;
      PostData('http://localhost:8080/config', this.config)
    }
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
