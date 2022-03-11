import { Component, State, Host, h, Element, Prop } from '@stencil/core';
import { DBItems, DBImage, MenuWithCategory, categorywithproduct } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { config } from '../../utils/utils';
import { CheckImage, loadImage } from '../../utils/image';
import { PostImage } from '../../utils/post';

@Component({
  tag: 'menu-editor-component',
  styleUrl: 'menu-editor-component.css',
  shadow: true,
})
export class MenuEditorComponent {

  @State() private url = 'http://localhost:8080'
  private produrl: string = 'http://localhost:8080/productimage-upload';
  @State() responsedata: MenuWithCategory[];
  @State() loading: boolean = true
  @State() errormessage: string
  @Element() element: HTMLElement;
  @Prop() toggle: boolean;
  @State() images: DBImage[]

  async componentWillLoad() {
    GetData(this.url)
      .then(response => this.responsedata = response)
      .then(() => { this.loading = false, config.connect = true })
      .catch(() => {
        this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        this.loading = false
        config.connect = false
      });
    if (config?.useProductImages) {
      GetData(this.produrl)
        .then(response => this.images = response)
        .catch(() => {
          // this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        });
    }
  }

  async componentDidRender() {
    if (config?.useProductImages && this.toggle && this.loading == false) {
      this.LoadImages();
    }
  }

  async LoadImages() {
    this.images.map(async i => {
      const loadedImage = await loadImage(i);
      const img = document.createElement('img');
      img.className = 'productIcon';
      img.src = loadedImage.toString();
      img.id = i.product_id.toString();
      this.element.shadowRoot.getElementById(`${i.product_id}`).replaceWith(img);
    })
  }

  async uploadImage(file, name, id) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      fd.append('id', await name);
      await PostImage(this.produrl, fd);
      const reader = new FileReader();
      reader.onload = () => {
        console.log(id);
        const img = document.createElement('img');
        img.className = 'productIcon';
        img.src = reader.result.toString();
        img.id = id.toString();
        this.element.shadowRoot.getElementById(id).replaceWith(img);
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
          <ion-col size="1" class='productIcon' hidden={!config.useProductImages} >
            <img id={x.id}></img>
            <input id='file' type='file' placeholder="" onChange={(event: any) => this.uploadImage(event.target.files, x.name, x.id)} />
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
                          <ion-card-title class={this.toggle ? 'categoryTitle' : 'categoryToggled'} style={{ color: config?.font?.fontTitleColor }}>
                            {data[0].categories.category.name}
                            <ion-reorder hidden={this.toggle}></ion-reorder>

                          </ion-card-title>

                        </ion-card-header>
                      </div>
                      {this.toggle ?
                        this.renderProducts(data[0].categories)
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

