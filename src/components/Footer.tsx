import { useEffect, useRef, useState } from 'react';
import { content } from '../content';
import { useLanguage } from '../lib/language';
import { copyToClipboard, getInviteUrl, whatsappShareUrl } from '../lib/share';
import { AaiyejiMark, ArrowUp, ArrowUpRight, Check, LinkIcon, WhatsApp } from './icons';
import { Divider, Rangoli } from './ornaments';
import { Reveal } from './Reveal';

type CopyState = 'idle' | 'copied' | 'error';

export function Footer() {
  const { lang, otherLang, t } = useLanguage();
  const { footer, brand, couple, ui, hashtag } = content;
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const timer = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  const inviteUrl = getInviteUrl();
  const shareMessage = `${t(footer.share)}${inviteUrl}`;

  const onCopy = async () => {
    const ok = await copyToClipboard(inviteUrl);
    setCopyState(ok ? 'copied' : 'error');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopyState('idle'), 2600);
  };

  const copyLabel =
    copyState === 'copied'
      ? ui.linkCopied
      : copyState === 'error'
        ? ui.copyError
        : ui.copyLink;

  return (
    <footer className="dark-panel noise-overlay relative overflow-hidden px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 text-center sm:px-8">
      <Rangoli className="pointer-events-none absolute left-1/2 top-10 h-[26rem] w-[26rem] -translate-x-1/2 text-gold/10" />

      <div className="relative z-10">
        <Reveal>
          <p
            lang={lang}
            className={`${lang === 'mr' ? 'heading-mr' : 'heading-en'} text-[1.45rem] leading-tight text-ivory`}
          >
            {lang === 'mr' ? couple.marathiTitle : couple.englishTitle}
          </p>
          <p
            lang={otherLang}
            className={`${otherLang === 'mr' ? 'heading-mr' : 'font-en italic'} mt-1 text-[0.92rem] text-gold-light/70`}
          >
            {otherLang === 'mr' ? couple.marathiTitle : couple.englishTitle}
          </p>

          <Divider className="mx-auto mt-4 w-36 text-gold/50" />

          <p className="mt-4 text-[0.9rem] text-gold-light/90" lang="sa">
            {footer.blessing}
          </p>
          <p
            lang={lang}
            className={`mx-auto mt-2 max-w-[21rem] text-[0.84rem] leading-relaxed text-ivory/65 ${
              lang === 'mr' ? 'font-mr' : 'font-en'
            }`}
          >
            {t(footer.thanks)}
          </p>

          <div className="mx-auto mt-6 grid max-w-[24rem] md:max-w-[42rem] gap-2.5">
            <a
              href={whatsappShareUrl(shareMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
              aria-label={`${t(ui.shareWhatsApp)} — ${t(ui.opensInNewTab)}`}
            >
              <WhatsApp className="h-[1.15rem] w-[1.15rem]" />
              <span>{t(ui.shareWhatsApp)}</span>
            </a>
            <button type="button" className="btn-ghost-dark w-full" onClick={() => void onCopy()}>
              {copyState === 'copied' ? (
                <Check className="h-[1.05rem] w-[1.05rem]" />
              ) : (
                <LinkIcon className="h-[1.05rem] w-[1.05rem]" />
              )}
              <span>{t(copyLabel)}</span>
              <span className="sr-only" aria-live="polite">
                {copyState === 'idle' ? '' : t(copyLabel)}
              </span>
            </button>
          </div>

          <p className="mt-4 font-en text-[0.74rem] tracking-[0.16em] text-gold-light/80">
            {hashtag}
          </p>

          <p
            lang={lang}
            className={`mx-auto mt-3 max-w-[20rem] text-[0.72rem] leading-relaxed text-ivory/65 ${
              lang === 'mr' ? 'font-mr' : 'font-en'
            }`}
          >
            {t(footer.line)}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-[24rem] md:max-w-[42rem] border-t border-gold/15 pt-6" delay={40}>
          <a
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-left"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/35 bg-ivory/[0.04] text-gold-light transition-colors group-hover:border-gold/60">
              <AaiyejiMark className="h-7 w-7" />
            </span>
            <span>
              <span className="flex items-center gap-1.5 font-en text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-gold-light">
                {brand.name}
                <ArrowUpRight className="h-3 w-3 text-gold-light/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span
                lang={lang}
                className={`mt-0.5 block text-[0.72rem] text-ivory/70 ${
                  lang === 'mr' ? 'font-mr' : 'font-en'
                }`}
              >
                {t(brand.line)}
              </span>
              <span className="sr-only">({t(ui.opensInNewTab)})</span>
            </span>
          </a>

          <div className="mt-5 flex flex-col items-center gap-3">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-ivory/60">
              {t(ui.craftedBy)} · {t(ui.madeWithLove)}
            </p>
            <a
              href="#top"
              className="inline-flex min-h-[44px] items-center gap-1.5 px-3 text-[0.68rem] text-gold-light/80 transition-colors hover:text-gold-light"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span lang={lang}>{t(ui.backToTop)}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

