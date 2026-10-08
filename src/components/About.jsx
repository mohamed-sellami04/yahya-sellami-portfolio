import { ArrowUpRight, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { profile } from '../data/portfolio';
import { assetUrl } from '../lib/utils';
import { Reveal, SectionHeading } from './ui';

export default function About() {
  return <section id="about" className="section" aria-labelledby="about-title"><div className="container">
    <Reveal><SectionHeading number="01" eyebrow="ABOUT ME" title={<span id="about-title">One perspective.<br /><span className="muted">The whole system.</span></span>} /></Reveal>
    <div className="about-grid">
      <Reveal className="about-identity">{profile.photo ? <img className="profile-photo" src={assetUrl(profile.photo)} alt={profile.name} width="600" height="600" loading="lazy" /> : <div className="profile-monogram" aria-label={`${profile.name} initials`}><span className="mono">ENGINEERING MINDSET</span><strong>MY<span>S</span><i>.</i></strong><span className="monogram-baseline">{profile.location} <ArrowUpRight size={18} aria-hidden="true" /></span></div>}<div className="identity-caption"><strong>{profile.name}</strong><span>{profile.title}</span></div></Reveal>
      <Reveal className="about-copy" delay={80}><p className="lead">I build full-stack and IoT systems that connect software with the physical world.</p><p>I’m a Computer Science and Information Systems graduate with experience in backend services, React web applications, Flutter mobile apps, embedded firmware, and software testing. At BlueBox Labs, I focused on the ESP32-S3 controller and integrated its firmware with the team’s mobile and backend systems.</p><p>I’m currently continuing my Computer Science engineering studies through evening classes at IIT. I value clear communication, problem-solving, and reliable software.</p><div className="about-principles"><span><Cpu size={19} />Close to the hardware</span><span><Layers size={19} />Across the stack</span><span><ShieldCheck size={19} />Focused on reliability</span></div><div className="availability-note"><span className="note-bar" /><p><strong>Engineering studies in the evening.</strong>My current program is scheduled outside regular daytime work hours.</p></div></Reveal>
    </div>
  </div></section>;
}
