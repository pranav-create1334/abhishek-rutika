import { useEffect, useMemo, useState } from 'react';

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  complete: boolean;
};

function calculate(target: number, now: number): TimeLeft {
  const total = Math.max(0, target - now);
  if (total === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, complete: true };
  }

  const seconds = Math.floor(total / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    complete: false,
  };
}

export function useCountdown(targetISO: string): TimeLeft {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (Number.isNaN(target)) return;

    const tick = () => setNow(Date.now());
    const onVisibility = () => {
      if (document.visibilityState === 'visible') tick();
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [target]);

  if (Number.isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, complete: false };
  }

  return calculate(target, now);
}
