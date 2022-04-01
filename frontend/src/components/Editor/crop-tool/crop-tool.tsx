import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { off } from 'process';

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
  @State() startX: number = 0;
  @State() startY: number = 0;
  @State() endX: number = 0;
  @State() endY: number = 0;
  @State() x: number = 0;
  @State() y: number = 0;
  private img = new Image();
  private scale: number = 5

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
  
  async Move(event: MouseEvent) {
      this.startX = event.clientX
      this.startY = event.clientY
      console.log('Cursor at: ' + this.x + ', ' + this.x)
  }

  async MoveEnd(event: any) {
    this.endX = event.clientX
    this.endY = event.clientY;
    this.x += this.endX - this.startX 
    this.y += this.endY - this.startY

    this.x = await this.limit(this.x, this.img.width * this.scale - 10, -this.img.width * this.scale + 10)
    this.y = await this.limit(this.y, this.img.height * this.scale - 10, -this.img.height * this.scale + 10)
    console.log('Cursor at: ' + this.endX + ', ' + this.endY)
    console.log('Difference: ' + this.x + ', ' + this.y)
    this.Compress()
  }

  async limit(value:number, maxLimit: number, minLimit: number): Promise<number> {
    if (value > maxLimit) {
      return maxLimit
    }
    else if (value < minLimit) {
      return minLimit
    }
    return value
  }
  
  async Compress() {
    this.Height = this.Width / this.AspectRatio;
    // const newCanvas = document.createElement('canvas');
    // newCanvas.width = this.img.width;
    // newCanvas.height = this.img.height;
    // newCanvas.getContext('2d').drawImage(this.img, 0, 0, newCanvas.width, newCanvas.height)
    // this.canvas.getContext('2d').drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.Width, this.Height);
    // console.log(this.canvas.image);
    const main = this.element.shadowRoot.querySelector('.mainElement')
    const result = this.element.shadowRoot.querySelector('.result')
    const scale = this.Width / this.img.width
    let canvas = document.createElement("canvas");
    canvas.width = this.img.width;
    canvas.height = this.img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height, this.x - canvas.width / 2, this.y - canvas.height / 2, this.img.width * this.scale, this.img.height * this.scale);
    ctx.strokeRect(0, 0, this.img.width * scale, this.img.width/this.AspectRatio * scale)

    main.replaceChild(canvas, main.childNodes[0])

    const vOffset = (canvas.height - (canvas.width / this.AspectRatio)) / 2

    let canvas1 = document.createElement("canvas");
    canvas1.width = this.Width;
    canvas1.height = this.Height;
    let ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(this.img, this.x - canvas.width / 2, this.y - this.img.height / 2, canvas.width * this.scale, canvas.height * this.scale);
    
    
    // put data to the img element
    let dstImg = document.createElement('img');
    dstImg.src = canvas1.toDataURL("image/png");
    result.replaceChild(dstImg, result.childNodes[0])
  }

  render() {
    return (
      <Host>
        <div class='mainElement' onMouseDown={(event: MouseEvent) => this.Move(event)} onMouseUp={(event: MouseEvent) => this.MoveEnd(event)}>
          <canvas></canvas>
        </div>
        <div class="result">
          <img></img>
        </div>
      </Host >
    );
  }

}
