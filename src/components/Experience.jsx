import { ArrowUpRight } from 'lucide-react';
import { experiences } from '../data/portfolio';
import { assetUrl } from '../lib/utils';
import { Reveal, SectionHeading, Tag } from './ui';
import { useLanguage } from '../i18n';

const experienceGroups = [
  {
    id: 'professional',
    title: 'Professional internships',
    description: 'Software, IoT, and technical support roles.',
    label: 'Professional internship',
  },
  {
    id: 'community',
    title: 'Leadership & community',
    description: 'IEEE RAS IIT SBC and Scouts.',
    label: 'Associative experience',
  },
];

export default function Experience() {
  const { t } = useLanguage();
  return <section id="experience" className="section section--tinted" aria-labelledby="experience-title">
    <div className="container">
      <Reveal><SectionHeading number="02" eyebrow="EXPERIENCE" title={<span id="experience-title">{t('Engineering in practice.')}</span>} description={t('Hands-on work across software, connected devices, and the places where they meet.')} /></Reveal>
      <div className="experience-groups">
        {experienceGroups.map(group => {
          const groupItems = experiences.filter(item => item.label === group.label);
          if (!groupItems.length) return null;

          return <section className={`experience-group experience-group--${group.id}`} key={group.id} aria-labelledby={`experience-${group.id}`}>
            <div className="experience-group-heading">
              <div><h3 id={`experience-${group.id}`}>{t(group.title)}</h3><p>{t(group.description)}</p></div>
              <span className="mono">{String(groupItems.length).padStart(2, '0')} {t('ROLES')}</span>
            </div>
            <div className="experience-cards">
              {groupItems.map((item, index) => {
                const featured = group.id === 'professional' && item.company === 'BlueBox Labs';
                return <Reveal key={`${item.company}-${item.role}`} className={`experience-card${featured ? ' experience-card--featured' : ''}`} delay={(index % 4) * 45}>
                  <div className="experience-card-top"><span className="mono">{t(item.period)}</span><span className="experience-card-index">{String(index + 1).padStart(2, '0')}</span></div>
                  <div className="experience-organization"><h4>{item.company}</h4>{item.logo && <img src={assetUrl(item.logo)} alt={`${item.company} logo`} width="112" height="60" loading="lazy" />}</div>
                  <p className="experience-card-role">{t(item.role)}</p>
                  <p className="experience-card-description">{t(item.description)}</p>
                  {item.points.length > 0 && <ul>{item.points.map(point => <li key={point}>{t(point)}</li>)}</ul>}
                  <div className="tags">{item.tags.map(tag => <Tag key={tag}>{t(tag)}</Tag>)}</div>
                  {featured && <a href="#projects" className="text-link">{t('Explore the project')} <ArrowUpRight size={15} aria-hidden="true" /></a>}
                </Reveal>;
              })}
            </div>
          </section>;
        })}
      </div>
    </div>
  </section>;
}
