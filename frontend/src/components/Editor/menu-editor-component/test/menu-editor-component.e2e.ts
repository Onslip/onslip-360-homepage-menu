import { newE2EPage } from '@stencil/core/testing';

describe('menu-editor-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<menu-editor-component></menu-editor-component>');

    const element = await page.find('menu-editor-component');
    expect(element).toHaveClass('hydrated');
  });
});
