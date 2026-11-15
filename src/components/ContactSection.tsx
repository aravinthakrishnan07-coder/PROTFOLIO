import { Check, Copy, Download, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { RESUME_PROFILE } from '../data/resumeData';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
}

export function ContactSection({ onOpenResumeModal }: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | 'draft' | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [messageText, setMessageText] = useState(
    'Hello Aravintha, I reviewed your AI & ML portfolio and would like to connect regarding an internship opportunity.'
  );
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const handleCopy = async (value: string, field: 'email' | 'phone' | 'draft') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `Internship Opportunity — ${senderOrg.trim() || senderName.trim() || 'Portfolio Inquiry'}`
    );
    const body = encodeURIComponent(
      `${messageText.trim()}\n\nFrom: ${senderName.trim() || 'Recruiter / Hiring Team'}${
        senderOrg.trim() ? ` (${senderOrg.trim()})` : ''
      }`
    );
    return `mailto:${RESUME_PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const handleComposeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageText.trim()) {
      setFormFeedback('Please enter a brief message before sending.');
      return;
    }
    setFormFeedback('Opening your email client with this draft.');
    const link = document.createElement('a');
    link.href = buildMailtoHref();
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <section id="contact" className="border-t border-zinc-200 bg-[#FAFAFB] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Details & Resume Actions */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-[#2563EB]">
              Internship Inquiries
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 text-balance sm:text-4xl">
              Connect with Aravintha
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              Open to internship opportunities where I can apply programming fundamentals, contribute to real-world software, and deepen practical machine learning skills.
            </p>

            <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200 bg-white rounded-xl">
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="h-4 w-4 text-zinc-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-500">Email</p>
                    <a
                      href={`mailto:${RESUME_PROFILE.email}`}
                      className="block truncate text-sm font-medium text-zinc-950 hover:text-[#2563EB]"
                    >
                      {RESUME_PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(RESUME_PROFILE.email, 'email')}
                  className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Phone className="h-4 w-4 text-zinc-500 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500">Phone</p>
                    <a
                      href={`tel:${RESUME_PROFILE.phone}`}
                      className="font-mono text-sm font-medium text-zinc-950 tabular-nums hover:text-[#2563EB]"
                    >
                      {RESUME_PROFILE.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(RESUME_PROFILE.phone, 'phone')}
                  className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 px-5 py-4">
                <MapPin className="h-4 w-4 text-zinc-500 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500">Location</p>
                  <p className="text-sm font-medium text-zinc-950">
                    {RESUME_PROFILE.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Preview Resume PDF</span>
              </button>

              <a
                href={RESUME_PROFILE.resumePdfPath}
                download="Aravintha_Krishnan_R_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Message Draft Composer */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleComposeSubmit}
              className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8"
            >
              <h3 className="text-lg font-semibold text-zinc-950">
                Draft an Internship Message
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Compose a note to launch in your email client or copy directly to your clipboard.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-zinc-700"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-org"
                    className="block text-xs font-medium text-zinc-700"
                  >
                    Company / Team
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    value={senderOrg}
                    onChange={(e) => setSenderOrg(e.target.value)}
                    placeholder="e.g. Engineering Team"
                    className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-zinc-700"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-zinc-950 focus:border-[#2563EB] focus:outline-none"
                />
              </div>

              {formFeedback && (
                <p className="mt-3 text-xs font-medium text-[#2563EB]" role="status">
                  {formFeedback}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `To: ${RESUME_PROFILE.email}\nFrom: ${senderName || 'Hiring Team'}${
                        senderOrg ? ` (${senderOrg})` : ''
                      }\n\n${messageText}`,
                      'draft'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedField === 'draft' ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>Draft Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send via Email Client</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
