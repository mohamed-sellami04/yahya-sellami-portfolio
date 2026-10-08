import { ArrowUp } from 'lucide-react';
import { profile } from '../data/portfolio';
import { SocialLinks } from './ui';

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-top"><a href="#home" className="footer-identity"><strong>{profile.name}<span>.</span></strong><span>{profile.title}</span></a><SocialLinks /><a href="#home" className="back-to-top">Back to top <ArrowUp size={17} aria-hidden="true" /></a></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p><p>Thoughtfully built. Always evolving.</p></div></footer>;
}
