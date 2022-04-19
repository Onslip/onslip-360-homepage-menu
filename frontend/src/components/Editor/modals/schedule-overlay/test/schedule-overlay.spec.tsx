import { newSpecPage } from '@stencil/core/testing';
import { ScheduleOverlay } from '../schedule-overlay';

describe('schedule-overlay', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ScheduleOverlay],
      html: `<schedule-overlay></schedule-overlay>`,
    });
    expect(page.root).toEqualHtml(`
      <schedule-overlay>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </schedule-overlay>
    `);
  });
});
