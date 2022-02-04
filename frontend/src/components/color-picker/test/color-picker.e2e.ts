import { newE2EPage } from '@stencil/core/testing';

describe('color-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<color-picker></color-picker>');

    const element = await page.find('color-picker');
    expect(element).toHaveClass('hydrated');
  });
});
