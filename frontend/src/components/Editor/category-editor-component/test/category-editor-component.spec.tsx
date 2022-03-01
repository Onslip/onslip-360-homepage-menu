import { newSpecPage } from '@stencil/core/testing';
import { CategoryEditorComponent } from '../category-editor-component';

describe('category-editor-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CategoryEditorComponent],
      html: `<category-editor-component></category-editor-component>`,
    });
    expect(page.root).toEqualHtml(`
      <category-editor-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </category-editor-component>
    `);
  });
});
