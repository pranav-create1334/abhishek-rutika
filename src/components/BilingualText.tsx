import { useLanguage } from '../lib/language';
import type { Bilingual } from '../content';

type BilingualTextProps = {
  value: Bilingual;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

type BilingualProseProps = {
  value: Bilingual;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

/**
 * Shows both languages at once.
 * The active language is always the larger/primary line; the other language
 * sits beneath it. Marathi is active by default.
 */
export function BilingualText({
  value,
  className = '',
  primaryClassName = '',
  secondaryClassName = '',
}: BilingualTextProps) {
  const { lang, otherLang } = useLanguage();

  return (
    <span className={`block ${className}`}>
      <span lang={lang} className={`block ${primaryClassName}`}>
        {value[lang]}
      </span>
      <span lang={otherLang} className={`block ${secondaryClassName}`}>
        {value[otherLang]}
      </span>
    </span>
  );
}

/**
 * A paragraph in both languages. The active language gets the larger,
 * language-appropriate type style; the other language sits quietly beneath.
 */
export function BilingualProse({
  value,
  className = '',
  primaryClassName = '',
  secondaryClassName = '',
}: BilingualProseProps) {
  const { lang, otherLang } = useLanguage();
  const primaryFont = lang === 'mr' ? 'body-mr' : 'body-en';
  const secondaryFont = otherLang === 'mr' ? 'body-mr' : 'body-en';

  return (
    <div className={className}>
      <p lang={lang} className={`${primaryFont} ${primaryClassName}`}>
        {value[lang]}
      </p>
      <p
        lang={otherLang}
        className={`${secondaryFont} mt-2 text-[0.94em] ${
          otherLang === 'en' ? 'italic' : ''
        } ${secondaryClassName}`}
      >
        {value[otherLang]}
      </p>
    </div>
  );
}

