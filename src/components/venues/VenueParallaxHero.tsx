"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

// ── Parallax secondary images: picks images from the venue's local folder ──
function buildAmbientImages(folder: string, base: string) {
  return [
    {
      src: `${folder}/${base}2.webp`,
      alt: "Spa interior",
      start: -120,
      end: 180,
      className: "w-1/3 rounded-lg shadow-2xl",
    },
    {
      src: `${folder}/${base}4.webp`,
      alt: "Lounge area",
      start: 160,
      end: -200,
      className: "mx-auto w-2/3 rounded-lg shadow-2xl",
    },
    {
      src: `${folder}/${base}7.webp`,
      alt: "Venue detail",
      start: -160,
      end: 220,
      className: "ml-auto w-1/3 rounded-lg shadow-2xl",
    },
    {
      src: `${folder}/${base}3.webp`,
      alt: "Interior shot",
      start: 0,
      end: -320,
      className: "ml-24 w-5/12 rounded-lg shadow-2xl",
    },
  ];
}

interface VenueParallaxHeroProps {
  venue: Venue;
  accent: string;
  tags: { key: string; label: string; color: string; primary: boolean }[];
  /** Path to the venue's local image folder, e.g. "/images/venues/sauna1" */
  imageFolder: string;
  /** Main hero image (local or URL) */
  heroImage: string;
  /** Base name for the venue's image files, e.g. "manhaospa" or "numbernine" */
  imageBase: string;
}

const SECTION_HEIGHT = 1800;

export default function VenueParallaxHero({ venue, accent, tags, imageFolder, heroImage, imageBase }: VenueParallaxHeroProps) {
  const hasLocalImages = imageFolder.length > 0;
  const ambientImages = hasLocalImages ? buildAmbientImages(imageFolder, imageBase) : null;

  return (
    <div style={{ background: "#000000" }}>
      {/* Main parallax section */}
      <div
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
        className="relative w-full"
      >
          <CenterImage image={heroImage} accent={accent} />

          {ambientImages && <ParallaxImages images={ambientImages} />}

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-black" />
        </div>
      </div>
  );
}

/* ── Center image with clip-path reveal ── */
function CenterImage({ image, accent }: { image: string; accent: string }) {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT], [30, 0]);
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT], [70, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["115%", "100%"],
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0],
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${image})`,
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
        filter: "brightness(0.6)",
      }}
    />
  );
}

/* ── Floating parallax secondary images ── */
function ParallaxImages({ images }: { images: { src: string; alt: string; start: number; end: number; className: string }[] }) {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[220px]">
      {images.map((img, i) => (
        <ParallaxImg key={i} {...img} />
      ))}
    </div>
  );
}

function ParallaxImg({
  className,
  alt,
  src,
  start,
  end,
}: {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) {
  const ref = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
      loading="lazy"
    />
  );
}
