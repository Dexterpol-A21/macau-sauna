"use client";

import { useState } from "react";
import VenueLightbox from "./VenueLightbox";

interface GalleryItem {
  src: string;
  title: string;
  description: string;
}

interface Props {
  items: GalleryItem[];
}

export default function VenueGallery({ items }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  return (
    <>
      <div data-testid="spa-gallery">
        <h2 className="mb-6 text-xl font-semibold text-[var(--color-primary)]">Gallery</h2>
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => openLightbox(i)}
                className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl"
                aria-label={`View larger: ${item.description || item.title}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                  <span className="text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                    View larger
                  </span>
                </div>
              </button>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <VenueLightbox
        items={items}
        open={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
