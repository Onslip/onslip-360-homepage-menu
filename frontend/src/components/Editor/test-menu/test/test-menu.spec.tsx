import { newSpecPage } from '@stencil/core/testing';
import { TestMenu } from '../test-menu';

describe('test-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TestMenu],
      html: `<test-menu></test-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <test-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </test-menu>
    `);
  });
});
