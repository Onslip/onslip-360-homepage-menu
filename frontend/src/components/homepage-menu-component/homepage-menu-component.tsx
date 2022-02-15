import { Component, h, State, getAssetPath, Element } from '@stencil/core';
import { productsWithCategory, Images, Banner } from '../../utils/utils';
import '@ionic/core'
import { GetData } from '../../utils/get';

@Component({
  tag: 'homepage-menu-component',
  styleUrl: 'homepage-menu-component.css',
  shadow: true,
  assetsDirs: ['assets'],

})

export class HomepageMenuComponent {
  @State() private url = 'http://localhost:8080'
  @State() responsedata: productsWithCategory[]
  @State() imagedata: Images
  @State() private imageurl: string = 'http://localhost:8080/getimage';
  @State() banner: Banner;
  @State() private bannerUrl: string = 'http://localhost:8080/getbanner'
  @Element() element: HTMLElement

  @State() logoData: Images

  async componentWillLoad() {
    this.responsedata = await GetData(this.url);
    // this.imagedata = await GetData(this.imageurl);
    // this.banner = await GetData(this.bannerUrl);
    // this.element.querySelector('company-banner').style.backgroundImage = this.banner.image;
    // document.querySelector('company-banner').style.backgroundImage = this.banner.image;
    // document.querySelector('body').style.backgroundColor = this.imagedata.backgroundcolor;
    // document.querySelector('body').style.backgroundImage = this.imagedata.backgroundImage;
  }

  render() {
    return (
      <div class='menuContainer'>
        {/* 
        <div class='header'>
          <h1>Martins kolgrill</h1>
          <company-logo></company-logo>
          <div id='logohere'></div>
        </div> */}

        <api-ui></api-ui>
        <company-banner class='header'></company-banner>

        {
          this.responsedata.map(p => {
            return (
              <ion-card color="primary" class='menu'>
                <category-component category={p.category}></category-component>
                {
                  p.products.map(prod => {
                    return (
                      <product-component class='menu-item' product={prod}></product-component>
                    )
                  })
                }
              </ion-card>
            )
          })
        }
        <div class='logoDiv'>
          <img src={getAssetPath(`./assets/Onslip.png`)} class='onslipLogo' ></img>
        </div>
      </div>
    )
  }
}

