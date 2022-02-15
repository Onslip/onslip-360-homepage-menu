import { Component, h, State, Event, EventEmitter, getAssetPath, Element } from '@stencil/core';
import { PostData } from '../../utils/post';
import { Banner } from '../../utils/utils';
import { CheckImage } from '../../utils/image';

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



  private uploadImage(file) {
    if (CheckImage(file[0])) {
      const reader = new FileReader();
      reader.onload = () => {
        this.element.style.backgroundImage = `url(${reader.result})`;
        const data: Banner = { image: `url(${reader.result})` };
        PostData(this.url, data);
      };
      reader.readAsDataURL(file[0]);
    }
  }

  render() {
    return (
      <div class='banner'>
        <label htmlFor='file' class='button' ><img src={getAssetPath(`./assets/edit.svg`)} class='pic' /></label>

        <input type='file' id='file' name='files[]' accept="image/*" onChange={(event: any) => this.uploadImage(event.target.files)} hidden />
        <h1>Martins kolgrill</h1>
      </div>
    );
  }
}
