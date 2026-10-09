import { ArrowUp } from 'lucide-react';
import { profile } from '../data/portfolio';
import { SocialLinks } from './ui';
import { useLanguage } from '../i18n';

export default function Footer() {
  const { t } = useLanguage();
  return <footer className="site-footer"><div className="container footer-top"><a href="#home" className="footer-identity"><strong>{profile.name}<span>.</span></strong><span>{t(profile.title)}</span></a><SocialLinks /><a href="#home" className="back-to-top">{t('Back to top')} <ArrowUp size={17} aria-hidden="true" /></a></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} {profile.name}. {t('All rights reserved.')}</p><p>{t('Thoughtfully built. Always evolving.')}</p></div></footer>;
}
