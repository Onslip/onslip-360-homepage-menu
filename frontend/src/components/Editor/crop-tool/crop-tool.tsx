import { Component, Host, h, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'crop-tool',
  styleUrl: 'crop-tool.css',
  shadow: true,
})
export class CropTool {
  @Prop() Image: string;
  @Element() element: HTMLElement;
  @Prop() AspectRatio: number;
  @Prop() MaxWidth: number;
  @State() Width: number;
  @State() Height: number;
  private canvas;
  private img = new Image();

  componentWillLoad() {
    this.Width = this.MaxWidth
    this.Height = this.Width / this.AspectRatio;
    this.img.src = this.Image;

  }

  componentDidRender() {

    this.canvas = this.element.shadowRoot.querySelector('canvas');
    // this.canvas.height = (this.canvas.width / this.AspectRatio);

    this.Compress();
  }

  async Resize() {
    let height = this.element.shadowRoot.querySelector('div').style.height;
    height = height.slice(0, height.length - 2);
    let width = Number(height) * this.AspectRatio;
    this.element.shadowRoot.querySelector('div').style.width = `${width}px`
  }

  async Move() {


  }

  async Compress() {
    // const newCanvas = document.createElement('canvas');
    // newCanvas.width = this.img.width;
    // newCanvas.height = this.img.height;
    // newCanvas.getContext('2d').drawImage(this.img, 0, 0, newCanvas.width, newCanvas.height)
    this.canvas.getContext('2d').drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.Width, this.Height);
    console.log(this.canvas.image);
  }

  render() {
    return (
      <Host>
        <div class='mainElement'>
          {/* <div on={() => this.Resize()} class='resizeElement' onClick={() => this.Compress('resizeElement')}> */}
          <canvas class='mainCanvas'></canvas>
          {/* </div> */}
        </div>
      </Host >
    );
  }

}
