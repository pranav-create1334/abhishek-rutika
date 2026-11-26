import type { ReactNode } from 'react';
import { content, type WeddingEvent } from '../content';
import { useLanguage } from '../lib/language';
import { BilingualProse } from './BilingualText';
import { CalendarButton } from './CalendarButton';
import { Calendar, Clock, MapPin } from './icons';
import { EventMotif, Marigold } from './ornaments';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

function DetailRow({
  icon,
  primary,
  secondary,
  dark,
  lang,
  otherLang,
}: {
  icon: ReactNode;
  primary: string;
  secondary: string;
  dark: boolean;
  lang: 'mr' | 'en';
  otherLang: 'mr' | 'en';
}) {
  return (
    <div className={`flex items-start gap-2.5 text-[0.86rem] leading-snug ${dark ? 'text-ivory/80' : 'text-ink/80'}`}>
      <span className={`mt-0.5 shrink-0 ${dark ? 'text-gold-light/75' : 'text-gold-deep'}`}>{icon}</span>
      <span className="min-w-0">
        <span lang={lang} className={lang === 'mr' ? 'font-mr' : 'font-en'}>
          {primary}
        </span>
        <span
          lang={otherLang}
          className={`mt-0.5 block text-[0.82em] ${
            otherLang === 'en' ? 'font-en italic' : 'font-mr'
          } ${dark ? 'text-ivory/65' : 'text-muted'}`}
        >
          {secondary}
        </span>
      </span>
    </div>
  );
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const { lang, otherLang, t, tOther } = useLanguage();
  const featured = Boolean(event.featured);
  const headingFont = lang === 'mr' ? 'heading-mr' : 'heading-en';

  const motifTone =
    featured
      ? 'border-gold/40 bg-gold/10 text-gold-light'
      : event.kind === 'haldi'
        ? 'border-haldi/45 bg-haldi/10 text-gold-ink'
        : 'border-leaf/35 bg-leaf/10 text-leaf';

  return (
    <Reveal delay={index * 70}>
      <article
        aria-labelledby={`event-${event.id}-title`}
        className={`relative overflow-hidden rounded-2xl ${
          featured
            ? 'dark-panel noise-overlay ornate-card-dark text-ivory'
            : 'ornate-card bg-ivory/80'
        }`}
      >
          {featured ? (
            <span className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
          ) : (
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                event.kind === 'haldi'
                  ? 'from-haldi/20 via-haldi to-marigold/40'
                  : 'from-leaf/10 via-leaf/70 to-gold/30'
              }`}
            />
          )}

          <div className="relative z-10 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {featured ? (
                  <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
                    <Marigold className="h-3 w-3" />
                    {t(content.ui.mainDay)}
                  </span>
                ) : (
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold-ink" lang={lang}>
                    {t(event.kicker)}
                  </p>
                )}
                <h3
                  id={`event-${event.id}-title`}
                  lang={lang}
                  className={`${headingFont} mt-1 text-[1.9rem] leading-tight ${
                    featured ? 'text-ivory' : 'text-wine'
                  }`}
                >
                  {t(event.name)}
                </h3>
                <p
                  lang={otherLang}
                  className={`${otherLang === 'mr' ? 'heading-mr' : 'font-en italic'} mt-0.5 text-[0.98rem] ${
                    featured ? 'text-gold-light/80' : 'text-gold-ink'
                  }`}
                >
                  {tOther(event.name)}
                </p>
              </div>

              <span
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-full border ${motifTone}`}
                aria-hidden="true"
              >
                <EventMotif kind={event.kind} className="h-7 w-7" />
              </span>
            </div>

            <BilingualProse
              className="mt-4"
              value={event.description}
              primaryClassName={`text-[0.95rem] leading-relaxed ${
                featured ? 'text-ivory/80' : 'text-ink/80'
              }`}
              secondaryClassName={`text-[0.88rem] ${
                featured ? 'text-ivory/65' : 'text-muted'
              }`}
            />

            <div className={`mt-4 grid gap-2.5 border-t pt-4 ${featured ? 'border-gold/20' : 'border-gold/25'}`}>
              <DetailRow
                dark={featured}
                lang={lang}
                otherLang={otherLang}
                icon={<Calendar className="h-4 w-4" />}
                primary={t(event.date)}
                secondary={tOther(event.date)}
              />
              <DetailRow
                dark={featured}
                lang={lang}
                otherLang={otherLang}
                icon={<Clock className="h-4 w-4" />}
                primary={t(event.time)}
                secondary={tOther(event.time)}
              />
              <DetailRow
                dark={featured}
                lang={lang}
                otherLang={otherLang}
                icon={<MapPin className="h-4 w-4" />}
                primary={t(event.venue)}
                secondary={tOther(event.venue)}
              />
            </div>

            <CalendarButton
              event={event}
              variant={featured ? 'primary' : 'ghost'}
              className="mt-3"
            />
          </div>
      </article>
    </Reveal>
  );
}

export function Events() {
  const { events } = content;

  return (
    <section
      id="events"
      aria-labelledby="events-title"
      className="section-anchor paper-cream relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <SectionHeading
        id="events-title"
        eyebrow={events.eyebrow}
        title={events.title}
        subtitle={events.subtitle}
      />

      <div className="mx-auto mt-8 grid max-w-[24rem] md:max-w-[42rem] gap-4">
        {events.list.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </section>
  );
}

