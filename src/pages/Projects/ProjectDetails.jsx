import { Link, useParams } from 'react-router-dom';
import PageHeader, { Page } from '../../components/common/PageHeader';
import DataState from '../../components/common/DataState';
import Button from '../../components/ui/Button';
import Tag from '../../components/ui/Tag';
import { getProject } from '../../services/api';
import { useQuery } from '../../hooks/useQuery';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { pick, fmtDate } from '../../utils/localized';

export default function ProjectDetails() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const state = useQuery(() => getProject(slug), [slug]);
  const p = state.data;
  return (
    <>
      <PageHeader eyebrow={p && t(`status.${p.status}`)} title={p ? pick(p, 'title', lang) : t('nav.projects')} intro={p && pick(p, 'description', lang)} />
      <Page>
        <DataState state={state} emptyText={t('state.notFound')}>
          {p && (
            <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
              <div className="space-y-8">
                {pick(p, 'objective', lang) && <section><h2 className="t-heading mb-3">{t('projects.objective')}</h2><p className="t-body">{pick(p, 'objective', lang)}</p></section>}
                {p.cover_url && <img src={p.cover_url} alt={pick(p, 'title', lang)} loading="lazy" className="w-full rounded-lg border border-line" />}
                <div className="grid gap-4 sm:grid-cols-2">{p.project_images?.map((im) => <img key={im.id} src={im.url} alt={pick(im, 'alt', lang)} loading="lazy" className="rounded-lg border border-line" />)}</div>
              </div>
              <aside className="card card--glass space-y-5 self-start p-5">
                <div className="flex flex-wrap gap-2">{p.technologies?.map((x) => <Tag key={x}>{x}</Tag>)}</div>
                {p.created_at && <p className="text-sm text-muted">{fmtDate(p.created_at, lang)}</p>}
                <div className="grid gap-2">
                  {p.github_url && <Button as="a" href={p.github_url} target="_blank" rel="noreferrer" variant="outline">GitHub</Button>}
                  {p.demo_url && <Button as="a" href={p.demo_url} target="_blank" rel="noreferrer">{t('projects.demo')}</Button>}
                  {p.docs_url && <Button as="a" href={p.docs_url} target="_blank" rel="noreferrer" variant="outline">{t('projects.docs')}</Button>}
                </div>
                <Link to="/projects" className="block text-sm text-primary">← {t('nav.projects')}</Link>
              </aside>
            </div>
          )}
        </DataState>
      </Page>
    </>
  );
}
