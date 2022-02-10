import { Component, Host, h, State, Event, EventEmitter, getAssetPath, Element } from '@stencil/core';
import { PostData } from '../../utils/post';
import { postImage } from '../../utils/postImage';
@Component({
  tag: 'company-banner',
  styleUrl: 'company-banner.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class CompanyBanner {
  @State() private url = 'http://localhost:8080/bannerupload'
  @Event() onUploadCompleted: EventEmitter<Blob>;
  @Element() element: HTMLElement;

  private Checkimagesize(files): boolean {
    const imageFile = files[0];

    if (imageFile.size as number > 1024 * 1024) {
      alert('Välj en mindre fil')
      return false;
    }
    else {
      console.log(this.element);
      const data = new FormData();
      data.append('file', imageFile)
      PostData(this.url, data)
      this.uploadImage(imageFile);
      return true;
    }
  }

  // submit(event) {
  //   const file = postImage(event, this.onUploadCompleted, 'slot');
  //   PostData(this.url, file);
  // }

  private uploadImage(file) {
    console.log(typeof file);
    const reader = new FileReader();
    reader.onload = () => {
      this.element.style.backgroundImage = `url(${reader.result})`;
      file = `url(${reader.result})`;
      // PostData(this.url, file);
      this.onUploadCompleted.emit(file);
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      // <Host id='host'>
      //   <slot>
      <div class='banner'>
        <label htmlFor='file' class='button' ><img src={getAssetPath(`./assets/edit.svg`)} alt='edit banner' class='pic' /></label>
        <input type='file' id='file' name='files[]' accept="image/*" onChange={(event: any) => this.Checkimagesize(event.target.files)} hidden />
        <h1>Martins kolgrill</h1>
      </div>

      //   </slot>
      // </Host>
    );
  }
}
