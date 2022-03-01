import { Component, Prop, Host, h } from '@stencil/core';
import { DBcategory } from '../../utils/utils';

@Component({
  tag: 'category-editor-component',
  styleUrl: 'category-editor-component.css',
  shadow: true,
})
export class CategoryEditorComponent {

  @Prop() category: DBcategory

  render() {
    return (
      <Host>
        <ion-card-header>
          <ion-card-title class='categoryTitle'>
            {this.category.name}
          </ion-card-title>
        </ion-card-header>
      </Host>
    );
  }

}
