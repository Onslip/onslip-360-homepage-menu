import { newSpecPage } from '@stencil/core/testing';
import { ProductEditorComponent } from '../product-editor-component';

describe('product-editor-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProductEditorComponent],
      html: `<product-editor-component></product-editor-component>`,
    });
    expect(page.root).toEqualHtml(`
      <product-editor-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </product-editor-component>
    `);
  });
});
