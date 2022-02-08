import { Component, h, Event, EventEmitter, State } from '@stencil/core';
import '@ionic/core';
import { Images } from '../../utils/utils';

const MAX_UPLOAD_SIZE = 1024; // bytes
const ALLOWED_FILE_TYPES = 'image.*';

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
    this.checkImage = true;
    if (files.length === 1) {
      const imageFile = files[0];
      if (!this.checkFileSize(imageFile.size)) {
        console.error('Maximum file size exceeded. Max file size is: ' + MAX_UPLOAD_SIZE);
        return false;
      }
      else if (!this.checkFileType(imageFile.type)) {
        console.error('File type is not allowed');
        return false;
      }
      this.tempfile = this.file;
      this.uploadImage(imageFile);

      // upload image
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

    try {
      const response = await fetch('http://localhost:8080/imageupload', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }


  private uploadImage(file) {
    console.log(typeof file);
    const reader = new FileReader();
    reader.onloadstart = () => {
      console.log('started uploading');
    }

    reader.onload = () => {

      document.querySelector('body').style.backgroundImage = `url(${reader.result})`;
      console.log('uploading finished, emitting an image blob to the outside world');
      this.file = `url(${reader.result})`;
      this.submitForm();
      this.file = this.tempfile;
      this.onUploadCompleted.emit(file);
    };

    reader.onerror = (err) => {
      console.error('something went wrong...', err);
    };
    reader.readAsDataURL(file);
  }

  private checkFileSize(size: number): boolean {
    return (size / MAX_UPLOAD_SIZE / MAX_UPLOAD_SIZE) <= MAX_UPLOAD_SIZE;
  }

  private checkFileType(type: string): boolean {
    return type.match(ALLOWED_FILE_TYPES).length > 0;
  }

  render() {
    return <div class="upload">
      <div class="upload-edit">
        <label htmlFor="file"></label>
        <div class='imageupload'>
          <input type="file" name="files[]" id="file" accept="image/*" class="upload-button" value={this.file}
            onChange={($event: any) => this.file = $event.target.files} />
          <button onClick={() => { this.onInputChange(this.file); }}>Tillämpa bakgrundsbild</button>
        </div>
        <div class='colorupload'>
          <input type='color' value={this.color} onChange={(event: any) => this.color = event.target.value}></input>
          <button onClick={() => { this.changeColor(); }}>Tillämpa bakgrundsfärg</button>
        </div>
      </div>
    </div>;
  }
}

