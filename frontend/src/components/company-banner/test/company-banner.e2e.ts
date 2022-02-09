import { newE2EPage } from '@stencil/core/testing';

describe('company-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<company-banner></company-banner>');

    const element = await page.find('company-banner');
    expect(element).toHaveClass('hydrated');
  });
});
