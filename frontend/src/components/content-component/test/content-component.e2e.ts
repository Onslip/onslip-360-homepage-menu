import { newE2EPage } from '@stencil/core/testing';

describe('content-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<content-component></content-component>');

    const element = await page.find('content-component');
    expect(element).toHaveClass('hydrated');
  });
});
