import { newSpecPage } from '@stencil/core/testing';
import { ApiUi } from '../api-ui';

describe('api-ui', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApiUi],
      html: `<api-ui></api-ui>`,
    });
    expect(page.root).toEqualHtml(`
      <api-ui>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </api-ui>
    `);
  });
});
