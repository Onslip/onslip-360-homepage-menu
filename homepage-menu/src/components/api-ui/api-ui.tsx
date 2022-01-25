import { Component, h, State, Prop, getAssetPath } from '@stencil/core';
import { DHMConfig } from "/home/elis/onslip-360-homepage-menu/backend/src/schema"


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
  @State() dbUri: string;
  @State() config: DHMConfig

  constructor() {
    this.realm = this.config.onslip360.realm;
    this.id = this.config.onslip360.id;
    this.key = this.config.onslip360.key;
    this.dbUri = this.config.database.uri;
  }

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

  render() {

    return (
      <div>
        <button class='button-9' id='changekey' onClick={this.open.bind(this)}>ändra nyckel</button>
        <div class={this.isopen ? 'modal-wrapper is-open' : 'modal-wrapper'}>
          <div class="modal-overlay" onClick={this.close.bind(this)}></div>
          <div class="modal">
            <div class="header">
              <h6>Ändra api-nyckel</h6>
              <button class='button-close' onClick={this.close.bind(this)}>
                <img src={getAssetPath(`./assets/${this.closeIcon}`)} alt='close icon'></img>
              </button>
            </div>
            <div class="body">
              <slot />
              <label>API-realm:</label><br></br>
              <input autocomplete="current-password" id="id_password" />
              <br></br><br></br>
              <label>API-id:</label><br></br>
              <input autocomplete="current-password" id="id_password" ></input>
              <br></br><br></br>
              <label>API-nyckel:</label><br></br>
              <input autocomplete="current-password" id="id_password" />
              <br></br><br></br>
              <label>Databas-URI:</label><br></br>
              <input autocomplete="current-password" id="id_password" />
            </div>
            <div class="footer">
              <button class='button-9'>Spara</button>
            </div>
          </div>
        </div >
      </div>
    );
  }

}
