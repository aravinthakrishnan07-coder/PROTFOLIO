import { useMemo, useState } from 'react';
import { SKILLS_LIST, SkillEntry } from '../data/resumeData';

type FilterCategory = 'all' | SkillEntry['category'];

const FILTER_OPTIONS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All Competencies' },
  { id: 'programming', label: 'Programming' },
  { id: 'tools', label: 'Tools' },
  { id: 'soft', label: 'Soft Skills' },
  { id: 'languages', label: 'Languages' },
];

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('python');

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return SKILLS_LIST;
    return SKILLS_LIST.filter((skill) => skill.category === selectedCategory);
  }, [selectedCategory]);

  const activeSkill =
    filteredSkills.find((s) => s.id === selectedSkillId) ?? filteredSkills[0];

  return (
    <section id="skills" className="border-t border-zinc-200 bg-[#FAFAFB] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 border-b border-zinc-200 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium text-[#2563EB]">
              Technical &amp; Personal Profile
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 text-balance sm:text-4xl">
              Skills &amp; Languages
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter skills by category"
            className="flex flex-wrap items-center gap-1 rounded-lg bg-zinc-200/70 p-1"
          >
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(option.id);
                  const firstMatch =
                    option.id === 'all'
                      ? SKILLS_LIST[0]
                      : SKILLS_LIST.find((s) => s.category === option.id);
                  if (firstMatch) setSelectedSkillId(firstMatch.id);
                }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === option.id
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hairline List + Focused Detail Split */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="divide-y divide-zinc-200 border-y border-zinc-200 bg-white rounded-xl overflow-hidden">
              {filteredSkills.map((skill) => {
                const isSelected = activeSkill?.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => setSelectedSkillId(skill.id)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-150 cursor-pointer ${
                      isSelected ? 'bg-zinc-50' : 'hover:bg-zinc-50/70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span>{skill.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{skill.proficiencyNote}</span>
                      </div>
                      <p className="mt-1 text-base font-semibold text-zinc-950">
                        {skill.name}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-medium whitespace-nowrap shrink-0 ${
                        isSelected ? 'text-[#2563EB]' : 'text-zinc-400'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Inspect'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-5">
            {activeSkill && (
              <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-7">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>{activeSkill.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#2563EB]">
                    {activeSkill.proficiencyNote}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950">
                  {activeSkill.name}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                  {activeSkill.detail}
                </p>

                <div className="mt-8 border-t border-zinc-100 pt-5">
                  <p className="text-xs text-zinc-500">
                    Development Environment
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">
                    Visual Studio Code · B.Tech CSE (AI &amp; ML) Track
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
