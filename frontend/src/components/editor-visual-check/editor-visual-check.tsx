import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'editor-visual-check',
  styleUrl: 'editor-visual-check.css',
})
export class EditorVisualCheck {
  @State() switch: boolean;

  render() {
    return (
      <div>
          <ion-router useHash={false}>
            <ion-route url="/" component="test-menu" />
            <ion-route-redirect to='/menu' from='/' />
            <ion-route url='/menu' component="homepage-menu-component" />
            <ion-route url='/menu/:Id' component="homepage-menu-component" />
            <ion-route url='/menu/editor' component='homepage-menu-editor-component' />
            <ion-route url='menu/editor/:Id' component='homepage-menu-editor-component' />
          </ion-router>

        <ion-content class="content" id="main">
          <ion-router-outlet />
        </ion-content>
      </div>
    )
  }
}
