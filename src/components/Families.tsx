import { content, type FamilyMember } from '../content';
import { useLanguage } from '../lib/language';
import { BilingualProse } from './BilingualText';
import { Divider, Rangoli } from './ornaments';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

function MemberRow({ member }: { member: FamilyMember }) {
  const { lang, otherLang, t, tOther } = useLanguage();
  const primaryNames = member.names.map((name) => name[lang]).join(' · ');
  const secondaryNames = member.names.map((name) => name[otherLang]).join(' · ');
  const isPlaceholder = member.names.some((name) => name[lang].includes('['));
  const nameFont = lang === 'mr' ? 'font-mr' : 'font-en';

  return (
    <div className="py-2.5">
      <dt
        lang={lang}
        className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold-ink"
      >
        {t(member.relation)}
        <span lang={otherLang} className="ml-1.5 font-normal normal-case tracking-normal text-muted">
          / {tOther(member.relation)}
        </span>
      </dt>
      <dd className="mt-0.5">
        <p
          lang={lang}
          className={`${nameFont} text-[0.96rem] font-semibold leading-snug text-ink ${
            isPlaceholder ? 'family-placeholder font-normal italic text-muted' : ''
          }`}
          title={isPlaceholder ? t(content.ui.familyPlaceholderHint) : undefined}
        >
          {primaryNames}
        </p>
        <p
          lang={otherLang}
          className={`${otherLang === 'mr' ? 'font-mr' : 'font-en italic'} mt-0.5 text-[0.83rem] leading-snug text-muted`}
        >
          {secondaryNames}
        </p>
      </dd>
    </div>
  );
}

export function Families() {
  const { lang, otherLang, t, tOther } = useLanguage();
  const { families } = content;
  const familyFont = lang === 'mr' ? 'heading-mr' : 'heading-en';

  return (
    <section
      id="families"
      aria-labelledby="families-title"
      className="section-anchor paper relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16"
    >
      <Rangoli className="pointer-events-none absolute -left-28 top-24 h-72 w-72 text-gold/10" />
      <Rangoli className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 text-gold/10" />

      <div className="relative z-10">
        <SectionHeading
          id="families-title"
          eyebrow={families.eyebrow}
          title={families.title}
        />

        <Reveal className="mx-auto mt-6 max-w-[23rem] md:max-w-[40rem]" delay={60}>
          <BilingualProse
            value={families.intro}
            primaryClassName="text-center text-ink/80"
            secondaryClassName="text-center text-muted"
          />
        </Reveal>

        <div className="mx-auto mt-7 grid max-w-[24rem] md:max-w-[42rem] gap-4">
          {families.groups.map((group, index) => (
            <Reveal key={group.id} delay={index * 80}>
              <div className="ornate-card relative overflow-hidden rounded-2xl bg-cream/55 px-5 py-5">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20"
                />
                <div className="text-center">
                  <span
                    className="inline-flex rounded-full border border-gold/35 bg-ivory/70 px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-gold-ink"
                    lang={lang}
                  >
                    {t(group.side)}
                  </span>
                  <h3
                    lang={lang}
                    className={`${familyFont} mt-2 text-[1.5rem] leading-tight text-wine`}
                  >
                    {t(group.familyName)}
                  </h3>
                  <p
                    lang={otherLang}
                    className={`${otherLang === 'mr' ? 'heading-mr' : 'font-en italic'} mt-0.5 text-[0.9rem] text-gold-deep`}
                  >
                    {tOther(group.familyName)}
                  </p>
                </div>

                <dl className="mt-3 divide-y divide-gold/15 border-t border-gold/20">
                  {group.members.map((member) => (
                    <MemberRow key={member.relation.en} member={member} />
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-5 max-w-[24rem] md:max-w-[42rem]" delay={60}>
          <div className="ornate-card rounded-xl bg-cream/60 px-5 py-4 text-center">
            <p className="eyebrow-mr text-[0.6rem] text-gold-ink" lang={lang}>
              {t(families.compliments.label)}
            </p>
            <p
              lang={lang}
              className={`${familyFont} mt-1 text-[1.02rem] text-wine`}
            >
              {t(families.compliments.names)}
            </p>
            <p
              lang={otherLang}
              className={`${otherLang === 'mr' ? 'font-mr' : 'font-en italic'} mt-0.5 text-[0.8rem] text-muted`}
            >
              {tOther(families.compliments.names)}
            </p>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-[23rem] md:max-w-[40rem] text-center" delay={40}>
          <Divider className="mx-auto w-36 text-gold/60" />
          <p className="heading-mr mt-4 text-[1.55rem] leading-snug text-gold-deep" lang="mr">
            {families.blessing.mr}
          </p>
          <p className="mt-1 font-en text-[0.95rem] italic text-wine/70" lang="en">
            {families.blessing.en}
          </p>
          <p
            lang={lang}
            className={`mx-auto mt-4 max-w-[21rem] text-[0.88rem] leading-relaxed text-muted ${
              lang === 'mr' ? 'font-mr' : 'font-en'
            }`}
          >
            {t(families.closing)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

