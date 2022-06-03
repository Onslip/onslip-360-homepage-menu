import { newE2EPage } from '@stencil/core/testing';

describe('font-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<font-modal></font-modal>');

    const element = await page.find('font-modal');
    expect(element).toHaveClass('hydrated');
  });
});
