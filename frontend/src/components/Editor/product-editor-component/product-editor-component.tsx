import { Component, h, Prop, Host, State, Element, Method } from '@stencil/core';
import { GetData } from '../../utils/get';
import { CheckImage } from '../../utils/image';
import { PostImage } from '../../utils/post';
import { DBproduct } from '../../utils/utils';
import { Styleconfig } from '../../utils/utils';

@Component({
  tag: 'product-editor-component',
  styleUrl: 'product-editor-component.css',
  shadow: true,
})
export class ProductEditorComponent {
  @Element() element: HTMLElement;
  @Prop() product: DBproduct;
  @State() url: 'http://localhost:8080/productimage-upload'
  @State() config: Styleconfig

  async componentWillLoad() {
    this.config = await GetData('http://localhost:8080/backgroundcolor')
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
  @Method() render2() {
    this.render()
  }

  render() {
    return (
      <Host>
        <ion-card-content class={this.config.useProductImages ? 'productContainer' : 'prodContainer-no-image'}>
          <ion-row>
            <ion-col size="1" class='productIcon' hidden={!this.config.useProductImages}>
              <label htmlFor='file' class='uploadbutton'>Upload</label>
              <input id='file' type='file' onChange={(event: any) => this.uploadImage(event.target.files, '.productIcon', this.product.name)} hidden />
            </ion-col>
            <ion-col size="10">
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
            <ion-col size="1" class='productPrice'>
              <div>{this.product.price}kr</div>
            </ion-col>
          </ion-row>
        </ion-card-content>
      </Host>
    );
  }
}
