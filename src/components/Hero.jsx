import { ArrowUpRight, MapPin } from 'lucide-react';
import { profile } from '../data/portfolio';
import { Button, CvButton, SocialLinks } from './ui';
import About from './About';
import { useLanguage } from '../i18n';

export default function Hero() {
  const { t } = useLanguage();
  const nameParts = profile.name.split(/\s+/);
  const familyName = nameParts.pop();
  const givenNames = nameParts.join(' ');

  return <section id="home" className="hero" aria-labelledby="hero-heading">
    <div className="hero-grid container">
      <div className="hero-copy">
        <div className="availability"><span aria-hidden="true" />{t(profile.availability)}</div>
        <p className="hero-intro">{t('Hi, I’m')}</p>
        <h1 id="hero-heading">{givenNames}<br /><span>{familyName}.</span></h1>
        <p className="hero-role">{t(profile.title)}</p>
        <p className="hero-summary">{t('Full-stack development, embedded IoT, and software testing.')}</p>
        <div className="hero-buttons">
          <Button href="#projects">{t('View projects')} <ArrowUpRight size={17} aria-hidden="true" /></Button>
          <CvButton />
        </div>
        <div className="hero-meta">
          <span><MapPin size={15} aria-hidden="true" />{t(profile.location)}</span>
          <i aria-hidden="true" />
          <SocialLinks />
        </div>
      </div>

      <div className="hero-about-panel">
        <p className="mono hero-about-label">{t('ABOUT ME')}</p>
        <About />
      </div>
    </div>
  </section>;
}
