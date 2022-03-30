import { Component, Host, Prop, Element, h } from '@stencil/core';
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
            <slot name="start">
            </slot>
            <ion-col>
              <ion-row class='primary'>
                <slot name='primary'>
                </slot>
              </ion-row>
              <ion-row class='secondary'>
                <slot name='secondary'>
                </slot>
              </ion-row>
            </ion-col>
              <slot name='end'>
              </slot>
          </ion-row>
        </ion-card-content>
        <slot></slot>
      </Host>
    );
  }

}
