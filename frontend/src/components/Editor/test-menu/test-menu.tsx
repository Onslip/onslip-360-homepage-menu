import { Component, Host, h, State, Method, Element, Prop } from '@stencil/core';
import { GetData } from '../../utils/get';
import { loadImage } from '../../utils/image';
import { categorywithproduct, config, DBConnection, DBImage, mainConfig, MenuWithCategory } from '../../utils/utils';
import { Timetable } from '../modals/schedule-overlay/schedule-overlay';

@Component({
  tag: 'test-menu',
  styleUrl: 'test-menu.css',
  shadow: true,
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

    const date = new Date()
    const schedule: Timetable[] = await GetData('http://localhost:8080/schedule')
    const menuId = schedule.find(s => s.locationId == mainConfig.selectedLocation.id)?.days
      .find(d => d.Day == date.getDay())?.Times
      .find(t => t.time == date.getHours())?.menuid

    GetData(this.url)
      .then(response => this.AllMenus = response)
      .then(() => this.menu = this.AllMenus.find(m => m.menu.id == menuId))
      .then(() => { this.loading = false, config.connect = true })
      .then(() => this.categories = this.menu.categories)
      .then(() => this.getCatImages())
      .then(() => this.getProdImages())
      .catch(() => {
        this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        this.loading = false
        config.connect = false
      });
    console.log('test')
  }

  private getProdImages() {
    if (config?.productImages?.style != 'Disabled' && DBConnection) {
      GetData(this.produrl)
        .then(response => this.LoadImages(response))
        .catch(() => {
        });
    }
  }
  async getCatImages() {
    if (config?.categoryImages?.style != 'Disabled' && DBConnection) {
      GetData(this.caturl)
        .then(response => { this.LoadCatImages(response); })
        .catch(() => {
        });
    }
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

  scrollSideways(e: CustomEvent) {
    const el = this.element.shadowRoot.querySelector('#scroll-container');
    el.scrollLeft += e.detail.direction * 100;
  }


  render() {
    return (
      <Host>
        <div class="error-message">
          <ion-label>{this.errormessage}</ion-label>
          {this.loading ? <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar> : null}
        </div>
        {/* <ion-reorder-group disabled={this.toggle} class='reorder'> */}
        {
          !this.loading ?
            this.categories?.map(data => {

              return (
                <div id={data?.category?.id.toString()} class='card' style={{ backgroundImage: config?.categoryImages?.style == 'Background' && data?.category?.imageLoaded ? data?.category?.image : null }}>
                  <ion-card class='content' style={{ color: config?.font?.fontColor }} data-status={config?.categoryImages?.style}>
                    <div>
                      <ion-title class='background' style={{ backgroundImage: config?.categoryImages?.style == 'Banner' && data?.category?.imageLoaded ? data?.category?.image : null }}>
                        <div class={this.toggle ? 'categoryTitle' : 'categoryTitle categoryToggled'} style={{ color: config?.font?.fontTitleColor }} data-status={config?.categoryImages?.style}>
                          {
                            config?.categoryImages?.style != 'Disabled' && this.toggle ?
                              <modal-ovelay buttonClass='uploadButton banner' url={this.caturl} MaxWidth={700} AspectRatio={4} TargetId={data.category.id} buttonValue='Välj bild...' RenderType='image' ImagePosition='Category' ></modal-ovelay>
                              : null
                          }
                          {data?.category?.name}
                          <ion-icon name="reorder-three-sharp"></ion-icon>
                        </div>
                      </ion-title>
                      {(!data.category.imageLoaded && config.categoryImages.style != 'Disabled') ? <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar> : null}
                    </div>
                    <ion-row>

                      {data.products.map(x => {
                        return (
                          <ion-card id='scroll-container' onScroll={(event: any) => this.scrollSideways(event)}>
                            <div class='img'>
                              {
                                !x.imageLoaded ?
                                  <ion-spinner class="spinner"></ion-spinner>
                                  : [<ion-img src={x.image} ></ion-img>,
                                  <modal-ovelay buttonClass='uploadButton' url={this.produrl} MaxWidth={200} AspectRatio={1.3} TargetId={x.id} buttonValue='Välj bild...' RenderType='image' ImagePosition='Product' CategoryId={x.productcategory_id}></modal-ovelay>
                                  ]
                              }
                              <ion-card-title class='productName'>{x.name}</ion-card-title>
                              <div class='description'>{x.description}</div>
                              <div class='price'>{x.price} sek</div>
                            </div>
                          </ion-card>
                        )
                      })
                      }
                    </ion-row>

                  </ion-card>
                </div>
              )
            })
            : null

        }
        {/* </ion-reorder-group> */}
        {/* {!this.toggle ? <ion-button class='saveButton' onClick={() => this.SaveReorder()} disabled={!this.CanSave}>Spara</ion-button> : null} */}
      </Host>
    );
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