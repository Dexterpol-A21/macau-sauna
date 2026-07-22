"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Spas", href: "/#spas" },
  { label: "Ranking", href: "/ranking" },
  { label: "Guide", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function TopNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-[#0a0a0a] backdrop-blur-md" : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/favicon/favicon.svg"
              alt=""
              className="h-8 w-8 sm:h-9 sm:w-9"
              width={36}
              height={36}
            />
            <span className="truncate text-sm font-bold tracking-wider text-[var(--color-primary)] sm:text-2xl">
              <span className="min-[380px]:hidden">Macau Sauna</span>
              <span className="hidden min-[380px]:inline">Macau Sauna Booking</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest text-white/70 transition-colors hover:text-[var(--color-primary)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="p-1 text-white/70 transition-colors hover:text-[var(--color-primary)] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-[#0a0a0a] md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm uppercase tracking-widest text-white/80 transition-colors hover:bg-white/5 hover:text-[var(--color-primary)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
