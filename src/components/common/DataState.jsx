import { NotConfiguredError } from '../../services/api';
import { useLanguage } from '../../app/providers/LanguageProvider';

const box = 'rounded-lg border border-dashed border-line bg-surface/50 p-10 text-center text-muted';

// Loading shows skeleton cards; error / empty show a clear message; otherwise children.
export default function DataState({ state, children, emptyText }) {
  const { t } = useLanguage();
  if (state.loading) {
    return (
      <div role="status" className="grid animate-pulse gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <span className="sr-only">{t('state.loading')}</span>
        {[0, 1, 2].map((i) => <div key={i} aria-hidden="true" className="h-40 rounded-lg bg-line/40" />)}
      </div>
    );
  }
  if (state.error) return <p role="alert" className={box}>{state.error instanceof NotConfiguredError ? t('state.notConfigured') : t('state.error')}</p>;
  const empty = Array.isArray(state.data) ? state.data.length === 0 : !state.data;
  if (empty) return <p className={box}>{emptyText || t('state.empty')}</p>;
  return children;
}
