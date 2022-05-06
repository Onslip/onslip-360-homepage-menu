import { Component, Host, h, State, Method, Element, Prop } from '@stencil/core';
import { GetData } from '../../utils/get';
import { CheckImage, loadImage } from '../../utils/image';
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
        <div class='paper-content'>
        {
          !this.loading ?
            this.categories?.map(data => {

              return (
                  <div class={this.toggle ? 'paper-section' : 'paper-section categoryToggled'}>
                    <div>
                      <ion-title class='categoryTitle'>
                        <div>
                          {data?.category?.name}
                          <ion-icon name="reorder-three-sharp"></ion-icon>
                        </div>
                      </ion-title>
                    </div>
                    <ion-col class="paper-products">

                      {data.products.map(x => {
                        return (
                          <ion-row>
                            <ion-col>
                              <ion-row>
                                <div class='productName'>{x.name}</div>
                                <ion-col class="separator"></ion-col>
                                <div class='price'>{x.price} sek</div>
                              </ion-row>
                              <ion-row>
                                <div class='description'>{x.description}</div>
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
          </div>
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