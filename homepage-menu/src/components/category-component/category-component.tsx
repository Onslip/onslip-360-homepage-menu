import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'category-component',
  styleUrl: 'category-component.css',
  shadow: true,
})
export class CategoryComponent {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
