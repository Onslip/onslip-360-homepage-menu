import { Component, h, Host, State, Element } from '@stencil/core';

@Component({
  tag: 'product-editor-component',
  styleUrl: 'product-editor-component.css',
  shadow: true,
})
export class ProductEditorComponent {
  @Element() document: HTMLElement
  @State() image: string
  @State() status: string = 'Start upload'

  async postimage(file) {
    let fd = new FormData()
    fd.append('image', await file[0])

    await fetch('http://localhost:8080/productimage-upload', {
      method: 'POST',
      body: fd
    })
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  async loadimage(file) {
    const reader = new FileReader();
    reader.onloadstart = () => {
      this.status = 'started uploading'
      console.log('started uploading');
    }

    reader.onload = () => {
      this.image = `url(${reader.result})`;
      this.status = 'uploading finished, emitting an image blob to the outside world'
      console.log('uploading finished, emitting an image blob to the outside world');
      console.log(this.image)
      this.document.style.backgroundImage = this.image
    };

    reader.onerror = (err) => {
      this.status = 'something went wrong...'
      console.error('something went wrong...', err);
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <Host>
        <slot>
          <p>{this.status}</p>
        </slot>
        <slot>
          <input type="file" name="files[]" id="file" accept="image/*" onChange={($event: any) => { this.postimage($event.target.files); this.loadimage($event.target.files[0]) }} />
        </slot>
      </Host>
    );
  }

}
