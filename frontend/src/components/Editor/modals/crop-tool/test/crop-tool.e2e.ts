import { newE2EPage } from '@stencil/core/testing';

describe('crop-tool', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<crop-tool></crop-tool>');

    const element = await page.find('crop-tool');
    expect(element).toHaveClass('hydrated');
  });
});
