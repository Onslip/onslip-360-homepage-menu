import { Component, h, State, Prop } from '@stencil/core';
<<<<<<< HEAD
import { productsWithCategory } from '../../utils/utils';
import '@ionic/core'
import { ProductComponent } from '../product-component/product-component';
=======
<<<<<<< HEAD
import { IonicSlides } from '@ionic/core';
=======
import '@ionic/core'
>>>>>>> 1ccd487e9bd1a71429d5d5ce8a55c425ddd4f570
>>>>>>> 03fef285f9ac9f11cee653b5f3e61aca343e681b

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
                
              </ion-card>
            )
          })
        }
>>>>>>> 1ccd487e9bd1a71429d5d5ce8a55c425ddd4f570
      </html>
    )
  }
}


