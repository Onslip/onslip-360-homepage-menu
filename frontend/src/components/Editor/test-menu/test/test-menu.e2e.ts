import { newE2EPage } from '@stencil/core/testing';

describe('test-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<test-menu></test-menu>');

    const element = await page.find('test-menu');
    expect(element).toHaveClass('hydrated');
  });
});
