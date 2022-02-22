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
  @State() url: 'http://localhost:8080/productimage-upload'
  async componentWillLoad() {
    await this.loadImage('.productIcon');
  }

  async loadImage(element) {
    const backgroundbyte = new Uint8Array(this.product.image.data);
    console.log(this.product.image.data);
    const blob = new Blob([backgroundbyte.buffer]);
    console.log(blob);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        this.element.shadowRoot.querySelector(element).style.backgroundImage = image;
      }
    };
  }

  async uploadImage(file, element, id) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      fd.append('id', await id);
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
