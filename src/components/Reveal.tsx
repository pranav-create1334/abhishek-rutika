import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  soft?: boolean;
};

/**
 * A lightweight, one-time scroll reveal built on IntersectionObserver.
 * Falls back to visible when the API is unavailable and is disabled by
 * prefers-reduced-motion in CSS.
 */
export function Reveal({ children, className = '', delay = 0, soft = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={`${soft ? 'reveal-soft' : 'reveal'} ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

