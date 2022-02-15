import { Component, Host, h, Prop } from '@stencil/core';
import { DBcategory } from '../../utils/utils';

@Component({
  tag: 'category-component',
  styleUrl: 'category-component.css',
  shadow: true,
})
export class CategoryComponent {

  @Prop() category: DBcategory

  render() {
    return (
      <Host>
        <ion-card-header class='categoryContainer'>
          <ion-card-title class='categoryTitle'>
            {this.category.name}
          </ion-card-title>
        </ion-card-header>
      </Host>
    );
  }
}
