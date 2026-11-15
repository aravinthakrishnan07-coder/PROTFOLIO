import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { LINEAR_REGRESSION_PROJECT } from '../data/resumeData';

export function ProjectSection() {
  const [activeStageId, setActiveStageId] = useState<'prepare' | 'train' | 'evaluate'>('prepare');
  const [copiedCode, setCopiedCode] = useState(false);

  const activeStage =
    LINEAR_REGRESSION_PROJECT.workflowStages.find((stage) => stage.id === activeStageId) ??
    LINEAR_REGRESSION_PROJECT.workflowStages[0];

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(activeStage.codeSnippet);
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      setCopiedCode(false);
    }
  };

  return (
    <section id="project" className="border-t border-zinc-200 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Project Summary & Resume Bullets */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-[#2563EB]">
              Featured Project · {LINEAR_REGRESSION_PROJECT.domain}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 text-balance sm:text-4xl">
              {LINEAR_REGRESSION_PROJECT.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              {LINEAR_REGRESSION_PROJECT.summary}
            </p>

            <ul className="mt-8 space-y-4 border-t border-zinc-200 pt-6">
              {LINEAR_REGRESSION_PROJECT.bullets.map((bullet, idx) => (
                <li key={idx} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
                  <span className="font-mono text-xs font-medium text-zinc-400 tabular-nums pt-0.5">
                    0{idx + 1}.
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Interactive 3-Stage ML Workflow Explorer */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-200 bg-[#FAFAFB] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
                <h3 className="text-base font-semibold text-zinc-950">
                  Machine Learning Workflow Stages
                </h3>

                <div
                  role="tablist"
                  aria-label="Machine learning workflow stages"
                  className="flex flex-wrap items-center gap-1 rounded-lg bg-zinc-200/70 p-1"
                >
                  {LINEAR_REGRESSION_PROJECT.workflowStages.map((stage) => (
                    <button
                      key={stage.id}
                      role="tab"
                      aria-selected={activeStageId === stage.id}
                      type="button"
                      onClick={() => setActiveStageId(stage.id)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        activeStageId === stage.id
                          ? 'bg-white text-zinc-950 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      {stage.stepNumber}. {stage.id === 'prepare' ? 'Prepare' : stage.id === 'train' ? 'Train' : 'Evaluate'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-xs text-zinc-500 tabular-nums">
                  Stage {activeStage.stepNumber} of 03
                </p>
                <h4 className="mt-1 text-xl font-semibold text-zinc-950">
                  {activeStage.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {activeStage.explanation}
                </p>
              </div>

              {/* Clean Python Reference Block */}
              <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 text-zinc-100">
                <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
                  <span className="font-mono text-xs text-zinc-400">
                    linear_regression_study.py
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySnippet}
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy snippet</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-200 sm:text-[13px]">
                  <code>{activeStage.codeSnippet}</code>
                </pre>
              </div>

              <p className="mt-4 text-xs text-zinc-500">
                Focus: {activeStage.resumePoint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
