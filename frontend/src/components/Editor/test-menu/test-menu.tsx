import { Component, Host, h, Method, State, Element, Prop, getAssetPath } from '@stencil/core';
import { categorywithproduct, DBConnection, MenuWithCategory, config, Timetable, mainConfig, DBproduct, DBImage } from '../../utils/utils';
import { CheckImage, loadImage } from '../../utils/image';
import { PostData } from '../../utils/post';
import { GetData } from '../../utils/get';
@Component({
  tag: 'test-menu',
  styleUrl: 'test-menu.css',
  shadow: true,
  assetsDirs: ['../../../assets'],
})
export class TestMenu {

  @Element() element: HTMLElement;
  private url = 'http://localhost:8080'
  private produrl: string = 'http://localhost:8080/product-image';
  private caturl: string = 'http://localhost:8080/category-image';
  @State() categories: categorywithproduct[];
  @State() AllMenus: MenuWithCategory[]
  @State() menu: MenuWithCategory;
  @State() errormessage: string
  @State() loading: boolean = true
  @State() CanSave: boolean;
  @Prop() toggle: boolean;
  @Prop() menuId?: number;

  @Method() async GetMenu(): Promise<MenuWithCategory[]> {
    return this.AllMenus
  }

  @Method() async GetMenuWithImages(): Promise<MenuWithCategory> {
    return this.menu
  }

  async componentWillLoad() {
    if (!DBConnection) {
      config.categoryImages.style = 'Disabled';
      config.productImages.style = 'Disabled';
    }
    console.log(this.menuId)
    if (this.menuId === undefined) {
      const date = new Date()
      const schedule: Timetable[] = await GetData('http://localhost:8080/schedule')
      this.menuId = schedule.find(s => s.locationId == mainConfig.selectedLocation.id)?.days
        .find(d => d.Day == date.getDay())?.Times
        .find(t => t.time == date.getHours())?.menuid
    }

    await GetData(this.url)
      .then(response => this.AllMenus = response)
      .then(() => this.menu = this.AllMenus.find(m => m.menu.id == this.menuId))
      .then(() => { this.loading = false, config.connect = true })
      .then(() => this.categories = this.menu.categories)
      .then(() => this.getCatImages())
      .then(() => this.getProdImages())
      .catch(() => {
        this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        this.loading = false
        config.connect = false
      });
    console.log(this.AllMenus)
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

  @Method() async uploadProdImage(file: File, id: number, catId: number) {
    if (CheckImage(file)) {
      console.log([catId, id, file])
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.categories.find(c => c.category.id == catId).products.find(p => p.id == id).image = fileReader.result.toString()
        this.categories = [...this.categories]
      }
      fileReader.readAsDataURL(file)
    }
  }

  @Method() async UploadCatImage(file: File, id: number) {
    if (CheckImage(file)) {
      console.log(id)
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.categories.find(i => i.category.id == id).category.image = `url(${fileReader.result})`
        this.categories = [...this.categories]
      }
      fileReader.readAsDataURL(file)
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
      <div class='productContainer'>
        <ion-col hidden={config.productImages.placement === 'Right' || config.productImages.style === 'Disabled'} class='iconLogo' size='3'>
          <div>
            {
              !x.imageLoaded ?
                <ion-spinner class="spinner"></ion-spinner>
                : [<ion-img src={x.image} ></ion-img>,
                <modal-ovelay buttonClass='uploadButton' url={this.produrl} MaxWidth={200} AspectRatio={1.3} TargetId={x.id} buttonValue='Välj bild...' RenderType='image' ImagePosition='Product' CategoryId={x.productcategory_id}></modal-ovelay>
                ]
            }
          </div>
        </ion-col>
        <ion-col class='text'>
          <ion-row>
            <ion-col>
              <div style={{ color: config.font.colors.productName }} class="productName">{x?.name}</div>
            </ion-col>
            <ion-col hidden>
              <div style={{ color: config.font.colors.productPrice }} class="productPrice">{x?.price}kr</div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <div style={{ color: config.font.colors.productDesc }} class="productDesc">{x?.description}</div>
            </ion-col>
          </ion-row>
        </ion-col>
        <ion-col hidden={config.productImages.placement == 'Left' || config.productImages.style === 'Disabled'} class='iconLogo' size='3'>
          <div>
            {
              !x.imageLoaded ?
                <ion-spinner class="spinner"></ion-spinner>
                : [<ion-img src={x.image} ></ion-img>,
                <modal-ovelay buttonClass='uploadButton' url={this.produrl} MaxWidth={200} AspectRatio={1.3} TargetId={x.id} buttonValue='Välj bild...' RenderType='image' ImagePosition='Product' CategoryId={x.productcategory_id}></modal-ovelay>
                ]
            }
          </div>
        </ion-col>
      </div>
    ))
  }


  render() {
    return (
      <Host>
        <video autoplay muted loop id="myVideo">
          <source src={getAssetPath(`../../../assets/${this.menu.menu.name.toLowerCase()}.mp4`)} type='video/mp4' />
        </video>
        <div class="error-message">
          <ion-label>{this.errormessage}</ion-label>
          {this.loading ? <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar> : null}
        </div>
        <div class='container'>
          <div>
            <ion-reorder-group disabled={this.toggle} onIonItemReorder={(ev) => this.doReorder(ev)} class='reorder'>
              {
                !this.loading ?
                  this.categories?.map(data => {

                    return (
                      <div id={data?.category?.id.toString()} class='outer-card' style={{ backgroundImage: config?.categoryImages?.style == 'Background' && data?.category?.imageLoaded ? data?.category?.image : null }}>
                        <ion-card class='content' data-status={config?.categoryImages?.style}>
                          <div>
                            <ion-card-header class='background' style={{ backgroundImage: config?.categoryImages?.style == 'Banner' && data?.category?.imageLoaded ? data?.category?.image : null }}>
                              <ion-card-title class={this.toggle ? 'categoryTitle' : 'categoryTitle categoryToggled'} style={{ color: config?.font?.colors.categoryTitle }} data-status={config?.categoryImages?.style}>
                                {
                                  config?.categoryImages?.style != 'Disabled' && this.toggle ?
                                    <modal-ovelay buttonClass='uploadButton banner' url={this.caturl} MaxWidth={700} AspectRatio={4} TargetId={data.category.id} buttonValue='Välj bild...' RenderType='image' ImagePosition='Category' ></modal-ovelay>
                                    : null
                                }
                                {data?.category?.name}
                                <ion-reorder hidden={this.toggle}><ion-icon name="reorder-three-sharp"></ion-icon></ion-reorder>
                              </ion-card-title>
                            </ion-card-header>
                            {(!data.category.imageLoaded && config.categoryImages.style != 'Disabled') ? <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar> : null}
                          </div>
                          {this.toggle && config.menuType == 'inline' ?
                            this.renderProducts(data?.products)
                            : null}

                        </ion-card>
                      </div>
                    )
                  })
                  : null
              }
            </ion-reorder-group>
          </div>
        </div>
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