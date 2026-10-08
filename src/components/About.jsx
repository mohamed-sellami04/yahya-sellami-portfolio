import { ArrowUpRight, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { profile } from '../data/portfolio';
import { assetUrl } from '../lib/utils';
import { Reveal } from './ui';

export default function About() {
  return <div className="about-grid hero-about-grid">
    <Reveal className="about-identity">
      {profile.photo
        ? <img className="profile-photo" src={assetUrl(profile.photo)} alt={profile.name} width="600" height="600" />
        : <div className="profile-monogram" aria-label={`${profile.name} initials`}><span className="mono">ENGINEERING MINDSET</span><strong>MY<span>S</span><i>.</i></strong><span className="monogram-baseline">{profile.location} <ArrowUpRight size={18} aria-hidden="true" /></span></div>}
      <div className="identity-caption"><strong>{profile.name}</strong><span>{profile.title}</span></div>
    </Reveal>
    <Reveal className="about-copy" delay={80}>
      <p className="lead">I build full-stack and IoT systems that connect software with the physical world.</p>
      <p>Computer Science and Information Systems graduate with hands-on experience in full-stack development, IoT systems, and software testing. Experienced in API, integration, and system testing across backend, web, mobile, and embedded environments. Skilled in Spring Boot, PostgreSQL, React, Flutter, C/C++, REST APIs, MQTT, and hardware–software integration. Strong understanding of end-to-end system behavior with a focus on reliability, software quality, and problem solving.</p>
      <div className="about-principles"><span><Cpu size={18} />Embedded systems</span><span><Layers size={18} />Full-stack software</span><span><ShieldCheck size={18} />Reliable delivery</span></div>
      <div className="availability-note"><span className="note-bar" /><p><strong>Available for daytime work.</strong>My engineering classes are in the evening.</p></div>
    </Reveal>
  </div>;
}
