import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { content } from './content';
import { useBackgroundMusic } from './lib/useBackgroundMusic';
import { useLanguage } from './lib/language';
import { useReducedMotion } from './lib/useReducedMotion';
import { FloatingControls } from './components/FloatingControls';
import { OpeningScreen } from './components/OpeningScreen';

const InvitationContent = lazy(() =>
  import('./components/InvitationContent').then((module) => ({
    default: module.InvitationContent,
  })),
);

type Phase = 'closed' | 'opening' | 'open';

export default function App() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>('closed');
  const reducedMotion = useReducedMotion();
  const music = useBackgroundMusic();
  const mainRef = useRef<HTMLElement>(null);
  const openTimer = useRef(0);
  const openingStarted = useRef(false);

  useEffect(() => {
    return () => window.clearTimeout(openTimer.current);
  }, []);

  useEffect(() => {
    const { body } = document;
    const previousOverflow = body.style.overflow;
    if (phase !== 'open') {
      body.style.overflow = 'hidden';
    }

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'open') return;

    window.scrollTo({ top: 0, behavior: 'auto' });
    const frame = window.requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  const openInvitation = useCallback(() => {
    if (openingStarted.current) return;
    openingStarted.current = true;
    setPhase('opening');
    void music.start();

    openTimer.current = window.setTimeout(
      () => setPhase('open'),
      reducedMotion ? 380 : 1450,
    );
  }, [music, reducedMotion]);

  const isOpen = phase === 'open';

  return (
    <>
      {isOpen ? (
        <a className="skip-link" href="#main-content">
          {t(content.ui.skipToContent)}
        </a>
      ) : null}

      {isOpen ? (
        <FloatingControls
          isPlaying={music.isPlaying}
          isUnavailable={music.isUnavailable}
          onToggleMusic={() => void music.toggle()}
        />
      ) : (
        <OpeningScreen phase={phase === 'opening' ? 'opening' : 'closed'} onOpen={openInvitation} />
      )}

      {/* Mount the long invitation only when the seal is tapped. This keeps the
          first paint (the opening cover) fast on low-end phones. */}
      {phase !== 'closed' ? (
        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          aria-hidden={!isOpen}
          inert={!isOpen}
          className="outline-none min-h-[100svh]"
        >
          <Suspense fallback={null}>
            <InvitationContent />
          </Suspense>
        </main>
      ) : null}
    </>
  );
}
