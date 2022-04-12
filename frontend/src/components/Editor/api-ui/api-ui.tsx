import { Component, h, State, Prop } from '@stencil/core';
import { GetData } from '../../utils/get';
import { PostData } from '../../utils/post';
import { DBConnection, newApi } from '../../utils/utils';

@Component({
  tag: 'api-ui',
  styleUrl: 'api-ui.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class ApiUi {
  @State() Api: newApi
  @State() DatabaseWorks: boolean = true;
  @State() ApiWorks: boolean = true;
  private url = 'http://localhost:8080/api'

  @State() isopen: boolean;
  @State() closeIcon = 'x.svg';


  async close() {
    await customElements.whenDefined('ion-modal')
    const modal = document.querySelector('ion-modal')
    await modal.dismiss();
  }
  async componentWillLoad() {
    await this.GetApiData();
  }

  async GetApiData() {
    await GetData(this.url).then(response => this.Api = response).catch(err => err);
  }


  async TestData() {
    await PostData(this.url, this.Api)
    await this.GetApiData();

    if (this.Api?.ApiConnected) {
      this.close();
      location.reload();
    }
  }

  render() {
    return (

      <ion-content class='content'>
        <div class="modal">
          <div class="header">
            <h6>Ändra api-nyckel:</h6>
          </div>
          <div class="body">
            <h6>API: </h6>
            <div class='inputfield'>
              <label>API-base: </label>
              <input type="text" value={this.Api?.api?.onslip360?.base ?? ''} onInput={(event: any) => { this.Api.api.onslip360.base = event.target.value; console.log(event.target.value) }} />
            </div>
            <div class='inputfield'>
              <label>API-realm: </label>
              <input type="text" value={this.Api?.api?.onslip360?.realm ?? ''} onInput={(event: any) => this.Api.api.onslip360.realm = event.target.value} />
            </div>
            <div class='inputfield'>
              <label>API-id: </label>
              <input type="text" value={this.Api?.api?.onslip360?.id ?? ''} onInput={(event: any) => this.Api.api.onslip360.id = event.target.value} />
            </div>
            <div class='inputfield'>
              <label>API-nyckel: </label>
              <input type="text" value={this.Api?.api?.onslip360?.key ?? ''} onInput={(event: any) => this.Api.api.onslip360.key = event.target.value} />
              {!this.Api?.ApiConnected ? <p>Något fel med API inmatningarna. Kolla så att allt stämmer.</p> : null}
            </div>
            <h6>Databas: </h6>
            <div class='inputfield'>
              <label>Databas-Uri</label>
              <input type="text" value={this.Api?.api?.database?.uri ?? ''} onInput={(event: any) => this.Api.api.database.uri = event.target.value} />
              {!this.Api?.DatabaseConnected && this.Api?.api?.database?.uri != '' ? <p>Något fel med Databas-Uri</p> : null}
            </div>
            <slot />
            {
              !DBConnection ? <div class='inputfield'>
                <p>Lägg till databas-uri för att få tillgång till bilder...</p>
              </div> : null
            }
          </div>
          <div class="footer">
            <button class='button-save' onClick={this.TestData.bind(this)} type="submit" value="Submit">Spara</button>
            <button class='button-close' type="submit" value="Submit" onClick={() => { this.close() }}>Avbryt</button>
          </div>
        </div >
      </ion-content>

    );
  }
}
