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
      <Host>
        <ion-card-content class='productContainer'>
          <ion-row>
            <ion-col class='productIcon'>
              <img src='https://expo.se/sites/default/files/symbols/Pepe.gif' width={100}></img>
            </ion-col>
            <ion-col size="7">
              <ion-row class="productName">
                <ion-col>
                  <div>{this.product.name}</div>
                </ion-col>
              </ion-row>
              <ion-row class='productDesc'>
                <ion-col>
                  <div>{this.product.description}</div>
                </ion-col>
              </ion-row>
            </ion-col>
            <ion-col class='productPrice'>
              <div>{this.product.price}kr</div>
            </ion-col>
          </ion-row>

        </ion-card-content>
      </Host>
    );
  }

}
