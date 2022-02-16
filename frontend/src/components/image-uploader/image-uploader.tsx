import { Component, h, Event, EventEmitter, State, Host } from '@stencil/core';
import '@ionic/core';
import { Images } from '../../utils/utils';
import { PostData } from '../../utils/post';
import { CheckImage } from '../../utils/image';


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
  @State() private url: string = 'http://localhost:8080/imageupload'


  changeColor() {
    this.checkImage = false;
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = this.color;
    this.submitForm();
  }

  async submitForm() {
    let data: Images;

    data = { backgroundcolor: this.color }

    await PostData('http://localhost:8080/getbackgroundcolor', data);
  }

  render() {
    return (
      <Host>
        <ion-col class='upload'>
          <ion-row>
            <upload-image-button buttonvalue='Ändra logga' getURL='http://localhost:8080/getimage' postURL={this.url}></upload-image-button>
          </ion-row>
          <ion-row>
            <upload-image-button buttonvalue='Ändra banner' getURL='http://localhost:8080/getimage' postURL={this.url}></upload-image-button>
          </ion-row>
          <ion-row>
            <upload-image-button buttonvalue='Ändra bakgrundsbild' getURL='http://localhost:8080/getimage' postURL={this.url}></upload-image-button>
          </ion-row>
          <ion-row>
            <label id='asfd' htmlFor='color' class='button-9'>Ändra bakgrundsfärg</label>
            <input id='color' type='color' onChange={(event: any) => { this.color = event.target.value; this.changeColor() }} class='button-9' hidden />
          </ion-row>
        </ion-col>
      </Host>
    );
  }
}