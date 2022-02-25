import { newSpecPage } from '@stencil/core/testing';
import { FontSelector } from '../font-selector';

describe('font-selector', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FontSelector],
      html: `<font-selector></font-selector>`,
    });
    expect(page.root).toEqualHtml(`
      <font-selector>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </font-selector>
    `);
  });
});
