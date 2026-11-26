import { type FeaturedBuild } from '../data/agency';

interface BuildVisualProps {
  build: FeaturedBuild;
  className?: string;
  compact?: boolean;
}

/**
 * Renders either the generated studio product image or, for the Operations
 * Console template, a studio-framed interactive hardware/glass dashboard composition.
 */
export function BuildVisual({ build, className = '', compact = false }: BuildVisualProps) {
  if (build.slug !== 'coastline-ops-ledger') {
    return (
      <img
        src={build.image}
        alt={build.imageAlt}
        className={['w-full h-full object-cover', className].join(' ')}
      />
    );
  }

  return (
    <div
      aria-label={build.imageAlt}
      className={[
        'relative w-full h-full overflow-hidden flex items-center justify-center p-6',
        compact ? 'pb-20 pt-8' : '',
        'bg-gradient-to-br from-[#F4F2EC] via-[#EAE6DC] to-[#DFDAD0]',
        className,
      ].join(' ')}
    >
      {/* Subtle architectural daylight beam matching the studio renders */}
      <div
        aria-hidden="true"
        className="absolute -top-12 -left-10 w-64 h-80 bg-white/45 rotate-12 blur-2xl pointer-events-none"
      />

      {/* Matte-black floating tablet/console frame */}
      <div
        className={[
          'relative rounded-[20px] bg-[#141414] p-2.5 shadow-[0_24px_48px_-14px_rgba(17,17,17,0.38)] border border-white/15 -rotate-1',
          compact ? 'w-[84%] max-w-[390px] scale-[0.92]' : 'w-[88%] max-w-[460px]',
        ].join(' ')}
      >
        <div className="rounded-[13px] bg-[#1B1B1D] text-[#F7F6F2] p-4 border border-white/8">
          {/* Window top bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
              <span className="w-2 h-2 rounded-full bg-white/25" />
              <span className="w-2 h-2 rounded-full bg-white/25" />
            </div>
            <span className="text-[11px] font-medium text-white/70">Coastline Ledger</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF5A1F]/20 text-[#FF7D4D] font-medium">
              Live Stock
            </span>
          </div>

          {/* Metrics & Bar visualization */}
          <div className="grid grid-cols-12 gap-3 mt-3.5 items-end">
            <div className="col-span-5 space-y-2">
              <div className="rounded-xl bg-white/6 p-2.5 border border-white/8">
                <div className="text-[10px] text-white/55">Dispatched Today</div>
                <div className="text-lg font-display font-semibold tabular-nums mt-0.5">
                  148 <span className="text-[11px] text-[#FF5A1F] font-medium">+14%</span>
                </div>
              </div>
              <div className="rounded-xl bg-white/6 p-2.5 border border-white/8">
                <div className="text-[10px] text-white/55">Low Stock Alerts</div>
                <div className="text-sm font-semibold tabular-nums mt-0.5">3 SKUs</div>
              </div>
            </div>

            <div className="col-span-7 rounded-xl bg-white/5 p-3 border border-white/8">
              <div className="flex items-center justify-between text-[10px] text-white/55 mb-2.5">
                <span>Weekly Dispatch Volume</span>
                <span className="text-white/80">Kochi Hub</span>
              </div>
              <div className="flex items-end gap-1.5 h-20 pt-2">
                {[42, 65, 54, 78, 62, 92, 74].map((height, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${height}%` }}
                    className={[
                      'flex-1 rounded-t-md',
                      idx === 5 ? 'bg-[#FF5A1F]' : 'bg-white/22',
                    ].join(' ')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Compact inventory table rows */}
          <div className="mt-3 space-y-1.5">
            {[
              { sku: 'Spice Crate #104', hub: 'Ernakulam', status: 'Ready' },
              { sku: 'Cold-Pack Box #22', hub: 'Calicut', status: 'Restock' },
            ].map((row) => (
              <div
                key={row.sku}
                className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px]"
              >
                <span className="font-medium text-white/90">{row.sku}</span>
                <span className="text-white/50">{row.hub}</span>
                <span
                  className={
                    row.status === 'Restock'
                      ? 'text-[#FF7D4D] font-semibold'
                      : 'text-emerald-300 font-medium'
                  }
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating glassmorphic summary pill matching studio style */}
      {!compact && (
        <div className="hidden sm:flex absolute right-6 bottom-12 glass-window-strong rounded-2xl px-3.5 py-2.5 items-center gap-2.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
          <div className="text-[11px] leading-tight">
            <div className="font-semibold text-[#111111]">Dispatch Synced</div>
            <div className="text-[#4D4B46]">3 warehouses</div>
          </div>
        </div>
      )}
    </div>
  );
}
