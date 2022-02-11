import { Component, h, State, getAssetPath } from '@stencil/core';
import { productsWithCategory, Images } from '../../utils/utils';
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
  @State() banner: string;
  @State() private bannerUrl: string = 'http://localhost:8080/'

  @State() logoData: Images

  async componentWillLoad() {
    this.responsedata = await GetData(this.url);
    this.imagedata = await GetData(this.imageurl);
    this.banner = await GetData(this.bannerUrl);

    document.querySelector('body').style.backgroundColor = this.imagedata.backgroundcolor;
    document.querySelector('body').style.backgroundImage = this.imagedata.backgroundImage;
  }

  render() {
    return (
      <div class='menuContainer'>

        <div class='header'>
          <h1>Martins kolgrill</h1>
          <company-logo></company-logo>
          <div id='logohere'></div>


        </div>


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

