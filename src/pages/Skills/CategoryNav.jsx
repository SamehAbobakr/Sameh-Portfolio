// Field switcher: a vertical rail on desktop, a horizontally scrollable row of pills on small screens.
// items: [{ key, label, count }]; key '' means "all fields".
export default function CategoryNav({ label, items, value, onChange }) {
  return (
    <nav aria-label={label} className="-mx-5 overflow-x-auto px-5 pb-1 lg:sticky lg:top-24 lg:mx-0 lg:self-start lg:overflow-visible lg:px-0 lg:pb-0">
      <ul className="flex gap-2 lg:flex-col">
        {items.map((i) => {
          const active = i.key === value;
          return (
            <li key={i.key || 'all'} className="flex-none lg:flex-auto">
              <button type="button" aria-pressed={active} onClick={() => onChange(i.key)}
                className={`flex w-full items-center justify-between gap-3 whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-start text-sm font-medium transition-colors duration-base ${active ? 'border-primary bg-primary/15 text-primary shadow-glow' : 'border-line bg-surface/60 text-muted hover:border-primary/70 hover:text-ink'}`}>
                {i.label}
                <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-primary/15' : 'bg-line/60'}`}>{i.count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
