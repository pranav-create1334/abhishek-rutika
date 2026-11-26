import { expect, test } from '@playwright/test';
import { collectConsoleErrors, expectNoHorizontalOverflow, openInvitation, revealWholePage } from './helpers';

test.describe('the invitation', () => {
  test('opens from the cover, starts the score and locks the page correctly', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const project = test.info().project.name;

    await page.goto('/');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { level: 1 })).toContainText(/अभिषेक|Abhishek/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'mr');
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    await expectNoHorizontalOverflow(page);

    await page.screenshot({ path: `screenshots/${project}-opening.png` });

    await page.getByRole('button', { name: /आमंत्रण उघडा|Open the invitation/ }).click();
    await expect(dialog).toBeHidden({ timeout: 5_000 });

    await expect(page.locator('#main-content')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/अभिषेक|Abhishek/);
    await expect(page.getByRole('button', { name: /संगीत बंद करा|Mute music/ })).toBeVisible();
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
    await expectNoHorizontalOverflow(page);

    await page.waitForTimeout(600);
    await page.screenshot({ path: `screenshots/${project}-hero.png` });

    expect(errors).toEqual([]);
  });

  test('switches the whole invitation between Marathi and English', async ({ page }) => {
    await openInvitation(page);

    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText('Abhishek');
    await expect(page.getByText('Monday, 27 December 2027').first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'EN', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await page.getByRole('button', { name: 'मराठी', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'mr');
    await expect(page.locator('h1')).toContainText('अभिषेक');
    await expect(page.getByText('सोमवार, २७ डिसेंबर २०२७').first()).toBeVisible();
  });

  test('shows a live countdown in Devanagari numerals', async ({ page }) => {
    await openInvitation(page);
    await page.locator('#countdown').scrollIntoViewIfNeeded();

    const timer = page.getByRole('timer');
    await expect(timer).toBeVisible();
    await expect(timer).toHaveAttribute('aria-live', 'off');

    const text = (await timer.innerText()).replace(/\s+/g, ' ');
    expect(text).toMatch(/[०-९]/);
    expect(text).toMatch(/दिवस|days/);
    expect(text).toMatch(/तास|hours/);
    expect(text).toMatch(/मिनिटे|minutes/);
    expect(text).toMatch(/सेकंद|seconds/);
  });

  test('downloads a calendar file for an event and for all dates', async ({ page }) => {
    await openInvitation(page);
    await page.locator('#events').scrollIntoViewIfNeeded();

    const eventDownload = page.waitForEvent('download');
    await page.getByRole('button', { name: /कॅलेंडरमध्ये जोडा|Add to calendar/ }).first().click();
    const eventFile = await eventDownload;
    expect(eventFile.suggestedFilename()).toBe('abhishek-rutika-haldi.ics');
    const stream = await eventFile.createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(Buffer.from(chunk));
    const ics = Buffer.concat(chunks).toString('utf8');
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('DTSTART:20271226T103000Z');
    expect(ics).toContain('SUMMARY:हळद');

    await page.locator('#venue').scrollIntoViewIfNeeded();
    const allDownload = page.waitForEvent('download');
    await page.getByRole('button', { name: /सर्व तारखा जोडा|Save all dates/ }).click();
    const allFile = await allDownload;
    expect(allFile.suggestedFilename()).toBe('abhishek-rutika-wedding.ics');
  });

  test('shares on WhatsApp and copies the invitation link', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await openInvitation(page);
    await page.locator('footer').scrollIntoViewIfNeeded();

    const whatsapp = page.getByRole('link', { name: /व्हॉट्सॲपवर शेअर करा|Share on WhatsApp/ });
    await expect(whatsapp).toHaveAttribute('href', /^https:\/\/wa\.me\/\?text=/);
    await expect(whatsapp).toHaveAttribute('target', '_blank');

    await page.bringToFront();
    await page.getByRole('button', { name: /लिंक कॉपी करा|Copy link/ }).click();
    await expect(page.getByRole('button', { name: /लिंक कॉपी झाली|Link copied/ })).toBeVisible({
      timeout: 10_000,
    });
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toMatch(/^https?:\/\//);
  });

  test('has no horizontal overflow across the full page', async ({ page }) => {
    await openInvitation(page);
    await revealWholePage(page);

    await expectNoHorizontalOverflow(page);
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('main .invite-card')).toBeVisible();

    const project = test.info().project.name;
    await page.screenshot({ path: `screenshots/${project}-full.png`, fullPage: true });
  });
});
