import { ArrowDownRight, FileText } from 'lucide-react';
import { useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { EducationSection } from './components/EducationSection';
import { Navbar } from './components/Navbar';
import { ProjectSection } from './components/ProjectSection';
import { RegressionWorkbench } from './components/RegressionWorkbench';
import { ResumeModal } from './components/ResumeModal';
import { SkillsSection } from './components/SkillsSection';
import { RESUME_PROFILE } from './data/resumeData';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-[#09090B]">
      <Navbar onContactClick={() => scrollToSection('#contact')} />

      <main>
        {/* Split-Screen Hero */}
        <section id="overview" className="mx-auto max-w-6xl px-6 pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Typographic Hierarchy & Career Objective */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-xs font-medium text-zinc-500">
                  <span>{RESUME_PROFILE.role}</span>
                  <span aria-hidden="true" className="mx-2">·</span>
                  <span>Jain University</span>
                  <span aria-hidden="true" className="mx-2">·</span>
                  <span>{RESUME_PROFILE.location}</span>
                </p>

                <h1 className="mt-5 text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] font-bold tracking-tight text-zinc-950 text-balance">
                  Building foundations in machine learning and core programming.
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-[17px]">
                  {RESUME_PROFILE.careerObjective}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setResumeModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1D4ED8] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                  >
                    <FileText className="h-4 w-4" />
                    <span>View Resume PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('#project')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors duration-150 hover:bg-zinc-50 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                  >
                    <span>Explore ML Project</span>
                    <ArrowDownRight className="h-4 w-4 text-zinc-500" />
                  </button>
                </div>
              </div>

              <div className="mt-10 border-t border-zinc-200 pt-5 text-xs text-zinc-500">
                <span>Seeking AI &amp; ML / Software Internship</span>
                <span aria-hidden="true" className="mx-2">·</span>
                <a
                  href={`mailto:${RESUME_PROFILE.email}`}
                  className="font-medium text-zinc-800 hover:text-[#2563EB]"
                >
                  {RESUME_PROFILE.email}
                </a>
                <span aria-hidden="true" className="mx-2">·</span>
                <span className="font-mono tabular-nums text-zinc-800">
                  {RESUME_PROFILE.phone}
                </span>
              </div>
            </div>

            {/* Right Column: Matching-Height Interactive Linear Regression Workbench */}
            <div className="lg:col-span-6">
              <RegressionWorkbench />
            </div>
          </div>

          {/* Full-Width Academic & Technical Snapshot Strip Below Hero Split */}
          <div className="mt-12 grid grid-cols-1 gap-6 rounded-2xl border border-zinc-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {RESUME_PROFILE.keyStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={
                  idx > 0
                    ? 'border-t border-zinc-100 pt-4 sm:border-t-0 sm:pt-0 lg:border-l lg:border-zinc-100 lg:pl-8'
                    : ''
                }
              >
                <p className="font-mono text-2xl font-semibold tracking-tight text-zinc-950 tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">{stat.context}</p>
              </div>
            ))}
          </div>
        </section>

        <ProjectSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection onOpenResumeModal={() => setResumeModalOpen(true)} />
      </main>

      <footer className="border-t border-zinc-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-500">
            © 2026 {RESUME_PROFILE.name} · {RESUME_PROFILE.location}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-600">
            <a href="#overview" className="hover:text-zinc-950">
              Overview
            </a>
            <a href="#project" className="hover:text-zinc-950">
              Project
            </a>
            <a href="#skills" className="hover:text-zinc-950">
              Skills
            </a>
            <a href="#education" className="hover:text-zinc-950">
              Education
            </a>
            <a
              href={RESUME_PROFILE.resumePdfPath}
              download="Aravintha_Krishnan_R_Resume.pdf"
              className="text-[#2563EB] hover:text-[#1D4ED8]"
            >
              Download Resume
            </a>
          </div>
        </div>
      </footer>

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
