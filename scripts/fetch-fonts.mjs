/**
 * Downloads only the font files this invitation needs from Google Fonts
 * and writes them into /public/fonts for self-hosting.
 *
 * Run with: npm run fonts
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.join(process.cwd(), 'public', 'fonts');
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Mukta:wght@400;500;600&family=Tiro+Devanagari+Marathi:ital@0;1&display=swap';

const wanted = [
  { family: 'Cormorant Garamond', style: 'normal', weight: '400', subset: 'latin', file: 'cormorant-garamond-400.woff2' },
  { family: 'Cormorant Garamond', style: 'normal', weight: '600', subset: 'latin', file: 'cormorant-garamond-600.woff2' },
  { family: 'Cormorant Garamond', style: 'italic', weight: '400', subset: 'latin', file: 'cormorant-garamond-italic-400.woff2' },
  { family: 'Tiro Devanagari Marathi', style: 'normal', weight: '400', subset: 'devanagari', file: 'tiro-devanagari-marathi-400.woff2' },
  { family: 'Mukta', style: 'normal', weight: '400', subset: 'devanagari', file: 'mukta-devanagari-400.woff2' },
  { family: 'Mukta', style: 'normal', weight: '500', subset: 'devanagari', file: 'mukta-devanagari-500.woff2' },
  { family: 'Mukta', style: 'normal', weight: '600', subset: 'devanagari', file: 'mukta-devanagari-600.woff2' },
];

const css = await fetch(CSS_URL, { headers: { 'User-Agent': UA } }).then((response) => {
  if (!response.ok) throw new Error(`Google Fonts returned ${response.status}`);
  return response.text();
});

await mkdir(OUT_DIR, { recursive: true });

for (const font of wanted) {
  const familyPattern = font.family.replaceAll(' ', '\\s+');
  const blockPattern = new RegExp(
    `\\/\\*\\s*${font.subset}\\s*\\*\\/[\\s\\S]*?@font-face\\s*{[\\s\\S]*?font-family:\\s*'${familyPattern}';[\\s\\S]*?font-style:\\s*${font.style};[\\s\\S]*?font-weight:\\s*${font.weight};[\\s\\S]*?src:\\s*url\\((https:[^)]+\\.woff2)\\)`,
    'i',
  );
  const match = css.match(blockPattern);
  if (!match) {
    throw new Error(`Could not find ${font.family} ${font.style} ${font.weight} (${font.subset}) in Google Fonts CSS.`);
  }

  const url = match[1];
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(OUT_DIR, font.file), bytes);
  console.log(`${font.file.padEnd(38)} ${(bytes.length / 1024).toFixed(1)} kB`);
}

const licenses = [
  ['Cormorant Garamond', 'https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/OFL.txt', 'OFL-CormorantGaramond.txt'],
  ['Mukta', 'https://raw.githubusercontent.com/google/fonts/main/ofl/mukta/OFL.txt', 'OFL-Mukta.txt'],
  ['Tiro Devanagari Marathi', 'https://raw.githubusercontent.com/google/fonts/main/ofl/tirodevanagarimarathi/OFL.txt', 'OFL-TiroDevanagariMarathi.txt'],
];

for (const [name, url, file] of licenses) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(String(response.status));
    await writeFile(path.join(OUT_DIR, file), await response.text());
    console.log(`License: ${name}`);
  } catch (error) {
    console.warn(`Could not download license for ${name}: ${error}`);
  }
}

console.log('\nFonts are ready in public/fonts.');
