import { skillGroups } from '../data/portfolio';
import { Reveal, SectionHeading, Icon } from './ui';

export default function Skills() {
  return <section id="skills" className="section" aria-labelledby="skills-title"><div className="container">
    <Reveal><SectionHeading number="03" eyebrow="TECHNICAL TOOLKIT" title={<span id="skills-title">Different layers.<br /><span className="muted">Connected expertise.</span></span>} description="The languages, frameworks, and tools I work with — from a microcontroller to a deployed application." /></Reveal>
    <div className="skills-grid">{skillGroups.map((group, i) => <Reveal className={`skill-card ${group.icon === 'ShieldCheck' ? 'skill-card--wide' : ''}`} key={group.title} delay={(i % 3) * 45}><div className="skill-card-top"><Icon name={group.icon} size={25} /><span className="mono">{group.number}</span></div><h3>{group.title}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></Reveal>)}</div>
  </div></section>;
}
