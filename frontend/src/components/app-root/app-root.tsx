import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @State() switch: boolean;

  render() {
    return (
      <div>
        <ion-router useHash={false}>
          <ion-route url="/" component="test-menu" />
          <ion-route-redirect to='/menu' from='/' />
          <ion-route url='/menu' component="homepage-menu-component" />
          <ion-route url='/menu/:menuId' component="homepage-menu-component" />
          <ion-route url='/editor/menu' component='homepage-menu-editor-component' />
          <ion-route url='/editor/menu/:menuId' component='homepage-menu-editor-component' />
        </ion-router>

        <ion-content class="content" id="main">
          <ion-router-outlet />
        </ion-content>
      </div>
    )
  }
}
