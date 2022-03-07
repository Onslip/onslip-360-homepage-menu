import { Component, State, Host, h, Element, Prop } from '@stencil/core';
import { DBproduct, productsWithCategory } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { config } from '../../utils/utils';
import { CheckImage, loadImage, loadProdImage } from '../../utils/image';
import { PostImage } from '../../utils/post';

@Component({
  tag: 'menu-editor-component',
  styleUrl: 'menu-editor-component.css',
  shadow: true,
})
export class MenuEditorComponent {

  @State() private url = 'http://localhost:8080'
  private produrl: string = 'http://localhost:8080/productimage-upload';

  @State() responsedata: productsWithCategory[]
  @State() loading: boolean = true
  @State() errormessage: string
  @State() product: DBproduct;
  @Element() element: HTMLElement;
  @Prop() toggle: boolean;
  @State() image;

  async componentWillLoad() {
    GetData(this.url)
      .then(response => this.responsedata = response)
      .then(() => { this.loading = false })
      .catch(() => {
        this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        this.loading = false
      });
  }


  async uploadImage(file, element, name) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      fd.append('id', await name);
      await PostImage(this.produrl, fd);
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

  doReorder(ev: any) {
    this.responsedata = ev.detail.complete(this.responsedata);
  }

  async getImage(product) {
    this.image = await loadImage(product.image).catch(err => err)
  }

  renderProducts(product: DBproduct) {
    this.getImage(product);
    return (
      <ion-card-content class={config.useProductImages ? 'productContainer' : 'prodContainer-no-image'}>
        <ion-row>
          <ion-col size="1" class='productIcon' style={{ backgroundImage: this.image }} hidden={!config.useProductImages}>
            <label htmlFor='file' class='uploadbutton'>Upload</label>
            <input id='file' type='file' onChange={(event: any) => this.uploadImage(event.target.files, '.productIcon', product.name)} hidden />
          </ion-col>
          <ion-col size="10">
            <ion-row>
              <ion-col class="productName">
                <div>{product.name}</div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class='productDesc'>
                <div>{product.description}</div>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="1" class='productPrice'>
            <div>{product.price}kr</div>
          </ion-col>
        </ion-row>
      </ion-card-content>
    )
  }

  render() {
    return (
      <Host>
        <div class="error-message">
          <ion-label>{this.errormessage}</ion-label>
          {this.loading ? <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar> : null}
        </div>
        <ion-reorder-group disabled={this.toggle} onIonItemReorder={(ev) => this.doReorder(ev)}>
          {
            !this.loading ?
              this.responsedata?.map(data => {
                return (
                  <div>
                    <ion-card class='card' style={{ color: config?.font?.fontColor }}>
                      <div>
                        <ion-card-header>
                          <ion-reorder>
                            <ion-card-title class={this.toggle ? 'categoryTitle' : 'categoryToggled'} style={{ color: config?.font?.fontTitleColor }}>
                              {data.category.name}
                            </ion-card-title>
                          </ion-reorder>
                        </ion-card-header>
                      </div>
                      {this.toggle ?
                        data.products.map(product => {
                          return (
                            this.renderProducts(product)
                          )
                        })
                        : null}
                    </ion-card>
                  </div>
                )
              })
              : null
          }
        </ion-reorder-group>
      </Host>
    )
  }

}

