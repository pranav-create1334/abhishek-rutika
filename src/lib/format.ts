import type { Language } from '../content';

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'] as const;

/** Keeps Marathi numbers in Devanagari while leaving English as-is. */
export function localizeDigits(value: string | number, lang: Language): string {
  const text = String(value);
  if (lang !== 'mr') return text;

  return text.replace(/\d/g, (digit) => DEVANAGARI_DIGITS[Number(digit)] ?? digit);
}

/** Pads a countdown value with a leading zero, then localizes the digits. */
export function paddedDigits(value: number, lang: Language, length = 2): string {
  return localizeDigits(String(Math.max(0, value)).padStart(length, '0'), lang);
}
