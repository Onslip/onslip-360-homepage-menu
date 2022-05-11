import { Component, h, State } from '@stencil/core';
import { GetData } from '../../../utils/get';
import { PostData } from '../../../utils/post';
import { DBConnection, newApi } from '../../../utils/utils';

@Component({
  tag: 'api-ui',
  styleUrls: ['api-ui.css'],
  shadow: true,
  assetsDirs: ['assets'],
})
export class ApiUi {
  @State() Api: newApi
  @State() loading: boolean = true;
  private url = 'http://localhost:8080/api'

  async close() {
    await customElements.whenDefined('ion-modal')
    const modal = document.querySelector('ion-modal')
    await modal.dismiss();
  }
  async componentWillLoad() {
    this.GetApiData();
  }

  async GetApiData() {
    this.loading = true
    GetData(this.url)
      .then(response => this.Api = response)
      .then(() => this.loading = false)
      .catch(err => err);
  }


  async TestData() {
    await PostData(this.url, this.Api)
    await this.GetApiData()

    if (this.Api.ApiConnected && !this.loading) {
      this.close();
      location.reload();
    }
  }

  render() {
    return (
      <div class="modal">
        <div class="header">
          <ion-title class="title">Ändra api-nyckel:</ion-title>
        </div>
        {
          !this.loading ?
            <div class="body">
              <div class="content">
                <ion-title class="title">
                  API
                </ion-title>
                <ion-item>
                  <ion-label position="fixed">API-base:</ion-label>
                  <ion-input type="text" value={this.Api?.api?.onslip360?.base ?? ''} onInput={(event: any) => { this.Api.api.onslip360.base = event.target.value; console.log(event.target.value) }} />
                </ion-item>
                <ion-item>
                  <ion-label position="fixed">API-realm:</ion-label>
                  <ion-input type="text" value={this.Api?.api?.onslip360?.realm ?? ''} onInput={(event: any) => this.Api.api.onslip360.realm = event.target.value} />
                </ion-item>
                <ion-item>
                  <ion-label position="fixed">API-id:</ion-label>
                  <ion-input type="text" value={this.Api?.api?.onslip360?.id ?? ''} onInput={(event: any) => this.Api.api.onslip360.id = event.target.value} />
                </ion-item>
                <ion-item>
                  <ion-label position="fixed">API-nyckel:</ion-label>
                  <ion-input type="text" value={this.Api?.api?.onslip360?.key ?? ''} onInput={(event: any) => this.Api.api.onslip360.key = event.target.value} />
                </ion-item>
                {!this.Api?.ApiConnected ? <p class="error">Något fel med API inmatningarna. Kolla så att allt stämmer.</p> : null}
                <ion-title class="title">
                  Databas
                </ion-title>
                <ion-item>
                  <ion-label position="fixed">Databas-Uri:</ion-label>
                  <ion-input type="text" value={this.Api?.api?.database?.uri ?? ''} onInput={(event: any) => this.Api.api.database.uri = event.target.value} />
                </ion-item>
                {!this.Api?.DatabaseConnected && this.Api?.api?.database?.uri != '' ? <p class="error">Något fel med Databas-Uri</p> : null}
                {
                  !DBConnection ? <div class='inputfield'>
                    <p class="error">Lägg till databas-uri för att få tillgång till bilder...</p>
                  </div> : null
                }
              </div>
            </div>
            : null}
        <div class="footer">
          <button class='button save' onClick={this.TestData.bind(this)} type="submit" value="Submit">Spara</button>
          <button class='button close' type="submit" value="Submit" onClick={() => { this.close() }}>Avbryt</button>
        </div>
      </div >
    );
  }
}
