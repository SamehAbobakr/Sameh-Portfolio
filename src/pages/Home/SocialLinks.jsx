import Icon from '../../components/ui/Icon';
import { listSocials } from '../../services/api';
import { useQuery } from '../../hooks/useQuery';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { platformIcon, platformKey, safeUrl } from '../../utils/links';

// "Find me online": one compact card per row of `social_links`. Shows the platform name and a short
// description, never the raw URL. Hidden while loading, on error, or when there is nothing real to show.
export default function SocialLinks() {
  const { t } = useLanguage();
  const { data } = useQuery(listSocials);
  const links = (data || [])
    .map((s) => ({ ...s, href: safeUrl(s.url), name: (s.platform || '').trim() }))
    .filter((s) => s.href && s.name);
  if (!links.length) return null;

  return (
    <section aria-labelledby="home-links" className="mx-auto max-w-7xl px-5 pb-[var(--space-section)]">
      <div className="mb-4">
        <h2 id="home-links" className="t-heading text-2xl">{t('social.title')}</h2>
        <p className="t-card-text mt-1">{t('social.intro')}</p>
      </div>
      <ul className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(min(100%,15rem),1fr))]">
        {links.map((s) => {
          const key = platformKey(s.name, s.href);
          const desc = key ? t(`social.desc.${key}`) : '';
          const external = !s.href.startsWith('mailto:');
          return (
            <li key={s.id}>
              <a href={s.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="card card--interactive group flex min-h-[4.25rem] items-center gap-3 p-3">
                <span aria-hidden="true" className="grid h-11 w-11 flex-none place-items-center rounded-md bg-primary/10 text-primary transition-colors duration-base group-hover:bg-primary group-hover:text-primary-ink">
                  <Icon name={platformIcon(s.name, s.href)} size={22} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold"><bdi>{s.name}</bdi></span>
                  {desc && !desc.startsWith('social.') && <span className="block text-xs text-muted">{desc}</span>}
                </span>
                {external && <><Icon name="external" size={15} className="text-muted transition-colors duration-base group-hover:text-primary rtl:-scale-x-100" /><span className="sr-only">{t('ui.opensNew')}</span></>}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
