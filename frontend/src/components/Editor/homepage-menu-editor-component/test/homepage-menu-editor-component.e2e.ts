import { newE2EPage } from '@stencil/core/testing';

describe('homepage-menu-editor-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<homepage-menu-editor-component></homepage-menu-editor-component>');

    const element = await page.find('homepage-menu-editor-component');
    expect(element).toHaveClass('hydrated');
  });
});
