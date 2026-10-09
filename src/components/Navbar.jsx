import { useEffect, useRef, useState } from 'react';
import { Languages, Menu, Moon, Sun, X } from 'lucide-react';
import { navigation, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { CvButton } from './ui';
import { useLanguage } from '../i18n';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.dataset.theme === 'dark');
  const { language, setLanguage, t } = useLanguage();
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
  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next ? '#0b1117' : '#ffffff');
    try { window.localStorage.setItem('portfolio-theme', next ? 'dark' : 'light'); } catch { /* The current tab still keeps the selected theme. */ }
  };
  return <header className={`site-header ${compact ? 'is-compact' : ''}`} ref={navRef}>
    <div className="container nav-inner">
      <a className="brand" href="#home" aria-label={`${profile.shortName} — ${t('Home')}`} onClick={() => setOpen(false)}><span className="brand-name">{profile.shortName}<span className="brand-period">.</span></span></a>
      <nav aria-label={t('Main navigation')} id="main-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
        {navigation.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'location' : undefined}>{t(label)}</a>)}
      </nav>
      <div className="nav-actions"><CvButton compact /><label className="language-control"><Languages size={17} aria-hidden="true" /><span className="sr-only">{t('Language')}</span><select aria-label={t('Language')} value={language} onChange={event => setLanguage(event.target.value)}><option value="en">English</option><option value="fr">Français</option><option value="ar">العربية</option></select></label><button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={darkMode ? t('Switch to light mode') : t('Switch to dark mode')} aria-pressed={darkMode} title={darkMode ? t('Switch to light mode') : t('Switch to dark mode')}>{darkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}</button><button className="menu-toggle" ref={menuButton} type="button" aria-controls="main-navigation" aria-expanded={open} aria-label={open ? t('Close navigation') : t('Open navigation')} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    </div>
  </header>;
}
