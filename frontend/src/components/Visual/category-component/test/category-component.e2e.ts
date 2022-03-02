import { newE2EPage } from '@stencil/core/testing';

describe('category-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<category-component></category-component>');

    const element = await page.find('category-component');
    expect(element).toHaveClass('hydrated');
  });
});
