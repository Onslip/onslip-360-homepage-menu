import { newSpecPage } from '@stencil/core/testing';
import { MenuComponent } from '../menu-component';

describe('menu-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MenuComponent],
      html: `<menu-component></menu-component>`,
    });
    expect(page.root).toEqualHtml(`
      <menu-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </menu-component>
    `);
  });
});
