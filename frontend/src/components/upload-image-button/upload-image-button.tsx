import { Component, Host, h, Prop } from '@stencil/core';
import { GetData } from '../../utils/get';
import { CheckImage } from '../../utils/image';
import { PostImage } from '../../utils/post';

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
    console.log(file);
    let image;
    reader.onload = () => {
      image = `url(${reader.result})`;
      console.log(image)
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
      console.log(result);
      this.uploadImage(result[0].toString('base64'));
    }
  }

  render() {
    return (
      <Host>
        <slot>
          <div>
            <label htmlFor='file' class='button-9' onChange={(event: any) => this.post(event.target.files)}>{this.buttonvalue}</label>
            <input type='file' id='file' name='files[]' accept="image/*" onChange={(event: any) => this.post(event.target.files)} hidden />
          </div>
        </slot>
      </Host>
    );
  }
}
