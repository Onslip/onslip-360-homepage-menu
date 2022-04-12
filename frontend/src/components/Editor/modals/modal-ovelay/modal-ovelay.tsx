import { Component, Host, h, Prop, Element } from '@stencil/core';
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
  @Prop() buttonClass: string;
  @Prop() RenderType: string;
  @Prop() buttonValue: string;
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
          'imageFile': this.imageFile,
          'MaxWidth': this.MaxWidth,
          'AspectRatio': this.AspectRatio,
          'TargetId': this.TargetId
        }
      });
      await modal.present();
    }
    else if (this.RenderType == 'Api') {
      const modal = await modalController.create({
        component: 'api-ui',
        swipeToClose: true,
        presentingElement: this.el.closest('ion-modal')
      });
      await modal.present();
    }
    else {
      const modal = await modalController.create({
        component: 'layout-overlay',
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
          <label class={`uploadButton ${this.buttonClass}`}>
            {this.buttonValue}
            <input class='catImages' type='file' onChange={(event: any) => { this.imageFile = event.target.files; this.presentModal(); }} hidden />
          </label>
        </Host>
      );
    }
    else {
      return (
        <Host>
          <div class='menuButton'>
            <label class={this.buttonClass}>
              {this.buttonValue}<ion-icon class="icon" name="settings-sharp"></ion-icon>
              <input class='catImages' onClick={() => { this.presentModal(); }} hidden />
            </label>
          </div>
        </Host>
      );
    }
  }
}
