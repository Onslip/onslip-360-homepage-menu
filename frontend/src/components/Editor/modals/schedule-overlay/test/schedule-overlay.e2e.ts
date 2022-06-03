import { newE2EPage } from '@stencil/core/testing';

describe('schedule-overlay', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<schedule-overlay></schedule-overlay>');

    const element = await page.find('schedule-overlay');
    expect(element).toHaveClass('hydrated');
  });
});
