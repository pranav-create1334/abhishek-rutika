import type { CSSProperties } from 'react';
import type { EventKind } from '../content';

export function Toran({ className = '' }: { className?: string }) {
  const leaves = Array.from({ length: 25 }, (_, index) => {
    const x = 8 + index * 24.3;
    const y = 16 + Math.sin((index / 24) * Math.PI) * 10;
    const angle = index % 2 === 0 ? -7 : 7;
    const length = index % 5 === 0 ? 1.16 : 1;
    return { x, y, angle, length, index };
  });

  const flowers = [40, 137, 235, 333, 430, 527, 565].map((x, index) => ({
    x,
    y: 16 + Math.sin((x / 600) * Math.PI) * 10 + (index % 2 === 0 ? 10 : 17),
  }));

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 118" className="toran-sway h-full w-full" fill="none" preserveAspectRatio="xMidYMin meet">
        <path d="M0 20 Q300 44 600 20" stroke="currentColor" strokeOpacity=".65" strokeWidth="1.2" />
        <path d="M0 26 Q300 50 600 26" stroke="currentColor" strokeOpacity=".25" strokeWidth=".7" />
        <path d="M0 14 Q300 38 600 14" stroke="currentColor" strokeOpacity=".3" strokeWidth=".6" strokeDasharray="2 5" />

        {leaves.map(({ x, y, angle, length, index }) => (
          <g key={index} transform={`translate(${x} ${y}) rotate(${angle}) scale(1 ${length})`}>
            <path
              d="M0 0C-7 10-7 25 0 37C7 25 7 10 0 0Z"
              fill={index % 3 === 0 ? '#75825a' : '#5e6c48'}
              stroke="#c9a25c"
              strokeOpacity=".7"
              strokeWidth=".65"
            />
            <path d="M0 4v27" stroke="#c9a25c" strokeOpacity=".45" strokeWidth=".5" />
            <path d="M0 13c-3-2-5-4-5-7M0 20c3-2 5-4 5-7" stroke="#c9a25c" strokeOpacity=".3" strokeWidth=".5" />
          </g>
        ))}

        {flowers.map(({ x, y }, flowerIndex) => (
          <g key={`flower-${flowerIndex}`} transform={`translate(${x} ${y})`}>
            <path d={`M0 -9v-${flowerIndex % 2 === 0 ? 8 : 13}`} stroke="#c9a25c" strokeOpacity=".55" strokeWidth=".8" />
            {Array.from({ length: 8 }, (_, petal) => (
              <ellipse
                key={petal}
                cx="0"
                cy="-6.2"
                rx="2.7"
                ry="5.3"
                fill={petal % 2 === 0 ? '#e2872a' : '#dfa62c'}
                fillOpacity=".92"
                transform={`rotate(${petal * 45})`}
              />
            ))}
            <circle r="2.6" fill="#f2c25a" />
            <circle r="1.1" fill="#8c4e14" fillOpacity=".65" />
          </g>
        ))}

        <g stroke="#c9a25c" strokeOpacity=".55" strokeWidth=".8">
          <path d="M14 20v22" />
          <circle cx="14" cy="46" r="2.2" fill="#dfa62c" fillOpacity=".75" stroke="none" />
          <path d="M14 49v7" />
          <path d="M586 20v22" />
          <circle cx="586" cy="46" r="2.2" fill="#dfa62c" fillOpacity=".75" stroke="none" />
          <path d="M586 49v7" />
        </g>
      </svg>
    </div>
  );
}

