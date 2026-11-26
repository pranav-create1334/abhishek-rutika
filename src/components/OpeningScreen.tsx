import { useEffect, useRef } from 'react';
import { content } from '../content';
import { useLanguage } from '../lib/language';
import { GaneshMark } from './icons';
import { CornerFlourish, Divider, Marigold, PetalField, Rangoli, Toran } from './ornaments';
import { LanguageToggle } from './LanguageToggle';

type OpeningScreenProps = {
  phase: 'closed' | 'opening';
  onOpen: () => void;
};

export function OpeningScreen({ phase, onOpen }: OpeningScreenProps) {
  const { lang, otherLang, t, tOther } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = dialogRef.current;
    if (!root) return;

    root.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="opening-heading"
      tabIndex={-1}
      className={`opening-root fixed inset-0 z-[120] overflow-hidden outline-none ${
        phase === 'opening' ? 'is-opening' : ''
      }`}
    >
      <div className="opening-curtain opening-curtain--left" aria-hidden="true" />
      <div className="opening-curtain opening-curtain--right" aria-hidden="true" />

      {/* Full-screen ambience so the cover feels like an immersive invitation,
          not a small floating card. All layers are decorative and animate only
          transform/opacity. */}
      <div className="cover-aura" aria-hidden="true" />
      <div className="cover-mandala" aria-hidden="true">
        <Rangoli className="h-full w-full text-gold" />
      </div>
      <Toran className="cover-toran absolute inset-x-0 top-0 z-[3] h-24 w-full text-gold/45 sm:h-32" />
      <PetalField className="z-[2] opacity-80" />

      {phase === 'closed' ? (
        <div className="absolute inset-x-0 top-0 z-30 flex justify-end px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <LanguageToggle />
        </div>
      ) : null}

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 pb-5 pt-16">
        <div className="opening-card paper ornate-card relative max-h-full w-full max-w-[25rem] overflow-y-auto rounded-[1.5rem] px-6 py-6 text-center shadow-[0_30px_90px_-25px_rgba(0,0,0,0.8)] no-scrollbar">
          <div className="cover-shimmer" aria-hidden="true" />
          <CornerFlourish className="pointer-events-none absolute left-2 top-2 w-9 text-gold/50" />
          <CornerFlourish className="pointer-events-none absolute right-2 top-2 w-9 -scale-x-100 text-gold/50" />
          <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 w-9 -scale-y-100 text-gold/50" />
          <CornerFlourish className="pointer-events-none absolute bottom-2 right-2 w-9 -scale-100 text-gold/50" />

          <Marigold className="mx-auto h-9 w-9" />

          <p className="mt-1.5 text-[0.68rem] tracking-[0.14em] text-gold-ink" lang="sa">
            {content.opening.blessing}
          </p>

          <p className="eyebrow-mr mt-3 text-[0.65rem] text-wine/65" lang={lang}>
            {t(content.opening.kicker)}
          </p>
          <p
            className="mt-0.5 font-en text-[0.68rem] italic text-muted/75"
            lang={otherLang}
          >
            {tOther(content.opening.kicker)}
          </p>

          <Divider className="mx-auto mt-3 w-32 text-gold/70" />

          <h1 id="opening-heading" className="mt-3">
            <span
              lang={lang}
              className={`block ${
                lang === 'mr'
                  ? 'heading-mr text-[2.65rem] leading-[1.1] text-wine'
                  : 'heading-en text-[2.6rem] leading-[1.05] text-wine'
              }`}
            >
              {content.couple.groom.name[lang]}
            </span>
            <span
              aria-hidden="true"
              className="my-0.5 flex items-center justify-center gap-2.5 text-gold-deep"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/70" />
              <span className="font-en text-lg italic leading-none">&amp;</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/70" />
            </span>
            <span
              lang={lang}
              className={`block ${
                lang === 'mr'
                  ? 'heading-mr text-[2.65rem] leading-[1.1] text-wine'
                  : 'heading-en text-[2.6rem] leading-[1.05] text-wine'
              }`}
            >
              {content.couple.bride.name[lang]}
            </span>
          </h1>

          <p
            className={`mt-2 text-[0.64rem] uppercase tracking-[0.28em] text-gold-ink ${
              lang === 'mr' ? 'font-en' : 'font-mr tracking-[0.18em]'
            }`}
            lang={lang === 'mr' ? 'en' : 'mr'}
          >
            {lang === 'mr' ? content.couple.englishTitle : content.couple.marathiTitle}
          </p>

          <p className="mt-2.5 text-[0.78rem] text-muted" lang={lang}>
            {t(content.opening.families)}
          </p>

          <div className="mt-4 text-[0.8rem] leading-relaxed">
            <p className="font-semibold text-ink" lang={lang}>
              {t(content.opening.date)}
            </p>
            <p className="mt-0.5 text-muted" lang={lang}>
              {t(content.opening.venue)}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="seal-button mx-auto mt-4"
            aria-label={`${t(content.ui.openInvitation)} · ${t(content.ui.withMusic)}`}
          >
            <GaneshMark className="h-10 w-10" />
          </button>

          <p className="mt-3 text-[0.78rem] font-semibold leading-snug text-wine" lang={lang}>
            {t(content.ui.tapToOpen)}
          </p>
          <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-muted/80">
            {t(content.ui.withMusic)}
          </p>

          <p className="mt-3 font-en text-[0.68rem] italic tracking-wide text-gold-ink">
            {content.opening.note.mr} · {content.opening.note.en}
          </p>
        </div>
      </div>
    </div>
  );
}

