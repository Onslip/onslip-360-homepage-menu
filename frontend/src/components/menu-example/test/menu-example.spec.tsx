import { newSpecPage } from '@stencil/core/testing';
import { MenuExample } from '../menu-example';

describe('menu-example', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MenuExample],
      html: `<menu-example></menu-example>`,
    });
    expect(page.root).toEqualHtml(`
      <menu-example>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </menu-example>
    `);
  });
});
