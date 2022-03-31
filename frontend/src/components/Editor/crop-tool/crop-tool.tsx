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
  private img = new Image();

  async componentWillLoad() {
    this.Width = this.MaxWidth
    this.Height = this.Width / this.AspectRatio;
    this.img.src = this.Image;

    this.img.onload = () => {
      this.Compress();
    }
  }

  async componentDidRender() {
    // this.canvas.height = (this.canvas.width / this.AspectRatio);
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
    // this.canvas.getContext('2d').drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.Width, this.Height);
    // console.log(this.canvas.image);

    const main = this.element.shadowRoot.querySelector('.mainElement')

    let canvas = document.createElement("canvas");
    canvas.width = this.img.width;
    canvas.height = this.img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(this.img, 0, 0);
    let imageData = ctx.getImageData(65, 60, this.Width, this.Height);

    main.appendChild(canvas)

    // create destiantion canvas
    let canvas1 = document.createElement("canvas");
    canvas1.width = 100;
    canvas1.height = 100;
    let ctx1 = canvas1.getContext("2d");
    ctx1.rect(0, 0, this.Width, this.Height);
    ctx1.fillStyle = 'white';
    ctx1.fill();
    ctx1.putImageData(imageData, 0, 0);

    main.appendChild(canvas1)


    // put data to the img element
    let dstImg = document.createElement('img');
    dstImg.src = canvas1.toDataURL("image/png");
    // main.appendChild(dstImg)
  }

  render() {
    return (
      <Host>
        <div class='mainElement'>
          {/* <div on={() => this.Resize()} class='resizeElement' onClick={() => this.Compress('resizeElement')}> */}
          {/* <canvas class='mainCanvas'></canvas> */}
          {/* </div> */}
        </div>
      </Host >
    );
  }

}
