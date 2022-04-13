import { Component, State, Host, h, Element, Prop, getAssetPath } from '@stencil/core';
import { categorywithproduct, DBConnection, DBImage, DBproduct, MenuWithCategory } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { config } from '../../utils/utils';
import { CheckImage, loadImage } from '../../utils/image';
import { PostData, PostImage } from '../../utils/post';

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
  @State() categories: categorywithproduct[];
  @State() menu: MenuWithCategory;
  @State() errormessage: string
  @State() loading: boolean = true
  @State() CanSave: boolean;
  @Prop() toggle: boolean;

  async componentWillLoad() {
    if (!DBConnection) {
      config.categoryImages.style = 'Disabled';
      config.productImages.style = 'Disabled';
    }
    GetData(this.url)
      .then(response => this.menu = response[config.menuInUse])
      .then(() => { this.loading = false, config.connect = true })
      .then(() => this.categories = this.menu.categories)
      .then(() => this.getCatImages())
      .then(() => this.getProdImages())
      .catch(() => {
        this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        this.loading = false
        config.connect = false
      });
  }

  async getCatImages() {
    if (config?.categoryImages?.style != 'Disabled' && DBConnection) {
      GetData(this.caturl)
        .then(response => { this.LoadCatImages(response); })
        .catch(() => {
        });
    }
  }

  private getProdImages() {
    if (config?.productImages?.style != 'Disabled' && DBConnection) {
      GetData(this.produrl)
        .then(response => this.LoadImages(response))
        .catch(() => {
        });
    }
  }

  async LoadImages(DBimages: DBImage[]) {
    this.categories.forEach(async c => {
      c.products.forEach(async p => {
        try {
          loadImage(DBimages.find(i => i.product_id == p.id).image.data)
            .then(response => p.image = response.toString())
            .then(() => p.imageLoaded = true)
            .then(() => this.categories = [...this.categories])
            .catch(err => err)
        } catch (error) {
          p.imageLoaded = true
          this.categories = [...this.categories]
        }

      })
    })
  }

  async LoadCatImages(DBimages: DBCatImage[]) {
    this.categories?.forEach(async c => {
      try {
        loadImage(DBimages.find(i => i.category_id == c.category.id).image.data)
          .then(response => c.category.image = `url(${response?.toString() ?? ''})`)
          .then(() => c.category.imageLoaded = true)
          .then(() => this.categories = [...this.categories])
          .catch(err => err)
      } catch (error) {
        c.category.imageLoaded = true
        this.categories = [...this.categories]
      }
    })
  }

  async uploadProdImage(file: File, id: number, catId: number) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      fd.append('id', String(id));
      await PostImage(this.produrl, fd);
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.categories.find(c => c.category.id == catId).products.find(p => p.id == id).image = fileReader.result.toString()
        this.categories = [...this.categories]
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
      fileReader.onload = () => {
        this.categories.find(i => i.category.id == id).category.image = `url(${fileReader.result})`
        this.categories = [...this.categories]
      }
      fileReader.readAsDataURL(file[0])
    }
  }

  async doReorder(ev: any) {
    this.categories = ev.detail.complete(this.categories);
    this.CanSave = true;
  }

  async SaveReorder() {
    this.CanSave = false;
    const newMenu = { menu: this.menu?.menu?.id, categories: this.categories?.map(x => { return { id: x?.category?.id, position: this.categories?.indexOf(x) } }) }
    PostData('http://localhost:8080/updateposition', newMenu)
  }

  renderProducts(products?: DBproduct[]) {
    return (products?.map(x =>
      <content-component class={'productContainer'} style={{ backgroundImage: config?.productImages?.style == 'Background' && x?.imageLoaded ? `url(${x?.image})` : '' }}>
        {!x?.imageLoaded && config?.productImages?.style == 'Background' ?
          <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar>
          : <div hidden={config?.productImages?.style != 'Background'}>
            <modal-ovelay buttonClass='uploadButton' url={this.produrl} MaxWidth={100} AspectRatio={1} TargetId={x.id} buttonValue='Välj bild...' RenderType='image' ImagePosition='Menu'></modal-ovelay>
          </div>}
        <ion-col class="productName" slot="primary">
          <div>{x?.name}</div>
        </ion-col>
        <ion-col class="productPrice" slot="primary">
          <div>{x?.price}kr</div>
        </ion-col>
        <ion-col class="productDesc" slot="secondary">
          <div>{x?.description}</div>
        </ion-col>
        <ion-col size="1.5" class={config?.productImages?.style == 'Background' ? 'iconBackground' : 'iconLogo'} hidden={config?.productImages?.style != 'Logo'} slot={config?.productImages?.placement == "Left" ? 'start' : 'end'}>
          {
            !x.imageLoaded ?
              <ion-spinner class="spinner"></ion-spinner>
              : [<ion-img src={x.image} ></ion-img>,
              <modal-ovelay buttonClass='uploadButton' url={this.produrl} MaxWidth={100} AspectRatio={1} TargetId={x.id} buttonValue='Välj bild...' RenderType='image' ImagePosition='Menu'></modal-ovelay>
              ]
          }
        </ion-col>
      </content-component>
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
              this.categories?.map(data => {

                return (
                  <div id={data?.category?.id.toString()} class='card' style={{ backgroundImage: config?.categoryImages?.style == 'Background' && data?.category?.imageLoaded ? data?.category?.image : null }}>
                    <ion-card class='content' style={{ color: config?.font?.fontColor }} data-status={config?.categoryImages?.style}>
                      <div>
                        <ion-card-header class='background' style={{ backgroundImage: config?.categoryImages?.style == 'Banner' && data?.category?.imageLoaded ? data?.category?.image : null }}>
                          <ion-card-title class={this.toggle ? 'categoryTitle' : 'categoryTitle categoryToggled'} style={{ color: config?.font?.fontTitleColor }} data-status={config?.categoryImages?.style}>
                            {
                              config?.categoryImages?.style != 'Disabled' && this.toggle ?
                                <modal-ovelay buttonClass='uploadButton banner' url={this.caturl} MaxWidth={1000} AspectRatio={6} TargetId={data.category.id} buttonValue='Välj bild...' RenderType='image' ImagePosition='Menu' ></modal-ovelay>
                                : null
                            }
                            {data?.category?.name}
                            <ion-reorder hidden={this.toggle}><ion-icon name="reorder-three-sharp"></ion-icon></ion-reorder>
                          </ion-card-title>
                        </ion-card-header>
                        {(!data.category.imageLoaded && config.categoryImages.style != 'Disabled') ? <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar> : null}
                      </div>
                      {this.toggle ?
                        this.renderProducts(data?.products)
                        : null}
                    </ion-card>
                  </div>
                )
              })
              : null

          }
        </ion-reorder-group>
        {!this.toggle ? <ion-button class='saveButton' onClick={() => this.SaveReorder()} disabled={!this.CanSave}>Spara</ion-button> : null}
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