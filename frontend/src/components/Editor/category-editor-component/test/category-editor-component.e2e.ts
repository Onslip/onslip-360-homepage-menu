import { newE2EPage } from '@stencil/core/testing';

describe('category-editor-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<category-editor-component></category-editor-component>');

    const element = await page.find('category-editor-component');
    expect(element).toHaveClass('hydrated');
  });
});
