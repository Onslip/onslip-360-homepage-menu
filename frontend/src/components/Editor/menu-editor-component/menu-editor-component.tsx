import { Component, State, Host, h, Element, Prop, Method, getAssetPath } from '@stencil/core';
import { categorywithproduct, DBConnection, DBImage, DBCatImage, DBproduct, MenuWithCategory } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { config } from '../../utils/utils';
import { CheckImage, loadImage } from '../../utils/image';
import { PostData } from '../../utils/post';
import { paths } from '../../utils/urlPaths';

@Component({
  tag: 'menu-editor-component',
  styleUrl: 'menu-editor-component.css',
  shadow: true,
  assetsDirs: ['../../../assets'],
})
export class MenuEditorComponent {

  @Element() element: HTMLElement;
  @State() categories: categorywithproduct[];
  @State() menu: MenuWithCategory;
  @State() errormessage: string
  @State() loading: boolean = true
  @State() CanSave: boolean;
  @Prop() toggle: boolean;
  @Prop() menuId: number;


  async componentWillLoad() {
    if (!DBConnection.DatabaseConnected) {
      config.categoryImages.style = 'Disabled';
      config.productImages.style = 'Disabled';
    }
    console.log(DBConnection)

    await GetData(`${paths.products}?id=${this.menuId}`)
      .then(response => this.menu = response)
      .then(() => { this.loading = false, config.connect = true })
      .then(() => this.categories = this.menu.categories)
      .then(() => { config?.menuType != "paper" || config?.categoryImages?.style == 'Disabled' ? this.getCatImages() : null })
      .then(() => { config?.menuType != "paper" || config?.productImages?.style == 'Disabled' ? this.getProdImages() : null })

      .catch(() => {
        this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        this.loading = false
        config.connect = false
      })
  }

  componentDidRender() {
    this.setProperties();
  }

  setProperties() {
    document.documentElement.style.setProperty('--prodTitle', config?.font.colors.categoryTitle)
    document.documentElement.style.setProperty('--prodName', config?.font.colors.productName)
    document.documentElement.style.setProperty('--prodDesc', config?.font.colors.productDesc)
    document.documentElement.style.setProperty('--prodPrice', config?.font.colors.productPrice)
    document.documentElement.style.setProperty('--menuBackground', config?.menuBackground)

    if (config.background.enabled) {
      document.documentElement.style.setProperty('--backgroundColor', config?.background.color)
    }
  }

  async getCatImages() {
    if (config?.categoryImages?.style != 'Disabled' && DBConnection) {
      GetData(paths.categoryImages)
        .then(response => { this.LoadCatImages(response); })
        .catch(() => {
        });
    }
  }

  async getProdImages() {
    if (config?.productImages?.style != 'Disabled' && DBConnection) {
      GetData(paths.productImages)
        .then(response => this.LoadImages(response))
        .catch(() => {
        });
    }
  }

  @Method() async deletedProdImg(id: number, type?: 'Product' | 'Category') {
    this.categories.forEach(cat => {
      if (type == 'Category' && cat.category.id == id) {
        cat.category.image = undefined
      }
      cat.products.forEach(prod => {
        if (type == 'Product' && prod.id == id) {
          prod.image = getAssetPath(`../../../assets/placeholder.png`)
        }
      })
    })
    this.categories = [...this.categories]
  }

  async LoadImages(DBimages: DBImage[]) {
    this.categories.forEach(async c => {
      c.products.forEach(async p => {
        try {
          p.image = (await loadImage(DBimages.find(i => i.product_id == p.id).image.data)).toString()
        } catch (error) {
          p.image = getAssetPath(`../../../assets/placeholder.png`)
        } finally {
          p.imageLoaded = true
          this.categories = [...this.categories]
        }
      })
    })
  }

  async LoadCatImages(DBimages: DBCatImage[]) {
    this.categories?.forEach(async c => {
      try {
        c.category.image = `url(${await loadImage(DBimages.find(i => i.category_id == c.category.id).image.data)})`
      } catch (error) {
      } finally {
        c.category.imageLoaded = true
        this.categories = [...this.categories]
      }
    })
  }

