import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../common/Logo';
import { ROUTES } from '../../config/routes';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { useTheme } from '../../app/providers/ThemeProvider';

const iconBtn = 'btn-outline grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold';

function NavItem({ route, label, soon, onClick }) {
  if (!route.enabled) {
    return (
      <span aria-disabled="true" className="flex cursor-not-allowed items-center gap-1.5 px-3 py-2 text-sm text-muted/70">
        {label}<span className="rounded-sm bg-line/60 px-1 text-[10px]">{soon}</span>
      </span>
    );
  }
  return (
    <NavLink to={route.path} end onClick={onClick}
      className={({ isActive }) => `relative px-3 py-2 text-sm font-medium transition-colors duration-base after:absolute after:inset-x-3 after:-bottom-[17px] after:h-0.5 after:rounded-full after:transition-opacity lg:after:block after:hidden ${isActive ? 'text-primary after:bg-primary after:opacity-100 after:shadow-[0_0_10px_rgb(var(--primary))]' : 'text-muted after:opacity-0 hover:text-ink'}`}>
      {label}
    </NavLink>
  );
}

export default function Header() {
  const { t, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const items = ROUTES.map((r) => <NavItem key={r.key} route={r} label={t(`nav.${r.key}`)} soon={t('ui.soon')} onClick={() => setOpen(false)} />);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo label={t('brand')} />
        <nav aria-label={t('ui.mainNav')} className="hidden items-center lg:flex">{items}</nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleLang} className={iconBtn}>{t('ui.switchLang')}</button>
          <button type="button" onClick={toggleTheme} aria-label={t('ui.switchTheme')} className={iconBtn}>{theme === 'dark' ? '☀' : '☾'}</button>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" className={`${iconBtn} lg:hidden`}>{t('ui.menu')}</button>
        </div>
      </div>
      {open && <nav id="mobile-nav" aria-label={t('ui.mainNav')} className="mx-auto grid max-w-7xl gap-1 border-t border-line px-5 py-3 lg:hidden">{items}</nav>}
    </header>
  );
}
