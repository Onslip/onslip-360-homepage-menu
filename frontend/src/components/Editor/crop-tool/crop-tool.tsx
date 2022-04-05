import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { CheckImage } from '../../utils/image';
import { PostImage } from '../../utils/post';

@Component({
  tag: 'crop-tool',
  styleUrl: 'crop-tool.css',
  shadow: true,
})
export class CropTool {
  @Prop() url: string;
  @Element() element: HTMLElement;
  @Prop() AspectRatio: number;
  @Prop() MaxWidth: number;
  private img = new Image();
  private scale: number = 1;
  @State() isopen: boolean;
  @Prop() TargetId: number
  private targetX = 0;
  private targetY = 0;
  private targetW = 0;
  private targetH = 0;

  open() {
    this.isopen = true;
  }

  close() {
    this.isopen = false;
  }

  LoadImage(image) {
    const reader = new FileReader();
    reader.readAsDataURL(image[0]);
    reader.onload = () => {
      this.img.src = reader.result.toString();
      this.img.onload = () => {
        this.CreateCanvas();
      }
    }
  }

  async dragElement(elmnt: HTMLElement) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // elmnt.parentElement.onmousemove = dragMouseDown;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      elmnt.style.top = `${limit(elmnt.offsetTop, elmnt.parentElement.clientHeight - elmnt.clientHeight - 4, 0)}px`
      elmnt.style.left = `${limit(elmnt.offsetLeft, elmnt.parentElement.clientWidth - elmnt.clientWidth - 4, 0)}px`
      this.targetX = elmnt.offsetTop;
      this.targetY = elmnt.offsetLeft;
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function limit(value: number, maxLimit: number, minLimit: number): number {
      if (value > maxLimit) {
        return maxLimit
      }
      else if (value < minLimit) {
        return minLimit
      }
      return value
    }

    this.resize()
  }


  async resize() {
    const elmnt: HTMLElement = this.element.shadowRoot.getElementById('resize')
    if (elmnt.clientWidth < elmnt.parentElement.clientWidth && elmnt.style.resize == "vertical") {
      elmnt.style.width = `${elmnt.clientHeight * this.AspectRatio}px`
    }
    if (elmnt.clientHeight < elmnt.parentElement.clientHeight && elmnt.style.resize == "horizontal") {
      elmnt.style.height = `${elmnt.clientWidth / this.AspectRatio}px`
    }
    this.targetW = elmnt.clientWidth;
    this.targetH = elmnt.clientHeight;
    console.log(this.targetH, this.targetW)
  }

  async CreateCanvas() {
    const main = this.element.shadowRoot.querySelector('.mainElement')
    let canvas = document.createElement("canvas");
    const imageAspectRation: number = this.img.width / this.img.height
    if (this.img.height <= this.img.width) {
      canvas.width = 500 * this.scale;
      canvas.height = 500 / imageAspectRation * this.scale;
    }
    else {
      canvas.height = 500 * this.scale;
      canvas.width = 500 * imageAspectRation * this.scale;
    }
    let ctx = canvas.getContext("2d");
    ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, canvas.width, canvas.height);
    main.replaceChild(canvas, main.childNodes[0]);
    const element = this.element.shadowRoot.getElementById('resize')
    if (this.AspectRatio < 1 && this.img.height <= this.img.width) {
      element.style.resize = 'vertical'
    }
    else {
      element.style.resize = 'horizontal'
    }
    element.style.width = `${500 * 0.5}px`
    element.style.height = `${500 * 0.5 / this.AspectRatio}px`

    let canvas1 = document.createElement("canvas");
    canvas1.width = this.MaxWidth;
    canvas1.height = this.MaxWidth / this.AspectRatio;
    let ctx1 = canvas1.getContext("2d");

    ctx1.drawImage(this.img, this.targetX / this.scale, this.targetY / this.scale, this.targetW / this.scale, this.targetH / this.scale, 0, 0, canvas1.width, canvas1.height);
    let dstImg = document.createElement('img');
    dstImg.src = canvas1.toDataURL("image/png");
    const ele = this.element.shadowRoot.querySelector('.imgElement');
    ele.replaceChild(dstImg, ele.childNodes[0]);
  }

  UploadImage(File: File, id: number) {
    let fd = new FormData()
    console.log(File);
    fd.append('image', File);
    fd.append('id', String(id));
    PostImage(this.url, fd);
  }

  async Compress() {
    let canvas1 = document.createElement("canvas");
    canvas1.width = this.MaxWidth;
    canvas1.height = this.MaxWidth / this.AspectRatio;
    let ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(this.img, this.targetX / this.scale, this.targetY / this.scale, this.targetW / this.scale, this.targetH / this.scale, 0, 0, canvas1.width, canvas1.height);
    const data = await fetch(canvas1.toDataURL("image/png"))
      .then(async res => await res.blob())
    console.log(data);
    const file = new File([data], 'image');
    this.UploadImage(file, this.TargetId);
  }

  render() {
    return (
      <Host>
        <div class='uploadButtonDiv'>
          <label class='uploadButton'>
            Välj Bild...
            <input class='catImages' type='file' onChange={(event: any) => { this.LoadImage(event.target.files), this.open(); }} hidden />
          </label>
        </div>
        <div class={this.isopen ? 'modal-wrapper is-open' : 'modal-wrapper'}>
          <div class="modal-overlay" onClick={() => this.close()}></div>
          <div class="modal">
            <div class="header">
            </div>
            <div class="body">
              <div class="content">
                <div class="resizeContainer">
                  <div class='mainElement' >
                    <canvas></canvas>
                  </div>

                  <div class="resize" id='resize' onMouseDown={() => this.resize()}>
                    <div class={'drag'} onMouseDown={(event: any) => this.dragElement(event.target)}></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer">

              <button class='button-save' type="submit" value="Submit" onClick={() => { this.close(); this.Compress(); }}>Spara</button>
            </div>
          </div>

        </div >
        <div class='imgElement'>
          <img></img>
        </div>
      </Host >
    );
  }
}
