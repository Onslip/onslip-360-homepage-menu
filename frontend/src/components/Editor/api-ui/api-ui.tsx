import { Component, h, State, Prop, Listen } from '@stencil/core';
import { PostData } from '../../utils/post';
import { DBConnection } from '../../utils/utils';

@Component({
  tag: 'api-ui',
  styleUrl: 'api-ui.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class ApiUi {
  @State() realm: string;
  @State() id: string;
  @State() key: string;
  @State() uri: string;
  @State() base: string;
  private url = 'http://localhost:8080/updateapi'
  @Prop({
    mutable: true,
    reflect: true,
  })
  @Prop() isopen: boolean;
  @Prop() closeIcon = 'x.svg';

  open() {
    this.isopen = true;
  }

  close() {
    this.isopen = false;
  }

  async PostData() {
    const data = { base: this.base, realm: this.realm, key: this.key, id: this.id, uri: this.uri };
    await PostData(this.url, data);
    this.close();
    location.reload();
  }

  handleChangeRealm(event) {
    this.realm = event.target.value;
  }
  handleChangeBase(event) {
    this.base = event.target.value;
  }
  handleChangeId(event) {
    this.id = event.target.value;
  }
  handleChangeKey(event) {
    this.key = event.target.value;
  }
  handleChangeURI(event) {
    this.uri = event.target.value;
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
              <slot />
              {
                !DBConnection ? <div class='inputfield'>
                  <p>Lägg till databas-uri för att få tillgång till anvädning av bilder...</p>
                </div> : null
              }

              <div class='inputfield'>
                <label>API-base</label>
                <input type="text" value={this.base} onInput={(event) => this.handleChangeBase(event)} />
              </div>
              <div class='inputfield'>
                <label>API-realm</label>
                <input type="text" value={this.realm} onInput={(event) => this.handleChangeRealm(event)} />
              </div>
              <div class='inputfield'>
                <label>API-id</label>
                <input type="text" value={this.id} onInput={(event) => this.handleChangeId(event)} />
              </div>
              <div class='inputfield'>
                <label>API-nyckel</label>
                <input type="text" value={this.key} onInput={(event) => this.handleChangeKey(event)} />
              </div>
              <div class='inputfield'>
                <label>Databas-Uri</label>
                <input type="text" value={this.uri} onInput={(event) => this.handleChangeURI(event)} />
              </div>
            </div>
            <div class="footer">
              <button class='button-save' onClick={this.PostData.bind(this)} type="submit" value="Submit">Spara</button>
            </div>
          </div>
        </div >
      </div>
    );
  }
}
