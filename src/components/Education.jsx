import { ArrowUpRight, CalendarDays, CheckCircle2, Clock3, GraduationCap, MapPin } from 'lucide-react';
import { education } from '../data/portfolio';
import { assetUrl } from '../lib/utils';
import { Reveal, SectionHeading } from './ui';
import { useLanguage } from '../i18n';

export default function Education() {
  const { t } = useLanguage();
  return <section id="education" className="section education-section" aria-labelledby="education-title">
    <div className="container">
      <Reveal className="education-heading">
        <SectionHeading number="05" eyebrow="EDUCATION" title={<span id="education-title">{t('Always')}<br /><span className="muted">{t('building forward.')}</span></span>} />
        <p className="education-note">{t('A foundation in software.')}<br />{t('An ongoing commitment to learning.')}</p>
      </Reveal>

      <div className="education-list">
        {education.map((item, index) => <Reveal key={item.title} className="education-item" delay={index * 60}>
          <div className="education-rail" aria-hidden="true">
            <span className="education-marker">
              {item.logo
                ? <img className="education-logo" src={assetUrl(item.logo)} alt="" width="1472" height="838" loading="lazy" />
                : <GraduationCap size={29} strokeWidth={1.8} />}
            </span>
          </div>

          <article className="education-card">
            <div className="education-card-top">
              <h3>{t(item.title)}</h3>
              <span className={`education-status ${item.current ? 'is-current' : 'is-complete'}`}>
                {item.current ? <Clock3 size={13} aria-hidden="true" /> : <CheckCircle2 size={13} aria-hidden="true" />}
                {item.current ? t('In Progress') : t('Completed')}
              </span>
            </div>

            <p className="education-institution">{t(item.institution)}</p>

            <div className="education-meta">
              <span><CalendarDays size={14} aria-hidden="true" />{t(item.date)}</span>
              {item.location && <span><MapPin size={14} aria-hidden="true" />{t(item.location)}</span>}
            </div>

            <p className="education-description">{t(item.description)}</p>

            {item.topics?.length > 0 && <div className="education-topics" aria-label={t('Study areas')}>
              {item.topics.map((topic) => <span className="education-topic" key={topic}>{t(topic)}</span>)}
            </div>}
          </article>
        </Reveal>)}

        <a href="#contact" className="education-availability">{t('Available for full-time daytime work')} <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}
