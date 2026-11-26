import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AGENCY_CONFIG } from '../data/agency';

const NAV_ITEMS = [
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
] as const;

export function Navbar() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const nextScrolled = latest > 36;
    if (nextScrolled !== isScrolled) {
      setIsScrolled(nextScrolled);
    }
  });

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-6 pointer-events-none">
      <nav
        aria-label="Primary navigation"
        className={[
          'pointer-events-auto glass-nav rounded-full pl-5 pr-2.5 py-2 flex items-center justify-between gap-10 w-full max-w-4xl',
          isScrolled ? 'glass-nav-scrolled' : '',
        ].join(' ')}
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[#111111] font-display font-semibold text-[1.0625rem] tracking-tight shrink-0"
        >
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center relative shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#F7F6F2]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] absolute top-1 right-1" />
          </span>
          <span>{AGENCY_CONFIG.name}</span>
        </Link>

        <ul className="flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.to ||
              (item.to === '/work' && pathname.startsWith('/work/'));

            return (
              <li key={item.to} className="relative">
                <NavLink
                  to={item.to}
                  className={[
                    'group relative z-10 block px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-[#111111]'
                      : 'text-[#2C2B28] hover:text-[#111111]',
                  ].join(' ')}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-white/70 border border-white/90 shadow-[0_2px_10px_-2px_rgba(17,17,17,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"
                    />
                  )}
                  <span className="relative inline-block">
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] rounded-full bg-[#FF5A1F] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <Link
          to="/contact"
          className="glass-pill-dark rounded-full px-4 py-2 text-sm font-medium inline-flex items-center gap-2 shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" aria-hidden="true" />
          <span>Start a Project</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-80" strokeWidth={2} />
        </Link>
      </nav>
    </header>
  );
}
