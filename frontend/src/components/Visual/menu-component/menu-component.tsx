import { Component, h, Host, State } from '@stencil/core';
import { DBItems } from '../../utils/utils';
import '@ionic/core'
import { GetData } from '../../utils/get';

@Component({
  tag: 'menu-component',
  styleUrl: 'menu-component.css',
  shadow: true,
})

export class MenuComponent {
  @State() private url = 'http://localhost:8080'
  @State() responsedata: DBItems[]
  @State() loading: boolean = true

  async componentWillLoad() {
    await GetData(this.url)
      .then(response => this.responsedata = response)
      .catch(err => alert(err + ': Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info'))
  }

  render() {
    return (
      <Host>
        {
          this.responsedata.map(data => {
            return (
              <ion-card color="secondary" class='menu'>
                <category-component category={data.category}></category-component>
                {
                  data.products.map(product => { return (<product-component class='menu-item' product={product}></product-component>) })
                }
              </ion-card>
            )
          })
        }
      </Host>
    )
  }
}