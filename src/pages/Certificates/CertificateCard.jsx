import { useEffect, useRef, useState } from 'react';
import Icon from '../../components/ui/Icon';
import ExtLink, { ActionButton } from '../../components/ui/ExtLink';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { pick, fmtDate } from '../../utils/localized';
import { safeUrl } from '../../utils/links';

export const isPdf = (u) => /\.pdf($|[?#])/i.test(u || '');
export const pdfSrc = (u) => `${u}${u.includes('#') ? '&' : '#'}page=1&view=FitH&toolbar=0&navpanes=0`;

// Calm placeholder used when there is no usable image or file (never a fake certificate).
export function CertPlaceholder({ icon = 'cert', title, hint }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-muted">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-dashed border-line bg-surface"><Icon name={icon} size={22} /></span>
      <p className="text-sm font-medium text-ink">{title}</p>
      {hint && <p className="text-xs">{hint}</p>}
    </div>
  );
}

// Mounts children only once the element is near the viewport, so a page with many PDFs stays light.
function LazyMount({ children, fallback }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(typeof IntersectionObserver === 'undefined');
  useEffect(() => {
    if (seen || !ref.current) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '200px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return <div ref={ref} className="h-full w-full">{seen ? children : fallback}</div>;
}

export default function CertificateCard({ cert: c, onOpen }) {
  const { t, lang } = useLanguage();
  const name = pick(c, 'name', lang);
  const file = safeUrl(c.file_url);
  const pdf = isPdf(file);
  const [broken, setBroken] = useState(false);
  const showImage = file && !pdf && !broken;
  const date = fmtDate(c.issued_on, lang);
  const relatedSkills = Array.isArray(c.related_skills)
  ? c.related_skills
  : [];
  const isFeatured = c.is_featured === true;

  const pdfFallback = <CertPlaceholder icon="file" title={t('certs.pdf')} hint={t('certs.pdfHint')} />;
  let preview;
  if (showImage) {
    preview = <img src={file} alt="" loading="lazy" decoding="async" onError={() => setBroken(true)} className="h-full w-full rounded-sm bg-white object-contain shadow-md ring-1 ring-black/5" />;
  } else if (file && pdf) {
    preview = (
      <LazyMount fallback={pdfFallback}>
        <object data={pdfSrc(file)} type="application/pdf" aria-hidden="true" tabIndex={-1} className="pointer-events-none h-full w-full rounded-sm border-0 bg-transparent">{pdfFallback}</object>
      </LazyMount>
    );
  } else {
    preview = <CertPlaceholder title={file ? t('certs.imgFailed') : t('certs.noFile')} hint={file ? t('certs.openHint') : undefined} />;
  }
const frame = `relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border-b px-3 pb-3 pt-4 ${
  isFeatured
    ? 'border-blue-500/30 bg-blue-500/10'
    : 'border-line bg-line/30'
}`;
return (
  <article
    className={`reveal group relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-base hover:-translate-y-0.5 hover:shadow-glow ${
      isFeatured
        ? 'border-primary/70 bg-surface shadow-glow'
        : 'border-line bg-surface hover:border-primary/60'
    }`}
  >
    {isFeatured && (
      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-grad" />
    )}  

{file ? (
        <button type="button" onClick={onOpen} aria-label={`${t('certs.zoom')}: ${name}`} className={`${frame} cursor-zoom-in focus-visible:outline-offset-[-3px]`}>
          {preview}
          <span aria-hidden="true" className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 rounded-md bg-ink/80 px-2.5 py-1 text-xs font-medium text-bg opacity-90 transition-opacity duration-base md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
            <Icon name="zoom" size={14} />{t('certs.zoom')}
          </span>
        </button>
      ) : <div className={frame}>{preview}</div>}

      <div className="flex flex-1 flex-col gap-1 p-5">
      <h2 dir="auto" className="t-card-title flex items-center gap-2">
        {name}
        {isFeatured && (
          <Icon name="star" size={16} className="shrink-0 text-primary" />
        )}
      </h2>
        <p className="t-card-text"><bdi>{c.issuer}</bdi>{date && <span> · {date}</span>}</p>
        {c.credential_id && <p className="text-xs text-muted">{t('certs.id')}: <bdi dir="ltr" className="t-term">{c.credential_id}</bdi></p>}
        {relatedSkills.length > 0 && (
  <div className="mt-3 flex flex-wrap gap-2">
    {relatedSkills.map((skill) => (
      <span
        key={skill}
        className="rounded-full border border-line bg-bg px-3 py-1 text-xs font-medium text-muted"
      >
        {skill}
      </span>
    ))}
  </div>
)}
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
{file && (
  <ActionButton
    icon="zoom"
    variant="solid"
    label={t('certs.view')}
    onClick={onOpen}
    className="w-full justify-center"
  />
)}          <ExtLink href={c.verify_url} kind="verify" label={t('certs.verify')} />
        </div>
      </div>
    </article>
  );
}
