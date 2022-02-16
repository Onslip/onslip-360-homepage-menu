import { newE2EPage } from '@stencil/core/testing';

describe('menu-example', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<menu-example></menu-example>');

    const element = await page.find('menu-example');
    expect(element).toHaveClass('hydrated');
  });
});
