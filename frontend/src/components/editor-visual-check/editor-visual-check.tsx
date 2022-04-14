import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'editor-visual-check',
  styleUrl: 'editor-visual-check.css',
  shadow: true,
})
export class EditorVisualCheck {
  @State() switch: boolean;

  render() {
    return (
      <body>
        <ion-content class="content" >
          <toolbar-component></toolbar-component>
          {
            this.switch ?
              <homepage-menu-component></homepage-menu-component>
              : <homepage-menu-editor-component></homepage-menu-editor-component>
          }
          <ion-item class='checkbox'>
            <input type="checkbox" id="scales" name="scales" onChange={(event: any) => { this.switch = event.target.checked }} />
            <label htmlFor="scales">Förhandsvisning</label>
          </ion-item>
        </ion-content>
      </body>
    )
  }
}
