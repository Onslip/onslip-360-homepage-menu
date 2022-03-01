import { newSpecPage } from '@stencil/core/testing';
import { HomepageMenuEditorComponent } from '../homepage-menu-editor-component';

describe('homepage-menu-editor-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HomepageMenuEditorComponent],
      html: `<homepage-menu-editor-component></homepage-menu-editor-component>`,
    });
    expect(page.root).toEqualHtml(`
      <homepage-menu-editor-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </homepage-menu-editor-component>
    `);
  });
});
