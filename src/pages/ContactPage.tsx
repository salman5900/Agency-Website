import { type FormEvent, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ChannelIcon } from '../components/ChannelIcon';
import { EASE_OUT_EXPO, RevealItem, RevealStagger } from '../components/MotionPrimitives';
import { AGENCY_CONFIG, DIRECT_CHANNELS } from '../data/agency';

const PROJECT_TYPES = [
  'Web Application / Business Website',
  'Mobile App (iOS & Android)',
  'Internal Tool / Inventory & Ops Dashboard',
  'UI/UX Design & Digital Launch',
  'Not sure yet — help us scope',
];

interface InquiryFormState {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'sent-live' | 'sent-preview' | 'error';

export function ContactPage() {
  const [form, setForm] = useState<InquiryFormState>({
    name: '',
    email: '',
    projectType: PROJECT_TYPES[0],
    message: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const buildMailtoFallback = () => {
    const subject = encodeURIComponent(`[BetterConnect Inquiry] ${form.projectType} — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.projectType}\n\n${form.message}`,
    );
    return `mailto:${AGENCY_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email address, and project details.');
      return;
    }

    setStatus('submitting');

    if (!AGENCY_CONFIG.inquiryEndpoint) {
      // Static prototype mode until owner plugs in Web3Forms / Formspree endpoint
      window.setTimeout(() => {
        setStatus('sent-preview');
      }, 450);
      return;
    }

    try {
      const response = await fetch(AGENCY_CONFIG.inquiryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.projectType,
          message: form.message,
          _subject: `[BetterConnect Inquiry] ${form.projectType} — ${form.name}`,
          _template: 'table',
          source: 'BetterConnect Website',
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: string | boolean }
        | null;

      if (!response.ok || result?.success === 'false' || result?.success === false) {
        throw new Error('Could not deliver inquiry right now.');
      }

      setStatus('sent-live');
      setForm({
        name: '',
        email: '',
        projectType: PROJECT_TYPES[0],
        message: '',
      });
    } catch {
      setStatus('error');
      setErrorMessage(
        'Delivery failed from the browser. Please retry or reach us directly on WhatsApp or email.',
      );
    }
  };

  return (
    <div className="pt-24 lg:pt-36 pb-10">
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        className="max-w-6xl mx-auto px-5 lg:px-8 pb-8 lg:pb-12"
      >
        <h1 className="font-display text-[2.25rem] lg:text-[3.25rem] leading-[1.06] font-semibold text-[#111111] max-w-2xl">
          Start a conversation with BetterConnect.
        </h1>
        <p className="mt-3.5 lg:mt-4 text-[0.95rem] lg:text-base leading-relaxed text-[#4D4B46] max-w-2xl">
          Send an Inquiry straight to our inbox below, or pick a Direct Channel—WhatsApp or
          direct email—whichever feels easiest.
        </p>
      </motion.section>

      <section className="max-w-6xl mx-auto px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* 4-Field Inquiry Form (First on Mobile, Left on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
          className="lg:col-span-7 glass-window rounded-[24px] lg:rounded-[28px] p-6 lg:p-9"
        >
          <h2 className="font-display text-2xl font-semibold text-[#111111]">
            Send an Inquiry
          </h2>
          <p className="mt-1.5 text-sm text-[#4D4B46]">
            Tell us a bit about your business and what you want to build.
          </p>

          {status === 'sent-live' || status === 'sent-preview' ? (
            <div
              role="status"
              className="mt-7 rounded-2xl bg-[#EFECE4] p-6 lg:p-7 border border-black/8"
            >
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-6 h-6 text-[#FF5A1F] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#111111]">
                    {status === 'sent-live'
                      ? 'Inquiry delivered to our inbox'
                      : 'Inquiry captured (Prototype Mode)'}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4D4B46]">
                    {status === 'sent-live'
                      ? 'Thank you for reaching out. One of our five builders will reply within one business day.'
                      : 'Your form validation and submission flow are ready. Once you supply your email/form endpoint key, this button delivers Inquiries directly to your inbox.'}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {status === 'sent-preview' && (
                      <a
                        href={buildMailtoFallback()}
                        className="glass-pill-dark rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email App</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="glass-pill rounded-full px-4 py-2 text-xs font-medium cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 lg:mt-7 space-y-5" noValidate>
              {status === 'error' && errorMessage && (
                <div
                  role="alert"
                  className="rounded-2xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/25 px-4 py-3 text-sm text-[#111111] flex items-center gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-semibold text-[#111111] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g., Arjun Menon"
                    className="w-full rounded-2xl bg-white/80 border border-black/10 px-4 py-3 text-sm text-[#111111] placeholder:text-[#6E6B64] focus:border-[#FF5A1F] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs font-semibold text-[#111111] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@yourbusiness.com"
                    className="w-full rounded-2xl bg-white/80 border border-black/10 px-4 py-3 text-sm text-[#111111] placeholder:text-[#6E6B64] focus:border-[#FF5A1F] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-type"
                  className="block text-xs font-semibold text-[#111111] mb-2"
                >
                  Business / Project Type
                </label>
                <select
                  id="inquiry-type"
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full rounded-2xl bg-white/80 border border-black/10 px-4 py-3 text-sm text-[#111111] focus:border-[#FF5A1F] focus:outline-none transition-colors"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-xs font-semibold text-[#111111] mb-2"
                >
                  What are we building?
                </label>
                <textarea
                  id="inquiry-message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share what your business does, what problem you want solved, and any rough timeline..."
                  className="w-full rounded-2xl bg-white/80 border border-black/10 px-4 py-3 text-sm text-[#111111] placeholder:text-[#6E6B64] focus:border-[#FF5A1F] focus:outline-none transition-colors resize-y"
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#6E6B64]">
                  Replies usually within 24 hours · IST
                </span>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="glass-pill-orange rounded-full px-6 py-3 text-sm font-medium inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" strokeWidth={2} />
                  <span>{status === 'submitting' ? 'Sending...' : 'Send Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Direct Channels */}
        <RevealStagger className="lg:col-span-5 space-y-4">
          {DIRECT_CHANNELS.map((channel) => (
            <RevealItem key={channel.id}>
              <a
                href={channel.href}
                target={channel.id === 'email' ? undefined : '_blank'}
                rel={channel.id === 'email' ? undefined : 'noopener noreferrer'}
                className="group glass-window rounded-[22px] p-5 lg:p-6 flex items-start justify-between gap-4 hover:-translate-y-0.5 transition-transform duration-200"
              >
                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-2xl bg-[#111111] text-[#FF5A1F] flex items-center justify-center shrink-0">
                    <ChannelIcon id={channel.id} className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-display text-lg font-semibold text-[#111111]">
                      {channel.label}
                    </div>
                    <div className="text-xs font-medium text-[#FF5A1F] mt-0.5">
                      {channel.handle}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#4D4B46]">
                      {channel.description}
                    </p>
                  </div>
                </div>
                <span className="glass-pill rounded-full w-9 h-9 flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </a>
            </RevealItem>
          ))}

          <RevealItem>
            <div className="glass-window rounded-[22px] p-5 lg:p-6 flex items-center gap-3.5 text-sm text-[#4D4B46]">
              <Clock className="w-5 h-5 text-[#111111] shrink-0" strokeWidth={1.75} />
              <div>
                <div className="font-semibold text-[#111111]">
                  {AGENCY_CONFIG.location} · {AGENCY_CONFIG.timezone}
                </div>
                <div className="text-xs mt-0.5">Mon – Sat · 9:30 AM to 6:30 PM IST</div>
              </div>
            </div>
          </RevealItem>
        </RevealStagger>
      </section>
    </div>
  );
}
