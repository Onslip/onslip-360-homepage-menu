import { Component, Prop, Host, h } from '@stencil/core';
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
      <ion-card-header>
        <ion-card-title>
          {this.category.name}
        </ion-card-title>
      </ion-card-header>
    );
  }

}
