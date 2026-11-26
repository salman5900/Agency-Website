import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BuildVisual } from '../components/BuildVisual';
import { EASE_OUT_EXPO } from '../components/MotionPrimitives';
import { FEATURED_BUILDS, type BuildCategory } from '../data/agency';

const FILTERS: Array<'All' | BuildCategory> = ['All', 'Web Apps', 'Mobile Apps', 'Operations'];

export function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BuildCategory>('All');

  const visibleBuilds =
    selectedCategory === 'All'
      ? FEATURED_BUILDS
      : FEATURED_BUILDS.filter((build) => build.category === selectedCategory);

  return (
    <div className="pt-24 lg:pt-36 pb-10">
      <section className="max-w-6xl mx-auto px-5 lg:px-8 pb-8 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="lg:col-span-7"
          >
            <h1 className="font-display text-[2.25rem] lg:text-[3.25rem] leading-[1.06] font-semibold text-[#111111]">
              Featured Builds
            </h1>
            <p className="mt-3.5 lg:mt-4 text-[0.95rem] lg:text-base leading-relaxed text-[#4D4B46] max-w-2xl">
              Three template Featured Builds structured around the exact problems small
              businesses bring to us. Ready to swap with your live shipped projects and links.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 flex lg:justify-end overflow-x-auto pb-1 lg:pb-0"
          >
            <div
              className="glass-nav rounded-full p-1.5 inline-flex items-center gap-1 shrink-0"
              role="group"
              aria-label="Filter Featured Builds by category"
            >
              {FILTERS.map((filter) => {
                const isActive = selectedCategory === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedCategory(filter)}
                    className={[
                      'relative z-10 px-3.5 lg:px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap',
                      isActive
                        ? 'text-[#F7F6F2]'
                        : 'text-[#4D4B46] hover:text-[#111111]',
                    ].join(' ')}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="work-filter-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 -z-10 rounded-full bg-[#111111]"
                      />
                    )}
                    {filter}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 lg:px-8 space-y-5 lg:space-y-6">
        <AnimatePresence mode="popLayout">
          {visibleBuilds.map((build, idx) => (
            <motion.div
              key={build.slug}
              layout="position"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.42, delay: idx * 0.07, ease: EASE_OUT_EXPO }}
            >
              <Link
                to={`/work/${build.slug}`}
                className="group glass-window rounded-[24px] lg:rounded-[26px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:-translate-y-0.5 transition-transform duration-300"
              >
                <div
                  className={[
                    'lg:col-span-6 h-[240px] lg:h-[340px] bg-[#EFECE4] overflow-hidden',
                    idx % 2 === 1 ? 'lg:order-2' : '',
                  ].join(' ')}
                >
                  <BuildVisual
                    build={build}
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="lg:col-span-6 p-6 lg:p-9 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-[#4D4B46]">
                      <span>{build.clientType}</span>
                      <span className="inline-flex items-center gap-1.5 text-[#111111]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                        {build.category}
                      </span>
                    </div>

                    <h2 className="mt-3 lg:mt-4 font-display text-2xl lg:text-3xl font-semibold text-[#111111]">
                      {build.title}
                    </h2>
                    <p className="mt-2.5 lg:mt-3 text-sm lg:text-[0.96rem] leading-relaxed text-[#4D4B46]">
                      {build.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {build.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-[#EFECE4] px-3 py-1 text-xs font-medium text-[#111111]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-7 pt-4 lg:pt-5 border-t border-black/8 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-[#6E6B64]">{build.metricsLabel}</span>
                    <span className="glass-pill-dark rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5 group-hover:bg-[#FF5A1F] transition-colors shrink-0">
                      <span>Inspect Build</span>
                      <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
}
