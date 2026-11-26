import type { SVGProps } from 'react';

type IconProps = {
  className?: string;
};

const strokeProps: SVGProps<SVGSVGElement> = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function AaiyejiMark({ className = 'h-8 w-8' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden focusable="false" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 56V30C11 17.5 20 8 32 5.8 44 8 53 17.5 53 30v26" strokeWidth="2.2" />
        <path d="M18 56V31.5C18 21.5 24.5 14.5 32 12.3c7.5 2.2 14 9.2 14 19.2V56" strokeWidth="1" opacity=".5" />
        <path d="M6 56h52" strokeWidth="2" />
        <path d="M32 49c-3.4-4.1-3.4-8.7 0-13 3.4 4.3 3.4 8.9 0 13Z" strokeWidth="1.4" />
        <path d="M32 49c-4.6-.7-7.5-3.5-8.2-7.8 4.6.7 7.4 3.5 8.2 7.8Z" strokeWidth="1.1" />
        <path d="M32 49c4.6-.7 7.5-3.5 8.2-7.8-4.6.7-7.4 3.5-8.2 7.8Z" strokeWidth="1.1" />
        <circle cx="32" cy="24" r="1.8" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function GaneshMark({ className = 'h-14 w-14' }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden focusable="false" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15">
        <path d="M60 8v6" />
        <path d="M52 17c1.2-4.4 4.2-7.3 8-7.3s6.8 2.9 8 7.3" />
        <path d="M47 22c4.3 2.2 8.7 2.2 13 0" />
        <path d="M44 32c-11-4.4-20 2-21 13.6-1 10.8 7.4 18 17 15.4 4.1-1.1 6.4-4 7-7.4" />
        <path d="M76 32c11-4.4 20 2 21 13.6 1 10.8-7.4 18-17 15.4-4.1-1.1-6.4-4-7-7.4" />
        <path d="M44 30c0-5.5 6.8-9.5 16-9.5s16 4 16 9.5v16.4C76 54.6 69 62 60 62s-16-7.4-16-15.6V30Z" />
        <path d="M49.5 39.5c1.5-1.7 3.7-1.7 5.2 0" />
        <path d="M65.3 39.5c1.5-1.7 3.7-1.7 5.2 0" />
        <path d="M47.5 53.5c-1.8 4.8-.7 8.2 2.2 10" />
        <path d="M72.5 53.5c1.8 4.8.7 8.2-2.2 10" />
        <path d="M60 55v8.5c0 5.7-4.2 9.8-9.4 12.7-4.4 2.5-8.4.2-8.4-3.7 0-3.2 3-5.4 6.1-4.3 2.3.8 2.5 4 .4 5" />
        <circle cx="41.5" cy="47" r="2.4" />
        <circle cx="78.5" cy="47" r="2.4" />
        <path d="M33 88c5.2-4.6 12-4.6 17.2 0 5.2-4.6 12-4.6 17.2 0 5.2-4.6 12-4.6 17.2 0" />
        <path d="M38 93.5h44" />
        <circle cx="60" cy="88" r="1.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function MapPin({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M20 10.5c0 5.2-8 11.5-8 11.5s-8-6.3-8-11.5a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.6" />
    </svg>
  );
}

export function Calendar({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function CalendarPlus({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4M12 14v4M10 16h4" />
    </svg>
  );
}

export function ArrowUpRight({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowUp({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function ChevronDown({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MusicNote({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M9 18V5.5L20 3v12.5" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="15.5" r="3" />
    </svg>
  );
}

export function MusicOff({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M9 18V8M9 5.5 20 3v9.5" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="15.5" r="3" />
      <path d="m3 3 18 18" />
    </svg>
  );
}

export function WhatsApp({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false" fill="currentColor">
      <path d="M19.05 4.91A9.8 9.8 0 0 0 12.03 2C6.6 2 2.2 6.4 2.2 11.82c0 1.73.45 3.42 1.31 4.9L2 22l5.42-1.42a9.83 9.83 0 0 0 4.61 1.17h.01c5.42 0 9.82-4.4 9.82-9.82 0-2.63-1.02-5.1-2.81-7.02Zm-7.01 15.1h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.35 8.2 8.2 0 1 1 8.19 8.19Zm4.5-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.77.97-.14.16-.28.18-.53.06-.25-.12-1.04-.38-1.99-1.22-.74-.66-1.23-1.47-1.37-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.6 4.12 3.64.58.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function LinkIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" />
    </svg>
  );
}

export function ShareIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 7 4M15.6 6.5l-7 4" />
    </svg>
  );
}

export function Check({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="m5 12.5 4.2 4L19 7" />
    </svg>
  );
}

export function Clock({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.3 2" />
    </svg>
  );
}

export function Sparkle({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false" fill="currentColor">
      <path d="M12 1.6c.5 6.1 4.2 9.8 10.3 10.4-6.1.5-9.8 4.2-10.3 10.4C11.5 16.3 7.8 12.5 1.7 12 7.8 11.4 11.5 7.7 12 1.6Z" />
    </svg>
  );
}

export function Heart({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

export function Sun({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MenuLines({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M4 8h16M4 16h10" />
    </svg>
  );
}

