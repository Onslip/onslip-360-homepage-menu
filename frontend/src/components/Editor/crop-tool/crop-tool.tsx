import { Component, Host, h, Prop, Element, State } from '@stencil/core';
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
  private scale: number;
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
    this.element.shadowRoot.getElementById('resize')
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

  async dragElement(e) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const elmnt = e.target;
    console.log(e.button)
    document.onmouseup = closeDragElement;

    document.onmousemove = (event) => {
      event.preventDefault();
      if (e.button == 0) {
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }
    }

    function elementDrag(ev) {
      ev = ev || window.event;
      ev.preventDefault();
      pos1 = pos3 - ev.clientX;
      pos2 = pos4 - ev.clientY;
      pos3 = ev.clientX;
      pos4 = ev.clientY;
      elmnt.parentElement.style.top = (elmnt.parentElement.offsetTop - pos2) + "px";
      elmnt.parentElement.style.left = (elmnt.parentElement.offsetLeft - pos1) + "px";
      elmnt.parentElement.style.top = `${limit(elmnt.parentElement.offsetTop, elmnt.parentElement.parentElement.clientHeight - elmnt.parentElement.clientHeight - 5, 5)}px`
      elmnt.parentElement.style.left = `${limit(elmnt.parentElement.offsetLeft, elmnt.parentElement.parentElement.clientWidth - elmnt.parentElement.clientWidth - 5, 5)}px`
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
  }

  async resizeElement(e) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const ar = this.AspectRatio
    const elmnt = e.target;
    console.log(e.button)
    document.onmouseup = closeDragElement;

    document.onmousemove = (event) => {
      event.preventDefault();
      if (e.button == 0) {
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }
    }

    function elementDrag(ev) {
      ev = ev || window.event;
      ev.preventDefault();
      pos1 = pos3 - ev.clientX;
      pos2 = pos4 - ev.clientY;
      pos3 = ev.clientX;
      pos4 = ev.clientY;

      switch (elmnt.id) {
        case 'ne':
          pos1 *= -1
          pos2 *= 1
          elmnt.parentElement.style.top = `${elmnt.parentElement.offsetTop - pos2}px`
          break;
        case 'se':
          pos1 *= -1
          pos2 *= -1
          break;
        case 'nw':
          pos1 *= 1
          pos2 *= 1
          elmnt.parentElement.style.top = `${elmnt.parentElement.offsetTop - pos2}px`
          elmnt.parentElement.style.left = `${elmnt.parentElement.offsetLeft - pos1}px`
          break;
        case 'sw':
          pos1 *= 1
          pos2 *= -1
          elmnt.parentElement.style.left = `${elmnt.parentElement.offsetLeft - pos1}px`
          break;
        default:
          break;
      }

      elmnt.parentElement.style.height = (limit(elmnt.parentElement.clientHeight + pos2, elmnt.parentElement.parentElement.clientHeight - elmnt.parentElement.offsetTop - 5, 20)) + "px";
      elmnt.parentElement.style.width = (elmnt.parentElement.clientHeight * ar) + "px";

      elmnt.parentElement.style.width = (limit(elmnt.parentElement.clientWidth + pos1, elmnt.parentElement.parentElement.clientWidth - elmnt.parentElement.offsetLeft - 5, 20)) + "px";
      elmnt.parentElement.style.height = (elmnt.parentElement.clientWidth / ar) + "px";
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
  }


  // async resize(event: MouseEvent) {
  //   console.log('se')
  //   const elmnt: HTMLElement = this.element.shadowRoot.getElementById('resize')
  //   if (event.button == 0) {
  //     console.log("hejhej")
  //   }
  //   if (elmnt.offsetLeft + elmnt.clientWidth <= elmnt.parentElement.clientWidth && this.AspectRatio <= 1) {
  //     elmnt.style.resize = "vertical"
  //     elmnt.style.width = `${elmnt.clientHeight * this.AspectRatio}px`
  //   }
  //   else if (elmnt.offsetTop + elmnt.clientHeight <= elmnt.parentElement.clientHeight && this.AspectRatio > 1) {
  //     elmnt.style.resize = "horizontal"
  //     elmnt.style.height = `${elmnt.clientWidth / this.AspectRatio}px`
  //   }
  //   this.targetW = elmnt.clientWidth;
  //   this.targetH = elmnt.clientHeight;
  //   this.targetX = elmnt.offsetLeft;
  //   this.targetY = elmnt.offsetTop;
  // }

  async CreateCanvas() {
    const main = this.element.shadowRoot.querySelector('.mainElement')
    let canvas = document.createElement("canvas");
    const imageAspectRation: number = this.img.width / this.img.height
    if (this.img.height <= this.img.width) {
      canvas.width = 500;
      canvas.height = 500 / imageAspectRation;
    }
    else {
      canvas.height = 500;
      canvas.width = 500 * imageAspectRation;
    }
    let ctx = canvas.getContext("2d");
    ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, canvas.width, canvas.height);
    main.replaceChild(canvas, main.childNodes[0]);
    const element = this.element.shadowRoot.getElementById('resize')
    if (this.AspectRatio >= 1 && imageAspectRation >= 1) {
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

    console.log(this.targetH, this.targetW, this.targetX, this.targetY)

    ctx1.drawImage(this.img, this.targetX * this.scale, this.targetY * this.scale, this.targetW * this.scale, this.targetH * this.scale, 0, 0, canvas1.width, canvas1.height);
    let dstImg = document.createElement('img');
    dstImg.src = canvas1.toDataURL("image/png");
    const ele = this.element.shadowRoot.querySelector('.imgElement');
    ele.replaceChild(dstImg, ele.childNodes[0]);
    this.scale = this.img.width / canvas.width;

  }

  UploadImage(File: File, id: number) {
    let fd = new FormData()
    console.log(File);
    fd.append('image', File);
    fd.append('id', String(id));
    PostImage(this.url, fd).then(res => console.log(res)).catch(err => console.log(err));
  }

  async Compress() {

    let canvas1 = document.createElement("canvas");
    canvas1.width = this.MaxWidth;
    canvas1.height = this.MaxWidth / this.AspectRatio;
    let ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(this.img, this.targetX * this.scale, this.targetY * this.scale, this.targetW * this.scale, this.targetH * this.scale, 0, 0, canvas1.width, canvas1.height);
    const data = await fetch(canvas1.toDataURL("image/png"))
      .then(res => res)
    console.log(data);
    const file = new File([await data.blob()], 'image');
    this.UploadImage(file, this.TargetId);
  }

  render() {
    return (
      <Host>
        <label class='uploadButton'>
          Välj Bild...
          <input class='catImages' type='file' onChange={(event: any) => { this.LoadImage(event.target.files), this.open(); }} hidden />
        </label>
        <div class={this.isopen ? 'modal-wrapper is-open' : 'modal-wrapper'}>

          <div class="modal-overlay" onClick={() => this.close()}></div>
          <div class="modal">
            <div class="header">
              <h6>Redigera bild</h6>
            </div>
            <div class="body">
              <div class="resizeContainer">
                <div class='mainElement' >
                  <canvas></canvas>
                </div>
                <div class="resize" id='resize'>
                  <div class={'pullhandle ne'} id="ne" onMouseDown={(event) => this.resizeElement(event)}></div>
                  <div class={'pullhandle nw'} id="nw" onMouseDown={(event) => this.resizeElement(event)}></div>
                  <div class={'pullhandle se'} id="se" onMouseDown={(event) => this.resizeElement(event)}></div>
                  <div class={'pullhandle sw'} id="sw" onMouseDown={(event) => this.resizeElement(event)}></div>
                  <div class='drag' onMouseDown={(event: any) => this.dragElement(event)}></div>
                </div>
              </div>
            </div>
            <div class="footer">
              <button class='button-save' type="submit" value="Submit" onClick={() => { this.close(); this.Compress(); }}>Spara</button>
              <button class='button-close' type="submit" value="Submit" onClick={() => { this.close() }}>Avbryt</button>
            </div>
          </div>
          <div class='imgElement'>
            <img></img>
          </div>
        </div >
      </Host >
    );
  }
}
