import { Component, getAssetPath, h, State, Event, EventEmitter, Element, Listen } from '@stencil/core';
import '@ionic/core';
import { listenerCount } from 'process';

const MAX_UPLOAD_SIZE = 1024; // bytes
const ALLOWED_FILE_TYPES = 'image.*';

@Component({
  tag: 'image-uploader',
  styleUrl: 'image-uploader.css',
  shadow: true,
  assetsDirs: ['images'],

})
export class ImageUploader {

  @Element() private elementHost: HTMLElement;
  @Event() onUploadCompleted: EventEmitter<Blob>;
  @Listen('hover')

  public onInputChange(files) {
    // check if 1 image is uploaded
    if (files.length === 1) {
      const imageFile = files[0];
      // check if the user isn't trying to upload a file larger then the MAX_UPLOAD_SIZE
      if (!this.checkFileSize(imageFile.size)) {
        console.error('Maximum file size exceeded. Max file size is: ' + MAX_UPLOAD_SIZE);
        return false;
      }
      // check if the user isn't trying to upload anything else then an image
      else if (!this.checkFileType(imageFile.type)) {
        console.error('File type is not allowed');
        return false;
      }

      this.uploadImage(imageFile);

      // upload image
      this.submitForm(files[0]);
    } else {
      console.error(files.length === 0 ? 'NO IMAGE UPLOADED' : 'YOU CAN ONLY UPLOAD ONE IMAGE AT THE TIME');
      return false;
    }
  }

  changeColor(Event) {
    document.body.style.backgroundColor = Event;
  }

  async submitForm(file) {
    let formData = new FormData();
    formData.append('file', file, file.name);

    try {
      const response = await fetch('http://localhost:8080/imageupload', {
        method: 'post',
        body: formData,
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
    // create a new instance of HTML5 FileReader api to handle uploading
    const reader = new FileReader();
    reader.onloadstart = () => {
      console.log('started uploading');
    }

    reader.onload = () => {
      document.querySelector('body').style.backgroundImage = `url(${reader.result})`;
      console.log('uploading finished, emitting an image blob to the outside world');
      this.onUploadCompleted.emit(file);
    };


    reader.onloadend = () => {
      console.log('upload finished');
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
        <input type="file" name="files[]" id="file" accept="image/*" class="upload-button"
          onChange={($event: any) => this.onInputChange($event.target.files)} />
      </div>
    </div>;
  }
}

