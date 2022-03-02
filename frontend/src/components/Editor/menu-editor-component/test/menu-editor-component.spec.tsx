import { newSpecPage } from '@stencil/core/testing';
import { MenuEditorComponent } from '../menu-editor-component';

describe('menu-editor-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MenuEditorComponent],
      html: `<menu-editor-component></menu-editor-component>`,
    });
    expect(page.root).toEqualHtml(`
      <menu-editor-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </menu-editor-component>
    `);
  });
});
