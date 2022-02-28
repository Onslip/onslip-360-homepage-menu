import { newE2EPage } from '@stencil/core/testing';

describe('editor-visual-check', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<editor-visual-check></editor-visual-check>');

    const element = await page.find('editor-visual-check');
    expect(element).toHaveClass('hydrated');
  });
});
