import { EDUCATION_LIST } from '../data/resumeData';

export function EducationSection() {
  return (
    <section id="education" className="border-t border-zinc-200 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-[#2563EB]">Academic Record</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 text-balance sm:text-4xl">
            Education &amp; Academic Standing
          </h2>
          <p className="mt-3 text-base text-zinc-600">
            Currently pursuing an undergraduate degree in Computer Science Engineering with a specialization in Artificial Intelligence and Machine Learning.
          </p>
        </div>

        <div className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200">
          {EDUCATION_LIST.map((edu) => (
            <article
              key={edu.id}
              className="grid grid-cols-1 gap-6 py-8 md:grid-cols-12 md:items-start"
            >
              <div className="md:col-span-4">
                <p className="text-xs text-zinc-500">{edu.periodOrStatus}</p>
                <h3 className="mt-1.5 text-xl font-semibold text-zinc-950">
                  {edu.institution}
                </h3>
              </div>

              <div className="md:col-span-5">
                <p className="text-base font-medium text-zinc-900">
                  {edu.credential}
                </p>
                <ul className="mt-3 space-y-2">
                  {edu.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="text-sm leading-relaxed text-zinc-600"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-3 md:text-right">
                <p className="text-xs text-zinc-500">{edu.scoreLabel}</p>
                <p className="mt-1 font-mono text-2xl font-semibold text-zinc-950 tabular-nums">
                  {edu.scoreValue}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
