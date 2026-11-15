import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { RESUME_PROFILE } from '../data/resumeData';

interface NavbarProps {
  onContactClick: () => void;
}

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Project', href: '#project' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
];

export function Navbar({ onContactClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#FAFAFB]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#overview"
          className="font-display text-lg font-bold tracking-tight text-zinc-950 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
        >
          {RESUME_PROFILE.name}
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 transition-colors duration-150 hover:text-zinc-950 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-200 hover:after:w-full whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action on desktop, menu toggle on mobile */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onContactClick}
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1D4ED8] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            Get in Touch
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-800 transition-colors hover:bg-zinc-100 md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-white px-6 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleMobileNav(item.href)}
                className="flex h-11 items-center text-left text-sm font-medium text-zinc-700 hover:text-zinc-950 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm font-medium text-white hover:bg-[#1D4ED8] cursor-pointer"
            >
              Get in Touch
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
