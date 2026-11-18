import { Link } from 'react-router-dom';

export default function Logo({ label }) {
  return (
    <Link to="/" aria-label={label} className="flex items-center gap-3">
      <span aria-hidden="true" className="bg-grad grid h-9 w-9 place-items-center rounded-lg font-display text-xl font-bold leading-none text-primary-ink shadow-[0_0_18px_-2px_rgb(var(--primary)/.7)]">S</span>
      <span className="hidden text-sm font-semibold sm:inline">{label}</span>
    </Link>
  );
}
