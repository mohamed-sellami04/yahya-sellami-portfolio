import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigation, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { CvButton } from './ui';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const menuButton = useRef(null);
  const navRef = useRef(null);
  const active = useActiveSection();
  useEffect(() => {
    const scroll = () => setCompact(window.scrollY > 32);
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    const keydown = (e) => { if (e.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); } };
    const outside = (e) => { if (open && !navRef.current?.contains(e.target)) setOpen(false); };
    const desktop = window.matchMedia('(min-width: 1100px)');
    const resized = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', keydown);
    document.addEventListener('pointerdown', outside);
    desktop.addEventListener('change', resized);
    return () => { document.removeEventListener('keydown', keydown); document.removeEventListener('pointerdown', outside); desktop.removeEventListener('change', resized); };
  }, [open]);
  return <header className={`site-header ${compact ? 'is-compact' : ''}`} ref={navRef}>
    <div className="container nav-inner">
      <a className="brand" href="#home" aria-label={`${profile.shortName} — home`} onClick={() => setOpen(false)}><span className="brand-symbol" aria-hidden="true">y<span>.</span>s</span><span className="brand-name">{profile.shortName}<span className="brand-period">.</span></span></a>
      <nav aria-label="Main navigation" id="main-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
        {navigation.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
      </nav>
      <div className="nav-actions"><CvButton compact /><button className="menu-toggle" ref={menuButton} type="button" aria-controls="main-navigation" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    </div>
  </header>;
}
