import { newE2EPage } from '@stencil/core/testing';

describe('homepage-menu-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<homepage-menu-component></homepage-menu-component>');

    const element = await page.find('homepage-menu-component');
    expect(element).toHaveClass('hydrated');
  });
});
