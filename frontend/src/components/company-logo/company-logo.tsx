import { Component, Host, h, State, Event, EventEmitter, Element, Prop, getAssetPath } from '@stencil/core';
import '@ionic/core';
import { Images } from '../../utils/utils';

const MAX_UPLOAD_SIZE = 1024; // bytes
const ALLOWED_FILE_TYPES = 'image.*';

@Component({
  tag: 'company-logo',
  styleUrl: 'company-logo.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class CompanyLogo {
  @Event() onUploadCompleted: EventEmitter<Blob>;

  @State() file: string;
  @State() tempfile: string;
  @State() checkImage: boolean;
  @Element() logopicImg: HTMLImageElement;
  @Prop() isopen: boolean;
  @Prop() closeIcon = 'x.svg';



  private checkFileSize(size: number): boolean {
    return (size / MAX_UPLOAD_SIZE / MAX_UPLOAD_SIZE) <= MAX_UPLOAD_SIZE;
  }

  private checkFileType(type: string): boolean {
    return type.match(ALLOWED_FILE_TYPES).length > 0;
  }

  async submitForm() {
    let data: Images;

    if (this.checkImage) {
      data = { backgroundImage: null, backgroundcolor: null, logoImage: this.file }
    }


    try {
      const response = await fetch('http://localhost:8080/logoupload', {
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

  private async uploadImage(file) {
    console.log(typeof file);
    const reader = new FileReader();
    reader.onloadstart = () => {
      console.log('started uploading');
    }

    reader.onload = () => {
      this.logopicImg.src = `${reader.result}`;
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

  open() {
    this.isopen = true;
  }

  close() {
    this.isopen = false;
  }



  render() {
    return (
      <Host>
        <div class='imageupload'>
          <label htmlFor='file' class='button-9' onClick={() => { this.onInputChange(this.file) }} id='asf'>Ändra Logga</label>
          <input type="file" id="file" accept="image/*" class="custom-file-input" value={this.file}
            onChange={($event: any) => { this.onInputChange($event.target.files) }} hidden />
        </div>
        <img id='logohere' src={this.logopicImg.src} />
      </Host>
    );
  }

}
