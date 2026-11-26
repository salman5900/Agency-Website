import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FEATURED_BUILDS, type FeaturedBuild } from '../data/agency';
import { BuildVisual } from './BuildVisual';

interface CarouselPanel {
  key: string;
  build: FeaturedBuild;
  badgeText: string;
}

const BASE_PANELS: CarouselPanel[] = [
  {
    key: 'panel-retail-1',
    build: FEATURED_BUILDS[0],
    badgeText: 'Storefront & Order Board',
  },
  {
    key: 'panel-booking-1',
    build: FEATURED_BUILDS[1],
    badgeText: 'Clinic & Service Booking',
  },
  {
    key: 'panel-ops-1',
    build: FEATURED_BUILDS[2],
    badgeText: 'Inventory & Ops Console',
  },
  {
    key: 'panel-retail-2',
    build: FEATURED_BUILDS[0],
    badgeText: 'Direct Local Commerce',
  },
  {
    key: 'panel-booking-2',
    build: FEATURED_BUILDS[1],
    badgeText: 'Mobile App Experience',
  },
  {
    key: 'panel-ops-2',
    build: FEATURED_BUILDS[2],
    badgeText: 'Custom Internal Tools',
  },
];

const LOOP_PANELS = [...BASE_PANELS, ...BASE_PANELS];

export function CurvedHeroCarousel() {
  return (
    <div
      className="carousel-viewport relative w-full overflow-hidden select-none"
      aria-label="Featured product showcase carousel"
    >
      {/* Top concave arc mask matching #F7F6F2 canvas */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 84"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 left-0 w-full h-[68px] z-20"
      >
        <path
          d="M 0 0 L 1440 0 L 1440 8 Q 720 78 0 8 Z"
          fill="#F7F6F2"
        />
        <path
          d="M 0 8 Q 720 78 1440 8"
          fill="none"
          stroke="rgba(17,17,17,0.07)"
          strokeWidth="1.25"
        />
      </svg>

      {/* Scrolling horizontal panel track */}
      <div className="carousel-track py-2">
        {LOOP_PANELS.map((panel, index) => (
          <Link
            key={`${panel.key}-${index}`}
            to={`/work/${panel.build.slug}`}
            className="group relative block shrink-0 w-[460px] h-[410px] mx-2.5 overflow-hidden bg-[#EFECE4] focus-visible:outline-none"
          >
            <BuildVisual
              build={panel.build}
              compact
              className="transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />

            {/* Subtle dark gradient vignette only at bottom center for pill legibility */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* Floating glass label positioned safely inside the curved visible band */}
            <div className="absolute bottom-14 left-5 right-5 flex items-center justify-between gap-3">
              <div className="glass-window-strong rounded-full px-4 py-2 flex items-center gap-2.5 max-w-[78%]">
                <span className="w-2 h-2 rounded-full bg-[#FF5A1F] shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-[#111111] truncate">
                  {panel.build.title}
                </span>
                <span className="text-xs text-[#4D4B46] truncate">· {panel.badgeText}</span>
              </div>

              <span className="glass-pill-dark rounded-full w-9 h-9 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#FF5A1F]">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom concave arc mask matching #F7F6F2 canvas */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 84"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[68px] z-20"
      >
        <path
          d="M 0 84 L 1440 84 L 1440 76 Q 720 6 0 76 Z"
          fill="#F7F6F2"
        />
        <path
          d="M 0 76 Q 720 6 1440 76"
          fill="none"
          stroke="rgba(17,17,17,0.07)"
          strokeWidth="1.25"
        />
      </svg>
    </div>
  );
}
