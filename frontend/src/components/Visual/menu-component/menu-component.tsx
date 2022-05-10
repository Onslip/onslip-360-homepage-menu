import { Component, State, Host, h, Element, Method, Prop } from '@stencil/core';
import { categorywithproduct, DBConnection, DBImage, DBproduct, mainConfig, MenuWithCategory } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { config, Timetable } from '../../utils/utils';
import { loadImage } from '../../utils/image';

@Component({
    tag: 'menu-component',
    styleUrl: 'menu-component.css',
    shadow: true,
})
export class MenuComponent {

    @Element() element: HTMLElement;
    private url = 'http://localhost:8080'
    private produrl: string = 'http://localhost:8080/product-image';
    private caturl: string = 'http://localhost:8080/category-image';
    @State() categories: categorywithproduct[];
    @State() AllMenus: MenuWithCategory[]
    @State() menu: MenuWithCategory;
    @State() errormessage: string
    @State() loading: boolean = true
    @Prop() menuId?: number

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

        if (this.menuId == undefined) {
            const date = new Date()
            const schedule: Timetable[] = await GetData('http://localhost:8080/schedule')
            this.menuId = schedule.find(s => s.locationId == mainConfig.selectedLocation.id)?.days
                .find(d => d.Day == date.getDay())?.Times
                .find(t => t.time == date.getHours())?.menuid
        }

        GetData(this.url)
            .then(response => this.AllMenus = response)
            .then(() => this.menu = this.AllMenus.find(m => m.menu.id == this.menuId))
            .then(() => { this.loading = false, config.connect = true })
            .then(() => this.categories = this.menu.categories)
            .then(() => this.getCatImages())
            .then(() => this.getProdImages())
            .catch(() => {
                this.errormessage += 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
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

    renderProducts(products?: DBproduct[]) {
        return (products?.map(x =>
            // <content-component class={'productContainer'} style={{ backgroundImage: config?.productImages?.style == 'Background' && x?.imageLoaded ? `url(${x?.image})` : '' }}>
            //     {!x?.imageLoaded && config?.productImages?.style == 'Background' ?
            //         <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar>
            //         : <div hidden={config?.productImages?.style != 'Background'}>
            //         </div>}
            //     <div class="productName" slot="primary">{x?.name}</div>
            //     <div class="productPrice" slot={config?.productImages?.placement == "Left" ? 'end' : 'start'}>{x?.price}kr</div>
            //     <div class="productDesc" slot="secondary">{x?.description}</div>
            //     <div class={config?.productImages?.style == 'Background' ? 'iconBackground' : 'iconLogo'} hidden={config?.productImages?.style != 'Logo'} slot={config?.productImages?.placement == "Left" ? 'start' : 'end'}>
            //         {
            //             !x.imageLoaded ?
            //                 <ion-spinner class="spinner"></ion-spinner>
            //                 : <ion-img src={x.image} ></ion-img>
            //         }
            //     </div>
            // </content-component>
            <div class='productContainer'>
                <ion-col hidden={config.productImages.placement == 'Right' || config.productImages.style == 'Disabled'} class='iconLogo' size='3'>
                    <div>
                        {
                            !x.imageLoaded && config?.productImages?.style != 'Disabled' ?
                                <ion-spinner class="spinner"></ion-spinner>
                                : <ion-img src={x.image} ></ion-img>
                        }
                    </div>
                </ion-col>
                <ion-col class='text'>
                    <ion-row>
                        <ion-col>
                            <div style={{ color: config.font.colors.productName }} class="productName">{x?.name}</div>
                        </ion-col>
                        <ion-col>
                            <div style={{ color: config.font.colors.productPrice }} class="productPrice">{x?.price}kr</div>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <div style={{ color: config.font.colors.productDesc }} class="productDesc">{x?.description}</div>
                        </ion-col>
                    </ion-row>
                </ion-col>
                <ion-col hidden={config.productImages.placement == 'Left' || config.productImages.style == 'Disabled'} class='iconLogo' size='3'>
                    <div>
                        {
                            !x.imageLoaded && config?.productImages?.style != 'Disabled' ?
                                <ion-spinner class="spinner"></ion-spinner>
                                : <ion-img src={x.image} ></ion-img>
                        }
                    </div>
                </ion-col>
            </div>
        ))
    }

    renderCards(products?: DBproduct[]) {
        return (
            <ion-row class='products'>
                {(products?.map(x =>
                    <ion-card class={"product"} id='scroll-container'>
                        {
                            !x.imageLoaded && config?.productImages?.style != 'Disabled' ?
                                <ion-spinner class="spinner"></ion-spinner>
                                : <ion-img src={x.image} class="card image"></ion-img>
                        }
                        <div class="card-text">
                            <ion-card-header>
                                <div style={{ color: config.font.colors.productName }} class='card productName'>{x.name}</div>
                                <div style={{ color: config.font.colors.productDesc }} class='card productDesc'>{x.description}</div>
                            </ion-card-header>
                            <ion-card-content>
                                <div style={{ color: config.font.colors.productPrice }} class='card productPrice'>{x.price} sek</div>
                            </ion-card-content>
                        </div>
                    </ion-card>))}
            </ion-row>
        )
    }

    renderPaper() {
        return (

            <div class="paper-content">
                {
                    !this.loading ?
                        this.categories?.map(data => {

                            return (
                                <div class='paper-section'>
                                    <div>
                                        <ion-title style={{ color: config?.font?.colors.categoryTitle }} class='categoryTitle'>
                                            {data?.category?.name}
                                        </ion-title>
                                    </div>
                                    <ion-col class="paper-products">
                                        {data.products.map(x => {
                                            return (
                                                <ion-row>
                                                    <ion-col>
                                                        <ion-row>
                                                            <div style={{ color: config?.font?.colors.productName }} class='productName'>{x.name}</div>
                                                            <ion-col class="separator"></ion-col>
                                                            <div style={{ color: config?.font?.colors.productPrice }} class='productPrice'>{x.price} sek</div>
                                                        </ion-row>
                                                        <ion-row>
                                                            <div style={{ color: config?.font?.colors.productDesc }} class='productDesc'>{x.description}</div>
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
                        <div>
                            {
                                !this.loading ?
                                    this.categories?.map(data => {

                                        return (
                                            <div id={data?.category?.id.toString()} class='outer-card' style={{ backgroundImage: config?.categoryImages?.style == 'Background' && data?.category?.imageLoaded ? data?.category?.image : null }}>
                                                <ion-card class='content' data-status={config?.categoryImages?.style}>
                                                    <div>
                                                        <ion-card-header class='background' style={{ backgroundImage: config?.categoryImages?.style == 'Banner' && data?.category?.imageLoaded ? data?.category?.image : null }}>
                                                            <ion-card-title class='categoryTitle' style={{ color: config?.font?.colors.categoryTitle }} data-status={config?.categoryImages?.style}>
                                                                {data?.category?.name}
                                                            </ion-card-title>
                                                        </ion-card-header>
                                                        {(!data.category.imageLoaded && config.categoryImages.style != 'Disabled') ? <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar> : null}
                                                    </div>
                                                    {config.menuType == 'inline' ?
                                                        this.renderProducts(data?.products)
                                                        : null}
                                                    {config.menuType == 'card' ?
                                                        this.renderCards(data?.products)
                                                        : null}

                                                </ion-card>
                                            </div>
                                        )
                                    })
                                    : null
                            }
                        </div>
                    }
                </div>
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

