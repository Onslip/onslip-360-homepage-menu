import { Component, Host, h, State, Event, EventEmitter, getAssetPath } from '@stencil/core';
import { PostData } from '../../utils/post';
@Component({
  tag: 'company-banner',
  styleUrl: 'company-banner.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class CompanyBanner {
  @State() private url = 'http://localhost:8080/uploadbanner'
  @Event() onUploadCompleted: EventEmitter<Blob>;

  private Checkimagesize(files): boolean {
    const imageFile = files[0];

    if (imageFile.size as number > 1024 * 1024) {
      alert('Välj en mindre fil')
      return false;
    }
    else {
      this.uploadImage(imageFile);
      return true;
    }
  }

  private uploadImage(file) {
    console.log(typeof file);
    const reader = new FileReader();
    reader.onload = () => {
      document.querySelector('host').style.backgroundImage = `url(${reader.result})`;
      file = `url(${reader.result})`;
      PostData(this.url, file);
      this.onUploadCompleted.emit(file);
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <Host id='host'>
        <slot>
          <label htmlFor='file' class='button' ><img src={getAssetPath(`./assets/edit.svg`)} alt='edit banner' class='pic' /></label>
          <input type='file' id='file' name='files[]' accept="image/*" hidden onChange={(event: any) => this.Checkimagesize(event.target.files)}></input>
          <h1>Martins kolgrill</h1>
        </slot>
      </Host>
    );
  }
}
