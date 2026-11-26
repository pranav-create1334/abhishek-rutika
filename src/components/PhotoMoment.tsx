import { useState } from 'react';
import { content } from '../content';
import { useLanguage } from '../lib/language';
import { Divider, Marigold, Rangoli } from './ornaments';
import { Reveal } from './Reveal';

export function PhotoMoment() {
  const { lang, otherLang, t, tOther } = useLanguage();
  const { photo, couple, wedding } = content;
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(photo.src) && !failed;

  return (
    <section
      id="photo"
      aria-labelledby="photo-title"
      className="section-anchor relative overflow-hidden bg-cream px-5 py-14 sm:px-8"
    >
      <Rangoli className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 text-gold/10" />
      <Rangoli className="pointer-events-none absolute -right-28 -top-24 h-72 w-72 text-gold/10" />

      <Reveal className="relative mx-auto max-w-[19.5rem] md:max-w-[32rem]">
        <figure>
          <div className="relative">
            <div className="arch-frame ornate-card bg-ivory p-2 shadow-[0_24px_60px_-30px_rgba(43,7,16,0.55)]">
              <div className="arch-frame relative aspect-[4/5] overflow-hidden bg-wine-deep">
                {showPhoto ? (
                  <img
                    src={photo.src}
                    alt={t(photo.alt)}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    onError={() => setFailed(true)}
                  />
                ) : (
                  <div className="dark-panel relative flex h-full flex-col items-center justify-center overflow-hidden px-6 text-center">
                    <Rangoli className="pointer-events-none absolute inset-0 m-auto h-[92%] w-[92%] text-gold/20" />
                    <Marigold className="relative h-7 w-7" />
                    <p
                      className={`relative mt-4 text-[2.4rem] leading-none text-gold-light ${
                        lang === 'mr' ? 'heading-mr' : 'heading-en'
                      }`}
                      lang={lang}
                    >
                      {couple.monogram[lang]}
                    </p>
                    <p
                      className={`relative mt-1.5 text-[0.8rem] uppercase tracking-[0.28em] text-gold-light/55 ${
                        otherLang === 'mr' ? 'font-mr' : 'font-en'
                      }`}
                      lang={otherLang}
                    >
                      {couple.monogram[otherLang]}
                    </p>
                    <span className="relative mt-4 block h-px w-16 bg-gold/35" aria-hidden="true" />
                    <p className="relative mt-4 font-en text-[0.68rem] uppercase tracking-[0.22em] text-ivory/60">
                      {t(wedding.shortDate)}
                    </p>
                    <p className="relative mt-1 text-[0.7rem] text-ivory/45" lang={lang}>
                      {t(content.hero.venueLine)}
                    </p>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-gold/25" />
              </div>
            </div>

            <Marigold className="absolute -left-3 top-[38%] h-9 w-9 drop-shadow" />
            <Marigold className="absolute -right-2 bottom-[18%] h-7 w-7 drop-shadow" />
          </div>

          <figcaption className="mt-6 text-center">
            <p className="eyebrow-mr text-[0.64rem] text-gold-ink" lang={lang}>
              {t(photo.kicker)}
            </p>
            <p className="mt-1 font-en text-[0.62rem] uppercase tracking-[0.25em] text-muted" lang={otherLang}>
              {tOther(photo.kicker)}
            </p>
            <h2
              id="photo-title"
              lang={lang}
              className={`${lang === 'mr' ? 'heading-mr' : 'heading-en'} mt-2 text-[1.65rem] leading-snug text-wine`}
            >
              {t(photo.caption)}
            </h2>
            <p
              lang={otherLang}
              className={`${otherLang === 'mr' ? 'heading-mr' : 'heading-en italic'} mt-1 text-[0.98rem] text-gold-ink`}
            >
              {tOther(photo.caption)}
            </p>
            <Divider className="mx-auto mt-4 w-28 text-gold/60" />
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

