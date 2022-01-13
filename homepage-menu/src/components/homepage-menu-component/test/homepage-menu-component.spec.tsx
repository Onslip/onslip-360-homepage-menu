import { newSpecPage } from '@stencil/core/testing';
import { HomepageMenuComponent } from '../homepage-menu-component';

describe('homepage-menu-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HomepageMenuComponent],
      html: `<homepage-menu-component></homepage-menu-component>`,
    });
    expect(page.root).toEqualHtml(`
      <homepage-menu-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </homepage-menu-component>
    `);
  });
});
