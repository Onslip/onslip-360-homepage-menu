import { newE2EPage } from '@stencil/core/testing';

describe('upload-image-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<upload-image-button></upload-image-button>');

    const element = await page.find('upload-image-button');
    expect(element).toHaveClass('hydrated');
  });
});
