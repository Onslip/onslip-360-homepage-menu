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

  @State() logoData: Images

  async componentWillLoad() {
    this.responsedata = await GetData(this.url);
    this.imagedata = await GetData('http://localhost:8080/getimage');
    this.logoData = await GetData('http://localhost:8080/getlogo')
    console.log(await this.logoData)

    document.querySelector('body').style.backgroundColor = this.imagedata.backgroundcolor;

    document.querySelector('body').style.backgroundImage = this.imagedata.backgroundImage;

    let picc = document.createElement('logopic') as HTMLImageElement;
    picc.src = this.logoData.logoImage;
    //console.log(picc.src)
    // document.getElementById('logohere').appendChild(picc);

    // const logopicss = document.getElementById('logoimg') as HTMLImageElement;

    // if (this.logoData == undefined || this.logoData == null) {

    //   logopicss.src = "https://www.getdigital.co.uk/web/getdigital/gfx/products/__generated__resized/1100x1100/Aufkleber_MeGusta.jpg";
    //   // document.getElementById('logoimg').setAttribute('src', "https://www.getdigital.co.uk/web/getdigital/gfx/products/__generated__resized/1100x1100/Aufkleber_MeGusta.jpg")

    // }
    // else {
    //   // document.getElementById('logoimg').setAttribute('src', `data:image/jpg;base64,${this.logoData}`)
    //   logopicss.src = this.logoData.logoImage;
    //   console.log("jasdsadkaodkopakdpaokdapokdwkapokd")
    // }


  }

  render() {
    return (
      <div class='menuContainer'>
        <div class='header'>
          <h1>Martins kolgrill</h1>
          <company-logo></company-logo>
          <div id='logohere'></div>
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

