import { Component, h, Event, EventEmitter, State, Host, Element } from '@stencil/core';
import '@ionic/core';
import { Colorconfig } from '../../utils/utils';
import { PostData } from '../../utils/post';


@Component({
  tag: 'image-uploader',
  styleUrl: 'image-uploader.css',
  shadow: true,
})
export class ImageUploader {

  @Event() onUploadCompleted: EventEmitter<Blob>;
  @State() color: string;
  @State() file;
  @State() tempfile: string;
  @State() checkImage: boolean;
  @State() private url1: string = 'http://localhost:8080/background'
  @State() private url2: string = 'http://localhost:8080/banner';
  @State() private url3: string = 'http://localhost:8080/logo';
  @Element() element: HTMLElement;


  changeColor() {
    this.checkImage = false;
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = this.color;
    this.submitForm();
  }

  async submitForm() {
    let data: Colorconfig;

    data = { backgroundcolor: this.color }

    await PostData('http://localhost:8080/backgroundcolor', data);
  }

  render() {
    return (
      <Host>
        <ion-col class='upload'>
          <ion-row>
            <upload-image-button buttonvalue='Ändra logga' URL={this.url3}></upload-image-button>
          </ion-row>
          <ion-row>
            <upload-image-button buttonvalue='Ändra banner' URL={this.url2}></upload-image-button>
          </ion-row>
          <ion-row>
            <upload-image-button buttonvalue='Ändra bakgrundsbild' URL={this.url1}></upload-image-button>
          </ion-row>
          <ion-row>
            <label id='asfd' htmlFor='color' class='button-9'>Ändra bakgrundsfärg</label>
            <input id='color' type='color' onChange={(event: any) => { this.color = event.target.value; this.changeColor() }} class='button-9' hidden />
          </ion-row>
          <ion-row>
            <api-ui></api-ui>
          </ion-row>
        </ion-col>
      </Host>
    );
  }
}