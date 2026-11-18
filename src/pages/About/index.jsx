import PageHeader, { Page } from '../../components/common/PageHeader';
import DataState from '../../components/common/DataState';
import { getProfile } from '../../services/api';
import { useQuery } from '../../hooks/useQuery';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { pick } from '../../utils/localized';

const BLOCKS = ['bio', 'education', 'direction', 'goals'];

export default function About() {
  const { t, lang } = useLanguage();
  const state = useQuery(getProfile);
  const p = state.data;
  return (
    <>
      <PageHeader title={t('nav.about')} intro={p && pick(p, 'headline', lang)} />
      <Page>
        <DataState state={state}>
          <div className="grid gap-5 md:grid-cols-2">
          {BLOCKS.filter((b) => p && pick(p, b, lang)).map((b) => (
            <section key={b} className="reveal t-panel">
              <h2 className="t-heading">{t(`about.${b}`)}</h2>
              <p className="t-body is-prewrap mt-4">{pick(p, b, lang)}</p>
            </section>
          ))}
          </div>
        </DataState>
      </Page>
    </>
  );
}
