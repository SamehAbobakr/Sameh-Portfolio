import { useState } from 'react';
import PageHeader, { Page } from '../../components/common/PageHeader';
import Button from '../../components/ui/Button';
import ExtLink from '../../components/ui/ExtLink';
import { sendMessage, listSocials, NotConfiguredError } from '../../services/api';
import { useQuery } from '../../hooks/useQuery';
import { useLanguage } from '../../app/providers/LanguageProvider';
import { platformIcon } from '../../utils/links';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const field = 'field w-full min-h-11 rounded-xl px-3 py-2';
const EMPTY = { name: '', email: '', message: '', website: '' }; // `website` = honeypot

function validate({ name, email, message }) {
  const e = {};
  if (name.trim().length < 2) e.name = true;
  if (!EMAIL_RE.test(email)) e.email = true;
  if (message.trim().length < 10) e.message = true;
  return e;
}

export default function Contact() {
  const { t } = useLanguage();
  const socials = useQuery(listSocials);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | notConfigured
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length || status === 'sending') return;
    if (form.website) return setStatus('sent'); // bots: store nothing
    setStatus('sending');
    try {
      await sendMessage({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      setStatus(err instanceof NotConfiguredError ? 'notConfigured' : 'error');
    }
  }

  const Err = ({ k }) => (errors[k] ? <span role="alert" className="text-sm text-danger">{t(`contact.err.${k}`)}</span> : null);
  return (
    <>
      <PageHeader title={t('nav.contact')} intro={t('contact.intro')} />
      <Page>
        <div className="grid gap-12 md:grid-cols-[1fr_16rem]">
          <form onSubmit={submit} noValidate className="card card--glass grid gap-5 p-6">
            {['name', 'email'].map((k) => (
              <label key={k} className="grid gap-1.5 text-sm font-medium">{t(`contact.${k}`)}
                <input className={field} type={k === 'email' ? 'email' : 'text'} value={form[k]} onChange={set(k)} maxLength={k === 'email' ? 200 : 100} aria-invalid={!!errors[k]} autoComplete={k} dir={k === 'email' ? 'ltr' : undefined} />
                <Err k={k} />
              </label>
            ))}
            <label className="grid gap-1.5 text-sm font-medium">{t('contact.message')}
              <textarea className={field} rows="6" value={form.message} onChange={set('message')} maxLength={4000} aria-invalid={!!errors.message} />
              <Err k="message" />
            </label>
            <input name="website" value={form.website} onChange={set('website')} tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" />
            <div><Button type="submit" className={status === 'sending' ? 'opacity-60' : ''}>{status === 'sending' ? t('contact.sending') : t('contact.send')}</Button></div>
            <p role="status" className={`text-sm ${status === 'sent' ? 'text-secondary' : 'text-danger'}`}>
              {status === 'sent' && t('contact.sent')}{status === 'error' && t('contact.failed')}{status === 'notConfigured' && t('state.notConfigured')}
            </p>
          </form>
          <aside className="card card--glass self-start p-6">
            <h2 className="t-heading mb-4">{t('contact.links')}</h2>
            <ul className="flex flex-wrap gap-2 text-sm">
              {(socials.data || []).map((s) => <li key={s.id}><ExtLink href={s.url} kind={platformIcon(s.platform, s.url)} label={s.platform} /></li>)}
              {!socials.loading && !(socials.data || []).length && <li className="text-muted">{t('state.empty')}</li>}
            </ul>
          </aside>
        </div>
      </Page>
    </>
  );
}
