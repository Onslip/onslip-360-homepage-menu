import { newSpecPage } from '@stencil/core/testing';
import { ColorPicker } from '../color-picker';

describe('color-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ColorPicker],
      html: `<color-picker></color-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <color-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </color-picker>
    `);
  });
});
