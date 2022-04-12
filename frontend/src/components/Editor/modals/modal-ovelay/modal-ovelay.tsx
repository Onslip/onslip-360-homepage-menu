import { Component, Host, h, Prop, State, Method, Element } from '@stencil/core';
import { modalController } from '@ionic/core';

@Component({
  tag: 'modal-ovelay',
  styleUrl: 'modal-ovelay.css',
  shadow: true,
})
export class ModalOvelay {
  @Prop() url: string;
  @Prop() AspectRatio: number;
  @Prop() MaxWidth: number;
  @Prop() TargetId: number
  @Prop() buttonClass: string
  private imageFile: File;

  @Element() el: any

  async presentModal() {
    const modal = await modalController.create({
      component: 'crop-tool',
      swipeToClose: true,
      presentingElement: this.el.closest('ion-modal'),
      componentProps: {
        'url': this.url,
        'imageFile': this.imageFile,
        'MaxWidth': this.MaxWidth,
        'AspectRatio': this.AspectRatio,
        'TargetId': this.TargetId
      }  
    });
    await modal.present();
  }

  render() {
    return (
      <Host>
        <label class={`uploadButton ${this.buttonClass}`}>
          Välj Bild...
          <input class='catImages' type='file' onChange={(event: any) => {this.imageFile = event.target.files; this.presentModal(); }} hidden />
        </label>
      </Host>
    );
  }

}