export function Rangoli({ className = '' }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, index) => index * 22.5);

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
    >
      <g strokeWidth=".7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="120" cy="120" r="113" strokeDasharray="1.5 7" strokeOpacity=".8" />
        <circle cx="120" cy="120" r="103" strokeOpacity=".45" />
        <circle cx="120" cy="120" r="82" strokeOpacity=".6" />
        <circle cx="120" cy="120" r="38" strokeOpacity=".55" />

        {petals.map((angle, index) => (
          <g key={angle} transform={`rotate(${angle} 120 120)`} strokeOpacity={index % 2 === 0 ? 0.8 : 0.45}>
            <path d="M120 23c9 13 9 26 0 39-9-13-9-26 0-39Z" />
            <path d="M120 45c4 7 4 13 0 20-4-7-4-13 0-20Z" strokeOpacity=".6" />
            <path d="M120 19v-8" />
            <circle cx="120" cy="8" r="1.5" fill="currentColor" stroke="none" />
            <path d="M96 68c9-2 16 1 21 9" strokeOpacity=".5" />
            <path d="M144 68c-9-2-16 1-21 9" strokeOpacity=".5" />
          </g>
        ))}

        {Array.from({ length: 8 }, (_, index) => (
          <g key={`inner-${index}`} transform={`rotate(${index * 45} 120 120)`} strokeOpacity=".6">
            <path d="M120 82c7 10 7 20 0 30-7-10-7-20 0-30Z" />
            <circle cx="120" cy="74" r="1.2" fill="currentColor" stroke="none" />
          </g>
        ))}
        <circle cx="120" cy="120" r="7" strokeOpacity=".7" />
        <circle cx="120" cy="120" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function Divider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 26" className={className} aria-hidden="true" focusable="false" fill="none">
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13h82" strokeOpacity=".5" />
        <path d="M173 13h82" strokeOpacity=".5" />
        <circle cx="12" cy="13" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="248" cy="13" r="1.5" fill="currentColor" stroke="none" />
        <path d="M96 13c8 0 13-3 16-8M164 13c-8 0-13-3-16-8" strokeOpacity=".65" />
        <path d="M113 13c5-3 8-7 9-12M147 13c-5-3-8-7-9-12" strokeOpacity=".5" />
        <path d="M130 22c-5-6-5-12 0-18 5 6 5 12 0 18Z" />
        <path d="M130 22c-7-1-11-5-12-11 7 1 11 5 12 11Z" strokeOpacity=".65" />
        <path d="M130 22c7-1 11-5 12-11-7 1-11 5-12 11Z" strokeOpacity=".65" />
        <path d="M121 24h18" />
      </g>
    </svg>
  );
}

export function CornerFlourish({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false" fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
        <path d="M3 62V28C3 14 14 3 28 3h34" />
        <path d="M9 62V30C9 18.4 18.4 9 30 9h32" strokeOpacity=".4" />
        <path d="M18 45c0-11 9-20 20-20 0 11-9 20-20 20Z" strokeOpacity=".85" />
        <path d="M25 38c4-4 8-5 13-5" strokeOpacity=".6" />
        <path d="M31 31c0-3 2-5 5-5 0 3-2 5-5 5Z" strokeOpacity=".5" />
        <circle cx="17" cy="17" r="1.7" fill="currentColor" stroke="none" />
        <path d="M51 12c-3 3-6 4-10 4" strokeOpacity=".45" />
      </g>
    </svg>
  );
}

export function Marigold({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      {Array.from({ length: 12 }, (_, index) => (
        <ellipse
          key={index}
          cx="24"
          cy="14.5"
          rx="4.2"
          ry="9.5"
          fill={index % 2 === 0 ? '#e2872a' : '#dfa62c'}
          transform={`rotate(${index * 30} 24 24)`}
          opacity=".94"
        />
      ))}
      <circle cx="24" cy="24" r="4.6" fill="#f0c55e" />
      <circle cx="24" cy="24" r="2" fill="#9c5b16" opacity=".65" />
    </svg>
  );
}

