import { content } from '../content';
import { useLanguage } from '../lib/language';
import { BilingualProse } from './BilingualText';
import { CalendarButton } from './CalendarButton';
import { ArrowUpRight, MapPin } from './icons';
import { MapSketch } from './ornaments';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Venue() {
  const { lang, otherLang, t, tOther } = useLanguage();
  const { venue, ui } = content;

  return (
    <section
      id="venue"
      aria-labelledby="venue-title"
      className="dark-panel noise-overlay section-anchor relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16"
    >
      <div className="relative z-10">
        <SectionHeading
          id="venue-title"
          tone="dark"
          eyebrow={venue.eyebrow}
          title={venue.title}
        />

        <Reveal className="mx-auto mt-8 max-w-[24rem] md:max-w-[42rem]" delay={60}>
          <div className="ornate-card-dark overflow-hidden rounded-2xl bg-wine-deep/55">
            <div className="relative h-44 overflow-hidden bg-[#23060d]">
              <MapSketch className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-3.5 flex items-center gap-2 text-gold-light">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-wine-deep/70">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>
                  <span
                    lang={lang}
                    className={`block text-[0.95rem] font-semibold leading-tight ${
                      lang === 'mr' ? 'font-mr' : 'font-en'
                    }`}
                  >
                    {t(venue.name)}
                  </span>
                  <span
                    className={`block text-[0.6rem] uppercase tracking-[0.2em] text-ivory/55 ${
                      lang === 'mr' ? 'font-mr tracking-[0.14em]' : 'font-en'
                    }`}
                    lang={lang}
                  >
                    {t(venue.regionLine)}
                  </span>
                </span>
              </div>
            </div>

            <div className="p-5">
              <p
                lang={lang}
                className={`text-[0.87rem] leading-relaxed text-ivory/85 ${
                  lang === 'mr' ? 'font-mr' : 'font-en'
                }`}
              >
                {t(venue.address)}
              </p>
              <p
                lang={otherLang}
                className={`mt-1 text-[0.8rem] leading-relaxed text-ivory/50 ${
                  otherLang === 'mr' ? 'font-mr' : 'font-en italic'
                }`}
              >
                {tOther(venue.address)}
              </p>

              <BilingualProse
                className="mt-3"
                value={venue.description}
                primaryClassName="text-[0.9rem] leading-relaxed text-ivory/70"
                secondaryClassName="text-[0.84rem] text-ivory/45"
              />

              <a
                href={venue.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 w-full"
                aria-label={`${t(ui.directions)} — ${t(ui.opensInNewTab)}`}
              >
                <MapPin className="h-[1.05rem] w-[1.05rem]" />
                <span>{t(ui.directions)}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <p
                lang={lang}
                className={`mt-2.5 text-center text-[0.7rem] leading-relaxed text-ivory/45 ${
                  lang === 'mr' ? 'font-mr' : 'font-en'
                }`}
              >
                {t(venue.directionsNote)}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-4 max-w-[24rem] md:max-w-[42rem]" delay={90}>
          <div className="ornate-card-dark rounded-2xl bg-ivory/[0.035] px-5 py-5 text-center">
            <p className="eyebrow-mr text-[0.64rem] text-gold-light/80" lang={lang}>
              {t(venue.calendarTitle)}
            </p>
            <p className="mt-0.5 font-en text-[0.62rem] uppercase tracking-[0.22em] text-ivory/40" lang={otherLang}>
              {tOther(venue.calendarTitle)}
            </p>
            <p
              lang={lang}
              className={`mx-auto mt-2 max-w-[17rem] text-[0.82rem] leading-relaxed text-ivory/60 ${
                lang === 'mr' ? 'font-mr' : 'font-en'
              }`}
            >
              {t(venue.calendarNote)}
            </p>
            <CalendarButton variant="ghost-dark" className="mt-4" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

