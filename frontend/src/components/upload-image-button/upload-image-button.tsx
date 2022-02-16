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
    reader.readAsDataURL(file);
    console.log(file);
    reader.onload = () => {
      image = `url(${reader.result})`;
      document.querySelector('body').style.backgroundImage = image
    };
  }

  async post(file) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      await PostImage(this.postURL, fd);
      const result = await GetData(this.getURL);
      const bytes = new Uint8Array(result.image.data);
      const blob = new Blob([bytes.buffer]);
      this.uploadImage(blob);
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
