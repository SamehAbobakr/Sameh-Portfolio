import PageHeader, { Page } from '../../components/common/PageHeader';
import DataState from '../../components/common/DataState';
import ProjectCard from '../../components/common/ProjectCard';
import { listProjects } from '../../services/api';
import { useQuery } from '../../hooks/useQuery';
import { useLanguage } from '../../app/providers/LanguageProvider';

export default function Projects() {
  const { t } = useLanguage();
  const state = useQuery(listProjects);
  return (
    <>
      <PageHeader title={t('nav.projects')} intro={t('projects.intro')} />
      <Page>
        <DataState state={state}>
          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">{state.data?.map((p) => <ProjectCard key={p.id} project={p} />)}</div>
        </DataState>
      </Page>
    </>
  );
}
