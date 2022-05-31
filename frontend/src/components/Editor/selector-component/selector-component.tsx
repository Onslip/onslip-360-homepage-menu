
import { Component, Host, h, State, Prop } from '@stencil/core';
import { PostData } from '../../utils/post';
import { config, mainConfig } from '../../utils/utils';

@Component({
  tag: 'selector-component',
  styleUrl: 'selector-component.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class SelectorComponent {
  @Prop() DisplayName: string
  @Prop() DropDownvalues: any[];
  @Prop() value: string;
  @Prop() IconName: string
  @State() menu: boolean;
  @Prop() element: string
  @Prop() type: string

  async action(event, element) {
    if (this.type == 'preset') {
      document.querySelector('app-root').querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style = event;
      mainConfig.configId = event
      await PostData('/mainconfig', mainConfig)
      location.reload();
    }
  }

  private customPopoverOptions: any = {
    reference: "event",
  };

  render() {
    return (
      <Host>
        <ion-row>
          <ion-item lines='none' class={this.menu ? 'is-open' : 'is-closed'}>
            <ion-item>
              <ion-select class="select" onIonChange={(event: any) => { this.action(event.target.value, this.element) }} value={this.value} interface='popover' interfaceOptions={this.customPopoverOptions} placeholder='Välj'>
                {this.DropDownvalues.map(x => <ion-select-option value={x}>{this.DisplayName}{x?.name ?? x}</ion-select-option>)}
              </ion-select>
            </ion-item>
          </ion-item>
          <ion-button onClick={() => { this.menu = !this.menu }} class='label'>
            <ion-icon name={this.menu ? 'arrow-back-sharp' : this.IconName}></ion-icon>
          </ion-button>
        </ion-row>
      </Host>
    );
  }
}
