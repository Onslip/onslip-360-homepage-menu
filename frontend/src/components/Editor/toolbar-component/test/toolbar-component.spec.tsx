import { newSpecPage } from '@stencil/core/testing';
import { ToolbarComponent } from '../toolbar-component';

describe('toolbar-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ToolbarComponent],
      html: `<toolbar-component></toolbar-component>`,
    });
    expect(page.root).toEqualHtml(`
      <toolbar-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </toolbar-component>
    `);
  });
});
