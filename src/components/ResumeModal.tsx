import { Download, X } from 'lucide-react';
import { useEffect } from 'react';
import { RESUME_PROFILE } from '../data/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-6 py-4">
          <div>
            <h2 id="resume-modal-title" className="text-base font-semibold text-zinc-950">
              {RESUME_PROFILE.name} — Resume
            </h2>
            <p className="text-xs text-zinc-500">
              Original PDF Document · {RESUME_PROFILE.location}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
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

        <div className="flex-1 bg-zinc-100">
          <iframe
            src={RESUME_PROFILE.resumePdfPath}
            title="Aravintha Krishnan R Resume PDF"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
