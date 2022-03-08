import { Component, State, Host, h, Element, Prop } from '@stencil/core';
import { DBItems, DBImage } from '../../utils/utils';
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
  @State() responsedata: DBItems[]
  @State() loading: boolean = true
  @State() errormessage: string
  @Element() element: HTMLElement;
  @Prop() toggle: boolean;
  @State() images: DBImage[]

  async componentWillLoad() {
    GetData(this.url)
      .then(response => this.responsedata = response)
      .then(() => { this.loading = false })
      .catch(() => {
        this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        this.loading = false
      });
    if (config?.useProductImages) {
      GetData(this.produrl)
        .then(response => this.images = response)
        .then(() => { this.loading = false })
        .then(() => this.LoadImages())
        .catch(() => {
          this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
          this.loading = false
        });
    }
  }

  async LoadImages() {
    this.images.map(async i => {
      const loadedImage = await loadProdImage(i.image);
      const img = document.createElement('img');
      img.className = 'productIcon';
      img.src = loadedImage.toString();
      this.element.shadowRoot.getElementById(`${i.product_id}`).appendChild(img);
    })

  }

  async uploadImage(file, element, name, id) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      fd.append('id', await name);
      await PostImage(this.produrl, fd);
      const reader = new FileReader();
      reader.onload = () => {
        const el = this.element.shadowRoot.getElementById(`${id}`);
        el.removeChild(el.childNodes[1])
        const img = document.createElement('img');
        img.className = element;
        img.src = reader.result.toString();
      }
      reader.readAsDataURL(file[0]);
    }
  }

  doReorder(ev: any) {
    this.responsedata = ev.detail.complete(this.responsedata);
  }


  renderProducts(products) {
    return (products.map(x =>
      <ion-card-content class={config.useProductImages ? 'productContainer' : 'prodContainer-no-image'} >
        <ion-row>
          <ion-col size="1" class='productIcon' hidden={!config.useProductImages} id={x.id}>
            <label htmlFor='file' class='uploadbutton'>Upload</label>
            <input id='file' type='file' onChange={(event: any) => this.uploadImage(event.target.files, '.productIcon', x.name, x.id)} hidden />
          </ion-col>
          <ion-col size="10">
            <ion-row>
              <ion-col class="productName">
                <div>{x.name}</div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class='productDesc'>
                <div>{x.description}</div>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="1" class='productPrice'>
            <div>{x.price}kr</div>
          </ion-col>
        </ion-row>
      </ion-card-content>
    ))
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

                        this.renderProducts(data.products)

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

