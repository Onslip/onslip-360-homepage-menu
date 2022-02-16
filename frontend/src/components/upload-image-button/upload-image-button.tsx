import { Component, Host, h, Prop } from '@stencil/core';
import { CheckImage } from '../../utils/image';
import { PostData, PostImage } from '../../utils/post';
import '@ionic/core'
import { Images } from '../../utils/utils';

@Component({
  tag: 'upload-image-button',
  styleUrl: 'upload-image-button.css',
  shadow: true,
})

export class UploadImageButton {
  @Prop() buttonvalue: string;
  @Prop() URL: string;

  private async uploadImage(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      document.querySelector('body').style.backgroundImage = `url(${reader.result})`;
      const data: Images = { backgroundcolor: null }
      PostData('http://localhost:8080/backgroundcolor', data);
    };
  }

  async post(file) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      await PostImage(this.URL, fd);
      this.uploadImage(file[0]);
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
