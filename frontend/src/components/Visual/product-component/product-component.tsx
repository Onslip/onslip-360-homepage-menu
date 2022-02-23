import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { DBproduct } from '../../utils/utils';

@Component({
  tag: 'product-component',
  styleUrl: 'product-component.css',
  shadow: true,
})

export class ProductComponent {
  @Element() element: HTMLElement;
  @Prop() product: DBproduct;
  @State() url: 'http://localhost:8080/productimage-upload'
  async componentWillLoad() {
    await this.loadImage('.productIcon');
  }

  async loadImage(element) {
    const backgroundbyte = new Uint8Array(this.product.image[0]?.data);
    const blob = new Blob([backgroundbyte.buffer]);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        this.element.shadowRoot.querySelector(element).style.backgroundImage = image;
      }
    };
  }

  render() {
    return (
      <Host>
        <ion-card-content class='productContainer'>
          <ion-row>
            <ion-col class='productIcon'>
            </ion-col>
            <ion-col>
              <ion-row>
                <ion-col class="productName">
                  <div>{this.product.name}</div>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col class='productDesc'>
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
