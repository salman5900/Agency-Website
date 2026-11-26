import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { BuildVisual } from '../components/BuildVisual';
import { EASE_OUT_EXPO, Reveal, RevealItem, RevealStagger } from '../components/MotionPrimitives';
import { FEATURED_BUILDS } from '../data/agency';

export function BuildDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const buildIndex = FEATURED_BUILDS.findIndex((item) => item.slug === slug);
  const build = buildIndex >= 0 ? FEATURED_BUILDS[buildIndex] : null;

  if (!build) {
    return (
      <div className="pt-28 lg:pt-40 pb-20 max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <div className="glass-window rounded-[24px] lg:rounded-[28px] p-8 lg:p-12">
          <h1 className="font-display text-2xl lg:text-3xl font-semibold text-[#111111]">
            Featured Build not found
          </h1>
          <p className="mt-3 text-sm lg:text-base text-[#4D4B46]">
            The build you requested doesn’t exist or may have been renamed.
          </p>
          <div className="mt-7">
            <Link
              to="/work"
              className="glass-pill-dark rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Featured Builds</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nextBuild = FEATURED_BUILDS[(buildIndex + 1) % FEATURED_BUILDS.length];
  const hasRealLiveUrl = !build.liveUrlPlaceholder.startsWith('#');

  return (
    <div className="pt-24 lg:pt-36 pb-10">
      <section className="max-w-6xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <Link
            to="/work"
            className="glass-pill rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-2 text-[#111111]"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
            <span>All Featured Builds</span>
          </Link>

          <div className="mt-6 lg:mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#4D4B46]">
                <span>{build.clientType}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5 text-[#111111]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                  {build.category}
                </span>
              </div>
              <h1 className="mt-3 font-display text-[2.25rem] lg:text-[3.25rem] leading-[1.06] font-semibold text-[#111111]">
                {build.title}
              </h1>
              <p className="mt-3.5 lg:mt-4 text-base lg:text-lg leading-relaxed text-[#4D4B46] max-w-2xl">
                {build.summary}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              {hasRealLiveUrl ? (
                <a
                  href={build.liveUrlPlaceholder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-pill rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Open Live Link</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span
                  title="Replace liveUrlPlaceholder in src/data/agency.ts with your live project URL"
                  className="glass-pill rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 text-[#4D4B46] whitespace-nowrap shrink-0"
                >
                  <ExternalLink className="w-4 h-4 text-[#FF5A1F]" />
                  <span>Live Link Slot (Template)</span>
                </span>
              )}
              <Link
                to="/contact"
                className="glass-pill-orange rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <span>Build Similar</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="mt-8 lg:mt-10 glass-window rounded-[24px] lg:rounded-[28px] overflow-hidden h-[260px] lg:h-[480px] bg-[#EFECE4]"
        >
          <BuildVisual build={build} />
        </motion.div>

        {/* Challenge & Solution */}
        <RevealStagger className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <RevealItem className="lg:col-span-6 glass-window rounded-[22px] lg:rounded-[24px] p-6 lg:p-8">
            <h2 className="font-display text-xl lg:text-2xl font-semibold text-[#111111]">
              Client Challenge
            </h2>
            <p className="mt-3 text-[0.95rem] lg:text-base leading-relaxed text-[#4D4B46]">
              {build.challenge}
            </p>
          </RevealItem>

          <RevealItem className="lg:col-span-6 glass-window rounded-[22px] lg:rounded-[24px] p-6 lg:p-8">
            <h2 className="font-display text-xl lg:text-2xl font-semibold text-[#111111]">
              How SideQuest Solved It
            </h2>
            <p className="mt-3 text-[0.95rem] lg:text-base leading-relaxed text-[#4D4B46]">
              {build.solution}
            </p>
          </RevealItem>
        </RevealStagger>

        {/* Deliverables & Tech Stack */}
        <Reveal delay={0.05} className="mt-5 lg:mt-6">
          <div className="glass-window rounded-[22px] lg:rounded-[24px] p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10">
            <div className="lg:col-span-7">
              <h2 className="font-display text-xl font-semibold text-[#111111] mb-4">
                Core Deliverables
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {build.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#111111]">
                    <Check className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-xl font-semibold text-[#111111] mb-4">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {build.stack.map((tech) => (
                  <span
                    key={tech}
                    className="glass-pill rounded-full px-4 py-1.5 text-xs font-medium text-[#111111]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Next Featured Build */}
        <Reveal delay={0.05} className="mt-8 lg:mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-window-strong rounded-[22px] lg:rounded-[24px] p-6 lg:p-7">
            <div>
              <div className="text-xs font-medium text-[#4D4B46]">Next Featured Build</div>
              <div className="font-display text-xl lg:text-2xl font-semibold text-[#111111] mt-1">
                {nextBuild.title}
              </div>
            </div>
            <Link
              to={`/work/${nextBuild.slug}`}
              className="glass-pill-dark rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 self-start sm:self-auto"
            >
              <span>View {nextBuild.title}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
