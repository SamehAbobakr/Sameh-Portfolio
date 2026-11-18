import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { useLanguage } from '../../app/providers/LanguageProvider';

// Closing bar: the brand and the same links as the main navigation. No new content.
export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative mt-16 border-t border-line/80">
      <div aria-hidden="true" className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row">
        <p className="flex items-center gap-2.5 font-display text-sm font-semibold">
          <span aria-hidden="true" className="bg-grad grid h-7 w-7 place-items-center rounded-md text-sm font-bold text-primary-ink">S</span>
          {t('brand')}
        </p>
        <nav aria-label={t('ui.mainNav')}>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted">
            {ROUTES.filter((r) => r.enabled).map((r) => (
              <li key={r.key}><Link to={r.path} className="transition-colors duration-base hover:text-primary">{t(`nav.${r.key}`)}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
