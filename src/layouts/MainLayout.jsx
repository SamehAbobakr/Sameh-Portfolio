import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import { useLanguage } from '../app/providers/LanguageProvider';

export default function MainLayout() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>{t('ui.skip')}</a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none"><div key={pathname} className="page-enter"><Outlet /></div></main>
      <Footer />
    </div>
  );
}
