import { newSpecPage } from '@stencil/core/testing';
import { FontModal } from '../font-modal';

describe('font-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FontModal],
      html: `<font-modal></font-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <font-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </font-modal>
    `);
  });
});
