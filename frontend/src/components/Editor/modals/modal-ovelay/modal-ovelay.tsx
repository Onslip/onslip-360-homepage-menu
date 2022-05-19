import { Component, Host, h, Prop, Element } from '@stencil/core';
import { modalController } from '@ionic/core';

@Component({
  tag: 'modal-ovelay',
  styleUrl: 'modal-ovelay.css',
  shadow: true,
})
export class ModalOvelay {
  @Prop() url: string;
  @Prop() format?: "image/jpeg" | "image/jpg" | "image/png";
  @Prop() AspectRatio: number;
  @Prop() MaxWidth: number;
  @Prop() TargetId: number
  @Prop() buttonClass: string;
  @Prop() RenderType: string;
  @Prop() buttonValue: string;
  @Prop() ImagePosition: string;
  @Prop() CategoryId: number;
  @Prop() iconName: string;
  private imageFile: File;

  @Element() el: any

  async presentModal() {
    if (this.RenderType == 'image') {
      const modal = await modalController.create({
        component: 'crop-tool',
        swipeToClose: true,
        presentingElement: this.el.closest('ion-modal'),
        componentProps: {
          'url': this.url,
          'format': this.format,
          'imageFile': this.imageFile,
          'MaxWidth': this.MaxWidth,
          'AspectRatio': this.AspectRatio,
          'TargetId': this.TargetId,
          'ImagePosition': this.ImagePosition,
          'CategoryId': this.CategoryId
        }
      });
      await modal.present();
    }
    else {
      const modal = await modalController.create({
        component: this.RenderType,
        swipeToClose: true,
        presentingElement: this.el.closest('ion-modal'),
      });
      await modal.present();
    }

  }

  render() {
    if (this.RenderType == 'image') {
      return (
        <Host>
          <label class={this.buttonClass} title='Ladda upp bild...'>
            {this.buttonValue}<ion-icon class="icon" name={this.iconName}></ion-icon>
            <input class='catImages' type='file' onChange={(event: any) => { this.imageFile = event.target.files; this.presentModal(); }} hidden />
          </label>
        </Host>
      );
    }
    else {
      return (
        <Host>
          <label class={this.buttonClass}>
            {this.buttonValue}<ion-icon class="icon" name={this.iconName}></ion-icon>
            <input class='catImages' onClick={() => { this.presentModal(); }} hidden />
          </label>
        </Host>
      );
    }
  }
}
