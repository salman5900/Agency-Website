import { useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  Layers,
  MessageCircle,
  Smartphone,
  Workflow,
} from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { BuildVisual } from '../components/BuildVisual';
import { CurvedHeroCarousel } from '../components/CurvedHeroCarousel';
import {
  EASE_OUT_EXPO,
  Reveal,
  RevealItem,
  RevealStagger,
} from '../components/MotionPrimitives';
import {
  AGENCY_CONFIG,
  FEATURED_BUILDS,
  SERVICE_PILLARS,
  TEAM_MEMBERS,
} from '../data/agency';

const PILLAR_ICONS = {
  'web-apps': Globe,
  'mobile-apps': Smartphone,
  'automation-tools': Workflow,
  'ui-ux-launch': Layers,
} as const;

export function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const carouselScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const carouselY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const heroFooterY = useTransform(scrollYProgress, [0, 1], [0, -14]);

  const [activePillarId, setActivePillarId] = useState(SERVICE_PILLARS[0].id);
  const activePillar =
    SERVICE_PILLARS.find((pillar) => pillar.id === activePillarId) ?? SERVICE_PILLARS[0];
  const ActiveIcon = PILLAR_ICONS[activePillar.id as keyof typeof PILLAR_ICONS] ?? Globe;

  const [leadBuild, ...secondaryBuilds] = FEATURED_BUILDS;

  return (
    <div>
      {/* Hero Section with Panoramic Concave Curved Carousel */}
      <section ref={heroRef} className="pt-28 pb-12">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="font-display text-[3.5rem] leading-[1.05] font-semibold text-[#111111] max-w-3xl mx-auto"
          >
            Digital products built for real businesses.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="mt-4 text-lg leading-relaxed text-[#4D4B46] max-w-2xl mx-auto"
          >
            A five-person team in Kerala bringing international-quality web apps, mobile
            apps, and custom software to small businesses and growing brands.
          </motion.p>
        </div>

        <motion.div
          style={{ scale: carouselScale, y: carouselY }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14, ease: EASE_OUT_EXPO }}
          className="mt-9 will-change-transform"
        >
          <CurvedHeroCarousel />
        </motion.div>

        <motion.div
          style={{ y: heroFooterY }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: EASE_OUT_EXPO }}
          className="max-w-6xl mx-auto px-8 mt-5 grid grid-cols-12 items-center gap-4 will-change-transform"
        >
          <div className="col-span-4 flex justify-start">
            <Link
              to="/about"
              className="glass-pill rounded-2xl px-4 py-2.5 inline-flex items-center gap-3.5"
            >
              <div className="flex -space-x-2" aria-hidden="true">
                {TEAM_MEMBERS.map((member, index) => (
                  <span
                    key={member.id}
                    className={[
                      'w-7 h-7 rounded-full border-2 border-[#F7F6F2] flex items-center justify-center text-[10px] font-semibold',
                      index === 0
                        ? 'bg-[#FF5A1F] text-white'
                        : 'bg-[#111111] text-[#F7F6F2]',
                    ].join(' ')}
                  >
                    {member.initials}
                  </span>
                ))}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-[#111111]">
                  Team of {AGENCY_CONFIG.teamSize} · {AGENCY_CONFIG.location}
                </div>
                <div className="text-[11px] text-[#4D4B46]">Meet the builders</div>
              </div>
            </Link>
          </div>

          <div className="col-span-4 flex flex-col items-center justify-center gap-2">
            <a
              href="#why-sidequest"
              className="group flex flex-col items-center gap-2 text-xs font-medium text-[#4D4B46] hover:text-[#111111] transition-colors"
            >
              <span>Explore More</span>
              <span className="w-10 h-10 rounded-full border border-dashed border-[#111111]/35 flex items-center justify-center group-hover:border-[#FF5A1F] group-hover:text-[#FF5A1F] transition-colors">
                <ArrowDown className="w-4 h-4" strokeWidth={1.75} />
              </span>
            </a>
          </div>

          <div className="col-span-4 flex items-center justify-end gap-3">
            <Link to="/work" className="glass-pill rounded-full px-5 py-2.5 text-sm font-medium">
              Featured Builds
            </Link>
            <Link
              to="/contact"
              className="glass-pill-orange rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-1.5"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Positioning Split */}
      <section id="why-sidequest" className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-12 gap-12 items-start">
          <Reveal className="col-span-5">
            <h2 className="font-display text-[2.5rem] leading-[1.1] font-semibold text-[#111111]">
              Local roots, international engineering standards.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#4D4B46] max-w-md">
              Small companies and non-technical businesses rarely get clean, custom software—they
              get stuck with clumsy spreadsheets or generic templates. We bridge that gap.
            </p>
            <div className="mt-7">
              <Link
                to="/about"
                className="glass-pill rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 text-[#111111]"
              >
                <span>How our team works</span>
                <ArrowRight className="w-4 h-4 text-[#FF5A1F]" strokeWidth={1.75} />
              </Link>
            </div>
          </Reveal>

          <RevealStagger className="col-span-7 divide-y divide-black/10 border-t border-b border-black/10">
            {[
              {
                title: 'Built for everyday teams, not tech jargon',
                detail:
                  'You talk directly to the five people designing and shipping your product. We translate business goals into clear screens anyone on your staff can learn in minutes.',
              },
              {
                title: 'Designed for desktop and mobile clarity',
                detail:
                  'Whether a shop owner checks inventory on a desktop monitor or a customer books on a budget phone, every workflow feels calm, fast, and reliable.',
              },
              {
                title: 'Practical scope that respects your budget',
                detail:
                  'We help you launch the exact core product you need first, then expand cleanly—no bloated enterprise retainers or unnecessary features.',
              },
            ].map((item) => (
              <RevealItem key={item.title} className="py-6 flex gap-6 items-start">
                <span
                  aria-hidden="true"
                  className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] mt-2 shrink-0"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-[#4D4B46] max-w-[65ch]">
                    {item.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Interactive Service Pillars Showcase */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <Reveal className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-[2.5rem] leading-[1.1] font-semibold text-[#111111]">
              What we build for Clients
            </h2>
            <p className="mt-3 text-base text-[#4D4B46] max-w-xl">
              Four focused Service Pillars covering everything needed to bring a business or
              product online.
            </p>
          </div>
          <Link
            to="/services"
            className="glass-pill rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 shrink-0"
          >
            <span>Explore all services</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 items-stretch">
          <RevealStagger
            className="col-span-5 flex flex-col gap-3"
          >
            <div role="tablist" aria-label="Service Pillars" className="flex flex-col gap-3">
              {SERVICE_PILLARS.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS] ?? Globe;
                const isSelected = pillar.id === activePillar.id;
                return (
                  <RevealItem key={pillar.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActivePillarId(pillar.id)}
                      className={[
                        'w-full text-left rounded-2xl px-5 py-4 flex items-center justify-between gap-4 cursor-pointer',
                        isSelected ? 'glass-pill-dark' : 'glass-pill',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={[
                            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                            isSelected
                              ? 'bg-white/12 text-[#FF5A1F]'
                              : 'bg-[#EFECE4] text-[#111111]',
                          ].join(' ')}
                        >
                          <Icon className="w-5 h-5" strokeWidth={1.75} />
                        </span>
                        <div>
                          <div className="font-display text-base font-semibold">{pillar.title}</div>
                          <div
                            className={[
                              'text-xs mt-0.5',
                              isSelected ? 'text-white/70' : 'text-[#4D4B46]',
                            ].join(' ')}
                          >
                            {pillar.shortTag}
                          </div>
                        </div>
                      </div>
                      <ArrowRight
                        className={[
                          'w-4 h-4 shrink-0 transition-transform',
                          isSelected ? 'text-[#FF5A1F] translate-x-0.5' : 'text-[#6E6B64]',
                        ].join(' ')}
                        strokeWidth={1.75}
                      />
                    </button>
                  </RevealItem>
                );
              })}
            </div>
          </RevealStagger>

          <Reveal delay={0.12} className="col-span-7 glass-window rounded-[24px] p-9 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                role="tabpanel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-[#111111] text-[#FF5A1F] flex items-center justify-center">
                      <ActiveIcon className="w-6 h-6" strokeWidth={1.75} />
                    </span>
                    <span className="glass-pill rounded-full px-3.5 py-1 text-xs font-medium text-[#111111] tabular-nums">
                      {activePillar.timelineHint}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-3xl font-semibold text-[#111111]">
                    {activePillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#4D4B46] max-w-[60ch]">
                    {activePillar.summary}
                  </p>

                  <div className="mt-6 pt-6 border-t border-black/8">
                    <div className="text-xs font-semibold text-[#111111] mb-3">
                      Included deliverables
                    </div>
                    <ul className="grid grid-cols-2 gap-3">
                      {activePillar.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#4D4B46]">
                          <Check className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" strokeWidth={2} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-black/8 flex items-center justify-between gap-4">
                  <div className="text-xs text-[#4D4B46]">
                    <strong className="font-semibold text-[#111111]">Best fit:</strong>{' '}
                    {activePillar.idealFor}
                  </div>
                  <Link
                    to="/contact"
                    className="glass-pill-dark rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5 shrink-0"
                  >
                    <span>Request a Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      {/* Featured Builds Staggered Showcase */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <Reveal className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-[2.5rem] leading-[1.1] font-semibold text-[#111111]">
              Featured Builds
            </h2>
            <p className="mt-3 text-base text-[#4D4B46] max-w-xl">
              Template showcase builds illustrating how we structure retail storefronts,
              service booking apps, and internal dashboards—ready for your live links.
            </p>
          </div>
          <Link
            to="/work"
            className="glass-pill rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 shrink-0"
          >
            <span>View all work</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </Reveal>

        {/* Lead Build */}
        <Reveal delay={0.05}>
          <Link
            to={`/work/${leadBuild.slug}`}
            className="group glass-window rounded-[26px] overflow-hidden grid grid-cols-12 hover:-translate-y-0.5 transition-transform duration-300"
          >
            <div className="col-span-7 bg-[#EFECE4] overflow-hidden h-[360px]">
              <img
                src={leadBuild.image}
                alt={leadBuild.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="col-span-5 p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#4D4B46]">
                  <span>{leadBuild.clientType}</span>
                  <span className="inline-flex items-center gap-1.5 text-[#111111]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                    {leadBuild.category}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold text-[#111111]">
                  {leadBuild.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#4D4B46]">
                  {leadBuild.summary}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {leadBuild.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[#EFECE4] px-3 py-1 text-xs font-medium text-[#111111]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="glass-pill-dark rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5 group-hover:bg-[#FF5A1F] transition-colors">
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* Secondary Builds */}
        <RevealStagger className="grid grid-cols-2 gap-6 mt-6">
          {secondaryBuilds.map((build) => (
            <RevealItem key={build.slug}>
              <Link
                to={`/work/${build.slug}`}
                className="group glass-window rounded-[24px] overflow-hidden flex flex-col h-full hover:-translate-y-0.5 transition-transform duration-300"
              >
                <div className="h-[260px] bg-[#EFECE4] overflow-hidden">
                  <BuildVisual
                    build={build}
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-[#4D4B46]">
                      <span>{build.clientType}</span>
                      <span className="text-[#111111]">{build.category}</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-[#111111]">
                      {build.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#4D4B46]">
                      {build.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#6E6B64]">
                      {build.metricsLabel}
                    </span>
                    <span className="glass-pill rounded-full w-9 h-9 flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* Closing Conversion Window */}
      <section className="max-w-6xl mx-auto px-8 pt-10">
        <Reveal>
          <div className="glass-window-strong rounded-[28px] p-12 grid grid-cols-12 items-center gap-8">
            <div className="col-span-7">
              <h2 className="font-display text-[2.5rem] leading-[1.1] font-semibold text-[#111111]">
                Ready to bring your business online cleanly?
              </h2>
              <p className="mt-3 text-base text-[#4D4B46] max-w-xl">
                Tell us what you’re building or fixing. Send an Inquiry directly to our email, or
                reach out on WhatsApp or Instagram—no formal RFP required.
              </p>
            </div>
            <div className="col-span-5 flex items-center justify-end gap-3">
              <a
                href={AGENCY_CONFIG.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill rounded-full px-5 py-3 text-sm font-medium inline-flex items-center gap-2 text-[#111111]"
              >
                <MessageCircle className="w-4 h-4 text-[#FF5A1F]" strokeWidth={1.75} />
                <span>WhatsApp Us</span>
              </a>
              <Link
                to="/contact"
                className="glass-pill-orange rounded-full px-6 py-3 text-sm font-medium inline-flex items-center gap-2"
              >
                <span>Send an Inquiry</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