  @Method() async uploadProdImage(file: File, id: number, catId: number) {
    if (CheckImage(file)) {
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
    PostData(paths.position, newMenu)
  }

  renderProducts(products?: DBproduct[]) {
    return (products?.map(x =>
      <div class='productContainer'>
        <ion-col hidden={config.productImages.placement == 'Right' || config.productImages.style == 'Disabled'} class='iconLogo' size='3'>
          <div>
            {
              !x.imageLoaded ?
                <ion-spinner class="spinner"></ion-spinner>
                :
                <div class="prodImg">
                  <ion-img src={x.image} ></ion-img>
                  <modal-ovelay buttonClass='uploadButton' url={paths.productImages} MaxWidth={200} AspectRatio={1.77} TargetId={x.id} RenderType='image' ImagePosition='Product' iconName='share-sharp' CategoryId={x.productcategory_id}></modal-ovelay>
                </div>
            }
          </div>
        </ion-col>
        <ion-col class='text'>
          <ion-row>
            <ion-col>
              <div class="productName">{x?.name}</div>
            </ion-col>
            <ion-col>
              <div class="productPrice">{x?.price}kr</div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <div class="productDesc">{x?.description}</div>
            </ion-col>
          </ion-row>
        </ion-col>
        <ion-col hidden={config.productImages.placement == 'Left' || config.productImages.style == 'Disabled'} class='iconLogo' size='3'>
          <div>
            {
              !x.imageLoaded ?
                <ion-spinner class="spinner"></ion-spinner>
                :
                <div class="prodImg">
                  <ion-img src={x.image} ></ion-img>
                  <modal-ovelay buttonClass='uploadButton' url={paths.productImages} MaxWidth={200} AspectRatio={1.77} TargetId={x.id} RenderType='image' ImagePosition='Product' iconName='share-sharp' CategoryId={x.productcategory_id}></modal-ovelay>
                </div>
            }
          </div>
        </ion-col>

      </div>
    ))
  }

  renderCards(products?: DBproduct[]) {
    return (
      <ion-row class='products'>
        {products?.map(x =>
          <ion-card class={"product"} id='scroll-container'>
            <div hidden={config?.productImages.style == 'Disabled'}>
              {
                !x.imageLoaded ?
                  <ion-spinner class="spinner"></ion-spinner>
                  :
                  <div class='prodImg'>
                    <ion-img src={x.image} ></ion-img>
                    <modal-ovelay buttonClass='uploadButton' url={paths.productImages} MaxWidth={200} AspectRatio={1.77} TargetId={x.id} iconName='share-sharp' RenderType='image' ImagePosition='Product' CategoryId={x.productcategory_id}></modal-ovelay>
                  </div>
              }
            </div>
            <div class="card-text">
              <ion-card-header>
                <div class='card productName'>{x.name}</div>
                <div class='card productDesc'>{x.description}</div>
              </ion-card-header>
              <ion-card-content class='productContent'>
                <div class='card productPrice'>{x.price} sek</div>
              </ion-card-content>
            </div>
          </ion-card>)}
      </ion-row>
    )
  }

  renderPaper() {
    return (
      <ion-reorder-group onIonItemReorder={(ev) => this.doReorder(ev)} disabled={this.toggle} class={this.toggle ? 'paper-content' : 'reorder'}>
        {
          !this.loading ?
            this.categories?.map(data => {
              return (
                <div class={this.toggle ? 'paper-section' : 'paper-section categoryToggled'}>
                  <div >
                    <ion-title class='categoryTitle'>
                      {data?.category?.name}
                      <ion-reorder hidden={this.toggle}>
                        <ion-icon name="reorder-three-sharp"></ion-icon>
                      </ion-reorder>
                    </ion-title>
                  </div>
                  <ion-col class="paper-products" hidden={!this.toggle}>
                    {data.products.map(x => {
                      return (
                        <ion-row>
                          <ion-col>
                            <ion-row>
                              <div class='productName'>{x.name}</div>
                              <ion-col class="separator"></ion-col>
                              <div class='productPrice'>{x.price} sek</div>
                            </ion-row>
                            <ion-row>
                              <div class='productDesc'>{x.description}</div>
                            </ion-row>
                          </ion-col>
                        </ion-row>
                      )
                    })
                    }
                  </ion-col>
                </div>
              )
            })
            : null
        }
      </ion-reorder-group>
    )
  }

  render() {
    return (
      <Host>
        <div class="error-message">
          <ion-label>{this.errormessage}</ion-label>
          {this.loading ? <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar> : null}
        </div>
        <div>
          {config.menuType == 'paper' ? this.renderPaper() :
            <ion-reorder-group disabled={this.toggle} onIonItemReorder={(ev) => this.doReorder(ev)} class='reorder'>
              {
                !this.loading ?
                  this.categories?.map(data => {

                    return (
                      <div id={data?.category?.id.toString()} class='outer-card' style={{ backgroundImage: config?.categoryImages?.style == 'Background' && data?.category?.imageLoaded ? data?.category?.image : null }}>
                        <div class={config?.categoryImages?.style == 'Background' ? 'categoryBackground' : null}>
                          <ion-card class='content' data-status={config?.categoryImages?.style}>
                            <div>
                              <ion-card-header class='background' style={{ backgroundImage: config?.categoryImages?.style == 'Banner' && data?.category?.imageLoaded ? data?.category?.image : null }}>
                                <ion-card-title class={this.toggle ? 'categoryTitle' : 'categoryTitle categoryToggled'} data-status={config?.categoryImages?.style}>
                                  {
                                    config?.categoryImages?.style != 'Disabled' && this.toggle ?
                                      <modal-ovelay buttonClass='uploadButton banner' url={paths.categoryImages} MaxWidth={700} AspectRatio={4} TargetId={data.category.id} iconName='share-sharp' RenderType='image' ImagePosition='Category' ></modal-ovelay>
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
                            {this.toggle && config.menuType == 'card' ?
                              this.renderCards(data?.products)
                              : null}

                          </ion-card>
                        </div>
                      </div>
                    )
                  })
                  : null
              }
            </ion-reorder-group>
          }
        </div>
        {!this.toggle ? <ion-button class='saveButton' onClick={() => this.SaveReorder()} disabled={!this.CanSave}>Spara</ion-button> : null}
      </Host>
    )
  }
}