import { newSpecPage } from '@stencil/core/testing';
import { EditorVisualCheck } from '../app-root';

describe('editor-visual-check', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EditorVisualCheck],
      html: `<editor-visual-check></editor-visual-check>`,
    });
    expect(page.root).toEqualHtml(`
      <editor-visual-check>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </editor-visual-check>
    `);
  });
});
