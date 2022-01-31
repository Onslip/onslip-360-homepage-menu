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
      <ion-card-content class='productContainer'>
        <ion-row class='productIcon'>
          <ion-col >
            <img src='https://expo.se/sites/default/files/symbols/Pepe.gif' width={100}></img>
          </ion-col>
        </ion-row>
        <ion-row class='productName'>
          <ion-col class='name'>
            <div>{this.product.name}</div>
          </ion-col>
          <ion-col class='productDesc'>
            <div>{this.product.description}</div>
          </ion-col>
        </ion-row>
        <ion-row class='productPrice'>
          <ion-col>
            <div>{this.product.price}kr</div>
          </ion-col>
        </ion-row>
      </ion-card-content>
    );
  }

}
