import { Component, Host, h, Prop, Element, getAssetPath } from '@stencil/core';
import { PostImage } from '../../../utils/post';
import { LoadBackground, LoadBanner, LoadLogo } from './SetImage';
import { deleteImage } from '../../../utils/delete';
import { loadImage } from '../../../utils/image';
import { GetData } from '../../../utils/get';

@Component({
  tag: 'crop-tool',
  styleUrls: ['crop-tool.css'],
  shadow: true,
  assetsDirs: ['../../../assets'],
})
export class CropTool {
  @Element() element: HTMLElement;
  @Prop() format?: "image/jpeg" | "image/jpg" | "image/png";
  @Prop() url: string;
  @Prop() AspectRatio: number;
  @Prop() MaxWidth: number;
  @Prop() TargetId: number
  @Prop() ImagePosition;
  @Prop() CategoryId: number;
  private imageFile: File;
  private img: HTMLImageElement = new Image();
  private scale: number;
  private renderedWidth: number = 550


  async componentDidRender() {
    console.log(this.CategoryId)
    console.log(this.TargetId)
    this.LoadImage()
  }

  async LoadImage() {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFile[0]);
      reader.onload = () => {
        this.img.src = reader.result.toString();
        this.img.onload = () => {
          this.CreateCanvas();
        }
      }
    } catch {
      try {
        const currentImage = await GetData(`${this.url}?id=${this.TargetId}`)
          .then(response => response)
        const loadedImage = await loadImage(currentImage[0]['image']['data'])
        this.img.src = loadedImage.toString()
      } catch {
        this.img.src = getAssetPath(`../../../assets/placeholder.png`)
      }
      this.img.onload = () => {
        this.CreateCanvas();
      }
    }
  }

  async close() {
    await customElements.whenDefined('ion-modal')
    const modal = document.querySelector('ion-modal')
    await modal.dismiss();
  }

  async dragElement(e) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const elmnt = e.target;
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
      elmnt.parentElement.style.top = `${limit(elmnt.parentElement.offsetTop, elmnt.parentElement.parentElement.clientHeight - elmnt.parentElement.clientHeight, 0)}px`
      elmnt.parentElement.style.left = `${limit(elmnt.parentElement.offsetLeft, elmnt.parentElement.parentElement.clientWidth - elmnt.parentElement.clientWidth, 0)}px`
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

      let maxW: boolean = elmnt.parentElement.clientWidth > elmnt.parentElement.parentElement.clientWidth - elmnt.parentElement.offsetLeft - 1
      let maxH: boolean = elmnt.parentElement.clientHeight > elmnt.parentElement.parentElement.clientHeight - elmnt.parentElement.offsetTop - 1
      let minW: boolean = elmnt.parentElement.clientWidth < 50
      let minH: boolean = elmnt.parentElement.clientHeight < 50

      if (((maxW || maxH) && !(pos1 > 0 || pos2 > 0)) || ((minW || minH) && !(pos1 < 0 || pos2 < 0))) {
        pos1 = 0
        pos2 = 0
        if (maxW) {
          elmnt.parentElement.style.width = (elmnt.parentElement.parentElement.clientWidth - elmnt.parentElement.offsetLeft) + "px"
          elmnt.parentElement.style.height = (elmnt.parentElement.clientWidth / ar) + "px";
        }
        else if (maxH) {
          elmnt.parentElement.style.height = (elmnt.parentElement.parentElement.clientHeight - elmnt.parentElement.offsetTop) + "px"
          elmnt.parentElement.style.width = (elmnt.parentElement.clientHeight * ar) + "px";
        }
      }
      elmnt.parentElement.style.width = (elmnt.parentElement.clientWidth - pos1 - pos2) + "px";
      elmnt.parentElement.style.height = (elmnt.parentElement.clientWidth / ar) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  CreateCanvas() {
    const main = this.element.shadowRoot.querySelector('.mainElement')
    const content = this.element.shadowRoot.querySelector('.content')
    let canvas = document.createElement("canvas");
    const imageAspectRation: number = this.img.width / this.img.height

    if (imageAspectRation < content.clientWidth / content.clientHeight) {
      this.renderedWidth = content.clientHeight - 10
      canvas.height = this.renderedWidth;
      canvas.width = this.renderedWidth * imageAspectRation;
    }
    else {
      this.renderedWidth = content.clientWidth - 10
      canvas.width = this.renderedWidth;
      canvas.height = this.renderedWidth / imageAspectRation;
    }

    this.scale = this.img.width / canvas.width;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, canvas.width, canvas.height);
    main.replaceChild(canvas, main.childNodes[0]);
    const element = this.element.shadowRoot.getElementById('resize')

    element.style.width = `${this.renderedWidth * 0.5}px`
    element.style.height = `${this.renderedWidth * 0.5 / this.AspectRatio}px`
    element.style.top = `${element.parentElement.clientHeight / 2 - element.clientHeight / 2}px`
    element.style.left = `${element.parentElement.clientWidth / 2 - element.clientWidth / 2}px`
  }

  async Compress() {
    const resize = this.element.shadowRoot.getElementById('resize')
    const targetX = resize.offsetLeft
    const targetY = resize.offsetTop
    const targetW = resize.clientWidth;
    const targetH = resize.clientHeight;

    let canvas1 = document.createElement("canvas");
    canvas1.width = this.MaxWidth;
    canvas1.height = this.MaxWidth / this.AspectRatio;
    let ctx1 = canvas1.getContext("2d");
    ctx1.drawImage(this.img, targetX * this.scale, targetY * this.scale, targetW * this.scale, targetH * this.scale, 0, 0, canvas1.width, canvas1.height);
    const data = await fetch(canvas1.toDataURL(this.format, 0.8))
      .then(res => res)
    const file = new File([await data.blob()], 'image');

    if (this.imageFile != undefined) {
      this.UploadImage(file, this.TargetId);
    }
  }

  UploadImage(File: File, id: number) {
    const a = document.querySelector('app-root').querySelector('homepage-menu-editor-component').shadowRoot.querySelector('menu-editor-component');
    let fd = new FormData()
    if (this.ImagePosition == 'Background') {
      LoadBackground(File);
    }
    else if (this.ImagePosition == 'Logo') {
      LoadLogo(File, '.header');
    }
    else if (this.ImagePosition == 'Banner') {
      LoadBanner(File, '.header');
    }
    fd.append('image', File);
    if (this.ImagePosition == 'Category') {
      fd.append('id', String(id));
      a.UploadCatImage(File, id)
    }
    else if (this.ImagePosition == 'Product') {
      fd.append('id', String(this.TargetId));
      a.uploadProdImage(File, this.TargetId, this.CategoryId);
    }

    console.log('test')
    PostImage(this.url, fd).catch(err => console.log(err));
    this.close()
  }

  private deleteImage() {
    const a = document.querySelector('app-root').querySelector('homepage-menu-editor-component').shadowRoot.querySelector('menu-editor-component');
    const aproved: boolean = confirm('??r du s??ker p?? att du vill radera bilden?')
    console.log(aproved)
    if (aproved) {
      a.deletedProdImg(this.TargetId, this.ImagePosition)
      deleteImage(this.url, this.TargetId)
      this.close()
    }
  }



  render() {
    return (
      <Host>
        <div class="modal">
          <div class="header">
            <ion-item lines='none'>
              <h4>Redigera bild</h4>
              <div slot='end'>
                <ion-item lines='none'>
                  <label class='button add'>
                    Ladda upp bild <ion-icon class='icon' name="add-circle-sharp" />
                    <input hidden type="file" onChange={(event: any) => { this.imageFile = event.target.files; this.LoadImage() }} />
                  </label>
                  <button class='button close' type="submit" onClick={() => { this.deleteImage(); }}>Radera bild <ion-icon class='icon' name="remove-circle-sharp" /></button>
                </ion-item>
              </div>
            </ion-item>
          </div>
          <div class="body">
            <div class="content">
              <div class="resizeContainer">
                <div class='mainElement' >
                  <canvas></canvas>
                </div>
                <div class="resize" id='resize'>
                  <div class={'pullhandle se'} onMouseDown={(event) => this.resizeElement(event)}></div>
                  <div class='drag' onMouseDown={(event: any) => this.dragElement(event)}></div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <button class='button save' type="submit" value="Submit" onClick={() => { this.Compress(); }}>Spara</button>
            <button class='button close' type="submit" value="Submit" onClick={() => { this.close() }}>Avbryt</button>
          </div>
        </div>
      </Host >
    );
  }
}
