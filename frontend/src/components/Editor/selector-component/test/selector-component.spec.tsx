import { newSpecPage } from '@stencil/core/testing';
import { SelectorComponent } from '../selector-component';

describe('selector-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SelectorComponent],
      html: `<selector-component></selector-component>`,
    });
    expect(page.root).toEqualHtml(`
      <selector-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </selector-component>
    `);
  });
});
