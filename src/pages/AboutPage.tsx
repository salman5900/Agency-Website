import { ArrowUpRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { EASE_OUT_EXPO, Reveal, RevealItem, RevealStagger } from '../components/MotionPrimitives';
import { AGENCY_CONFIG, TEAM_MEMBERS } from '../data/agency';

const PRINCIPLES = [
  {
    title: 'International craft for local scale',
    body: 'Small companies deserve the same visual clarity, speed, and reliability as global SaaS brands—without enterprise budgets.',
  },
  {
    title: 'Direct access to the builders',
    body: 'No layers of account managers. When you message SideQuest, you talk directly with the five people designing and shipping your software.',
  },
  {
    title: 'Plain English, dependable delivery',
    body: 'We explain every trade-off clearly, ship testable builds weekly, and make sure your staff feels confident running what we hand over.',
  },
];

export function AboutPage() {
  return (
    <div className="pt-36 pb-10">
      {/* Studio Story Hero */}
      <section className="max-w-6xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="col-span-7"
          >
            <h1 className="font-display text-[3.25rem] leading-[1.06] font-semibold text-[#111111]">
              Five builders in Kerala bringing everyday businesses online with craft.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="col-span-5 glass-window rounded-[24px] p-7"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#111111]">
              <MapPin className="w-4 h-4 text-[#FF5A1F]" strokeWidth={1.75} />
              <span>
                {AGENCY_CONFIG.location} · Working with Clients worldwide
              </span>
            </div>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-[#4D4B46]">
              SideQuest started with a simple observation: great local shops, clinics, small
              agencies, and non-technical firms run on grit, yet their software is often
              clunky or nonexistent. We build calm, durable digital products that match their
              ambition.
            </p>
            <div className="mt-5">
              <Link
                to="/contact"
                className="glass-pill-dark rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5"
              >
                <span>Talk with our team</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles Strip */}
      <section className="max-w-6xl mx-auto px-8 py-10">
        <RevealStagger className="grid grid-cols-3 gap-8 border-t border-b border-black/10 py-10">
          {PRINCIPLES.map((item) => (
            <RevealItem key={item.title}>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5A1F] mt-2.5 shrink-0" aria-hidden="true" />
                <h2 className="font-display text-xl font-semibold text-[#111111]">
                  {item.title}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4D4B46]">{item.body}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* Team of Five */}
      <section className="max-w-6xl mx-auto px-8 pt-14">
        <Reveal className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-[2.5rem] leading-[1.1] font-semibold text-[#111111]">
              The Team of Five
            </h2>
            <p className="mt-3 text-base text-[#4D4B46] max-w-xl">
              Placeholder profiles structured around our five core disciplines—ready for your
              team’s names, roles, and portraits.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="grid grid-cols-6 gap-5">
          {TEAM_MEMBERS.map((member, index) => (
            <RevealItem
              key={member.id}
              className={index < 2 ? 'col-span-3' : 'col-span-2'}
            >
              <article className="glass-window rounded-[24px] p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#111111] text-[#F7F6F2] font-display font-semibold text-base flex items-center justify-center relative">
                      <span>{member.initials}</span>
                      {index === 0 && (
                        <span
                          aria-hidden="true"
                          className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] border-2 border-[#111111] -top-1 -right-1 absolute"
                        />
                      )}
                    </div>
                    <span className="rounded-full bg-[#EFECE4] px-3 py-1 text-xs font-medium text-[#111111]">
                      {member.role}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-semibold text-[#111111]">
                    {member.name}
                  </h3>
                  <div className="mt-1 text-xs font-medium text-[#FF5A1F]">{member.focus}</div>
                  <p className="mt-3 text-sm leading-relaxed text-[#4D4B46]">{member.bio}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>
    </div>
  );
}
