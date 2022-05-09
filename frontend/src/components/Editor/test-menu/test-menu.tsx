import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'test-menu',
  styleUrl: 'test-menu.css',
  shadow: true,
})
export class TestMenu {

  render() {
    return (
      <Host>
        <p>Welcome</p>
      </Host>
    );
  }

}