export function Diya({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="diya-glow absolute left-1/2 top-0 h-[120%] w-[190%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,190,90,0.38)_0%,rgba(226,135,42,0.14)_38%,transparent_70%)]" />
      <svg viewBox="0 0 72 88" className="relative h-full w-full" fill="none">
        <g>
          <ellipse className="diya-glow" cx="36" cy="54" rx="26" ry="20" fill="#e2a72e" opacity=".12" />
          <g className="diya-flame">
            <path d="M36 18c7 11 10 18 10 24a10 10 0 0 1-20 0c0-6 3-13 10-24Z" fill="#f2c25a" />
            <path d="M36 32c3 5 4 9 4 12a4 4 0 0 1-8 0c0-3 1-7 4-12Z" fill="#fff1c7" />
          </g>
          <path d="M12 57c0 7 11 13 24 13s24-6 24-13H12Z" fill="#9a7127" />
          <path d="M12 57h48" stroke="#e7cd96" strokeWidth="1" strokeOpacity=".6" />
          <path d="M21 70c4 3 9 5 15 5s11-2 15-5" stroke="#c9a25c" strokeOpacity=".55" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

export function PetalField({ className = '' }: { className?: string }) {
  const petals = [
    { left: '7%', size: 8, height: 13, duration: 24, delay: -2, drift: 32, tone: 'marigold' },
    { left: '18%', size: 6, height: 10, duration: 28, delay: -14, drift: -22, tone: 'ivory' },
    { left: '28%', size: 9, height: 15, duration: 22, delay: -8, drift: 24, tone: 'gold' },
    { left: '41%', size: 6, height: 11, duration: 30, delay: -20, drift: -36, tone: 'marigold' },
    { left: '52%', size: 8, height: 13, duration: 26, delay: -5, drift: 28, tone: 'ivory' },
    { left: '64%', size: 7, height: 12, duration: 29, delay: -17, drift: -18, tone: 'gold' },
    { left: '73%', size: 10, height: 16, duration: 23, delay: -11, drift: 17, tone: 'marigold' },
    { left: '84%', size: 6, height: 10, duration: 31, delay: -25, drift: -26, tone: 'ivory' },
    { left: '93%', size: 7, height: 12, duration: 27, delay: -6, drift: 33, tone: 'gold' },
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((petal, index) => {
        const background =
          petal.tone === 'ivory'
            ? 'linear-gradient(150deg, rgba(250,238,213,.85), rgba(231,205,150,.35))'
            : petal.tone === 'gold'
              ? 'linear-gradient(150deg, rgba(231,205,150,.85), rgba(201,162,92,.35))'
              : 'linear-gradient(150deg, rgba(226,135,42,.8), rgba(223,166,44,.45))';
        const style = {
          left: petal.left,
          width: `${petal.size}px`,
          height: `${petal.height}px`,
          background,
          '--petal-duration': `${petal.duration}s`,
          '--petal-delay': `${petal.delay}s`,
          '--petal-drift': `${petal.drift}px`,
        } as CSSProperties;

        return <span key={index} className="petal" style={style} />;
      })}
    </div>
  );
}

export function EventMotif({ kind, className = '' }: { kind: EventKind; className?: string }) {
  if (kind === 'haldi') {
    return (
      <svg viewBox="0 0 56 56" className={className} aria-hidden="true" focusable="false" fill="none">
        <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="28" cy="21" r="8" />
          <path d="M28 6v4M28 32v4M13 21h4M39 21h4M17.4 10.4l2.8 2.8M35.8 28.8l2.8 2.8M38.6 10.4l-2.8 2.8M20.2 28.8l-2.8 2.8" />
          <path d="M13 38c2 6 7 9 15 9s13-3 15-9H13Z" />
          <path d="M18 42c5-2 15-2 20 0" strokeOpacity=".55" />
          <circle cx="22" cy="39" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="32" cy="38" r="1.2" fill="currentColor" stroke="none" />
        </g>
      </svg>
    );
  }

  if (kind === 'vivah') {
    return (
      <svg viewBox="0 0 56 56" className={className} aria-hidden="true" focusable="false" fill="none">
        <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 50V26c0-8 5-14 10-17M46 50V26c0-8-5-14-10-17" />
          <path d="M18 50V27c0-6 3-10 6-13M38 50V27c0-6-3-10-6-13" strokeOpacity=".55" />
          <path d="M6 50h44M8 20h40" strokeOpacity=".7" />
          <path d="M15 20v-5M41 20v-5" />
          <path d="M23 20c0-4 2-6 5-6s5 2 5 6" />
          <path d="M28 14V9M25 9h6" />
          <path d="M28 8c3 2 3 4 0 6-3-2-3-4 0-6Z" />
          <path d="M14 34c9-3 19-3 28 0" strokeOpacity=".45" />
          <path d="M18 42c7-2 13-2 20 0" strokeOpacity=".35" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true" focusable="false" fill="none">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 8c10 7 15 16 14 26-1 7-6 11-14 11s-13-4-14-11C13 24 18 15 28 8Z" />
        <path d="M28 14v25M28 22l-7-5M28 29l7-5M28 36l-7-5M28 42l6-4" strokeOpacity=".55" />
        <path d="M18 44c0 3 4 5 10 5s10-2 10-5" strokeOpacity=".7" />
        <path d="M23 45c0 2 2 3 5 3s5-1 5-3" />
        <path d="M25 48v3M31 48v3" strokeOpacity=".5" />
      </g>
    </svg>
  );
}

export function MapSketch({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 260"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="map-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9a25c" stopOpacity=".08" />
          <stop offset="1" stopColor="#c9a25c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="600" height="260" fill="url(#map-fade)" />
      <g stroke="#e7cd96" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 52c65-14 95 12 150 4s85-32 135-22 92 36 155 26 104-16 160-4" strokeOpacity=".2" strokeWidth="8" />
        <path d="M0 49c65-14 95 12 150 4s85-32 135-22 92 36 155 26 104-16 160-4" strokeOpacity=".4" strokeWidth=".8" />
        <path d="M0 55c65-14 95 12 150 4s85-32 135-22 92 36 155 26 104-16 160-4" strokeOpacity=".24" strokeWidth=".7" />

        <g strokeOpacity=".24" strokeWidth=".8">
          <path d="M-20 196c85-18 108-77 185-82s96 43 169 40 103-45 158-40 66 25 108 31" />
          <path d="M60 270c18-55 61-74 58-126s-31-92 8-145" />
          <path d="M186 270c30-52 46-86 108-105s124 4 167-21 54-58 117-63" />
          <path d="M438 270c-11-46-22-75-6-110s54-48 62-97 22-58 66-68" />
          <path d="M-10 118c49-21 78-36 118-21s53 32 96 25 52-32 87-30 55 22 92 13 66-32 108-24 74 22 112 12" />
        </g>

        <g strokeOpacity=".16" strokeWidth=".7" strokeDasharray="2 6">
          <path d="M-5 82h610M-5 145h610M-5 220h610" />
          <path d="M95 0v260M255 0v260M392 0v260M500 0v260" />
        </g>

        <g fill="#c9a25c" fillOpacity=".055" stroke="#c9a25c" strokeOpacity=".24" strokeWidth=".7">
          <path d="M118 88h48v26h-48zM178 86h52v31h-52zM247 90h38v24h-38zM300 84h58v30h-58zM374 94h46v26h-46zM436 88h61v30h-61zM512 94h40v27h-40z" />
          <path d="M130 168h38v27h-38zM182 174h50v30h-50zM244 164h43v24h-43zM305 172h54v31h-54zM371 164h41v26h-41zM430 176h56v24h-56zM500 168h45v29h-45z" />
          <path d="M144 212h35v24h-35zM206 218h43v22h-43zM270 214h31v26h-31zM329 220h46v22h-46zM401 212h38v28h-38zM463 222h50v22h-50z" />
        </g>

        <path d="M56 238c43-19 67-39 99-70s50-33 91-24 58 32 100 17" stroke="#e7cd96" strokeOpacity=".7" strokeWidth="1.6" strokeDasharray="4 7" />
        <circle cx="56" cy="238" r="4" fill="#e7cd96" fillOpacity=".7" stroke="none" />
        <circle cx="56" cy="238" r="9" strokeOpacity=".3" />
      </g>

      <g transform="translate(348 122)">
        <circle r="34" fill="#dfa62c" fillOpacity=".06" />
        <circle r="24" fill="#dfa62c" fillOpacity=".08" stroke="#e7cd96" strokeOpacity=".26" />
        <path
          d="M0-28c-12.7 0-23 10.3-23 23 0 16.3 23 35 23 35s23-18.7 23-35c0-12.7-10.3-23-23-23Z"
          fill="#4b0e1a"
          stroke="#e7cd96"
          strokeWidth="1.2"
        />
        <path d="m0-18 4.4 8.9 9.8 1.4-7.1 6.9 1.7 9.8L0 3.4-8.8 8l1.7-9.8-7.1-6.9 9.8-1.4L0-18Z" fill="#e7cd96" fillOpacity=".9" stroke="none" />
      </g>

      <g transform="translate(527 44)" stroke="#e7cd96" strokeOpacity=".45" strokeWidth=".8" fill="none">
        <circle r="16" />
        <path d="M0-11 3 0 0 11-3 0 0-11ZM-11 0H11" strokeOpacity=".3" />
        <path d="M0-16v-4" />
        <text x="0" y="-24" textAnchor="middle" fill="#e7cd96" fillOpacity=".6" stroke="none" fontSize="8" fontFamily="Cormorant Garamond, serif">
          N
        </text>
      </g>

      <g fill="#e7cd96" fillOpacity=".36">
        <circle cx="97" cy="143" r="1.4" />
        <circle cx="164" cy="112" r="1.1" />
        <circle cx="224" cy="204" r="1.3" />
        <circle cx="295" cy="137" r="1.1" />
        <circle cx="410" cy="205" r="1.2" />
        <circle cx="483" cy="135" r="1.4" />
        <circle cx="548" cy="205" r="1.1" />
      </g>
    </svg>
  );
}

