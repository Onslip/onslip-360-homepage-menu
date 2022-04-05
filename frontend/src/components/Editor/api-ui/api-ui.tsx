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
  @Prop({
    mutable: true,
    reflect: true,
  })
  @State() isopen: boolean;
  @Prop() closeIcon = 'x.svg';

  open() {
    this.isopen = true;
  }

  close() {
    this.isopen = false;
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
      <div>
        <div>
          <label class={'button-9'} htmlFor='changekey'>Ändra API-nyckel <ion-icon class="icon" name="settings-sharp"></ion-icon></label>
          <button id='changekey' onClick={this.open.bind(this)} hidden>Ändra API-nyckel</button>
        </div>
        <div class={this.isopen ? 'modal-wrapper is-open' : 'modal-wrapper'}>
          <div class="modal-overlay" onClick={this.close.bind(this)}></div>
          <div class="modal">
            <div class="header">
              <h6>Ändra api-nyckel</h6>
              <button class='button-close' onClick={this.close.bind(this)}>
                <ion-icon name="close"></ion-icon>
              </button>
            </div>
            <div class="body">
              <h3>API: </h3>
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
              <h3>Databas: </h3>
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
            </div>
          </div>
        </div >
      </div>
    );
  }
}
