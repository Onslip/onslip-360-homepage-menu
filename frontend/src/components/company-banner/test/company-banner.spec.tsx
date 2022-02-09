import { newSpecPage } from '@stencil/core/testing';
import { CompanyBanner } from '../company-banner';

describe('company-banner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CompanyBanner],
      html: `<company-banner></company-banner>`,
    });
    expect(page.root).toEqualHtml(`
      <company-banner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </company-banner>
    `);
  });
});
