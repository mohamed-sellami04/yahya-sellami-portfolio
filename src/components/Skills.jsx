import { skillGroups } from '../data/portfolio';
import { Reveal, SectionHeading, Icon } from './ui';
import { useLanguage } from '../i18n';

export default function Skills() {
  const { t } = useLanguage();
  return <section id="skills" className="section" aria-labelledby="skills-title"><div className="container">
    <Reveal><SectionHeading number="03" eyebrow="TECHNICAL TOOLKIT" title={<span id="skills-title">{t('Different layers.')}<br /><span className="muted">{t('Connected expertise.')}</span></span>} description={t('The languages, frameworks, and tools I work with — from a microcontroller to a deployed application.')} /></Reveal>
    <div className="skills-grid">{skillGroups.map((group, i) => <Reveal className={`skill-card ${group.icon === 'ShieldCheck' ? 'skill-card--wide' : ''}`} key={group.title} delay={(i % 3) * 45}><div className="skill-card-top"><Icon name={group.icon} size={25} /><span className="mono">{group.number}</span></div><h3>{t(group.title)}</h3><ul>{group.skills.map(skill => <li key={skill}>{t(skill)}</li>)}</ul></Reveal>)}</div>
  </div></section>;
}
