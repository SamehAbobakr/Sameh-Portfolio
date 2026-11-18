import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import HeroVisual from './HeroVisual';
import { getRoute } from '../../config/routes';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { own } from '../../utils/localized';
import GradientWords from '../../components/common/GradientWords';

const ACTIONS = [
  { route: 'projects', label: 'hero.ctaProjects', variant: 'primary' },
  { route: 'learning', label: 'hero.ctaLearning', variant: 'outline' },
  { route: 'contact', label: 'hero.ctaContact', variant: 'ghost' },
];

export default function Hero({ profile }) {
  const { t, lang } = useLanguage();
  const areas = t('hero.areas');
  // Database value for the current language, else the translated default.
  const name = own(profile, 'full_name', lang) || t('hero.name');
  const intro = own(profile, 'bio', lang) || t('hero.intro');
  const avatarUrl = profile?.avatar_url || '';

  return (
    <section aria-labelledby="hero-title" className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-[var(--space-section)] lg:grid-cols-[1.15fr_1fr]">
      <div>
        <h1 id="hero-title" className="t-display !text-[clamp(2.75rem,6.5vw+.5rem,4.5rem)]"><GradientWords text={name} /></h1>
        <p className="mt-5 text-lg font-semibold text-ink/90 sm:text-xl">{areas.join(' | ')}</p>
        <p className="t-lead mt-6">{intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {ACTIONS.map(({ route, label, variant }) => {
            const r = getRoute(route);
            return r.enabled
              ? <Button key={route} as={Link} to={r.path} variant={variant}>{t(label)}</Button>
              : <Button key={route} disabled badge={t('ui.soon')}>{t(label)}</Button>;
          })}
        </div>
      </div>
<HeroVisual
  title={t('hero.focusTitle')}
  areas={areas}
  name={name}
  portraitAlt={t('hero.portraitAlt')}
  avatarUrl={avatarUrl}
/>    
</section>
  );
}
