import { Component, h, State, Prop } from '@stencil/core';
import '@ionic/core'

@Component({
  tag: 'homepage-menu-component',
  styleUrl: 'homepage-menu-component.css',
  //shadow: true,
})
export class HomepageMenuComponent {
  private url = 'http://localhost:8080'
  @State() responsedata: productsWithCategory[]

  async fetchdata() {
    await fetch(this.url)
      .then(rsp => rsp.json())
      .then(data => this.responsedata = JSON.parse(JSON.stringify(data)))
  }

  async componentWillLoad() {
    await this.fetchdata()
  }

  render() {
    return (
      <html>
        {
          this.responsedata.map(p => {
            return (
              <ion-card>
                <ion-card-header>
                  <ion-card-title>
                    {p.category.name}
                  </ion-card-title>
                </ion-card-header>
                {
                  p.products.map(prod => {
                    return (
                      <ion-card-content>
                        <p>{prod.name}{prod.price}kr</p>
                        <p>{prod.description}</p>
                      </ion-card-content>
                    )
                  })
                }
              </ion-card>
            )
          })
        }
      </html>
      // <ion-card>
      //   <ion-card-header>
      //     <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
      //     <ion-card-title>Card Title</ion-card-title>
      //   </ion-card-header>

      //   <ion-card-content>
      //     Keep close to Nature's heart... and break clear away, once in awhile,
      //     and climb a mountain or spend a week in the woods. Wash your spirit clean.
      //   </ion-card-content>
      // </ion-card>
    )
  }
}

interface productsWithCategory {
  category: {
    name: string
  }
  products: {
    name: string,
    price: string,
    description: string
  }[]
}

