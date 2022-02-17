import { Component, h, Host, State, getAssetPath } from '@stencil/core';
import { productsWithCategory, Colorconfig } from '../../utils/utils';
import '@ionic/core'
import { GetData } from '../../utils/get';

@Component({
  tag: 'menu-component',
  styleUrl: 'menu-component.css',
  shadow: true,
  assetsDirs: ['assets'],

})

export class MenuComponent {
  @State() private url = 'http://localhost:8080'
  @State() responsedata: productsWithCategory[]
  @State() loading: boolean = true

  async componentWillLoad() {
    this.responsedata = await GetData(this.url);
  }

  render() {
    return (
      <Host>
        {
          this.responsedata.map(data => {
            return (
              <ion-card color="primary" class='menu'>
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
