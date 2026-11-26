import { content } from '../content';
import { useLanguage } from '../lib/language';
import { ChevronDown } from './icons';
import { CornerFlourish, Divider, PetalField, Rangoli, Toran } from './ornaments';

export function Hero() {
  const { lang, t } = useLanguage();
  const { couple, hero, wedding, ui } = content;

  const nameFont =
    lang === 'mr'
      ? 'heading-mr text-[clamp(3rem,13.5vw,4.15rem)] leading-[1.08]'
      : 'heading-en text-[clamp(3.2rem,14vw,4.4rem)] leading-[1.02]';

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="dark-panel noise-overlay relative isolate overflow-hidden"
    >
      <PetalField className="opacity-75" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 text-gold/80">
        <Toran className="h-[74px] w-full sm:h-[92px]" />
      </div>

      <CornerFlourish className="pointer-events-none absolute left-1.5 top-24 w-14 text-gold/20" />
      <CornerFlourish className="pointer-events-none absolute right-1.5 top-24 w-14 -scale-x-100 text-gold/20" />
      <CornerFlourish className="pointer-events-none absolute bottom-6 left-1.5 w-14 -scale-y-100 text-gold/15" />
      <CornerFlourish className="pointer-events-none absolute bottom-6 right-1.5 w-14 -scale-100 text-gold/15" />

      <div className="hero-mandala pointer-events-none absolute left-1/2 top-[42%] h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 sm:h-[26rem] sm:w-[26rem]">
        <Rangoli className="h-full w-full text-gold/15" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center px-5 pb-7 pt-[5.4rem] text-center sm:px-8 sm:pt-24">
        <div className="hero-enter flex w-full flex-1 flex-col items-center justify-center">
          <p
            className="text-[0.74rem] leading-relaxed tracking-[0.12em] text-gold-light/90"
            lang="sa"
          >
            {hero.blessing}
          </p>

          <p
            className="mt-3.5 text-[0.64rem] uppercase tracking-[0.26em] text-gold-light/80"
            lang={lang}
          >
            {t(hero.eyebrow)}
          </p>

          <Divider className="mt-3.5 w-44 text-gold/70" />

          <h1 id="hero-title" className="mt-4">
            <span lang={lang} className={`block text-ivory ${nameFont}`}>
              {couple.groom.name[lang]}
            </span>
            <span
              aria-hidden="true"
              className="my-1 flex items-center justify-center gap-3 text-gold-light/80"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="font-en text-xl italic leading-none">&amp;</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
            </span>
            <span lang={lang} className={`block text-ivory ${nameFont}`}>
              {couple.bride.name[lang]}
            </span>
          </h1>

          <p
            className={`mt-3 text-[0.71rem] uppercase tracking-[0.32em] text-gold-light/85 ${
              lang === 'mr' ? 'font-en' : 'font-mr tracking-[0.2em]'
            }`}
            lang={lang === 'mr' ? 'en' : 'mr'}
          >
            {lang === 'mr' ? couple.englishTitle : couple.marathiTitle}
          </p>

          <p
            className={`mt-6 max-w-[19rem] md:max-w-[35rem] text-[0.98rem] leading-relaxed text-ivory/80 ${
              lang === 'mr' ? 'body-mr' : 'body-en'
            }`}
            lang={lang}
          >
            {t(hero.kicker)}
          </p>

          <div className="ornate-card-dark relative mt-5 w-full max-w-[19.5rem] md:max-w-[32rem] rounded-2xl bg-wine-deep/45 px-5 pb-4 pt-4 backdrop-blur-[2px]">
            <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold-light/80" lang={lang}>
              {t(hero.saveTheDate)}
            </p>
            <p
              className={`mt-1 text-[1.02rem] font-semibold text-gold-light ${
                lang === 'mr' ? 'heading-mr' : 'heading-en text-[1.16rem]'
              }`}
              lang={lang}
            >
              {t(wedding.date)}
            </p>
            <p className="mt-0.5 text-[0.74rem] tracking-wide text-ivory/80" lang={lang}>
              {t(wedding.time)} · {t(wedding.timezone)}
            </p>
            <span className="mx-auto mt-2.5 block h-px w-20 bg-gold/35" aria-hidden="true" />
            <p className={`mt-2 text-[0.82rem] text-ivory/80 ${lang === 'mr' ? 'font-mr' : 'font-en'}`} lang={lang}>
              {t(hero.venueLine)}
            </p>
          </div>
        </div>

        <a
          href="#invitation"
          className="hero-cue mt-8 inline-flex min-h-[52px] flex-col items-center justify-center gap-1 px-4 text-gold-light/85 transition-colors hover:text-gold-light"
        >
          <span className={`text-[0.64rem] tracking-[0.2em] ${lang === 'mr' ? 'font-mr' : 'font-en'}`} lang={lang}>
            {t(ui.scrollHint)}
          </span>
          <ChevronDown className="scroll-cue h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

