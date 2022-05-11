import { Component, Host, Element, h } from '@stencil/core';
import { config } from '../utils/utils';

@Component({
  tag: 'content-component',
  styleUrl: 'content-component.css',
  shadow: true,
})
export class ContentComponent {
  @Element() element: HTMLElement

  async componentWillLoad() {
    this.element.style.textAlign = config.productImages.placement
    this.element.style.fontFamily = config.font.fontFamily
  }

  render() {
    return (
      <Host>
        <ion-card-content data-status={config.productImages.style == 'Background' ? config.productImages.placement : ''}>
          <ion-row>
            <ion-col>
              <ion-row>
                <ion-col class="start">
                  <slot name="start">
                  </slot>
                </ion-col>
                <ion-col class="primary">
                  <slot name='primary'>
                  </slot>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col class='secondary'>
                  <slot name='secondary'>
                  </slot>
                </ion-col>
              </ion-row>
            </ion-col>
            <ion-col>
              <ion-row>
                <ion-col class="end">
                  <slot name='end'>
                  </slot>
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-card-content>
        <slot></slot>
      </Host>
    );
  }

}
