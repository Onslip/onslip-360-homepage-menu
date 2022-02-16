import { Component, Host, h, Prop } from '@stencil/core';
import { GetData } from '../../utils/get';
import { CheckImage } from '../../utils/image';
import { PostImage } from '../../utils/post';
import '@ionic/core'

@Component({
  tag: 'upload-image-button',
  styleUrl: 'upload-image-button.css',
  shadow: true,
})

export class UploadImageButton {
  @Prop() buttonvalue: string;
  @Prop() postURL: string;
  @Prop() getURL: string;

  private uploadImage(file) {
    const reader = new FileReader();
    let image;
    reader.onload = () => {
      image = `url(${reader.result})`;
      document.querySelector('body').style.backgroundImage = image
    };
    reader.readAsDataURL(file);
  }

  async post(file) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      await PostImage(this.postURL, fd);
      const result = await GetData(this.getURL);
      var bufferBase64 = new Buffer(result, 'binary').toString('base64');
      // res is standered express res object
      this.uploadImage(bufferBase64);
    }
  }

  render() {
    return (
      <Host>
        <div >
          <label class='button-9' htmlFor='file'>{this.buttonvalue}</label>
          <input type='file' id='file' name='files[]' accept="image/*" onChange={(event: any) => this.post(event.target.files)} hidden />
        </div>
      </Host>
    );
  }
}
