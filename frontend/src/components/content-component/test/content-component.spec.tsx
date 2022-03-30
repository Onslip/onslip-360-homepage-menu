import { newSpecPage } from '@stencil/core/testing';
import { ContentComponent } from '../content-component';

describe('content-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ContentComponent],
      html: `<content-component></content-component>`,
    });
    expect(page.root).toEqualHtml(`
      <content-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </content-component>
    `);
  });
});
