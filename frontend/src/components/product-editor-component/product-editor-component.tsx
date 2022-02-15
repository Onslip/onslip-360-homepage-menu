import { Component, h } from '@stencil/core';

@Component({
  tag: 'product-editor-component',
  styleUrl: 'product-editor-component.css',
  shadow: true,
})
export class ProductEditorComponent {

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

  render() {
    return (
      <input type="file" name="files[]" id="file" accept="image/*"
        onChange={($event: any) => this.postimage($event.target.files)} />
    );
  }

}
