import { newE2EPage } from '@stencil/core/testing';

describe('toolbar-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<toolbar-component></toolbar-component>');

    const element = await page.find('toolbar-component');
    expect(element).toHaveClass('hydrated');
  });
});
