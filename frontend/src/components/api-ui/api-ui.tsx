import { Component, h, State, Prop, getAssetPath } from '@stencil/core';

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

  PostData() {
    const data = { base: this.base, realm: this.realm, id: this.id, key: this.key, uri: this.uri };
    fetch('http://localhost:8080/updateapi', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    })
    this.close();
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
        <div class='main-button'>
          <button class='button-9' id='changekey' onClick={this.open.bind(this)}>Ändra API-nyckel</button>
        </div>
        <div class={this.isopen ? 'modal-wrapper is-open' : 'modal-wrapper'}>
          <div class="modal-overlay" onClick={this.close.bind(this)}></div>
          <div class="modal">
            <div class="header">
              <h6>Ändra api-nyckel</h6>
              <button class='button-close' onClick={this.close.bind(this)}>
                <img src={getAssetPath(`./assets/${this.closeIcon}`)} alt='close icon' />
              </button>
            </div>
            <div class="body">
              <slot />
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
              <button class='button-9' onClick={this.PostData.bind(this)} type="submit" value="Submit">Spara</button>
            </div>
          </div>
        </div >
      </div>
    );
  }

}
