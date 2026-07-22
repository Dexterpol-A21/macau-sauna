"use client";

interface Props {
  href: string;
  label: string;
}

export default function SecondaryCTA({ href, label }: Props) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] px-6 py-2.5 text-sm font-semibold tracking-wider text-[var(--color-primary)] transition-all hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]"
    >
      {label}
    </a>
  );
}
