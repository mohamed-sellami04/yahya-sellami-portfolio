import { ArrowUpRight, GraduationCap, Moon } from 'lucide-react';
import { education } from '../data/portfolio';
import { Reveal, SectionHeading } from './ui';

export default function Education() {
  return <section id="education" className="section" aria-labelledby="education-title"><div className="container education-layout">
    <Reveal><SectionHeading number="05" eyebrow="EDUCATION" title={<span id="education-title">Always<br /><span className="muted">building forward.</span></span>} /><p className="education-note">A foundation in software.<br />An ongoing commitment to learning.</p></Reveal>
    <div className="education-list">{education.map((item, i) => <Reveal key={item.title} delay={i * 60}><article className="education-card"><div className="education-top"><span className="education-icon">{item.current ? <Moon size={22} /> : <GraduationCap size={24} />}</span><span className="mono">{item.date}</span>{item.current && <span className="current-study">In progress</span>}</div><h3>{item.title}</h3><p className="education-institution">{item.institution}</p><p>{item.description}</p></article></Reveal>)}<a href="#contact" className="education-availability">Available for full-time daytime work <ArrowUpRight size={17} aria-hidden="true" /></a></div>
  </div></section>;
}
