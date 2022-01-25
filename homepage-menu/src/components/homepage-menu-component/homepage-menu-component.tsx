import { Component, h, State, Prop } from '@stencil/core';
import { IonicSlides } from '@ionic/core';

@Component({
  tag: 'homepage-menu-component',
  styleUrl: 'homepage-menu-component.css',
  shadow: true,
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
      </html>
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

