import { Component, State, Host, h, Element, Prop } from '@stencil/core';
import { DBImage, MenuWithCategory } from '../../utils/utils';
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
  private produrl: string = 'http://localhost:8080/product-image';
  @State() loading: boolean = true
  @State() errormessage: string
  @Element() element: HTMLElement;
  @Prop() toggle: boolean;
  @State() images: DBImage[]
  @State() menu: MenuWithCategory
  @State() loadingImages: boolean = true;
  @State() loadedImages: { id: number, image: string }[]

  async componentWillLoad() {
    GetData(this.url)
      .then(response => this.menu = response[config.menuInUse])
      .then(() => { this.loading = false, config.connect = true })
      .catch(() => {
        this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        this.loading = false
        config.connect = false
      });
    if (config?.useProductImages) {
      GetData(this.produrl)
        .then(response => this.images = response)
        .then(() => { this.loadingImages = false })
        .catch(() => {
          // this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        });
    }
  }

  // async componentDidRender() {
  //   if (config?.useProductImages && this.toggle && this.loading == false) {
  //     this.LoadImages();
  //   }
  // }
  async componentDidLoad() {
    await this.images.forEach(async x => { const loadedimage = await loadImage(x); this.loadedImages.push({ id: x.product_id, image: loadedimage.toString() }) })
  }

  // LoadImages(id: number): any {
  //   const selectImage = this.images.find(x => x.product_id == id);
  //   const byte = new Uint8Array(selectImage.image.data)
  //   const blob = new Blob([byte.buffer])

  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob);

  //   const image = reader.result.toString();
  //   console.log(image)

  //   return <img src={ } class='productIcon'></img>


  // }

  async uploadImage(file, id) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      fd.append('id', await id);
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
    this.menu = ev.detail.complete(this.menu);
  }

  renderProducts(products) {
    return (products.map(x =>
      <ion-card-content class={config.useProductImages ? 'productContainer' : 'prodContainer-no-image'} >
        <ion-row>
          <ion-col size="1" class='productIcon' hidden={!config.useProductImages} >
            {this.loadingImages ? null :
              <img src={this.loadedImages.find(z => z.id == x.id).image}></img>}
            < input id='file' type='file' placeholder="" onChange={(event: any) => this.uploadImage(event.target.files, x.id)} />
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
              this.menu.categories.map(data => {
                return (
                  <div>
                    <ion-card class='card' style={{ color: config?.font?.fontColor }}>
                      <div>
                        <ion-card-header>
                          <ion-card-title class={this.toggle ? 'categoryTitle' : 'categoryToggled'} style={{ color: config?.font?.fontTitleColor }}>
                            {data.category.name}
                            <ion-reorder hidden={this.toggle}></ion-reorder>

                          </ion-card-title>

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

