import { Component, h, State, Prop } from '@stencil/core';
import { productsWithCategory } from '../../utils/utils';
import '@ionic/core'
import { ProductComponent } from '../product-component/product-component';

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
                
              </ion-card>
            )
          })
        }
      </html>
    )
  }
}


