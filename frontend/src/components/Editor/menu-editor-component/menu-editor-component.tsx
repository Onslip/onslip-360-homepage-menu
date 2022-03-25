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
  @State() loadedCatImages: DBCatImage[];
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
        .then(response => { this.LoadCatImages(response); this.loadedCatImages = response })
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


  async LoadCatImages(DBimages: DBCatImage[]) {
    DBimages?.forEach(async x => {
      const loadedimage = await loadImage(x);

      if (config.categoryImages.style == 'Background') {
        this.element.shadowRoot.getElementById(`${x.category_id}`).style.backgroundImage = `url(${loadedimage})`
      }
      else {
        this.element.shadowRoot.getElementById(`${x.category_id}`).querySelector('ion-card-header').style.backgroundImage = `url(${loadedimage})`
      }
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
      const imageExists = this.loadedCatImages.find(i => i.category_id == id) != undefined
      fileReader.onload = () => {
        if (imageExists) {
          const x: DBCatImage[] = this.loadedCatImages
          x.find(i => i.category_id == id).image = fileReader.result.toString()
          this.loadedCatImages = [...x]
        }
        else {
          this.loadedCatImages = [...this.loadedCatImages, { category_id: id, image: fileReader.result.toString() }]
        }
        if (config.categoryImages.style == 'Background') {
          this.element.shadowRoot.getElementById(`${id}`).style.backgroundImage = `url(${fileReader.result})`
        }
        else {
          this.element.shadowRoot.getElementById(`${id}`).querySelector('ion-card-header').style.backgroundImage = `url(${fileReader.result})`
        }
      }
      fileReader.readAsDataURL(file[0])
    }
  }
  doReorder(ev: any) {
    this.menu.categories = ev.detail.complete(this.menu.categories);
  }

  renderProducts(products) {
    return (products.map(x =>
      <ion-card-content class={config?.productImages?.useProductImages ? 'productContainer' : 'prodContainer-no-image'} >
        <ion-row>
          <ion-col size="1.5" class='productIcon' hidden={!config?.productImages?.useProductImages} >
            {
              this.imagesLoading ?
                <ion-spinner class="spinner"></ion-spinner>
                : [<ion-img src={this.loadedImages?.find(i => i.id == x.id)?.image}></ion-img>,
                <label class={'uploadbutton'}>
                  Välj Fil...
                <input type='file' onChange={(event: any) => this.uploadImage(event.target.files, x.id)} hidden/>
                </label>]
            }
          </ion-col>
          <ion-col>
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
          <ion-col size="1.5" class='productPrice'>
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
                  <div id={data.category.id.toString()} class='card'>
                    <ion-card class='content' style={{ color: config?.font?.fontColor }} data-status={config?.categoryImages.style}>
                      <div>
                        <ion-card-header class='background'>
                          <ion-card-title class={this.toggle ? 'categoryTitle' : 'categoryTitle categoryToggled'} style={{ color: config?.font?.fontTitleColor }} data-status={config?.categoryImages.style}>
                            {data.category.name}
                            {
                              config.categoryImages.useCategoryImages && this.toggle ? 
                              <label class='uploadbutton banner'>
                                Välj Fil...
                                <input class='catImages' type='file' onChange={(event: any) => this.UploadCatImage(event.target.files, data.category.id)} hidden/>
                                </label>
                                :null
                            }
                            <ion-reorder hidden={this.toggle}><ion-icon name="reorder-three-sharp"></ion-icon></ion-reorder>
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

export interface image {
  id: number,
  image: string
}


interface DBCatImage {
  image: any,
  category_id: number
}