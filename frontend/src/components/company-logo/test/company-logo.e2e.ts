import { newE2EPage } from '@stencil/core/testing';

describe('company-logo', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<company-logo></company-logo>');

    const element = await page.find('company-logo');
    expect(element).toHaveClass('hydrated');
  });
});
