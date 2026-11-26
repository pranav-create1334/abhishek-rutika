import { LanguageToggle } from './LanguageToggle';
import { MusicButton } from './MusicButton';

type FloatingControlsProps = {
  isPlaying: boolean;
  isUnavailable: boolean;
  onToggleMusic: () => void;
};

export function FloatingControls({
  isPlaying,
  isUnavailable,
  onToggleMusic,
}: FloatingControlsProps) {
  return (
    <div className="floating-controls">
      <LanguageToggle />
      <MusicButton
        isPlaying={isPlaying}
        isUnavailable={isUnavailable}
        onToggle={onToggleMusic}
      />
    </div>
  );
}

