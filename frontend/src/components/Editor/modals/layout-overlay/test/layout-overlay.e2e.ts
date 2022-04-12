import { newE2EPage } from '@stencil/core/testing';

describe('layout-overlay', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<layout-overlay></layout-overlay>');

    const element = await page.find('layout-overlay');
    expect(element).toHaveClass('hydrated');
  });
});
