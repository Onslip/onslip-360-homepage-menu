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
      await PostImage('http://localhost:8080/products', fd);
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);

      reader.onload = () => {
        const image = `url(${reader.result})`;

        if (image != null) {
          const img = document.createElement('img');

          const height = '200px'
          const mainelement = document.querySelector('homepage-menu-component');
          mainelement.shadowRoot.querySelector(element).style.height = height
          img.src = reader.result.toString();
          img.style.height = height;
          const a = mainelement.shadowRoot.querySelector(element);
          a.removeChild(a.childNodes[0]);
          mainelement.shadowRoot.querySelector(element).appendChild(img);
        }
      };

    }
  }

  render() {
    return (
      <Host>
        <ion-card-content class='productContainer'>
          <ion-row>
            <ion-col class='productIcon'>
              <label htmlFor='file' class='uploadbutton'>Upload</label>
              <input id='file' type='file' onChange={(event) => this.uploadImage(event, '.productIcon', this.product.name)} hidden />
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
