import { newSpecPage } from '@stencil/core/testing';
import { LayoutOverlay } from '../layout-overlay';

describe('layout-overlay', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LayoutOverlay],
      html: `<layout-overlay></layout-overlay>`,
    });
    expect(page.root).toEqualHtml(`
      <layout-overlay>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </layout-overlay>
    `);
  });
});
