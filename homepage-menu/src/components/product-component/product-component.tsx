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
          <ion-col>
            <img src='https://expo.se/sites/default/files/symbols/Pepe.gif' width={100}></img>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div>{this.product.name}</div>
          </ion-col>
          <ion-col>
            <div>{this.product.price}kr</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div>{this.product.description}</div>
          </ion-col>
        </ion-row>
      </ion-card-content>
    );
  }

}
