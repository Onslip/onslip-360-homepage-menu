import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { CheckImage } from '../../utils/image';
import { PostData, PostImage } from '../../utils/post';
import '@ionic/core'
import { Colorconfig } from '../../utils/utils';
import { buttonvalues } from '../image-uploader/image-uploader';

@Component({
  tag: 'upload-image-button',
  styleUrl: 'upload-image-button.css',
  shadow: true,
})

export class UploadImageButton {
  @Prop() buttonvalue: string;
  @Prop() URL: string;
  @Element() element: HTMLElement;
  @State() value: buttonvalues = { '1': 'Ändra bakgrund', '2': 'Ändra banner', '3': 'Ändra logga' }

  async post(file) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      await PostImage(this.URL, fd);
      if (this.buttonvalue == this.value[1]) {
        this.LoadBackground(file[0]);
      }
      if (this.buttonvalue == this.value[2]) {
        this.LoadBanner(file[0], '.header')
      }
      if (this.buttonvalue == this.value[3]) {
        this.LoadLogo(file[0], '.header')
      }
    }
  }

  private LoadBackground(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        document.querySelector('body').style.backgroundImage = image
        const data: Colorconfig = { backgroundcolor: null }
        PostData('http://localhost:8080/backgroundcolor', data);
      }
    };
  }

  private LoadLogo(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        const img = document.createElement('img');
        const height = '200px'
        const mainelement = document.querySelector('homepage-menu-component');
        mainelement.shadowRoot.querySelector(element).style.height = height
        img.src = reader.result.toString();
        img.style.height = height;
        const a = mainelement.shadowRoot.querySelector(element);
        a.removeChild(a.childNodes[0]);
        mainelement.shadowRoot.querySelector(element).appendChild(img);
      }
    };
  }

  private LoadBanner(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        const mainelement = document.querySelector('homepage-menu-component');
        mainelement.shadowRoot.querySelector(element).style.backgroundImage = image;
      }
    };
  }

  render() {
    return (
      <Host>
        <div>
          <label class='button-9' htmlFor='file'>{this.buttonvalue} <ion-icon class="icon" name="folder-sharp"></ion-icon></label>
          <input type='file' id='file' name='files[]' accept="image/*" onChange={(event: any) => this.post(event.target.files)} hidden />
        </div>
      </Host>
    );
  }
}
