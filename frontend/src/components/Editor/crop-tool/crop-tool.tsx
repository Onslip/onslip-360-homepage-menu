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
  private img = new Image();
  private scale: number = 1;
  @State() isopen: boolean;


  open() {
    this.isopen = true;
  }

  close() {
    this.isopen = false;
  }

  async componentWillLoad() {
    this.img.src = this.Image;
    this.img.onload = () => {
      this.Compress(0, 0, 0, 0);
    }
  }
  async componentDidRender() {
    const element = this.element.shadowRoot.getElementById('resize')
    if (this.AspectRatio <= 1) {
      element.style.resize = 'vertical'
    }
    else {
      element.style.resize = 'horizontal'
    }
    element.style.width = `${this.img.width * 0.5}px`
    element.style.height = `${this.img.width * 0.5 / this.AspectRatio}px`

  }

  async dragElement(elmnt: HTMLElement) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.parentElement.ondragstart = dragMouseDown;

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
    if (elmnt.clientWidth < elmnt.parentElement.clientWidth && this.AspectRatio <= 1) {
      elmnt.style.width = `${elmnt.clientHeight * this.AspectRatio}px`
    }
    if (elmnt.clientHeight < elmnt.parentElement.clientHeight && this.AspectRatio > 1) {
      elmnt.style.height = `${elmnt.clientWidth / this.AspectRatio}px`
    }
    this.Compress(elmnt.offsetLeft, elmnt.offsetTop, elmnt.clientWidth, elmnt.clientHeight)
  }

  async Compress(targetX: number, targetY: number, targetWidth: number, targetHeight: number) {

    const main = this.element.shadowRoot.querySelector('.mainElement')
    const result = this.element.shadowRoot.querySelector('.result')
    let canvas = document.createElement("canvas");
    const imageAspectRation: number = this.img.width / this.img.height
    canvas.width = 500 * this.scale;
    canvas.height = 500 / imageAspectRation * this.scale;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(this.img, 0, 0, canvas.width / this.scale, canvas.height / this.scale, 0, 0, this.img.width * this.scale, this.img.height * this.scale);

    main.replaceChild(canvas, main.childNodes[0])

    let canvas1 = document.createElement("canvas");

    canvas1.width = this.MaxWidth;
    canvas1.height = this.MaxWidth / this.AspectRatio;
    let ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(this.img, targetX / this.scale, targetY / this.scale, targetWidth / this.scale, targetHeight / this.scale, 0, 0, canvas1.width, canvas1.height);


    let dstImg = document.createElement('img');
    dstImg.src = canvas1.toDataURL("image/png");
    result.replaceChild(dstImg, result.childNodes[0])
  }

  render() {
    return (
      <Host>
        <div class='uploadButtonDiv'>
          <label class='uploadButton'>
            Välj Bild...
            <input class='catImages' type='file' onChange={() => { this.open() }} hidden />
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
                  <div class="resize" id='resize' onMouseMove={(event: any) => this.resize()}>
                    <div class={'drag'} draggable={true} onDrag={(event: any) => this.dragElement(event.target.parentElement)}></div>
                  </div>
                </div>
              </div>
              {/* 
              <div class="result">
                <img></img>
              </div> */}
            </div>
            <div class="footer">
              <button class='button-save' type="submit" value="Submit">Spara</button>
            </div>
          </div>
        </div >

      </Host >
    );
  }

}
