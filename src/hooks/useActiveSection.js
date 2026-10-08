import { useEffect, useState } from 'react';
import { navigation } from '../data/portfolio';

export function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const threshold = Math.min(window.innerHeight * 0.35, 280);
      let current = 'home';
      for (const [id] of navigation) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= threshold) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) current = 'contact';
      setActive(current);
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return active;
}
