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

  @Element() element: HTMLElement;
  private url = 'http://localhost:8080'
  private produrl: string = 'http://localhost:8080/product-image';
  private caturl: string = 'http://localhost:8080/category-image';
  @State() loadedImages: image[];
  @State() loadedCatImages: image[];
  @State() menu: MenuWithCategory
  @State() errormessage: string
  @State() imagesLoading: boolean = true;
  @State() catimagesLoading: boolean = true;
  @State() loading: boolean = true
  @Prop() toggle: boolean;

  async componentWillLoad() {
    GetData(this.url)
      .then(response => this.menu = response[config.menuInUse])
      .then(() => { this.loading = false, config.connect = true })
      .catch(() => {
        this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        this.loading = false
        config.connect = false
      });
    if (config?.productImages?.useProductImages) {
      GetData(this.produrl)
        .then(response => this.LoadImages(response))
        .catch(() => {
          // this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        });
    }
    if (config?.categoryImages?.useCategoryImages) {
      GetData(this.caturl)
        .then(response => this.LoadCatImages(response))
        .catch(() => {
        })
    }
  }


  async LoadImages(DBimages: DBImage[]) {
    const images: image[] = await Promise.all(DBimages.map(async i => {
      return {
        id: i.product_id,
        image: await loadImage(i).then(response => response.toString())
      }
    }))
    this.loadedImages = images
    this.imagesLoading = false
  }

  // async LoadCatImages(DBimages: DBImage[]) {
  //   const images: image[] = await Promise.all(DBimages.map(async i => {
  //     return {
  //       id: i.product_id,
  //       image: await loadImage(i).then(response => response.toString())
  //     }
  //   }))
  //   this.loadedCatImages = images
  //   this.imagesLoading = false
  // }

  async LoadCatImages(DBimages: DBImage[]) {
    DBimages.forEach(x => {
      const loadedimage = loadImage(x);

    })
  }

  async uploadImage(file: File, id: number) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      fd.append('id', String(id));
      await PostImage(this.produrl, fd);

      const fileReader = new FileReader()
      const imageExists = this.loadedImages.find(i => i.id == id) != undefined

      fileReader.onload = () => {
        if (imageExists) {
          const x: image[] = this.loadedImages
          x.find(i => i.id == id).image = fileReader.result.toString()
          this.loadedImages = [...x]
        }
        else {
          this.loadedImages = [...this.loadedImages, { id: id, image: fileReader.result.toString() }]
        }
      }
      fileReader.readAsDataURL(file[0])
    }
  }

  async UploadCatImage(file: File, id: number) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      fd.append('id', String(id));
      await PostImage(this.caturl, fd);
      const fileReader = new FileReader()
      const imageExists = this.loadedCatImages.find(i => i.id == id) != undefined
      fileReader.onload = () => {
        if (imageExists) {
          const x: image[] = this.loadedCatImages
          x.find(i => i.id == id).image = fileReader.result.toString()
          this.loadedCatImages = [...x]
        }
        else {
          this.loadedCatImages = [...this.loadedCatImages, { id: id, image: fileReader.result.toString() }]
        }
      }
      fileReader.readAsDataURL(file[0])
    }
  }
  doReorder(ev: any) {
    this.menu = ev.detail.complete(this.menu);
  }

  renderProducts(products) {
    return (products.map(x =>
      <ion-card-content class={config?.productImages?.useProductImages ? 'productContainer' : 'prodContainer-no-image'} >
        <ion-row>
          <ion-col size="1" class='productIcon' hidden={!config?.productImages?.useProductImages} >
            {
              this.imagesLoading ?
                <ion-spinner class="spinner"></ion-spinner>
                : [<img src={this.loadedImages?.find(i => i.id == x.id)?.image} class='productIcon'></img>,
                <input id='file' type='file' onChange={(event: any) => this.uploadImage(event.target.files, x.id)} />]
            }
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
        <ion-reorder-group disabled={this.toggle} onIonItemReorder={(ev) => this.doReorder(ev)} class='reorder'>
          {
            !this.loading ?
              this.menu.categories.map(data => {
                return (
                  <div>
                    <ion-card class='card' style={{ color: config?.font?.fontColor }}>
                      <div>
                        <ion-card-header>
                          <ion-card-title id={data.category.id} class={this.toggle ? 'categoryTitle' : 'categoryToggled'} style={{ color: config?.font?.fontTitleColor }}>
                            {data.category.name}
                            {
                              this.toggle ? <input class='catImages' type='file' onChange={(event: any) => this.UploadCatImage(event.target.files, data.category.id)} />
                                : <ion-reorder hidden={this.toggle}></ion-reorder>
                            }
                          </ion-card-title>

                        </ion-card-header>
                      </div>
                      {this.toggle ?
                        this.renderProducts(data.products)
                        : null}
                    </ion-card>
                    {/* {config.categoryImages.style == 'Background' ? this.element.shadowRoot.getElementById('card').style.background = `url(${this.loadedCatImages.find(x => x.id == data.category.id).image})` : this.element.shadowRoot.querySelector('categoryTitle').style.background = `url(${this.loadedCatImages.find(x => x.id == data.category.id).image})`} */}
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

export interface image {
  id: number,
  image: string
}
