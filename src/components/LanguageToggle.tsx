import { content } from '../content';
import { useLanguage } from '../lib/language';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const { marathi, english, languageLabel } = content.ui;

  return (
    <div
      className={`lang-toggle ${className}`}
      role="group"
      aria-label={t(languageLabel)}
    >
      <button
        type="button"
        lang="mr"
        aria-pressed={lang === 'mr'}
        onClick={() => setLang('mr')}
      >
        {marathi}
      </button>
      <button
        type="button"
        lang="en"
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        {english}
      </button>
    </div>
  );
}

