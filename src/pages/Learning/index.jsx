import { useMemo, useState } from 'react';
import { Page } from '../../components/common/PageHeader';
import DataState from '../../components/common/DataState';
import Icon from '../../components/ui/Icon';
import { ActionButton } from '../../components/ui/ExtLink';
import ViewToggle from '../../components/ui/ViewToggle';
import LearningCard from './LearningCard';
import { STATUSES, ICON, NODE } from './status';
import { listLearning } from '../../services/api';
import { useQuery } from '../../hooks/useQuery';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { pick } from '../../utils/localized';

// Known types keep this order in the filter; any other type found in the data is added after them.
const CATEGORY_ORDER = ['course', 'book', 'podcast', 'article', 'lab', 'other'];
const RAIL = { completed: 'border-secondary/50', in_progress: 'border-primary/50', planned: 'border-dashed border-line' };
const COLS = { 1: '', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3' };
const VIEWS = [{ value: 'cards', icon: 'grid' }, { value: 'list', icon: 'list' }];
const sel = 'field min-h-10 rounded-xl px-3 text-sm';

// One button per status plus "Show all". The selected one is filled/outlined so the state is obvious.
function FilterButton({ active, tone, icon, count, label, onClick }) {
  const look = active
    ? (tone === 'all' ? 'border-transparent bg-grad text-primary-ink shadow-glow' : 'border-primary bg-primary/15 ring-1 ring-primary shadow-glow')
    : 'border-line bg-surface hover:border-primary';
  return (
    <button type="button" aria-pressed={active} onClick={onClick}
      className={`flex min-h-[4.25rem] flex-col items-center justify-center gap-0.5 rounded-lg border px-2 py-2 text-center transition-colors duration-base ${look}`}>
      <span className={`flex items-center gap-1.5 font-display text-2xl font-bold ${active && tone === 'all' ? '' : 'text-primary'}`}>
        <Icon name={icon} size={18} />{count}
      </span>
      <span className={`text-xs font-medium ${active && tone === 'all' ? 'text-primary-ink' : 'text-muted'}`}>{label}</span>
    </button>
  );
}

function EmptyState({ icon, text, action }) {
  return (
    <div className="reveal flex flex-col items-center gap-3 rounded-lg border border-dashed border-line bg-surface/50 px-6 py-12 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-muted"><Icon name={icon} size={22} /></span>
      <p className="max-w-sm text-muted">{text}</p>
      {action}
    </div>
  );
}

export default function Learning() {
  const { t, lang } = useLanguage();
  const state = useQuery(listLearning);
  const [status, setStatus] = useState(''); // '' = all three groups side by side
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('recent');
  const [view, setView] = useState('cards'); // display only: filters and data above never depend on it

  const all = state.data || [];
  // The type filter lists only the types that actually exist in the database rows.
  const categories = useMemo(() => {
    const found = [...new Set((state.data || []).map((r) => r.category).filter(Boolean))];
    const rank = (c) => (CATEGORY_ORDER.includes(c) ? CATEGORY_ORDER.indexOf(c) : CATEGORY_ORDER.length);
    return found.sort((a, b) => rank(a) - rank(b));
  }, [state.data]);
  const catLabel = (c) => { const key = `learning.cat.${c}`; const l = t(key); return l === key ? c : l; }; // untranslated type: show it as stored
  // Category + sort apply first; the status filter only chooses which groups are shown, so they never conflict.
  const grouped = useMemo(() => {
    const rows = all.filter((r) => !category || r.category === category);
    rows.sort((a, b) => sort === 'title'
      ? pick(a, 'title', lang).localeCompare(pick(b, 'title', lang))
      : (b.started_on || b.created_at).localeCompare(a.started_on || a.created_at));
    return Object.fromEntries(STATUSES.map((s) => [s, rows.filter((r) => r.status === s)]));
  }, [all, category, sort, lang]);
  const total = STATUSES.reduce((n, s) => n + grouped[s].length, 0);
  const shown = STATUSES.filter((s) => !status || s === status);
  const single = shown.length === 1;
  const list = view === 'list';
  const showAllBtn = <ActionButton variant="soft" icon="grid" label={t('learning.showAll')} onClick={() => setStatus('')} />;
  const liveText = `${t('learning.showing')}: ${status ? t(`learning.section.${status}`) : t('learning.showAll')} — ${status ? grouped[status].length : total} ${t('learning.items')}`;

  return (
    <Page>
      <header className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <div aria-hidden="true" className="page-head__mark" />
          <p className="t-eyebrow">{t('learning.eyebrow')}</p>
          <h1 className="t-display">{t('nav.learning')}</h1>
          <p className="t-lead">{t('learning.intro')}</p>
        </div>
        <div role="group" aria-label={t('learning.filterBy')} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <FilterButton tone="all" icon="grid" active={status === ''} count={total} label={t('learning.showAll')} onClick={() => setStatus('')} />
          {STATUSES.map((s) => (
            <FilterButton key={s} icon={ICON[s]} active={status === s} count={grouped[s].length} label={t(`learning.section.${s}`)} onClick={() => setStatus(s)} />
          ))}
        </div>
      </header>
      <DataState state={state}>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <select aria-label={t('learning.category')} className={sel} value={category} onChange={(e) => setCategory(e.target.value)}><option value="">{t('learning.allCategories')}</option>{categories.map((c) => <option key={c} value={c}>{catLabel(c)}</option>)}</select>
          <select aria-label={t('learning.sort')} className={sel} value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">{t('learning.sortRecent')}</option><option value="title">{t('learning.sortTitle')}</option></select>
          <ViewToggle className="ms-auto" label={t('learning.view.label')} value={view} onChange={setView} options={VIEWS.map((v) => ({ ...v, label: t(`learning.view.${v.value}`) }))} />
        </div>
        <p role="status" className="sr-only">{liveText}</p>

        {total === 0 && category ? (
          <EmptyState icon="grid" text={t('state.noMatch')} action={<ActionButton variant="soft" label={t('learning.noMatchReset')} onClick={() => setCategory('')} />} />
        ) : (
          // Changing `status` or the view remounts the grid, which replays the soft entrance animation. The list view is always one column.
          <div key={`${view}-${status || 'all'}`} className={`grid items-start gap-x-8 gap-y-10 ${list ? '' : COLS[shown.length]}`}>
            {shown.map((s) => (
              <section key={s} aria-labelledby={`l-${s}`} className="min-w-0">
                <h2 id={`l-${s}`} className="mb-4 flex items-center gap-3 text-lg font-bold">
                  <span aria-hidden="true" className={`grid h-7 w-7 place-items-center rounded-full ${NODE[s]}`}><Icon name={ICON[s]} size={16} /></span>
                  {t(`learning.section.${s}`)}
                  <span className="rounded-full bg-line/60 px-2 py-0.5 text-xs font-medium text-muted">{grouped[s].length}</span>
                </h2>
                {grouped[s].length === 0
                  ? (single
                    ? <EmptyState icon={ICON[s]} text={t(`learning.empty.${s}`)} action={showAllBtn} />
                    : <p className="rounded-lg border border-dashed border-line p-5 text-sm text-muted">{t(`learning.empty.${s}`)}</p>)
                  : list
                    // List view: compact rows in one bordered panel per group, always full width.
                    ? <ul className="divide-y divide-line card overflow-hidden">
                        {grouped[s].map((r) => <li key={r.id}><LearningCard item={r} variant="row" /></li>)}
                      </ul>
                    : single
                      // One group on its own: use the full width as a card grid instead of a narrow timeline.
                      ? <ol className="grid items-start gap-3 md:grid-cols-2 xl:grid-cols-3">
                          {grouped[s].map((r) => <li key={r.id}><LearningCard item={r} /></li>)}
                        </ol>
                      : <ol className={`ms-3.5 space-y-3 border-s-2 ps-5 ${RAIL[s]}`}>
                          {grouped[s].map((r) => <li key={r.id} className="relative"><span aria-hidden="true" className={`absolute top-6 -start-[27px] h-2.5 w-2.5 rounded-full ${s === 'planned' ? 'border border-line bg-bg' : s === 'completed' ? 'bg-secondary' : 'bg-primary'}`} /><LearningCard item={r} /></li>)}
                        </ol>}
              </section>
            ))}
          </div>
        )}
      </DataState>
    </Page>
  );
}
