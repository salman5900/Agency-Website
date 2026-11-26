import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FEATURED_BUILDS, type FeaturedBuild } from '../data/agency';
import { BuildVisual } from './BuildVisual';

interface MobilePanel {
  key: string;
  build: FeaturedBuild;
  shortLabel: string;
}

const BASE_MOBILE_PANELS: MobilePanel[] = [
  { key: 'm-retail', build: FEATURED_BUILDS[0], shortLabel: 'Malabar Market' },
  { key: 'm-booking', build: FEATURED_BUILDS[1], shortLabel: 'Care Booking' },
  { key: 'm-ops', build: FEATURED_BUILDS[2], shortLabel: 'Coastline Ops' },
  { key: 'm-retail-2', build: FEATURED_BUILDS[0], shortLabel: 'Retail Storefront' },
];

const LOOP_MOBILE_PANELS = [...BASE_MOBILE_PANELS, ...BASE_MOBILE_PANELS];

/**
 * Mobile-tuned panoramic concave-curved showcase carousel (< 1024px only).
 * Sized to frame visuals cleanly on narrow viewports with zero overlapping controls.
 */
export function MobileHeroCarousel() {
  return (
    <div
      className="carousel-viewport relative w-full overflow-hidden select-none"
      aria-label="Mobile product showcase carousel"
    >
      {/* Top concave arc mask */}
      <svg
        aria-hidden="true"
        viewBox="0 0 430 36"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 left-0 w-full h-[26px] z-20"
      >
        <path d="M 0 0 L 430 0 L 430 3 Q 215 32 0 3 Z" fill="#F7F6F2" />
        <path
          d="M 0 3 Q 215 32 430 3"
          fill="none"
          stroke="rgba(17,17,17,0.07)"
          strokeWidth="1.2"
        />
      </svg>

      <div className="carousel-track py-1">
        {LOOP_MOBILE_PANELS.map((panel, index) => (
          <Link
            key={`${panel.key}-${index}`}
            to={`/work/${panel.build.slug}`}
            className="relative block shrink-0 w-[296px] h-[232px] mx-2 overflow-hidden bg-[#EFECE4]"
          >
            <BuildVisual build={panel.build} mobile />

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 via-black/8 to-transparent"
            />

            <div className="absolute bottom-6 left-3 right-3 flex items-center justify-between gap-2">
              <div className="glass-window-strong rounded-full px-3 py-1.5 flex items-center gap-2 min-w-0 max-w-[78%]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shrink-0" />
                <span className="text-[11px] font-semibold text-[#111111] truncate">
                  {panel.shortLabel}
                </span>
              </div>

              <span className="glass-pill-dark rounded-full w-7 h-7 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom concave arc mask */}
      <svg
        aria-hidden="true"
        viewBox="0 0 430 36"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[26px] z-20"
      >
        <path d="M 0 36 L 430 36 L 430 33 Q 215 4 0 33 Z" fill="#F7F6F2" />
        <path
          d="M 0 33 Q 215 4 430 33"
          fill="none"
          stroke="rgba(17,17,17,0.07)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
