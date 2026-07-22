"use client";

interface PrimaryCTAProps {
  text: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

/**
 * Neon-red CTA button — exact copy from HeroGallery .cta--primary
 * Colors are neon red: #C41E3A → #FF2D55 → #FF6B85
 * Renders as <a> when href is provided, <button> when onClick is used.
 */
export default function PrimaryCTA({ text, href, target, rel, onClick }: PrimaryCTAProps) {
  const sharedStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    minWidth: 120,
    height: 50,
    boxSizing: "border-box" as const,
    padding: "0 2rem",
    fontSize: "0.88rem",
    fontWeight: 600,
    letterSpacing: "0.10em",
    lineHeight: "1",
    textTransform: "uppercase" as const,
    textDecoration: "none" as const,
    whiteSpace: "nowrap" as const,
    cursor: "pointer",
    border: "none",
    borderRadius: "0.5em",
    color: "#FFF8F0",
    backgroundImage: "linear-gradient(325deg, #C41E3A 0%, #FF2D55 45%, #FF6B85 90%)",
    backgroundSize: "280% auto",
    backgroundPosition: "left top",
    transition: "0.8s",
    fontFamily: "'Noto Sans TC', system-ui, sans-serif",
    boxShadow: "0 0 20px rgba(255,45,85,0.5), 0 5px 5px -1px rgba(255,45,85,0.25), inset 4px 4px 8px rgba(223,200,120,0.5), inset -4px -4px 8px rgba(138,110,46,0.35)",
  } as const;

  const hoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.backgroundPosition = "right top"; },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.backgroundPosition = "left top"; },
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        style={sharedStyle}
        {...hoverHandlers}
      >
        {text}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={sharedStyle}
      {...hoverHandlers}
    >
      {text}
    </a>
  );
}
