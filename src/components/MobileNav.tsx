import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowUpRight,
  Briefcase,
  Home,
  Layers,
  Search,
  Send,
  Users,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AGENCY_CONFIG } from '../data/agency';
import { filterSearchEntries, type SearchEntry } from '../data/searchIndex';
import { EASE_OUT_EXPO } from './MotionPrimitives';

const DOCK_ITEMS = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/services', label: 'Services', Icon: Layers },
  { to: '/work', label: 'Work', Icon: Briefcase },
] as const;

const COMPACT_SEARCH_TAGS = ['Web Apps', 'Mobile', 'Ops', 'WhatsApp'] as const;

export function MobileNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = filterSearchEntries(query).slice(0, 5);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleSelectEntry = (entry: SearchEntry) => {
    setIsSearchOpen(false);
    setQuery('');
    if (entry.external) {
      window.open(entry.to, '_blank', 'noopener,noreferrer');
      return;
    }
    if (entry.to.startsWith('mailto:')) {
      window.location.href = entry.to;
      return;
    }
    navigate(entry.to);
  };

  return (
    <>
      {/* Split Mobile Floating Top Bar: Brand Pill Left + About & Start Pill Right */}
      <header className="lg:hidden fixed top-3.5 inset-x-0 z-40 px-4 pointer-events-none">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <Link
            to="/"
            className="pointer-events-auto glass-nav rounded-full pl-2.5 pr-4 py-1.5 inline-flex items-center gap-2 text-[#111111] font-display font-semibold text-sm tracking-tight shrink-0"
          >
            <span
              aria-hidden="true"
              className="w-6 h-6 rounded-lg bg-[#111111] flex items-center justify-center relative"
            >
              <span className="w-2 h-2 rounded-full bg-[#F7F6F2]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] absolute top-0.5 right-0.5" />
            </span>
            <span>{AGENCY_CONFIG.name}</span>
          </Link>

          <div className="pointer-events-auto glass-nav rounded-full p-1 inline-flex items-center gap-1 shrink-0">
            <Link
              to="/about"
              aria-label="About"
              title="About"
              className={[
                'h-8 px-3 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition-colors',
                pathname === '/about'
                  ? 'bg-white/80 text-[#111111] shadow-xs'
                  : 'text-[#2C2B28]',
              ].join(' ')}
            >
              <Users className="w-3.5 h-3.5 text-[#111111]" strokeWidth={1.85} />
              <span>About</span>
            </Link>

            <Link
              to="/contact"
              className="glass-pill-orange rounded-full h-8 px-3.5 text-xs font-medium inline-flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-3 h-3" strokeWidth={2} />
              <span>Start</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Portaled Search Layer outside any transform/backdrop-filter ancestor */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                key="mobile-search-overlay"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: {},
                  exit: { transition: { when: 'afterChildren' } },
                }}
                className="lg:hidden fixed inset-0 z-40"
              >
                <motion.div
                  onClick={() => setIsSearchOpen(false)}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.2 } },
                    exit: { opacity: 0, transition: { duration: 0.18 } },
                  }}
                  className="absolute inset-0 bg-black/18"
                  aria-hidden="true"
                />

                <motion.section
                  role="dialog"
                  aria-label="Search services, builds, and contact channels"
                  variants={{
                    hidden: { y: 20 },
                    visible: {
                      y: 0,
                      transition: { duration: 0.28, ease: EASE_OUT_EXPO },
                    },
                    exit: {
                      y: 16,
                      transition: { duration: 0.2, ease: EASE_OUT_EXPO },
                    },
                  }}
                  onAnimationComplete={() => {
                    if (isSearchOpen) {
                      inputRef.current?.focus({ preventScroll: true });
                    }
                  }}
                  style={{ bottom: 'calc(5.6rem + env(safe-area-inset-bottom))' }}
                  className="absolute inset-x-4 max-w-md mx-auto glass-nav glass-nav-scrolled rounded-[26px] p-3.5 will-change-transform"
                >
              {/* Search Input */}
              <div className="relative flex items-center">
                <Search
                  className="w-4 h-4 text-[#FF5A1F] absolute left-3.5 pointer-events-none"
                  strokeWidth={2}
                />
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services, builds, WhatsApp..."
                  aria-label="Search SideQuest by keyword"
                  className="w-full rounded-2xl bg-white/88 border border-white/95 pl-10 pr-9 py-2.5 text-sm text-[#111111] placeholder:text-[#6E6B64] focus:outline-none focus:border-[#FF5A1F]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 w-6 h-6 rounded-full bg-black/8 flex items-center justify-center text-[#111111]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Minimal Quick Tags */}
              <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-0.5">
                {COMPACT_SEARCH_TAGS.map((tag) => {
                  const active = query.toLowerCase() === tag.toLowerCase();
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(active ? '' : tag)}
                      className={[
                        'px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors',
                        active
                          ? 'bg-[#111111] text-[#F7F6F2]'
                          : 'bg-white/75 text-[#111111] border border-black/8',
                      ].join(' ')}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Clean Single-Line Clickable Results */}
              <div className="mt-2.5 max-h-[38vh] overflow-y-auto space-y-1.5">
                {results.length > 0 ? (
                  results.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => handleSelectEntry(entry)}
                      className="w-full text-left rounded-2xl bg-white/88 hover:bg-white border border-white/95 px-3.5 py-2.5 flex items-center justify-between gap-3 transition-colors"
                    >
                      <span className="text-sm font-medium text-[#111111] truncate">
                        {entry.title}
                      </span>
                      <span className="inline-flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#EFECE4] text-[#4D4B46]">
                          {entry.kind}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5A1F]" strokeWidth={2} />
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="rounded-2xl bg-white/85 p-4 text-center">
                    <p className="text-xs text-[#4D4B46]">No match for “{query}”.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate('/contact');
                      }}
                      className="mt-2 glass-pill-dark rounded-full px-4 py-1.5 text-xs font-medium inline-flex items-center gap-1.5"
                    >
                      <span>Ask SideQuest</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {/* Bottom Floating Liquid Glass Dock (3 Icon-Only Tabs + Separate Search Button) */}
      <nav
        aria-label="Mobile navigation"
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        className="lg:hidden fixed inset-x-0 z-50 px-4 pointer-events-none"
      >
        <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
          <div className="pointer-events-auto glass-nav rounded-full p-1.5 flex items-center gap-1">
            {DOCK_ITEMS.map(({ to, label, Icon }) => {
              const isActive =
                to === '/'
                  ? pathname === '/'
                  : pathname === to || (to === '/work' && pathname.startsWith('/work/'));

              return (
                <Link
                  key={to}
                  to={to}
                  aria-label={label}
                  title={label}
                  className={[
                    'relative z-10 w-14 h-11 rounded-full flex items-center justify-center transition-colors',
                    isActive ? 'text-[#111111]' : 'text-[#4D4B46]',
                  ].join(' ')}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mobile-dock-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-white/75 border border-white/95 shadow-[0_2px_10px_-2px_rgba(17,17,17,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
                    />
                  )}
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.1 : 1.75} />
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] absolute bottom-1.5"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-expanded={isSearchOpen}
            aria-label={isSearchOpen ? 'Close search' : 'Search services and builds'}
            className={[
              'pointer-events-auto glass-nav rounded-full w-14 h-14 flex items-center justify-center relative cursor-pointer transition-transform active:scale-95',
              isSearchOpen ? 'glass-nav-active-dark' : 'text-[#111111]',
            ].join(' ')}
          >
            {isSearchOpen ? (
              <X className="w-5 h-5" strokeWidth={2} />
            ) : (
              <>
                <Search className="w-5 h-5" strokeWidth={1.9} />
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] absolute top-3 right-3"
                />
              </>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
