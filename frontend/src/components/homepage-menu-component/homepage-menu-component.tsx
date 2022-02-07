import { Component, h, State, getAssetPath } from '@stencil/core';
import { productsWithCategory, Images } from '../../utils/utils';
import '@ionic/core'

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

  async fetchdata() {
    await fetch(this.url)
      .then(rsp => rsp.json())
      .then(data => this.responsedata = JSON.parse(JSON.stringify(data)))
      .catch(err => alert(err + ': Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info'));
  }

  async fetchbackground() {
    await fetch('http://localhost:8080/getimage')
      .then(rsp => rsp.json())
      .then(data => this.imagedata = JSON.parse(JSON.stringify(data)))
      .catch(err => console.log(err));
  }

  async componentWillLoad() {
    await this.fetchdata();
    await this.fetchbackground();
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

