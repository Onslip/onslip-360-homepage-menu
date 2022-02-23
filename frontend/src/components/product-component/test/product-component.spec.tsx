import { newSpecPage } from '@stencil/core/testing';
import { ProductComponent } from '../product-component';

describe('product-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProductComponent],
      html: `<product-component></product-component>`,
    });
    expect(page.root).toEqualHtml(`
      <product-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </product-component>
    `);
  });
});
