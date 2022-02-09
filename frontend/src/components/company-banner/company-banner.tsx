import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'company-banner',
  styleUrl: 'company-banner.css',
  shadow: true,
})
export class CompanyBanner {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
