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
  private url = 'http://localhost:8080'
  @State() responsedata: productsWithCategory[]

  @State() imagedata: Images

  async componentWillLoad() {
    this.responsedata = await GetData(this.url);
    this.imagedata = await GetData('http://localhost:8080/getimage');

    document.querySelector('body').style.backgroundColor = this.imagedata.backgroundcolor;

    document.querySelector('body').style.backgroundImage = this.imagedata.backgroundImage;

  }

  render() {
    return (
      <div class='menuContainer'>
        <div class='header'>
          <h1>Martins kolgrill</h1>
        </div>
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
      </div >
    )
  }
}

