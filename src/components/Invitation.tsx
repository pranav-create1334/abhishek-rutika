import { content } from '../content';
import { useLanguage } from '../lib/language';
import { BilingualProse } from './BilingualText';
import { CornerFlourish, Divider, Rangoli } from './ornaments';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Invitation() {
  const { lang, otherLang, t, tOther } = useLanguage();
  const { invitation } = content;
  const titleFont = lang === 'mr' ? 'heading-mr' : 'heading-en';
  const nameFont = lang === 'mr' ? 'font-mr' : 'font-en';
  const otherNameFont = otherLang === 'mr' ? 'font-mr' : 'font-en';
  const proseFont = lang === 'mr' ? 'font-mr' : 'font-en italic';

  return (
    <section
      id="invitation"
      aria-labelledby="invitation-title"
      className="section-anchor paper relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16"
    >
      <Rangoli className="pointer-events-none absolute -right-24 -top-16 h-64 w-64 text-gold/10" />
      <CornerFlourish className="pointer-events-none absolute left-3 top-3 w-10 text-gold/30" />
      <CornerFlourish className="pointer-events-none absolute right-3 top-3 w-10 -scale-x-100 text-gold/30" />
      <CornerFlourish className="pointer-events-none absolute bottom-3 left-3 w-10 -scale-y-100 text-gold/20" />
      <CornerFlourish className="pointer-events-none absolute bottom-3 right-3 w-10 -scale-100 text-gold/20" />

      <SectionHeading
        id="invitation-title"
        eyebrow={invitation.eyebrow}
        title={invitation.title}
      />

      <Reveal className="mx-auto mt-7 max-w-[24rem] md:max-w-[42rem]" delay={60}>
        <BilingualProse
          value={invitation.traditional}
          primaryClassName="text-center text-[1.02rem] leading-[1.85] text-ink/85"
          secondaryClassName="text-center text-muted/90"
        />
      </Reveal>

      <Reveal className="mx-auto mt-7 max-w-[24rem] md:max-w-[42rem]" delay={100}>
        <div className="gradient-rule" />
        <BilingualProse
          className="mt-7"
          value={invitation.message}
          primaryClassName="text-center text-ink/80"
          secondaryClassName="text-center text-muted/85"
        />
      </Reveal>

      <Reveal className="mt-9" delay={80}>
        <div className="text-center">
          <Divider className="mx-auto w-32 text-gold/60" />
          <h3 className="eyebrow-mr mt-3 text-gold-ink" lang={lang}>
            {t(invitation.hostsTitle)}
          </h3>
          <p className="mt-0.5 font-en text-[0.64rem] uppercase tracking-[0.22em] text-muted/60" lang={otherLang}>
            {tOther(invitation.hostsTitle)}
          </p>
        </div>

        <div className="mx-auto mt-4 grid max-w-[24rem] md:max-w-[42rem] gap-3">
          {invitation.hosts.map((host) => (
            <div
              key={host.id}
              className="ornate-card relative rounded-xl bg-cream/55 px-5 py-4 text-center"
            >
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-gold-ink" lang={lang}>
                {t(host.side)}
              </p>
              <p lang={lang} className={`${titleFont} mt-1 text-[1.28rem] text-wine`}>
                {t(host.familyName)}
              </p>
              <p lang={lang} className={`${nameFont} mt-1.5 text-[0.97rem] font-semibold leading-snug text-ink`}>
                {t(host.names)}
              </p>
              <p lang={otherLang} className={`${otherNameFont} mt-0.5 text-[0.86rem] leading-snug text-muted`}>
                {tOther(host.names)}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-7 max-w-[23rem] md:max-w-[40rem] text-center" delay={40}>
        <p
          lang={lang}
          className={`${proseFont} text-[0.92rem] leading-relaxed text-muted`}
        >
          {t(invitation.welcome)}
        </p>
        <p
          lang={otherLang}
          className={`${otherNameFont} mt-1 text-[0.82rem] leading-relaxed text-muted/75`}
        >
          {tOther(invitation.welcome)}
        </p>
        <p className={`${lang === 'mr' ? 'heading-mr' : 'heading-en italic'} mt-4 text-[1.05rem] text-wine`} lang={lang}>
          {t(invitation.signature)}
        </p>
      </Reveal>
    </section>
  );
}

