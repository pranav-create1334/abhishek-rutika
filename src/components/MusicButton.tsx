import { content } from '../content';
import { useLanguage } from '../lib/language';
import { MusicOff } from './icons';

type MusicButtonProps = {
  isPlaying: boolean;
  isUnavailable: boolean;
  onToggle: () => void;
};

export function MusicButton({ isPlaying, isUnavailable, onToggle }: MusicButtonProps) {
  const { t } = useLanguage();
  const label = isPlaying ? content.ui.musicPause : content.ui.musicPlay;

  return (
    <button
      type="button"
      className="glass-control relative"
      aria-label={t(label)}
      aria-pressed={isPlaying}
      aria-describedby={isUnavailable ? 'music-unavailable' : undefined}
      onClick={onToggle}
    >
      {isPlaying ? (
        <span className="flex h-5 items-end justify-center gap-[3px] text-wine" aria-hidden="true">
          <span className="eq-bar" />
          <span className="eq-bar" />
          <span className="eq-bar" />
        </span>
      ) : (
        <MusicOff className="h-[1.15rem] w-[1.15rem]" />
      )}
      <span className="sr-only">
        {isPlaying ? t(content.ui.musicPlaying) : t(content.ui.musicMuted)}
      </span>
      {isUnavailable ? (
        <span id="music-unavailable" className="sr-only">
          {t(content.ui.musicUnavailable)}
        </span>
      ) : null}
    </button>
  );
}

