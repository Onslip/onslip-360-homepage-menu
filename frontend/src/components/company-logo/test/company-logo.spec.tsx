import { newSpecPage } from '@stencil/core/testing';
import { CompanyLogo } from '../company-logo';

describe('company-logo', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CompanyLogo],
      html: `<company-logo></company-logo>`,
    });
    expect(page.root).toEqualHtml(`
      <company-logo>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </company-logo>
    `);
  });
});
