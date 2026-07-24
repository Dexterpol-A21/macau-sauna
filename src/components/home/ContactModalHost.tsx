"use client";

import { useEffect, useState } from "react";
import ContactModal from "./ContactModal";

declare global {
  interface Window {
    __contactWantsOpen?: boolean;
  }
}

/** Single site-wide contact modal — opened via `open-contact` or [data-open-contact] /a[href^="/contact"] */
export default function ContactModalHost() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setOpen(true);
    window.addEventListener("open-contact", openModal);

    if (window.__contactWantsOpen) {
      window.__contactWantsOpen = false;
      setOpen(true);
    }

    // Deep link: /?contact=1 or leftover /contact redirects
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("contact") === "1") {
        setOpen(true);
        params.delete("contact");
        const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
        window.history.replaceState({}, "", next || "/");
      }
    } catch {
      /* ignore */
    }

    return () => window.removeEventListener("open-contact", openModal);
  }, []);

  return <ContactModal open={open} onClose={() => setOpen(false)} />;
}
