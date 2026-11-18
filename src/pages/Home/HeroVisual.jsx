import { useEffect, useState } from 'react';
import Icon from '../../components/ui/Icon';

// Decorative icon per focus area (same order as hero.areas). Purely visual.
const AREA_ICON = ['verify', 'code', 'globe'];

// Profile card: the portrait in a glowing frame with an orbit ring, the focus areas underneath.
// With no photo (or a photo that fails to load) the frame shows a quiet placeholder with no text in it.
export default function HeroVisual({ title, areas, name, portraitAlt, avatarUrl }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [avatarUrl]);
  const showImage = Boolean(avatarUrl) && !failed;

  return (
    <div className="relative">
      {/* Soft halo behind the card: the one big glow of the page. */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgb(var(--primary)/.32),rgb(var(--accent)/.18)_55%,transparent)] blur-2xl" />
      <div className="card card--glass overflow-hidden p-3 sm:p-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-primary/40 bg-bg shadow-[0_0_40px_-8px_rgb(var(--primary)/.55)] sm:aspect-[3/2] lg:aspect-[4/5]">
          {showImage ? (
            // object-cover fills the frame without stretching the photo; object-top keeps faces in view.
            <img src={avatarUrl} alt={name || portraitAlt} loading="eager" onError={() => setFailed(true)} className="h-full w-full object-cover object-top" />
          ) : (
            <div role="img" aria-label={portraitAlt} className="relative grid h-full w-full place-items-center bg-gradient-to-br from-primary/20 via-transparent to-accent/20">
              <span className="relative grid h-24 w-24 place-items-center rounded-full border border-primary/40 bg-surface/80 text-primary/70 shadow-glow"><Icon name="user" size={44} /></span>
            </div>
          )}
          {/* Light fade at the bottom + a neon orbit arc across it, so the photo sits inside the identity. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
          <svg aria-hidden="true" viewBox="0 0 400 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full" fill="none">
            <defs><linearGradient id="orbit-g" x1="0" x2="1"><stop offset="0" stopColor="rgb(139 92 246)" stopOpacity="0" /><stop offset=".5" stopColor="rgb(96 165 250)" /><stop offset="1" stopColor="rgb(139 92 246)" stopOpacity="0" /></linearGradient></defs>
            <path d="M-10 110 C 110 30, 290 30, 410 110" stroke="url(#orbit-g)" strokeWidth="2.5" />
          </svg>
        </div>
        <ul aria-label={title} className="mt-3 grid gap-2">
          {areas.map((a, i) => (
            <li key={a} className="flex items-center gap-3 rounded-xl border border-line/70 bg-bg/40 px-3 py-2.5">
              <span aria-hidden="true" className="bg-grad grid h-9 w-9 flex-none place-items-center rounded-lg text-primary-ink"><Icon name={AREA_ICON[i] || 'code'} size={18} /></span>
              <span className="text-base font-semibold sm:text-lg">{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
