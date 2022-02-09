import { newE2EPage } from '@stencil/core/testing';

describe('product-editor-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<product-editor-component></product-editor-component>');

    const element = await page.find('product-editor-component');
    expect(element).toHaveClass('hydrated');
  });
});
