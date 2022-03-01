import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { CheckImage } from '../../utils/image';
import { PostData, PostImage } from '../../utils/post';
import { config } from '../../utils/utils';
import { buttonvalues } from '../../utils/utils';
import '@ionic/core'

@Component({
  tag: 'upload-image-button',
  styleUrl: 'upload-image-button.css',
  shadow: true,
})

export class UploadImageButton {
  @Prop() buttonvalue: string;
  @Prop() URL: string;
  @Element() element: HTMLElement;


  async post(file) {
    if (CheckImage(file[0])) {
      let fd = new FormData()
      fd.append('image', await file[0]);
      await PostImage(this.URL, fd);
      switch (this.buttonvalue) {
        case buttonvalues.background: {
          this.LoadBackground(file[0]);
          break;
        }
        case buttonvalues.banner: {
          this.LoadBanner(file[0], '.header')
          break;
        }
        case buttonvalues.logo: {
          this.LoadLogo(file[0], '.header')
          break;
        }
      }
    }
  }

  private async LoadBackground(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        document.querySelector('body').style.backgroundImage = image
        config.background.enabled = false
        PostData('http://localhost:8080/config', config);

      }
    };
  }

  private async LoadLogo(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        const img = document.createElement('img');
        const mainelement = document.querySelector('homepage-menu-editor-component');
        img.src = reader.result.toString();
        const a = mainelement.shadowRoot.querySelector(element);
        a.removeChild(a.childNodes[0]);
        mainelement.shadowRoot.querySelector(element).appendChild(img);
      }
    };
  }

  private async LoadBanner(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = `url(${reader.result})`;
      if (image != null) {
        const mainelement = document.querySelector('homepage-menu-editor-component');
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
