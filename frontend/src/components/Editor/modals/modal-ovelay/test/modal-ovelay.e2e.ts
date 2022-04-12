import { newE2EPage } from '@stencil/core/testing';

describe('modal-ovelay', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modal-ovelay></modal-ovelay>');

    const element = await page.find('modal-ovelay');
    expect(element).toHaveClass('hydrated');
  });
});
