import { Component, h, State, Prop } from '@stencil/core';
<<<<<<< HEAD
import { IonicSlides } from '@ionic/core';
=======
import '@ionic/core'
>>>>>>> 1ccd487e9bd1a71429d5d5ce8a55c425ddd4f570

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
<<<<<<< HEAD
        <ion-button></ion-button>
        <table>
          {
            this.responsedata.map(p => {
              return (
                <tr>
                  <tbody>
                    <th>{p.category.name}</th>
                    {
                      p.products.map(prod => {
                        return (
                          <slot>
                            <td>{prod.name}</td>
                            <td>{prod.price}</td>
                            <td>{prod.description}</td>
                          </slot>
                        )
                      })
                    }
                  </tbody>
                </tr>
              )
            })
          }
        </table>
=======
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
>>>>>>> 1ccd487e9bd1a71429d5d5ce8a55c425ddd4f570
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

