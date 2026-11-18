import { useEffect, useRef, useState } from 'react';
import Icon from '../../components/ui/Icon';
import { CertPlaceholder, isPdf, pdfSrc } from './CertificateCard';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { pick, fmtDate } from '../../utils/localized';
import { safeUrl } from '../../utils/links';

const tool = 'grid h-10 w-10 place-items-center rounded-md bg-white/10 text-white transition-colors duration-base hover:bg-white/20';
const pill = 'inline-flex min-h-9 items-center gap-1.5 rounded-md border border-white/30 px-3 text-sm font-medium text-white transition-colors duration-base hover:bg-white/10';

// Full-size certificate viewer on a native <dialog>: focus trap, Esc and an inert page behind it come for free.
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [broken, setBroken] = useState(false);
  const c = items[index];
  const file = safeUrl(c.file_url);
  const pdf = isPdf(file);
  const name = pick(c, 'name', lang);
  const date = fmtDate(c.issued_on, lang);
  const rtl = lang === 'ar';
  const many = items.length > 1;

  // Open modally, lock page scroll, and give focus back to the opener when closed.
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      if (dialog.open) dialog.close();
      if (opener && opener.isConnected) opener.focus();
    };
  }, []);
  useEffect(() => { setZoomed(false); setBroken(false); }, [index]);

  const go = (step) => onNavigate((index + step + items.length) % items.length);
  const onKeyDown = (e) => {
    if (!many) return;
    // In RTL the "next" side is the left one.
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(rtl ? 1 : -1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(rtl ? -1 : 1); }
  };
  const Prev = rtl ? 'chevronR' : 'chevronL';
  const Next = rtl ? 'chevronL' : 'chevronR';

  return (
    <dialog ref={ref} aria-labelledby="cert-title" onCancel={(e) => { e.preventDefault(); onClose(); }} onKeyDown={onKeyDown}
      onClick={(e) => { if (!e.target.closest('[data-keep]')) onClose(); }}
      className="lightbox fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white">
      <div className="flex h-full flex-col">
        <div data-keep className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <h2 id="cert-title" dir="auto" className="text-base font-semibold sm:text-lg">{name}</h2>
            <p className="text-sm text-white/70"><bdi>{c.issuer}</bdi>{date && ` · ${date}`}</p>
          </div>
          {many && <span dir="ltr" className="rounded-md bg-white/10 px-2.5 py-1 text-xs tabular-nums text-white/80">{index + 1} / {items.length}</span>}
          {!pdf && !broken && (
            <button type="button" onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed} aria-label={zoomed ? t('certs.zoomOut') : t('certs.zoom')} title={zoomed ? t('certs.zoomOut') : t('certs.zoom')} className={tool}>
              <Icon name={zoomed ? 'zoomOut' : 'zoom'} size={20} />
            </button>
          )}
          <button type="button" onClick={onClose} aria-label={t('certs.close')} title={t('certs.close')} className={tool}><Icon name="close" size={20} /></button>
        </div>

        <div className={`relative flex min-h-0 flex-1 justify-center px-4 ${zoomed ? 'overflow-auto' : 'items-center'}`}>
          {many && <button data-keep type="button" onClick={() => go(-1)} aria-label={t('certs.prev')} className={`${tool} hidden sm:grid absolute start-3 top-1/2 z-10 -translate-y-1/2 bg-black/40`}><Icon name={Prev} size={22} /></button>}
          {many && <button data-keep type="button" onClick={() => go(1)} aria-label={t('certs.next')} className={`${tool} hidden sm:grid absolute end-3 top-1/2 z-10 -translate-y-1/2 bg-black/40`}><Icon name={Next} size={22} /></button>}
          {pdf ? (
            <object data-keep data={pdfSrc(file)} type="application/pdf" aria-label={name} className="h-full w-full max-w-5xl rounded-md bg-white">
              <div className="grid h-full place-items-center bg-surface text-ink"><CertPlaceholder icon="file" title={t('certs.pdf')} hint={t('certs.pdfHint')} /></div>
            </object>
          ) : broken ? (
            <div data-keep className="grid w-full max-w-xl place-items-center self-center rounded-lg bg-surface text-ink"><CertPlaceholder title={t('certs.imgFailed')} hint={t('certs.openHint')} /></div>
          ) : (
            <img data-keep src={file} alt={name} onError={() => setBroken(true)} onClick={() => setZoomed(!zoomed)}
              className={`rounded-md bg-white shadow-2xl ${zoomed ? 'm-auto h-auto w-[220%] max-w-none cursor-zoom-out sm:w-[160%]' : 'max-h-full max-w-full cursor-zoom-in object-contain'}`} />
          )}
        </div>

        <div data-keep className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-3">
          {many && <button type="button" onClick={() => go(-1)} aria-label={t('certs.prev')} className={`${tool} sm:hidden`}><Icon name={Prev} size={20} /></button>}
          <a href={file} target="_blank" rel="noopener noreferrer" className={pill}><Icon name="external" size={15} />{t('certs.openFile')}</a>
          {safeUrl(c.verify_url) && <a href={safeUrl(c.verify_url)} target="_blank" rel="noopener noreferrer" className={pill}><Icon name="verify" size={15} />{t('certs.verify')}</a>}
          {many && <button type="button" onClick={() => go(1)} aria-label={t('certs.next')} className={`${tool} sm:hidden`}><Icon name={Next} size={20} /></button>}
        </div>
      </div>
    </dialog>
  );
}
