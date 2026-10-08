import { ArrowUpRight } from 'lucide-react';
import { experiences } from '../data/portfolio';
import { Reveal, SectionHeading, Tag } from './ui';

export default function Experience() {
  return <section id="experience" className="section section--tinted" aria-labelledby="experience-title"><div className="container">
    <Reveal><SectionHeading number="02" eyebrow="EXPERIENCE" title={<span id="experience-title">Engineering in practice.</span>} description="Hands-on work across software, connected devices, and the places where they meet." /></Reveal>
    <div className="timeline">{experiences.map((item, i) => <Reveal key={`${item.company}-${item.role}`} className="timeline-item" delay={(i % 4) * 45}><div className="timeline-marker" aria-hidden="true" /><div className="timeline-meta"><span className="mono">{item.period || `EXPERIENCE / 0${i + 1}`}</span><h3>{item.company}</h3><span className="experience-label">{item.label}</span>{i === 0 && <a href="#projects" className="text-link">Explore the project <ArrowUpRight size={15} aria-hidden="true" /></a>}</div><div className="timeline-content"><h4>{item.role}</h4><p>{item.description}</p>{item.points.length > 0 && <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>}<div className="tags">{item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div></div></Reveal>)}</div>
  </div></section>;
}
