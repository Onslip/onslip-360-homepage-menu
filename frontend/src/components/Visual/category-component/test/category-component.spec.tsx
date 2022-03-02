import { newSpecPage } from '@stencil/core/testing';
import { CategoryComponent } from '../category-component';

describe('category-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CategoryComponent],
      html: `<category-component></category-component>`,
    });
    expect(page.root).toEqualHtml(`
      <category-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </category-component>
    `);
  });
});
