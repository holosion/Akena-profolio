import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navigation } from '../data/navigation';
import { profile } from '../data/profile';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navigation.map((item) => item.id);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="nav__brand" href="#home">
        <span className="nav__mark" aria-hidden="true" />
        {profile.name}
      </a>
      <nav className="nav__links" aria-label="Primary">
        {navigation.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? 'is-active' : undefined}
            aria-current={active === item.id ? 'location' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
        <span className="sr-only">Menu</span>
      </button>
      {open ? (
        <div id="mobile-menu" className="nav__drawer">
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
