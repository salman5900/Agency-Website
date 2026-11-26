import { ArrowUpRight, Check, Globe, Layers, Smartphone, Workflow } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { EASE_OUT_EXPO, Reveal, RevealItem, RevealStagger } from '../components/MotionPrimitives';
import { PROCESS_STEPS, SERVICE_PILLARS } from '../data/agency';

const PILLAR_ICONS = {
  'web-apps': Globe,
  'mobile-apps': Smartphone,
  'automation-tools': Workflow,
  'ui-ux-launch': Layers,
} as const;

export function ServicesPage() {
  return (
    <div className="pt-24 lg:pt-36 pb-10">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-5 lg:px-8 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="lg:col-span-7"
          >
            <h1 className="font-display text-[2.25rem] lg:text-[3.25rem] leading-[1.06] font-semibold text-[#111111]">
              Software tailored to how your business actually runs.
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5"
          >
            <p className="text-[0.95rem] lg:text-base leading-relaxed text-[#4D4B46]">
              Every engagement is scoped on a custom-quote basis around what moves the needle for
              your team—never locked behind rigid agency packages.
            </p>
            <div className="mt-5">
              <Link
                to="/contact"
                className="glass-pill-orange rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2"
              >
                <span>Request a Custom Quote</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Four Service Pillars */}
      <div className="max-w-6xl mx-auto px-5 lg:px-8 space-y-5 lg:space-y-6">
        {SERVICE_PILLARS.map((pillar) => {
          const Icon = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS] ?? Globe;
          return (
            <Reveal key={pillar.id}>
              <article className="glass-window rounded-[24px] lg:rounded-[26px] p-6 lg:p-9 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
                <div className="lg:col-span-6">
                  <div className="flex flex-wrap items-center gap-3.5">
                    <span className="w-11 h-11 rounded-2xl bg-[#111111] text-[#FF5A1F] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <span className="glass-pill rounded-full px-3.5 py-1 text-xs font-medium text-[#111111] tabular-nums">
                      {pillar.timelineHint}
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-2xl lg:text-3xl font-semibold text-[#111111]">
                    {pillar.title}
                  </h2>
                  <p className="mt-3 text-[0.95rem] lg:text-[0.98rem] leading-relaxed text-[#4D4B46] max-w-[56ch]">
                    {pillar.summary}
                  </p>

                  <div className="mt-6 pt-5 border-t border-black/8 text-sm text-[#4D4B46]">
                    <strong className="font-semibold text-[#111111]">Ideal for:</strong>{' '}
                    {pillar.idealFor}
                  </div>
                </div>

                <div className="lg:col-span-6 bg-[#EFECE4]/75 rounded-2xl p-5 lg:p-7 border border-black/6">
                  <h3 className="text-sm font-semibold text-[#111111] mb-4">
                    What you walk away with
                  </h3>
                  <ul className="space-y-3">
                    {pillar.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#111111]">
                        <Check className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-black/8">
                    <span className="text-xs text-[#4D4B46]">Custom quote after discovery call</span>
                    <Link
                      to="/contact"
                      className="glass-pill-dark rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <span>Request Quote</span>
                      <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* 3-Step Sequential Process */}
      <section className="max-w-6xl mx-auto px-5 lg:px-8 pt-16 lg:pt-24">
        <Reveal className="max-w-xl mb-8 lg:mb-10">
          <h2 className="font-display text-[2rem] lg:text-[2.5rem] leading-[1.1] font-semibold text-[#111111]">
            From first message to live launch in three clear steps.
          </h2>
          <p className="mt-3 text-[0.95rem] lg:text-base text-[#4D4B46]">
            No mystery timelines or complicated onboarding. You stay involved at every milestone.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {PROCESS_STEPS.map((item) => (
            <RevealItem key={item.step}>
              <div className="glass-window rounded-[24px] p-7 lg:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#111111] text-[#F7F6F2] font-display font-semibold text-sm flex items-center justify-center tabular-nums">
                    {item.step}
                  </div>
                  <h3 className="mt-5 lg:mt-6 font-display text-2xl font-semibold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4D4B46]">
                    {item.description}
                  </p>
                </div>
                <div className="mt-7 pt-4 border-t border-black/8 text-xs font-medium text-[#111111] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shrink-0" />
                  <span>{item.outcome}</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>
    </div>
  );
}
