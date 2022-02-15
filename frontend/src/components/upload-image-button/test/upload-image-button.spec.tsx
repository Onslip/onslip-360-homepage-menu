import { newSpecPage } from '@stencil/core/testing';
import { UploadImageButton } from '../upload-image-button';

describe('upload-image-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UploadImageButton],
      html: `<upload-image-button></upload-image-button>`,
    });
    expect(page.root).toEqualHtml(`
      <upload-image-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </upload-image-button>
    `);
  });
});
