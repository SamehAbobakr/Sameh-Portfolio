import { useId, useState } from 'react';
import Tag from '../../components/ui/Tag';
import Icon from '../../components/ui/Icon';
import ExtLink from '../../components/ui/ExtLink';
import { ICON, NODE } from './status';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { pick, fmtDate } from '../../utils/localized';

// One visual treatment per status so the three stages read differently at a glance.
const LOOK = {
  completed: { box: 'border-secondary/40 bg-surface/80', badge: 'bg-secondary/15 text-secondary', icon: '✓', accent: 'border-s-secondary' },
  in_progress: { box: 'border-primary/60 bg-surface shadow-glow', badge: 'bg-primary/10 text-primary', icon: '●', accent: 'border-s-primary' },
  planned: { box: 'border-dashed border-line bg-transparent', badge: 'bg-line/60 text-muted', icon: '○', accent: 'border-s-line' },
};

// variant="card": boxed card (grid / timeline). variant="row": compact line for the list view.
// Both expand to the same details panel, so no data is lost in either view.
export default function LearningCard({ item: r, variant = 'card' }) {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const row = variant === 'row';
  const status = LOOK[r.status] ? r.status : 'planned';
  const look = LOOK[status];
  const title = pick(r, 'title', lang);
  const description = pick(r, 'description', lang);
  const notes = pick(r, 'notes', lang);
  const dates = [fmtDate(r.started_on, lang), fmtDate(r.completed_on, lang)].filter(Boolean).join(' → ');
  const meta = [r.provider, dates].filter(Boolean).join(' · ');
  const hasMore = notes || r.related_skills?.length > 0 || r.url || description;
  const chevron = <span aria-hidden="true" className={`text-muted transition-transform duration-base ${open ? 'rotate-180' : ''} ${row ? '' : 'mt-1'}`}>▾</span>;

  const panel = (
    <div id={panelId} className={`grid transition-[grid-template-rows] duration-base ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] invisible'}`}>
      <div className="overflow-hidden">
        <div className={`space-y-3 border-t border-line px-4 pb-4 pt-3 text-sm ${row ? 'bg-bg/50' : ''}`}>
          {description && <p className="t-card-text">{description}</p>}
          {notes && <div><h3 className="t-subheading mb-1">{t('learning.notes')}</h3><p className="t-card-text">{notes}</p></div>}
          {r.related_skills?.length > 0 && <div><h3 className="t-subheading mb-1">{t('learning.relatedSkills')}</h3><div className="flex flex-wrap gap-2">{r.related_skills.map((x) => <Tag key={x}>{x}</Tag>)}</div></div>}
          {!hasMore && <p className="text-muted">{t('learning.noDetails')}</p>}
          <ExtLink href={r.url} kind={r.category === 'lab' ? 'demo' : 'doc'} label={t(`learning.open.${r.category}`)} />
        </div>
      </div>
    </div>
  );

  if (row) {
    return (
      <article className={`reveal border-s-[3px] ${look.accent}`}>
        <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}
          className="flex w-full items-center gap-3 px-4 py-3 text-start transition-colors duration-base hover:bg-primary/5">
          <span aria-hidden="true" className={`grid h-8 w-8 flex-none place-items-center rounded-full ${NODE[status]}`}><Icon name={ICON[status]} size={16} /></span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold leading-snug"><span className="sr-only">{t(`status.${status}`)}: </span>{title}</span>
            {description && !open && <span className="mt-0.5 line-clamp-1 text-sm text-muted">{description}</span>}
            {meta && <span className="mt-0.5 block text-xs text-muted">{meta}</span>}
          </span>
          <span className="flex-none"><Tag>{t(`learning.cat.${r.category}`)}</Tag></span>
          {chevron}
        </button>
        {panel}
      </article>
    );
  }

  return (
    <article className={`reveal rounded-lg border transition-all duration-base hover:-translate-y-0.5 ${look.box}`}>
      <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)} className="flex w-full items-start gap-3 p-4 text-start">
        <span className="min-w-0 flex-1">
          <span className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className={`rounded-sm px-2 py-0.5 text-xs font-semibold ${look.badge}`}><span aria-hidden="true">{look.icon} </span>{t(`status.${r.status}`)}</span>
            <Tag>{t(`learning.cat.${r.category}`)}</Tag>
          </span>
          <span className="t-card-title block">{title}</span>
          {description && !open && <span className="t-card-text mt-1 line-clamp-2 block">{description}</span>}
          {meta && <span className="mt-2 block text-xs text-muted">{meta}</span>}
        </span>
        {chevron}
      </button>
      {panel}
    </article>
  );
}
