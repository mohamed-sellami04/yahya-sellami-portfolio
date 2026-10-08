import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDownRight, Download, Github, Linkedin, Mail, Code2, Cpu, PanelsTopLeft, Server, Database, GitBranch, ShieldCheck, SlidersHorizontal, CalendarClock, Hand, Gauge, Radio, Bell, ScanLine, CircuitBoard, TestTubes, Smartphone, Waves } from 'lucide-react';
import { profile } from '../data/portfolio';
import { assetUrl, safeExternalUrl, validEmail } from '../lib/utils';

const icons = { Code2, Cpu, PanelsTopLeft, Server, Database, GitBranch, ShieldCheck, SlidersHorizontal, CalendarClock, Hand, Gauge, Radio, Bell, Download, ScanLine, CircuitBoard, TestTubes, Smartphone, Waves };
export function Icon({ name, ...props }) { const Component = icons[name] || Code2; return <Component aria-hidden="true" {...props} />; }

export function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const Component = href ? 'a' : 'button';
  return <Component href={href} className={`button button--${variant} ${className}`} {...props}>{children}</Component>;
}

export function CvButton({ compact = false, variant = 'secondary' }) {
  return <Button href={assetUrl(profile.cv)} download={profile.cvDownloadName} variant={variant} className={compact ? 'button--compact' : ''}>Download CV <Download size={16} aria-hidden="true" /></Button>;
}

export function SectionHeading({ number, eyebrow, title, description, className = '' }) {
  return <div className={`section-heading ${className}`}><p className="eyebrow"><span>{number}</span>{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}

export function Tag({ children }) { return <span className="tag">{children}</span>; }

export function SocialLinks({ labels = false }) {
  const links = [
    { name: 'LinkedIn', icon: Linkedin, href: safeExternalUrl(profile.linkedin) },
    { name: 'GitHub', icon: Github, href: safeExternalUrl(profile.github) },
    { name: 'Email', icon: Mail, href: validEmail(profile.email) ? `mailto:${profile.email}` : null },
  ];
  return <div className={`social-links ${labels ? 'social-links--labels' : ''}`}>
    {links.map(({ name, icon: SocialIcon, href }) => href ? <a key={name} href={href} aria-label={name} target={name === 'Email' ? undefined : '_blank'} rel={name === 'Email' ? undefined : 'noopener noreferrer'}><SocialIcon size={18} aria-hidden="true" />{labels && <span>{name}</span>}{labels && <ArrowUpRight size={14} aria-hidden="true" />}</a> : <span key={name} className="social-unavailable" title={`${name} details coming soon`} aria-label={`${name} details coming soon`}><SocialIcon size={18} aria-hidden="true" />{labels && <span>{name}</span>}</span>)}
  </div>;
}

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    el.classList.add('reveal-ready');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); observer.disconnect(); }
    }, { threshold: 0.04 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ '--reveal-delay': `${delay}ms` }}>{children}</div>;
}

export function TextLink({ href, children, diagonal = true }) {
  const Arrow = diagonal ? ArrowUpRight : ArrowDownRight;
  return <a href={href} className="text-link">{children}<Arrow size={17} aria-hidden="true" /></a>;
}
