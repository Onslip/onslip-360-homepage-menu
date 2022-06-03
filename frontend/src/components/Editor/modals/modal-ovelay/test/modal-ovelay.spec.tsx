import { newSpecPage } from '@stencil/core/testing';
import { ModalOvelay } from '../modal-ovelay';

describe('modal-ovelay', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModalOvelay],
      html: `<modal-ovelay></modal-ovelay>`,
    });
    expect(page.root).toEqualHtml(`
      <modal-ovelay>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modal-ovelay>
    `);
  });
});
