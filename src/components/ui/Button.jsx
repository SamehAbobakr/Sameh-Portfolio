const VARIANTS = {
  primary: 'btn-grad',
  outline: 'btn-outline',
  ghost: 'btn-outline !bg-transparent !border-transparent text-muted hover:!text-ink',
};
const BASE = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold';

// `disabled` renders a non-interactive element for pages not built yet.
export default function Button({ as: Tag = 'button', variant = 'primary', className = '', disabled, badge, children, ...props }) {
  if (disabled && badge) {
    return (
      <span aria-disabled="true" className={`${BASE} cursor-not-allowed border border-dashed border-line text-muted ${className}`}>
        {children}{badge && <span className="rounded-sm bg-line/60 px-1.5 py-0.5 text-xs">{badge}</span>}
      </span>
    );
  }
  return <Tag className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props}>{children}</Tag>;
}
