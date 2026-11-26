import { content } from '../content';
import { paddedDigits } from '../lib/format';
import { useLanguage } from '../lib/language';
import { useCountdown } from '../lib/useCountdown';
import { Divider, Rangoli } from './ornaments';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Countdown() {
  const { lang, t } = useLanguage();
  const { countdown, wedding } = content;
  const time = useCountdown(wedding.startISO);

  const units = [
    { key: 'days', value: time.days, label: countdown.labels.days },
    { key: 'hours', value: time.hours, label: countdown.labels.hours },
    { key: 'minutes', value: time.minutes, label: countdown.labels.minutes },
    { key: 'seconds', value: time.seconds, label: countdown.labels.seconds },
  ] as const;

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="dark-panel noise-overlay section-anchor relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16"
    >
      <Rangoli className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 text-gold/10" />

      <div className="relative z-10">
        <SectionHeading
          id="countdown-title"
          tone="dark"
          eyebrow={countdown.eyebrow}
          title={countdown.title}
          subtitle={countdown.subtitle}
        />

        {time.complete ? (
          <Reveal className="mx-auto mt-8 max-w-[22rem] md:max-w-[38rem] text-center" delay={80}>
            <div className="ornate-card-dark rounded-2xl bg-wine-deep/50 px-5 py-7">
              <p className="heading-mr text-[1.7rem] text-gold-light">
                {t(countdown.complete)}
              </p>
              <p className="mt-2 text-[0.9rem] text-ivory/70">
                {t(countdown.completeNote)}
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal className="mt-8" delay={80}>
            <div
              role="timer"
              aria-live="off"
              className="mx-auto grid max-w-[24rem] md:max-w-[42rem] grid-cols-4 gap-2 sm:gap-2.5"
            >
              {units.map((unit) => (
                <div
                  key={unit.key}
                  className="ornate-card-dark relative rounded-xl bg-wine-deep/45 px-1 pb-2.5 pt-3 text-center"
                >
                  <span
                    className={`block text-[clamp(1.55rem,7vw,2rem)] leading-none tracking-tight text-gold-light tabular-nums ${
                      lang === 'mr' ? 'font-mr' : 'font-en'
                    }`}
                  >
                    {paddedDigits(unit.value, lang)}
                  </span>
                  <span
                    className={`mt-1.5 block text-[0.62rem] leading-tight text-ivory/65 ${
                      lang === 'mr' ? 'font-mr' : 'font-en'
                    }`}
                    lang={lang}
                  >
                    {unit.label[lang]}
                  </span>
                  <span
                    className="block text-[0.5rem] uppercase tracking-[0.14em] text-ivory/60"
                    lang={lang === 'mr' ? 'en' : 'mr'}
                  >
                    {unit.label[lang === 'mr' ? 'en' : 'mr']}
                  </span>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-6 max-w-[24rem] md:max-w-[42rem] text-center">
              <Divider className="mx-auto w-28 text-gold/50" />
              <p
                className="mt-3 text-[0.78rem] leading-relaxed text-ivory/60"
                lang={lang}
              >
                {t(countdown.note)}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

