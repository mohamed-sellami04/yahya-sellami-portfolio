import { ArrowUpRight, Cpu, MapPin, Radio, ShieldCheck } from 'lucide-react';
import { profile } from '../data/portfolio';
import { Button, CvButton, SocialLinks } from './ui';

export default function Hero() {
  const nameParts = profile.name.split(/\s+/);
  const familyName = nameParts.pop();
  const givenNames = nameParts.join(' ');

  return <section id="home" className="hero" aria-labelledby="hero-heading">
    <div className="hero-grid container">
      <div className="hero-copy">
        <div className="availability"><span aria-hidden="true" />{profile.availability}</div>
        <p className="hero-intro">Hi, I’m</p>
        <h1 id="hero-heading">{givenNames}<br /><span>{familyName}.</span></h1>
        <p className="hero-role">{profile.title}</p>
        <p className="hero-summary">Computer Science graduate with hands-on experience in full-stack development, embedded IoT, and software testing.</p>
        <div className="hero-buttons">
          <Button href="#projects">View projects <ArrowUpRight size={17} aria-hidden="true" /></Button>
          <CvButton />
        </div>
        <div className="hero-meta">
          <span><MapPin size={15} aria-hidden="true" />{profile.location}</span>
          <i aria-hidden="true" />
          <SocialLinks />
        </div>
      </div>

      <aside className="hero-feature" aria-label="BlueBox Labs project summary">
        <p className="mono">RECENT WORK <span>/</span> BLUEBOX LABS</p>
        <h2>Software<br />meets the field.</h2>
        <p>I built the embedded controller for a connected irrigation system, linking its local interface with the app and backend.</p>
        <ul>
          <li><Cpu size={18} aria-hidden="true" /><span>ESP32-S3 firmware</span></li>
          <li><Radio size={18} aria-hidden="true" /><span>Wi-Fi onboarding and MQTT</span></li>
          <li><ShieldCheck size={18} aria-hidden="true" /><span>OTA updates and system testing</span></li>
        </ul>
        <a href="#projects" className="hero-feature-link">Explore the project <ArrowUpRight size={16} aria-hidden="true" /></a>
      </aside>
    </div>
  </section>;
}
