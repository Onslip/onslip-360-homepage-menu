import { Component, h, Event, EventEmitter, State } from '@stencil/core';
import '@ionic/core';
import { Images } from '../../utils/utils';
import { PostData } from '../../utils/post';

const MAX_UPLOAD_SIZE = 1024 * 1024;
const ALLOWED_FILE_TYPES = 'image/*';

@Component({
  tag: 'image-uploader',
  styleUrl: 'image-uploader.css',
  shadow: true,
})
export class ImageUploader {

  @Event() onUploadCompleted: EventEmitter<Blob>;
  @State() color: string;
  @State() file: string;
  @State() tempfile: string;
  @State() checkImage: boolean;

  public onInputChange(files) {
    const imageFile = files[0];
    console.log(imageFile.size);
    if (files.length === 1) {
      if (!this.checkFileSize(imageFile.size as number)) {
        alert('Bilden är för stor, välj en mindre bild');
        return false;
      }
      else if (!this.checkFileType(imageFile.type)) {
        alert('Fel filtyp, välj en fil av ett bildformat')
        return false;
      }
      else {
        this.checkImage = true;
        this.uploadImage(imageFile);
        return true;
      }
    } else {
      console.error(files.length === 0 ? 'NO IMAGE UPLOADED' : 'YOU CAN ONLY UPLOAD ONE IMAGE AT THE TIME');
      return false;
    }
  }

  changeColor() {
    this.checkImage = false;
    document.body.style.backgroundImage = null;
    document.body.style.backgroundColor = this.color;
    this.submitForm();
  }

  async submitForm() {
    let data: Images;
    if (this.checkImage) {
      data = { backgroundImage: this.file, backgroundcolor: null }
    }

    else {
      data = { backgroundImage: null, backgroundcolor: this.color }
    }
    PostData('http://localhost:8080/imageupload', data);
  }


  private uploadImage(file) {
    console.log(typeof file);
    const reader = new FileReader();
    reader.onloadstart = () => {
      console.log('started uploading');
    }
    reader.onload = () => {
      document.querySelector('body').style.backgroundImage = `url(${reader.result})`;
      this.file = `url(${reader.result})`;
      this.submitForm();
      this.onUploadCompleted.emit(file);
    };

    reader.onerror = (err) => {
      console.error('something went wrong...', err);
    };
    reader.readAsDataURL(file);
  }

  private checkFileSize(size: number): boolean {
    return size <= MAX_UPLOAD_SIZE;
  }

  private checkFileType(type: string): boolean {
    return type.match(ALLOWED_FILE_TYPES).length > 0;
  }

  render() {
    return (<ion-card-content class="upload">
      <ion-row class="upload-edit">
        <div class='imageupload'>
          <label htmlFor='file' class='button-9' onClick={() => { this.onInputChange(this.file) }} id='asf'>Ändra bakgrundsbild</label>
          <input type="file" id="file" accept="image/*" class="custom-file-input" value={this.file}
            onChange={($event: any) => { this.onInputChange($event.target.files) }} hidden />
          <label id='asfd' htmlFor='color' class='button-9' onChange={(event: any) => { this.color = event.target.value; this.changeColor() }}>Ändra bakgrundsfärg</label>
          <input id='color' type='color' value='asfasf' onChange={(event: any) => { this.color = event.target.value; this.changeColor() }} class='button-9' hidden>hello</input>

        </div>
        <div class='colorupload'>
          {/* <button onClick={() => this.changeColor()} class='button-9'>Tillämpa bakgrundsfärg</button> */}
        </div>
      </ion-row>
    </ion-card-content>);
  }
}

