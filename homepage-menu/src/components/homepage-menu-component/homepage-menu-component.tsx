import { Component, h, State, Prop } from '@stencil/core';
import { productsWithCategory } from '../../utils/utils';
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
      <div class='menuContainer'>
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
      </div>
    )
  }
}


