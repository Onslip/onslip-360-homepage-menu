import { Component, Host, h, Prop } from '@stencil/core';
import { DBproduct } from '../../utils/utils';

@Component({
  tag: 'product-component',
  styleUrl: 'product-component.css',
  shadow: true,
})
export class ProductComponent {
  
  @Prop() product: DBproduct

  render() {
    return (
      <ion-card-content>
        <ion-row>
        <div>{this.product.name}</div>
        <div>{this.product.price}</div>
        </ion-row>
        <ion-row>
        <div>{this.product.description}</div>
        </ion-row>
      </ion-card-content>
    );
  }

}
