import { newE2EPage } from '@stencil/core/testing';

describe('product-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<product-component></product-component>');

    const element = await page.find('product-component');
    expect(element).toHaveClass('hydrated');
  });
});
