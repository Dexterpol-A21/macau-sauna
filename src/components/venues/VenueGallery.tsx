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
      <div className="vd-gallery-grid">
        {items.map((item, i) => (
          <div key={i} className="vd-gallery-card">
            <button
              onClick={() => openLightbox(i)}
              className="vd-gallery-image-wrap"
              aria-label={`View larger: ${item.title}`}
            >
              <img src={item.src} alt={item.title} className="vd-gallery-img" loading="lazy" />
              <div className="vd-gallery-view">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                View larger
              </div>
            </button>
            <div className="vd-gallery-info">
              <h3 className="vd-gallery-card-title">{item.title}</h3>
              <p className="vd-gallery-card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <VenueLightbox
        items={items}
        open={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />

      <style>{`
        .vd-gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .vd-gallery-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .vd-gallery-image-wrap {
          position: relative;
          display: block;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          background: none;
          padding: 0;
          width: 100%;
        }

        .vd-gallery-img {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          transition: transform 0.6s ease, filter 0.6s ease;
        }

        .vd-gallery-image-wrap:hover .vd-gallery-img {
          transform: scale(1.04);
          filter: brightness(1.1);
        }

        .vd-gallery-view {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          color: #FFF8F0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(6px);
          border-radius: 0.35rem;
          opacity: 0;
          transform: translateY(6px);
          transition: all 0.3s ease;
        }

        .vd-gallery-image-wrap:hover .vd-gallery-view {
          opacity: 1;
          transform: translateY(0);
        }

        .vd-gallery-info {
          padding: 0 0.25rem;
        }

        .vd-gallery-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFF8F0;
          margin: 0 0 0.4rem;
          line-height: 1.3;
        }

        .vd-gallery-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: #807860;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 600px) {
          .vd-gallery-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
