import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AGENCY_CONFIG, DIRECT_CHANNELS } from '../data/agency';
import { ChannelIcon } from './ChannelIcon';

export function Footer() {
  return (
    <footer className="mt-28 pb-12 px-8">
      <div className="max-w-6xl mx-auto glass-window rounded-[28px] p-10">
        <div className="grid grid-cols-12 gap-10 pb-10 border-b border-black/8">
          <div className="col-span-5 flex flex-col justify-between gap-6">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 text-[#111111] font-display font-semibold text-xl"
              >
                <span
                  aria-hidden="true"
                  className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center relative"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F7F6F2]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] absolute top-1 right-1" />
                </span>
                <span>{AGENCY_CONFIG.name}</span>
              </Link>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[#4D4B46] max-w-sm">
                A five-person software agency in Kerala building international-quality web apps,
                mobile apps, and custom digital tools for growing businesses.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#4D4B46]">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" aria-hidden="true" />
              <span>
                Based in {AGENCY_CONFIG.location} · {AGENCY_CONFIG.timezone}
              </span>
            </div>
          </div>

          <div className="col-span-3">
            <h3 className="text-sm font-semibold text-[#111111] mb-4">Pages</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'Services', to: '/services' },
                { label: 'Work', to: '/work' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#4D4B46] hover:text-[#111111] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4">
            <h3 className="text-sm font-semibold text-[#111111] mb-4">Direct Channels</h3>
            <div className="space-y-2.5">
              {DIRECT_CHANNELS.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={channel.id === 'email' ? undefined : '_blank'}
                  rel={channel.id === 'email' ? undefined : 'noopener noreferrer'}
                  className="glass-pill rounded-2xl px-4 py-2.5 flex items-center justify-between text-sm text-[#111111]"
                >
                  <span className="inline-flex items-center gap-2.5 font-medium">
                    <ChannelIcon id={channel.id} className="w-4 h-4 text-[#FF5A1F]" />
                    {channel.label}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#4D4B46]" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-between text-xs text-[#6E6B64]">
          <span>
            © {new Date().getFullYear()} {AGENCY_CONFIG.name}. Placeholder brand & template
            portfolio.
          </span>
          <span>Team of {AGENCY_CONFIG.teamSize} · Built for small businesses</span>
        </div>
      </div>
    </footer>
  );
}
