import { content, type WeddingEvent } from '../content';

const encoder = new TextEncoder();

function icsEscape(value: string): string {
  return value
    .replaceAll('\\', '\\\\')
    .replaceAll(';', '\\;')
    .replaceAll(',', '\\,')
    .replaceAll('\r\n', '\\n')
    .replaceAll('\n', '\\n');
}

/** Converts an ISO timestamp (with its +05:30 offset) to UTC iCalendar format. */
function toICSDate(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replaceAll('-', '')
    .replaceAll(':', '')
    .replace(/\.\d{3}Z$/, 'Z');
}

/** RFC 5545 recommends folding lines at 75 octets without breaking UTF-8. */
function foldLine(line: string): string {
  let result = '';
  let current = '';

  for (const character of line) {
    if (encoder.encode(current + character).length > 73) {
      result += `${current}\r\n `;
      current = character;
    } else {
      current += character;
    }
  }

  return result + current;
}

function eventBlock(event: WeddingEvent, index: number): string[] {
  const stamp = toICSDate(new Date().toISOString());
  const summary = `${event.name.mr} (${event.name.en}) — ${content.couple.englishTitle}`;
  const description = [
    event.description.mr,
    event.description.en,
    '',
    `${content.venue.name.mr}, ${content.venue.address.mr}`,
  ].join('\n');

  return [
    'BEGIN:VEVENT',
    `UID:${event.id}-abhishek-rutika-${index}@aaiyeji`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toICSDate(event.startISO)}`,
    `DTEND:${toICSDate(event.endISO)}`,
    `SUMMARY:${icsEscape(summary)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    `LOCATION:${icsEscape(`${content.venue.name.en}, Bhusawal, Maharashtra, India`)}`,
    `URL:${content.siteUrl}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsEscape(summary)}`,
    'END:VALARM',
    'END:VEVENT',
  ];
}

function calendarFile(events: WeddingEvent[]): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aaiyeji//Abhishek and Rutika Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events.flatMap((event, index) => eventBlock(event, index)),
    'END:VCALENDAR',
  ];

  return lines.map(foldLine).join('\r\n');
}

export function downloadEventCalendar(event: WeddingEvent): void {
  downloadCalendar([event], `abhishek-rutika-${event.id}.ics`);
}

export function downloadAllCalendars(): void {
  downloadCalendar(content.events.list, 'abhishek-rutika-wedding.ics');
}

function downloadCalendar(events: WeddingEvent[], filename: string): void {
  const blob = new Blob([calendarFile(events)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
