import { Component, State, Host, h } from '@stencil/core';
import { productsWithCategory } from '../../utils/utils';
import { GetData } from '../../utils/get';
import { config } from '../../utils/utils';

@Component({
  tag: 'menu-editor-component',
  styleUrl: 'menu-editor-component.css',
  shadow: true,
})
export class MenuEditorComponent {

  @State() private url = 'http://localhost:8080'
  @State() responsedata: productsWithCategory[]
  @State() loading: boolean = true
  @State() errormessage: string

  async componentWillLoad() {
    GetData(this.url)
      .then(response => this.responsedata = response)
      .then(() => { this.loading = false })
      .catch(() => {
        this.errormessage = 'Kunde inte hitta API:t. Kolla så att du har inmatat rätt API-info';
        this.loading = false
      });
  }

  doReorder(ev: any) {
    this.responsedata = ev.detail.complete(this.responsedata);
  }

  render() {
    return (
      <Host>

        <div class="error-message">
          <ion-label>{this.errormessage}</ion-label>
          {this.loading ? <ion-progress-bar type="indeterminate" class="progressbar"></ion-progress-bar> : null}
        </div>
        <ion-reorder-group disabled={false} onIonItemReorder={(ev) => this.doReorder(ev)}>
          {
            !this.loading ?
              this.responsedata?.map(data => {
                return (

                  <ion-reorder slot="end">
                    <ion-card class='card' style={{ color: config.font.fontColor }}>
                      <category-editor-component category={data.category}></category-editor-component>
                      {
                        data.products.map(product => {

                          return (<ion-reorder>
                            <product-editor-component class='menu-item' product={product}></product-editor-component>
                          </ion-reorder>
                          )
                        })
                      }
                    </ion-card>
                  </ion-reorder>
                )
              })
              : null
          }
        </ion-reorder-group>
      </Host>
    )
  }

}
