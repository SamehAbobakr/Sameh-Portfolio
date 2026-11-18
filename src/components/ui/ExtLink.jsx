// Small action link: icon + purposeful label instead of a raw URL. Renders nothing without a usable href.
import Icon from './Icon';
import { safeUrl } from '../../utils/links';

export const STYLE = {
  solid: 'btn-grad',
  soft: 'btn-soft',
};
export const ACTION_BASE = 'inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium';

export default function ExtLink({ href, kind = 'external', label, variant = 'soft', className = '' }) {
  const url = safeUrl(href);
  if (!url) return null;
  const external = !url.startsWith('mailto:');
  return (
    <a href={url} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${ACTION_BASE} ${STYLE[variant]} ${className}`}>
      <Icon name={kind} size={15} />
      {label}
    </a>
  );
}

// Same look as ExtLink, for actions that run code (e.g. open the certificate viewer).
export function ActionButton({ icon, label, variant = 'soft', className = '', ...props }) {
  return (
    <button type="button" className={`${ACTION_BASE} ${STYLE[variant]} ${className}`} {...props}>
      {icon && <Icon name={icon} size={15} />}
      {label}
    </button>
  );
}
