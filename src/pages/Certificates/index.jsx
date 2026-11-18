import { useMemo, useState } from 'react';
import PageHeader, { Page } from '../../components/common/PageHeader';
import DataState from '../../components/common/DataState';
import CertificateCard from './CertificateCard';
import Lightbox from './Lightbox';
import { listCertificates } from '../../services/api';
import { useQuery } from '../../hooks/useQuery';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { safeUrl } from '../../utils/links';

export default function Certificates() {
  const { t } = useLanguage();
  const state = useQuery(listCertificates);
  const [openId, setOpenId] = useState(null);

  // Only certificates that have a file can be opened full size; prev/next walks through those.
  const viewable = useMemo(() => (state.data || []).filter((c) => safeUrl(c.file_url)), [state.data]);
  const index = viewable.findIndex((c) => c.id === openId);

  return (
    <>
      <PageHeader title={t('nav.certificates')} intro={t('certs.intro')} />
      <Page>
        <DataState state={state} emptyText={t('certs.empty')}>
          <ul className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))]">
            {state.data?.map((c) => (
              <li key={c.id}><CertificateCard cert={c} onOpen={() => setOpenId(c.id)} /></li>
            ))}
          </ul>
        </DataState>
        {index >= 0 && <Lightbox items={viewable} index={index} onClose={() => setOpenId(null)} onNavigate={(i) => setOpenId(viewable[i].id)} />}
      </Page>
    </>
  );
}
