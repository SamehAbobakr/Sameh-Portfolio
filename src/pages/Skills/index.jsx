import { useMemo, useState } from 'react';
import PageHeader, { Page } from '../../components/common/PageHeader';
import DataState from '../../components/common/DataState';
import CategoryNav from './CategoryNav';
import LevelBand, { LEVELS } from './LevelBand';
import { listSkills } from '../../services/api';
import { useQuery } from '../../hooks/useQuery';
import { useLanguage } from '../../app/providers/LanguageProvider';

const CATS = ['cybersecurity', 'web', 'agri', 'tools'];

export default function Skills() {
  const { t } = useLanguage();
  const state = useQuery(listSkills);
  const [cat, setCat] = useState(''); // '' = every field

  const byCat = useMemo(() => Object.fromEntries(CATS.map((c) => [c, (state.data || []).filter((s) => s.category === c)])), [state.data]);
  const fields = CATS.filter((c) => byCat[c].length > 0);
  const visible = fields.includes(cat) ? [cat] : fields;
  const nav = [
    { key: '', label: t('skills.all'), count: fields.reduce((n, c) => n + byCat[c].length, 0) },
    ...fields.map((c) => ({ key: c, label: t(`skills.cat.${c}`), count: byCat[c].length })),
  ];

  return (
    <>
      <PageHeader title={t('nav.skills')} intro={t('skills.intro')} />
      <Page>
        <DataState state={state}>
          <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
            <CategoryNav label={t('skills.fields')} items={nav} value={fields.includes(cat) ? cat : ''} onChange={setCat} />
            {/* Changing the field remounts this block once, replaying a single soft entrance. */}
            <div key={cat || 'all'} className="reveal divide-y divide-line">
              {visible.map((c) => {
                // Skills are grouped by their existing level; ones without a level go last instead of being hidden.
                const bands = [
                  ...LEVELS.map((l) => ({ level: l, label: t(`skills.level.${l}`), skills: byCat[c].filter((s) => s.level === l) })),
                  { level: '', label: t('skills.noLevel'), skills: byCat[c].filter((s) => !LEVELS.includes(s.level)) },
                ].filter((b) => b.skills.length > 0);
                return (
                  <section key={c} aria-labelledby={`sk-${c}`} className="py-10 first:pt-0 last:pb-0">
                    <h2 id={`sk-${c}`} className="t-heading mb-5 !items-baseline text-2xl">
                      {t(`skills.cat.${c}`)}
                      <span className="text-sm font-medium text-muted">{byCat[c].length}</span>
                    </h2>
                    <div className="space-y-4">{bands.map((b) => <LevelBand key={b.level || 'none'} {...b} />)}</div>
                  </section>
                );
              })}
            </div>
          </div>
        </DataState>
      </Page>
    </>
  );
}
