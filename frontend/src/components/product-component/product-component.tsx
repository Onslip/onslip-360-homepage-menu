import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { GetData } from '../../utils/get';
import { CheckImage } from '../../utils/image';
import { PostData, PostImage } from '../../utils/post';
import { DBproduct } from '../../utils/utils';

@Component({
  tag: 'product-component',
  styleUrl: 'product-component.css',
  shadow: true,
})

export class ProductComponent {
  @Element() element: HTMLElement;
  @Prop() product: DBproduct;
  @State() url: 'http://localhost:8080/products'
  async componentWillLoad() {

  }

  async uploadImage(file, element, id) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      fd.append('id', id);
      await PostImage('http://localhost:8080/productimage-upload', fd);
      const reader = new FileReader();
      reader.onload = () => {
        const image = `url(${reader.result})`;
        if (image != null) {
          this.element.shadowRoot.querySelector(element).style.backgroundImage = image;
        }
      };
      reader.readAsDataURL(file[0]);
    }
  }

  render() {
    return (
      <Host>
        <ion-card-content class='productContainer'>
          <ion-row>
            <ion-col class='productIcon'>
              <label htmlFor='file' class='uploadbutton'>Upload</label>
              <input id='file' type='file' onChange={(event: any) => this.uploadImage(event.target.files, '.productIcon', this.product.name)} hidden />
            </ion-col>
            <ion-col size="auto">
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
