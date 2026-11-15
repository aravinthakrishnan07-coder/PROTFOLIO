import { Download, FileText, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  EDUCATION_LIST,
  LINEAR_REGRESSION_PROJECT,
  RESUME_PROFILE,
  SKILLS_LIST,
} from '../data/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'formatted' | 'pdf'>('formatted');

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const programmingSkills = SKILLS_LIST.filter((s) => s.category === 'programming');
  const toolSkills = SKILLS_LIST.filter((s) => s.category === 'tools');
  const softSkills = SKILLS_LIST.filter((s) => s.category === 'soft');
  const spokenLanguages = SKILLS_LIST.filter((s) => s.category === 'languages');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-xs sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 px-6 py-4">
          <div>
            <h2 id="resume-modal-title" className="text-base font-semibold text-zinc-950">
              {RESUME_PROFILE.name} — Resume
            </h2>
            <p className="text-xs text-zinc-500">
              {RESUME_PROFILE.role} · {RESUME_PROFILE.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1">
              <button
                type="button"
                onClick={() => setViewMode('formatted')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'formatted'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                Formatted View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                Original PDF
              </button>
            </div>

            <a
              href={RESUME_PROFILE.resumePdfPath}
              download="Aravintha_Krishnan_R_Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#1D4ED8] whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              aria-label="Close resume preview"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {viewMode === 'formatted' ? (
          <div className="flex-1 overflow-y-auto bg-zinc-50 p-6 sm:p-10">
            <div className="mx-auto max-w-3xl rounded-xl border border-zinc-200 bg-white p-8 sm:p-10">
              <div className="border-b border-zinc-200 pb-6 text-center">
                <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-950">
                  {RESUME_PROFILE.name}
                </h3>
                <p className="mt-2 text-xs text-zinc-600 sm:text-sm">
                  <span>{RESUME_PROFILE.location}</span>
                  <span aria-hidden="true" className="mx-2">|</span>
                  <span className="font-mono tabular-nums">{RESUME_PROFILE.phone}</span>
                  <span aria-hidden="true" className="mx-2">|</span>
                  <a
                    href={`mailto:${RESUME_PROFILE.email}`}
                    className="text-[#2563EB] hover:underline"
                  >
                    {RESUME_PROFILE.email}
                  </a>
                </p>
              </div>

              <div className="mt-6 space-y-6 text-sm text-zinc-700">
                <section>
                  <h4 className="border-b border-zinc-200 pb-1.5 text-xs font-bold tracking-wider text-zinc-900">
                    Career Objective
                  </h4>
                  <p className="mt-2.5 leading-relaxed">
                    {RESUME_PROFILE.careerObjective}
                  </p>
                </section>

                <section>
                  <h4 className="border-b border-zinc-200 pb-1.5 text-xs font-bold tracking-wider text-zinc-900">
                    Education
                  </h4>
                  <div className="mt-3 space-y-3">
                    {EDUCATION_LIST.map((edu) => (
                      <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <p className="font-semibold text-zinc-950">
                            {edu.institution} — {edu.credential}
                          </p>
                          <p className="text-xs text-zinc-500">{edu.periodOrStatus}</p>
                        </div>
                        <p className="font-mono text-xs font-semibold text-zinc-900 tabular-nums">
                          {edu.scoreLabel}: {edu.scoreValue}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="border-b border-zinc-200 pb-1.5 text-xs font-bold tracking-wider text-zinc-900">
                    Technical Skills
                  </h4>
                  <p className="mt-2.5">
                    <span className="font-semibold text-zinc-950">Programming Languages: </span>
                    {programmingSkills
                      .map((s) => (s.id === 'java' ? 'Java (Intermediate)' : s.name))
                      .join(', ')}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-zinc-950">Development Tool: </span>
                    {toolSkills.map((s) => s.name).join(', ')}
                  </p>
                </section>

                <section>
                  <h4 className="border-b border-zinc-200 pb-1.5 text-xs font-bold tracking-wider text-zinc-900">
                    Project
                  </h4>
                  <p className="mt-2.5 font-semibold text-zinc-950">
                    {LINEAR_REGRESSION_PROJECT.title} | {LINEAR_REGRESSION_PROJECT.domain}
                  </p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    {LINEAR_REGRESSION_PROJECT.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="border-b border-zinc-200 pb-1.5 text-xs font-bold tracking-wider text-zinc-900">
                    Soft Skills
                  </h4>
                  <p className="mt-2.5">{softSkills.map((s) => s.name).join(' · ')}</p>
                </section>

                <section>
                  <h4 className="border-b border-zinc-200 pb-1.5 text-xs font-bold tracking-wider text-zinc-900">
                    Languages
                  </h4>
                  <p className="mt-2.5">{spokenLanguages.map((s) => s.name).join(' · ')}</p>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col bg-zinc-100">
            <object
              data={RESUME_PROFILE.resumePdfPath}
              type="application/pdf"
              className="h-full w-full flex-1"
            >
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <FileText className="h-10 w-10 text-zinc-400" />
                <p className="mt-3 text-sm font-medium text-zinc-900">
                  Inline PDF preview is restricted in this browser frame.
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Switch to Formatted View above or download the original PDF file directly.
                </p>
                <a
                  href={RESUME_PROFILE.resumePdfPath}
                  download="Aravintha_Krishnan_R_Resume.pdf"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-medium text-white hover:bg-[#1D4ED8]"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </object>
          </div>
        )}
      </div>
    </div>
  );
}
