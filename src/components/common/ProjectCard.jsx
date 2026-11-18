import { Link } from 'react-router-dom';
import Tag from '../ui/Tag';
import ExtLink from '../ui/ExtLink';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { pick } from '../../utils/localized';

// The whole card is clickable via the title link (stretched); GitHub/demo links sit above it.
export default function ProjectCard({ project: p }) {
  const { t, lang } = useLanguage();
  const title = pick(p, 'title', lang);
  const desc = pick(p, 'description', lang);
  const categoryLabel = {
  web_development: lang === 'ar' ? 'تطوير الويب' : 'Web Development',
};

const category = categoryLabel[p.category] || p.category;
  return (
    <article className="reveal group card card--glass card--interactive relative flex flex-col overflow-hidden">
      {p.cover_url
        ? <img src={p.cover_url} alt="" loading="lazy" className="aspect-[16/9] w-full border-b border-line object-cover" />
        : <div aria-hidden="true" className="grid aspect-[16/9] place-items-center border-b border-line bg-gradient-to-br from-primary/20 via-transparent to-accent/20 font-display text-5xl font-bold text-primary/50">S</div>}
      <div className="flex flex-1 flex-col gap-3 p-5">
<div className="flex flex-wrap items-center gap-2">
  <span className="tag w-fit !border-primary/40 !bg-primary/15 !font-semibold !text-primary">
    {t(`status.${p.status}`)}
  </span>

  {category && (
    <span className="tag w-fit !border-line !bg-bg/50 !text-muted">
      {category}
    </span>
  )}
</div>        <h2 className="t-card-title"><Link to={`/projects/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-primary">{title}</Link></h2>
        {desc && <p className="t-card-text line-clamp-3">{desc}</p>}
        {p.technologies?.length > 0 && <div className="flex flex-wrap gap-2">{p.technologies.map((x) => <Tag key={x}>{x}</Tag>)}</div>}
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2 pt-2">
          <ExtLink href={p.github_url} kind="github" label="GitHub" />
          <ExtLink href={p.demo_url} kind="demo" label={t('projects.demo')} />
          <span className="ms-auto text-sm font-medium text-primary group-hover:underline">{t('projects.explore')} →</span>
        </div>
      </div>
    </article>
  );
}
