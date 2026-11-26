import { useEffect, useRef, useState } from 'react';
import { content, type WeddingEvent } from '../content';
import { downloadAllCalendars, downloadEventCalendar } from '../lib/calendar';
import { useLanguage } from '../lib/language';
import { CalendarPlus, Check } from './icons';

type CalendarButtonProps = {
  event?: WeddingEvent;
  variant?: 'primary' | 'ghost' | 'ghost-dark';
  className?: string;
};

type Status = 'idle' | 'done' | 'error';

const variantClasses = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  'ghost-dark': 'btn-ghost-dark',
} as const;

export function CalendarButton({
  event,
  variant = 'ghost',
  className = '',
}: CalendarButtonProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  const resetSoon = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), 2800);
  };

  const onClick = () => {
    try {
      if (event) {
        downloadEventCalendar(event);
      } else {
        downloadAllCalendars();
      }
      setStatus('done');
    } catch {
      setStatus('error');
    }
    resetSoon();
  };

  const label =
    status === 'done'
      ? content.ui.calendarDownloaded
      : status === 'error'
        ? content.ui.calendarError
        : event
          ? content.ui.addToCalendar
          : content.ui.saveAllDates;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${variantClasses[variant]} w-full text-center ${className}`}
    >
      {status === 'done' ? (
        <Check className="h-[1.05rem] w-[1.05rem] shrink-0" />
      ) : (
        <CalendarPlus className="h-[1.05rem] w-[1.05rem] shrink-0" />
      )}
      <span className="min-w-0">{t(label)}</span>
      <span className="sr-only" aria-live="polite">
        {status === 'idle' ? '' : t(label)}
      </span>
    </button>
  );
}

