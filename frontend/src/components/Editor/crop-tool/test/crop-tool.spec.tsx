import { newSpecPage } from '@stencil/core/testing';
import { CropTool } from '../crop-tool';

describe('crop-tool', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CropTool],
      html: `<crop-tool></crop-tool>`,
    });
    expect(page.root).toEqualHtml(`
      <crop-tool>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </crop-tool>
    `);
  });
});
