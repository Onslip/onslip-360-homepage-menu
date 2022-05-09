
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
  @State() selectedfont: string;
  @State() menu: boolean;
  @Prop() element: string
  @Prop() type: string
  @State() buttonPressed: boolean = config.font.fontWeight;
  @State() butpress: boolean = config.font.fontStyle;
  @State() buttonpress: boolean = config.font.fontOutline;

  async FontStyle(element) {
    if (config?.font?.fontStyle == false) {
      this.butpress = true;
      config.font.fontStyle = true;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontStyle = 'italic';
    }
    else if (config?.font?.fontStyle == true) {
      this.butpress = false;
      config.font.fontStyle = false;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontStyle = 'normal';
    }
    await PostData('http://localhost:8080/config', config)
  }

  async FontWeight(element) {
    if (config?.font?.fontWeight == false) {
      this.buttonPressed = true;
      config.font.fontWeight = true;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontWeight = 'bold';
    }
    else if (config?.font?.fontWeight == true) {
      this.buttonPressed = false;

      config.font.fontWeight = false;
      document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontWeight = 'normal';
    }
    await PostData('http://localhost:8080/config', config)
  }

  async FontSize(value, element) {
    document.querySelector(element).style.fontSize = value
    config.font.fontSize = value;
    await PostData('http://localhost:8080/config', config)
  }

  async action(event, element) {
    if (this.type == 'font') {
      document.querySelector('editor-visual-check').querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style.fontFamily = event;
      config.font.fontFamily = event;
      await PostData('http://localhost:8080/config', config)
      location.reload()
    }
    else if (this.type == 'preset') {
      document.querySelector('editor-visual-check').querySelector('homepage-menu-editor-component').shadowRoot.querySelector(element).style = event;
      mainConfig.configId = event
      await PostData('http://localhost:8080/mainconfig', mainConfig)
      location.reload();
    }
    else if (this.type == 'location') {
      console.log(event)
      mainConfig.selectedLocation = event
      await PostData('http://localhost:8080/maincofig', mainConfig)
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
            {this.type == 'font' ? [
              <ion-item lines='none' class='outerItem'>
                <ion-item class='sizeSelect' button={true}>
                  <ion-select onIonChange={(event: any) => this.FontSize(event.target.value, ':root')} interface='popover' interfaceOptions={this.customPopoverOptions} class='fontSize label'>
                    <ion-select-option value={'clamp(10px, 4vw, 30px)'}>Larger</ion-select-option>
                    <ion-select-option value={'clamp(10px, 3.5vw, 25px)'}>Large</ion-select-option>
                    <ion-select-option value={'clamp(10px, 3vw, 20px)'}>Medium</ion-select-option>
                    <ion-select-option value={'clamp(10px, 2.5vw, 15px)'}>Small</ion-select-option>
                    <ion-select-option value={'clamp(10px, 2vw, 10px)'}>Smaller</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-button class={this.buttonPressed ? 'bold-button labelpressed' : 'bold-button label'} onClick={() => { this.FontWeight('.menuContainer') }}>B</ion-button>
                <ion-button class={this.butpress ? 'cursive-button labelpressed' : 'cursive-button label'} onClick={() => { this.FontStyle('.menuContainer') }}>I</ion-button>
              </ion-item>
            ]
              : null}
          </ion-item>
          <ion-button onClick={() => { this.menu = !this.menu }} class='label'>
            <ion-icon name={this.menu ? 'arrow-back-sharp' : this.IconName}></ion-icon>
          </ion-button>
        </ion-row>
      </Host>
    );
  }
}
