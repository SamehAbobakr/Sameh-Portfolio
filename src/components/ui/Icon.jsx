// One small set of stroke icons (Lucide-style, 24x24) shared by buttons, links and cards.
// Decorative by default: pass `label` only when the icon is the sole content of a control.
const ICONS = {
  github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  demo: <path d="M5 3l14 9-14 9V3z" />,
  doc: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h5" />,
  cert: <path d="M12 15a6 6 0 100-12 6 6 0 000 12M8.2 13.9 7 23l5-3 5 3-1.2-9.1" />,
  external: <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />,
  verify: <><path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" /></>,
  zoom: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3M11 8v6M8 11h6" /></>,
  zoomOut: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3M8 11h6" /></>,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  chevronL: <path d="m15 18-6-6 6-6" />,
  chevronR: <path d="m9 18 6-6-6-6" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 4.5-5" /></>,
  progress: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  upcoming: <><circle cx="12" cy="12" r="9" strokeDasharray="3 3" /><path d="M12 8v8M8 12h8" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 00-2.8 0L6 21" /></>,
  file: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></>,
  linkedin: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 010 20 15 15 0 010-20z" /></>,
  link: <path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7" />,
  terminal: <><path d="m4 17 6-6-6-6M12 19h8" /></>,
  code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  youtube: <><path d="M2.5 17a24 24 0 010-10 2 2 0 011.4-1.4 49.6 49.6 0 0116.2 0A2 2 0 0121.5 7a24 24 0 010 10 2 2 0 01-1.4 1.4 49.6 49.6 0 01-16.2 0A2 2 0 012.5 17" /><path d="m10 15 5-3-5-3z" /></>,
  facebook: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
  instagram: <><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.4A4 4 0 1112.6 8 4 4 0 0116 11.4zM17.5 6.5h.01" /></>,
  send: <path d="m22 2-7 20-4-9-9-4zM22 2 11 13" />,
  twitter: <path d="M4 4l16 16M20 4 4 20" />,
  book: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></>,
  phone: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />,
};

export default function Icon({ name, size = 16, className = '', label }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`flex-none ${className}`} {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true, focusable: 'false' })}>
      {ICONS[name] || ICONS.external}
    </svg>
  );
}
