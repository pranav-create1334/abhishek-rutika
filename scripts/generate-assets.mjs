/**
 * Generates the raster brand assets:
 *   public/icons/icon-192.png
 *   public/icons/icon-512.png
 *   public/icons/apple-touch-icon.png
 *   public/og-cover.png (1200 × 630)
 *
 * The source of truth for the icon is public/icon.svg. Run with:
 *   npm run assets
 *
 * If Chromium is missing: npx playwright install chromium
 */
import { existsSync, readFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

const root = resolve(import.meta.dirname, '..');

// Prefer an installed browser so `npm run assets` works without a 200 MB
// Playwright download (set PLAYWRIGHT_CHROMIUM_PATH to override).
const browserPath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ??
  [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ].find((candidate) => existsSync(candidate));
const publicDir = resolve(root, 'public');
const iconsDir = resolve(publicDir, 'icons');

const iconSvg = readFileSync(resolve(publicDir, 'icon.svg'), 'utf8');

const font = (name) =>
  readFileSync(resolve(publicDir, 'fonts', name)).toString('base64');

const tiro = font('tiro-devanagari-marathi-400.woff2');
const mukta400 = font('mukta-devanagari-400.woff2');
const mukta600 = font('mukta-devanagari-600.woff2');
const cormorant400 = font('cormorant-garamond-400.woff2');
const cormorant600 = font('cormorant-garamond-600.woff2');
const cormorantItalic = font('cormorant-garamond-italic-400.woff2');

const leaves = Array.from({ length: 35 }, (_, index) => {
  const x = 14 + index * 34.6;
  const y = 28 + Math.sin((index / 34) * Math.PI) * 8;
  const angle = index % 2 === 0 ? -7 : 7;
  const scale = index % 5 === 0 ? 1.2 : 1;
  return `<g transform="translate(${x} ${y}) rotate(${angle}) scale(1 ${scale})">
    <path d="M0 0C-8 12-8 29 0 43C8 29 8 12 0 0Z" fill="${index % 3 === 0 ? '#75825a' : '#5e6c48'}" stroke="#c9a25c" stroke-opacity=".65" stroke-width=".8"/>
    <path d="M0 5v31" stroke="#c9a25c" stroke-opacity=".4" stroke-width=".6"/>
  </g>`;
}).join('');

const flowers = Array.from({ length: 13 }, (_, index) => {
  const x = 58 + index * 90.5;
  const y = 33 + Math.sin((x / 1200) * Math.PI) * 7 + (index % 2 === 0 ? 16 : 25);
  const petals = Array.from({ length: 8 }, (_, petal) => {
    const fill = petal % 2 === 0 ? '#e2872a' : '#dfa62c';
    return `<ellipse cx="0" cy="-7.5" rx="3.1" ry="6.4" fill="${fill}" transform="rotate(${petal * 45})"/>`;
  }).join('');
  return `<g transform="translate(${x} ${y})">
    <path d="M0 -10v-${index % 2 === 0 ? 9 : 15}" stroke="#c9a25c" stroke-opacity=".55" stroke-width="1"/>
    ${petals}
    <circle r="3" fill="#f2c25a"/><circle r="1.2" fill="#8c4e14" fill-opacity=".6"/>
  </g>`;
}).join('');

const toranSvg = `
<svg viewBox="0 0 1200 130" width="1200" height="130" fill="none" aria-hidden="true">
  <path d="M0 24 Q600 54 1200 24" stroke="#c9a25c" stroke-opacity=".6" stroke-width="1.4"/>
  <path d="M0 31 Q600 61 1200 31" stroke="#c9a25c" stroke-opacity=".22" stroke-width=".8"/>
  ${leaves}
  ${flowers}
</svg>`;

const cornerSvg = () => `
<svg viewBox="0 0 64 64" width="120" height="120" fill="none" aria-hidden="true">
  <g stroke="#c9a25c" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">
    <path d="M3 62V28C3 14 14 3 28 3h34" stroke-opacity=".7"/>
    <path d="M9 62V30C9 18.4 18.4 9 30 9h32" stroke-opacity=".3"/>
    <path d="M18 45c0-11 9-20 20-20 0 11-9 20-20 20Z" stroke-opacity=".75"/>
    <path d="M25 38c4-4 8-5 13-5" stroke-opacity=".5"/>
    <path d="M31 31c0-3 2-5 5-5 0 3-2 5-5 5Z" stroke-opacity=".4"/>
    <circle cx="17" cy="17" r="1.7" fill="#c9a25c" stroke="none"/>
  </g>
</svg>`;

const rangoliSvg = `
<svg viewBox="0 0 240 240" width="360" height="360" fill="none" aria-hidden="true">
  <g stroke="#c9a25c" stroke-width=".7" stroke-linecap="round" stroke-linejoin="round" opacity=".8">
    <circle cx="120" cy="120" r="113" stroke-dasharray="1.5 7" stroke-opacity=".6"/>
    <circle cx="120" cy="120" r="103" stroke-opacity=".3"/>
    <circle cx="120" cy="120" r="82" stroke-opacity=".4"/>
    ${Array.from({ length: 16 }, (_, index) => `
      <g transform="rotate(${index * 22.5} 120 120)" stroke-opacity="${index % 2 === 0 ? 0.55 : 0.3}">
        <path d="M120 23c9 13 9 26 0 39-9-13-9-26 0-39Z"/>
        <path d="M120 45c4 7 4 13 0 20-4-7-4-13 0-20Z" stroke-opacity=".4"/>
        <path d="M120 19v-8"/>
      </g>`).join('')}
  </g>
</svg>`;

const ogHtml = `<!doctype html>
<html lang="mr">
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family: 'Tiro'; src: url(data:font/woff2;base64,${tiro}) format('woff2'); font-display: block; }
  @font-face { font-family: 'Mukta'; font-weight: 400; src: url(data:font/woff2;base64,${mukta400}) format('woff2'); font-display: block; }
  @font-face { font-family: 'Mukta'; font-weight: 600; src: url(data:font/woff2;base64,${mukta600}) format('woff2'); font-display: block; }
  @font-face { font-family: 'Cormorant'; font-weight: 400; src: url(data:font/woff2;base64,${cormorant400}) format('woff2'); font-display: block; }
  @font-face { font-family: 'Cormorant'; font-weight: 600; src: url(data:font/woff2;base64,${cormorant600}) format('woff2'); font-display: block; }
  @font-face { font-family: 'Cormorant'; font-style: italic; font-weight: 400; src: url(data:font/woff2;base64,${cormorantItalic}) format('woff2'); font-display: block; }

  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  body {
    color: #fbf6ec;
    font-family: 'Mukta', sans-serif;
    background-color: #2b0710;
    background-image:
      radial-gradient(ellipse 62% 70% at 50% 28%, #6d1726 0%, #3c0a14 47%, #2b0710 78%),
      radial-gradient(ellipse 38% 55% at 50% 110%, #4b0e1a, transparent 70%);
  }
  .grain {
    position: absolute; inset: 0;
    opacity: .22;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
    mix-blend-mode: soft-light;
  }
  .frame {
    position: absolute; inset: 22px;
    border: 1px solid rgba(201, 162, 92, .52);
    border-radius: 14px;
  }
  .frame::before {
    content: ''; position: absolute; inset: 8px;
    border: 1px solid rgba(231, 205, 150, .16);
    border-radius: 9px;
  }
  .toran { position: absolute; top: 0; left: 50%; transform: translateX(-50%); opacity: .92; }
  .rangoli { position: absolute; opacity: .16; }
  .rangoli.left { left: -86px; top: 138px; }
  .rangoli.right { right: -86px; top: 138px; }
  .corner { position: absolute; opacity: .8; }
  .corner.tl { left: 28px; top: 100px; }
  .corner.tr { right: 28px; top: 100px; transform: scaleX(-1); }
  .corner.bl { left: 28px; bottom: 28px; transform: scaleY(-1); }
  .corner.br { right: 28px; bottom: 28px; transform: scale(-1); }

  .content {
    position: relative; z-index: 2;
    height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 96px 100px 72px;
    text-align: center;
  }
  .blessing {
    font-size: 21px; letter-spacing: .13em; color: #e7cd96; line-height: 1;
    margin-top: 4px;
  }
  .families {
    margin-top: 14px;
    font-family: 'Mukta', sans-serif;
    font-size: 13px; font-weight: 600;
    letter-spacing: .3em; text-transform: uppercase;
    color: rgba(231, 205, 150, .62);
  }
  .names {
    display: flex; align-items: center; justify-content: center;
    gap: 30px; margin-top: 16px;
    font-family: 'Tiro', 'Cormorant', serif;
    font-size: 112px; line-height: 1.16; color: #fbf6ec;
    white-space: nowrap;
  }
  .amp {
    font-family: 'Cormorant', serif; font-style: italic;
    font-size: 58px; color: #c9a25c; line-height: 1; transform: translateY(-6px);
  }
  .english {
    margin-top: 8px;
    font-family: 'Cormorant', serif;
    font-size: 17px; letter-spacing: .42em; text-transform: uppercase;
    color: rgba(231, 205, 150, .72);
  }
  .rule {
    width: 310px; height: 1px; margin-top: 24px;
    background: linear-gradient(90deg, transparent, rgba(201, 162, 92, .8), transparent);
    position: relative;
  }
  .rule::after {
    content: ''; position: absolute; left: 50%; top: -4px;
    width: 9px; height: 9px; transform: translateX(-50%) rotate(45deg);
    border: 1px solid #c9a25c; background: #3c0a14;
  }
  .date {
    margin-top: 22px;
    font-family: 'Mukta', sans-serif; font-weight: 600;
    font-size: 25px; letter-spacing: .055em; color: #e7cd96;
  }
  .venue {
    margin-top: 4px;
    font-family: 'Cormorant', serif;
    font-size: 19px; letter-spacing: .1em; color: rgba(251, 246, 236, .7);
  }
  .venue b { font-weight: 600; color: rgba(251, 246, 236, .88); }
  .brand {
    position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
    display: flex; align-items: center; gap: 13px;
    font-family: 'Cormorant', serif; font-size: 13px; font-weight: 600;
    letter-spacing: .4em; text-transform: uppercase; color: rgba(231, 205, 150, .62);
    white-space: nowrap;
  }
  .brand span { color: rgba(231, 205, 150, .3); }
</style>
</head>
<body>
  <div class="grain"></div>
  <div class="frame"></div>
  <div class="toran">${toranSvg}</div>
  <div class="rangoli left">${rangoliSvg}</div>
  <div class="rangoli right">${rangoliSvg}</div>
  <div class="corner tl">${cornerSvg()}</div>
  <div class="corner tr">${cornerSvg()}</div>
  <div class="corner bl">${cornerSvg()}</div>
  <div class="corner br">${cornerSvg()}</div>

  <main class="content">
    <div class="blessing">॥ श्री गणेशाय नमः ॥</div>
    <div class="families">The Patil &amp; Chaudhari Families</div>
    <div class="names"><span>अभिषेक</span><span class="amp">&amp;</span><span>रुतिका</span></div>
    <div class="english">Abhishek weds Rutika</div>
    <div class="rule"></div>
    <div class="date">सोमवार · २७ डिसेंबर २०२७ · सायंकाळी ६:४५</div>
    <div class="venue"><b>स्टार लॉन्स, भुसावळ</b> · Star Lawns, Bhusawal</div>
  </main>

  <div class="brand">Aaiyeji <span>·</span> A warm invitation</div>
</body>
</html>`;

const iconHtml = `<!doctype html>
<html><head><meta charset="utf-8" /><style>
  html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #2b0710; }
  svg { display: block; width: 100vw; height: 100vh; }
</style></head><body>${iconSvg}</body></html>`;

mkdirSync(iconsDir, { recursive: true });

const browser = await chromium.launch(
  browserPath ? { executablePath: browserPath } : {},
);
const page = await browser.newPage();

try {
  for (const size of [192, 512]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(iconHtml, { waitUntil: 'load' });
    await page.screenshot({
      path: resolve(iconsDir, `icon-${size}.png`),
      type: 'png',
    });
    console.log(`✓ icons/icon-${size}.png`);
  }

  await page.setViewportSize({ width: 180, height: 180 });
  await page.setContent(iconHtml, { waitUntil: 'load' });
  await page.screenshot({
    path: resolve(iconsDir, 'apple-touch-icon.png'),
    type: 'png',
  });
  console.log('✓ icons/apple-touch-icon.png');

  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(ogHtml, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({
    path: resolve(publicDir, 'og-cover.png'),
    type: 'png',
  });
  console.log('✓ og-cover.png');
} finally {
  await page.close();
  await browser.close();
}

console.log('\nBrand assets generated from public/icon.svg and src/content.ts copy.');
