import Icon from './Icon';

// Segmented switch between two or more views of the same data (e.g. cards / list).
// options: [{ value, label, icon }]. The active option is filled; both stay visible so the choice is obvious.
export default function ViewToggle({ label, value, onChange, options, className = '' }) {
  return (
    <div role="group" aria-label={label} className={`inline-flex items-center gap-1 rounded-xl border border-line bg-surface/70 p-1 ${className}`}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button key={o.value} type="button" aria-pressed={active} onClick={() => onChange(o.value)}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors duration-base ${active ? 'bg-grad text-primary-ink shadow-glow' : 'text-muted hover:bg-primary/5 hover:text-ink'}`}>
            <Icon name={o.icon} size={16} />{o.label}
          </button>
        );
      })}
    </div>
  );
}
