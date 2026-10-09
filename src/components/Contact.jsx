import { useState } from 'react';
import { ArrowUpRight, Check, Copy, LoaderCircle, Mail, MapPin, Phone } from 'lucide-react';
import { profile } from '../data/portfolio';
import { buildMailto, formatInquiry, safeExternalUrl, validEmail } from '../lib/utils';
import { Button, Reveal, SocialLinks } from './ui';
import { useLanguage } from '../i18n';

const endpoint = safeExternalUrl(import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim());
const initialFields = { name: '', email: '', subject: '', message: '', companyWebsite: '' };

export default function Contact() {
  const { t } = useLanguage();
  const [fields, setFields] = useState(initialFields);
  const [state, setState] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [showDraft, setShowDraft] = useState(false);
  const hasEmail = validEmail(profile.email);
  const draftOnly = !endpoint && !hasEmail;
  const change = (e) => { setFields({ ...fields, [e.target.name]: e.target.value }); if (state !== 'loading') { setState('idle'); setFeedback(''); setShowDraft(false); } };

  const submit = async (e) => {
    e.preventDefault();
    if (fields.companyWebsite || state === 'loading') return;
    if (['name', 'email', 'subject', 'message'].some(key => !fields[key].trim())) { setState('error'); setFeedback('Please complete each field before continuing.'); return; }
    if (draftOnly) {
      try { await navigator.clipboard.writeText(formatInquiry(fields, profile.name)); setFeedback('Message copied. It has not been sent. Use the contact details on this page to send it.'); setState('success'); }
      catch { setShowDraft(true); setFeedback('Select and copy your message below. It has not been sent.'); setState('idle'); }
      return;
    }
    if (!endpoint) { window.location.href = buildMailto(profile.email, fields); setFeedback('Your email app has been requested. Review and send the draft there. Nothing is sent by this website.'); setState('success'); return; }
    setState('loading'); setFeedback('Sending…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const result = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: fields.name, email: fields.email, subject: fields.subject, message: fields.message, _gotcha: fields.companyWebsite }), signal: controller.signal });
      if (!result.ok) throw new Error('Delivery failed');
      setState('success'); setFeedback('Thank you. Your message has been submitted successfully.'); setFields(initialFields);
    } catch { setState('error'); setFeedback('Your message could not be sent. Please try again' + (hasEmail ? ' or use the email link.' : ' later.')); }
    finally { clearTimeout(timeout); }
  };

  return <section id="contact" className="section contact-section" aria-labelledby="contact-title">
    <div className="container contact-grid">
      <Reveal className="contact-copy">
        <p className="eyebrow"><span>06</span>{t('LET’S CONNECT')}</p>
        <h2 id="contact-title">{t('Let’s build')}<br />{t('something')} <span>{t('great.')}</span></h2>
        <p>{t('I’m open to opportunities in full-stack development, embedded systems, IoT, mobile development, and software testing.')}</p>
        <p className="contact-invitation">{t('Have a role or a project in mind?')}<br />{t('I’d love to hear about it.')}</p>
        <div className="contact-details">
          {hasEmail ? <a href={`mailto:${profile.email}`}><Mail size={19} aria-hidden="true" /><span>{profile.email}</span><ArrowUpRight size={17} aria-hidden="true" /></a> : <p><Mail size={19} aria-hidden="true" /><span>{t('Email details coming soon')}</span></p>}
          {profile.phone && <a href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}><Phone size={19} aria-hidden="true" /><span>{profile.phone}</span><ArrowUpRight size={17} aria-hidden="true" /></a>}
          <p><MapPin size={19} aria-hidden="true" /><span>{t(profile.location)}</span></p>
        </div>
        <SocialLinks labels />
        <div className="contact-availability"><span aria-hidden="true" />{t('Available for full-time daytime work · Evening studies')}</div>
      </Reveal>

      <Reveal className="contact-form-wrap" delay={70}>
        <form onSubmit={submit} className="contact-form">
          <div className="form-title"><h3>{t('Start a conversation')}</h3><span className="mono">{t('SAY HELLO')}</span></div>
          <div className="form-row">
            <label htmlFor="contact-name">{t('Name')}<input id="contact-name" name="name" autoComplete="name" disabled={state === 'loading'} value={fields.name} onChange={change} placeholder={t('Your name')} required maxLength={100} /></label>
            <label htmlFor="contact-email">{t('Email')}<input id="contact-email" name="email" type="email" autoComplete="email" disabled={state === 'loading'} value={fields.email} onChange={change} placeholder="you@company.com" required maxLength={200} /></label>
          </div>
          <label htmlFor="contact-subject">{t('Subject')}<input id="contact-subject" name="subject" disabled={state === 'loading'} value={fields.subject} onChange={change} placeholder={t('An opportunity, a project, an introduction…')} required maxLength={200} /></label>
          <label htmlFor="contact-message">{t('Message')}<textarea id="contact-message" name="message" disabled={state === 'loading'} value={fields.message} onChange={change} placeholder={t('Tell me a little about what you have in mind.')} required minLength={10} maxLength={5000} rows={5} /></label>
          <div className="honeypot" aria-hidden="true"><label>{t('Leave this empty')}<input name="companyWebsite" value={fields.companyWebsite} onChange={change} tabIndex={-1} autoComplete="off" /></label></div>
          <Button type="submit" className="form-submit" disabled={state === 'loading'}>
            {state === 'loading' ? <><LoaderCircle className="spinner" size={17} />{t('Sending…')}</> : draftOnly ? <>{t('Copy message')} <Copy size={17} aria-hidden="true" /></> : endpoint ? <>{t('Send message')} <ArrowUpRight size={18} aria-hidden="true" /></> : <>{t('Open email draft')} <ArrowUpRight size={18} aria-hidden="true" /></>}
          </Button>
          <p className="form-note">{t(draftOnly ? 'This only copies a message. It will not be sent; use the listed contact details to send it.' : endpoint ? 'Your details are used to respond to your inquiry. This form uses an external message delivery service.' : 'This opens your email app with a draft for you to review and send.')}</p>
          <div className={`form-feedback ${state}`} role="status" aria-live="polite">{feedback && <>{state === 'success' && <Check size={16} aria-hidden="true" />}<span>{t(feedback)}</span></>}</div>
          {showDraft && <label htmlFor="inquiry-draft">{t('Your message')}<textarea id="inquiry-draft" readOnly value={formatInquiry(fields, profile.name)} rows={7} onFocus={e => e.target.select()} /></label>}
        </form>
      </Reveal>
    </div>
  </section>;
}
