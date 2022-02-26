import { newE2EPage } from '@stencil/core/testing';

describe('selector-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<selector-component></selector-component>');

    const element = await page.find('selector-component');
    expect(element).toHaveClass('hydrated');
  });
});
