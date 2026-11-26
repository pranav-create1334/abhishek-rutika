import type { Bilingual } from '../content';
import { useLanguage } from '../lib/language';
import { Divider } from './ornaments';

type SectionHeadingProps = {
  eyebrow: Bilingual;
  title: Bilingual;
  subtitle?: Bilingual;
  /** Light sections sit on ivory / cream; dark sections sit on wine. */
  tone?: 'light' | 'dark';
  /** The id is applied to the h2 so the section can reference it. */
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = 'light',
  id,
  className = '',
}: SectionHeadingProps) {
  const { lang, otherLang, t, tOther } = useLanguage();
  const dark = tone === 'dark';

  const titleFont = lang === 'mr' ? 'heading-mr' : 'heading-en';
  const otherTitleFont = otherLang === 'mr' ? 'heading-mr' : 'heading-en';

  return (
    <div className={`text-center ${className}`}>
      <p
        className={`eyebrow-mr ${dark ? 'text-gold-light/80' : 'text-gold-ink'}`}
        lang={lang}
      >
        {t(eyebrow)}
      </p>
      <p
        className={`mt-1 font-en text-[0.62rem] uppercase tracking-[0.28em] ${
          dark ? 'text-ivory/45' : 'text-muted/65'
        }`}
        lang={otherLang}
      >
        {tOther(eyebrow)}
      </p>

      <h2
        id={id}
        lang={lang}
        className={`${titleFont} mt-3 text-[2.05rem] leading-[1.2] sm:text-[2.3rem] ${
          dark ? 'text-ivory' : 'text-wine'
        }`}
      >
        {t(title)}
      </h2>
      <p
        lang={otherLang}
        className={`${otherTitleFont} mt-1 text-[1rem] leading-snug sm:text-[1.1rem] ${
          dark ? 'text-gold-light/75' : 'text-gold-deep'
        }`}
      >
        {tOther(title)}
      </p>

      <Divider
        className={`mx-auto mt-5 w-40 ${dark ? 'text-gold-light/55' : 'text-gold/75'}`}
      />

      {subtitle ? (
        <>
          <p
            lang={lang}
            className={`mx-auto mt-4 max-w-[21rem] text-[0.95rem] leading-relaxed ${
              dark ? 'text-ivory/70' : 'text-muted'
            }`}
          >
            {t(subtitle)}
          </p>
          <p
            lang={otherLang}
            className={`mx-auto mt-1 max-w-[21rem] text-[0.84rem] leading-relaxed ${
              otherLang === 'mr' ? 'font-mr' : 'font-en italic'
            } ${dark ? 'text-ivory/50' : 'text-muted/75'}`}
          >
            {tOther(subtitle)}
          </p>
        </>
      ) : null}
    </div>
  );
}

