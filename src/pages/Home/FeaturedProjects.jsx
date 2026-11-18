import { Link } from 'react-router-dom';
import ProjectCard from '../../components/common/ProjectCard';
import { listProjects } from '../../services/api';
import { useQuery } from '../../hooks/useQuery';
import { useLanguage } from '../../app/providers/LanguageProvider';

// Hidden entirely while loading, on error, or when there are no published projects.
export default function FeaturedProjects() {
  const { t } = useLanguage();
  const { data } = useQuery(listProjects);
  if (!data?.length) return null;
  const featured = data.filter((p) => p.is_featured);
  const shown = (featured.length ? featured : data).slice(0, 3);
  return (
    <section aria-labelledby="home-projects" className="mx-auto max-w-7xl px-5 pb-[var(--space-section)]">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 id="home-projects" className="t-heading text-2xl">{t('home.featured')}</h2>
        <Link to="/projects" className="btn-soft inline-flex min-h-9 items-center rounded-full px-4 text-sm font-medium">{t('home.viewAll')} →</Link>
      </div>
      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">{shown.map((p) => <ProjectCard key={p.id} project={p} />)}</div>
    </section>
  );
}
