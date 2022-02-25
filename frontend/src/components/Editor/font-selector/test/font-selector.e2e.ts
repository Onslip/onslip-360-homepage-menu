import { newE2EPage } from '@stencil/core/testing';

describe('font-selector', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<font-selector></font-selector>');

    const element = await page.find('font-selector');
    expect(element).toHaveClass('hydrated');
  });
});
