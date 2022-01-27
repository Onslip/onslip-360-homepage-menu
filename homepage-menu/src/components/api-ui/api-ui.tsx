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
    const data = [this.realm, this.id, this.key, this.uri];
    await fetch('./assets/test.json', {
      method: 'POST',
      body: JSON.stringify(this.realm),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  handleChange(event) {
    this.realm = event.target.value;
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
              <input type="text" value={this.realm} onInput={(event) => this.handleChange(event)} />
              <br></br><br></br>
              <label>API-id:</label><br></br>
              <input ></input>
              <br></br><br></br>
              <label>API-nyckel:</label><br></br>
              <input />
              <br></br><br></br>
              <label>Databas-URI:</label><br></br>
              <input />
            </div>
            <div class="footer">
              <button class='button-9' onClick={this.close.bind(this) && this.PostData.bind(this)} type="submit" value="Submit">Spara</button>
            </div>
          </div>
        </div >
      </div>
    );
  }

}
