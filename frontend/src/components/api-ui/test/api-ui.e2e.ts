import { newE2EPage } from '@stencil/core/testing';

describe('api-ui', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<api-ui></api-ui>');

    const element = await page.find('api-ui');
    expect(element).toHaveClass('hydrated');
  });
});
