import { Component, State, Host, h } from '@stencil/core';
import { productsWithCategory } from '../../utils/utils';
import { GetData } from '../../utils/get';

@Component({
  tag: 'menu-editor-component',
  styleUrl: 'menu-editor-component.css',
  shadow: true,
})
export class MenuEditorComponent {

  @State() private url = 'http://localhost:8080'
  @State() responsedata: productsWithCategory[]
  @State() loading: boolean = true

  async componentWillLoad() {
    GetData(this.url)
      .then(response => this.responsedata = response)
      .catch(err => alert(err + ': Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info'));
  }

  render() {
    return (
      <Host>
        {
          this.responsedata?.map(data => {
            return (
              <ion-card color="secondary">
                <category-editor-component category={data.category}></category-editor-component>
                {
                  data.products.map(product => { return (<product-editor-component class='menu-item' product={product}></product-editor-component>) })
                }
              </ion-card>
            )
          })
        }
      </Host>
    )
  }

}
