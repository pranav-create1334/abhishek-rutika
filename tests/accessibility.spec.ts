import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { openInvitation, revealWholePage } from './helpers';

const serious = ['serious', 'critical'];

test.describe('accessibility', () => {
  test('the opening cover passes an automated axe scan', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const violations = results.violations.filter((item) =>
      serious.includes(item.impact ?? ''),
    );
    expect(
      violations.map((item) => `${item.id}: ${item.help}`),
    ).toEqual([]);
  });

  test('the opened invitation passes an automated axe scan', async ({ page }) => {
    // A full-page axe run on a long, animated document can take longer than the
    // default timeout when several browser projects run in parallel.
    test.setTimeout(90_000);
    await openInvitation(page);
    await revealWholePage(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const violations = results.violations.filter((item) =>
      serious.includes(item.impact ?? ''),
    );
    expect(
      violations.map((item) => `${item.id}: ${item.help}`),
    ).toEqual([]);
  });

  test('visible tap targets are at least 44px tall', async ({ page }) => {
    await openInvitation(page);

    const smallTargets = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll<HTMLElement>('button, a[href], [role="button"]'),
      )
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return (
            rect.width > 0 &&
            rect.height > 0 &&
            rect.bottom > 0 &&
            rect.top < window.innerHeight
          );
        })
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            label:
              element.getAttribute('aria-label') ??
              element.textContent?.trim().slice(0, 50) ??
              element.tagName,
            height: Math.round(rect.height),
            width: Math.round(rect.width),
          };
        })
        .filter((item) => item.height < 44);
    });

    expect(smallTargets).toEqual([]);
  });
});
