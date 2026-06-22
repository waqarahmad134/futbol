"use client";

import { useEffect } from "react";

// Smooth-scrolls to an in-page section when the URL carries a hash (e.g. after
// navigating home from a game page via the nav/footer links).
const HashScroll = () => {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = window.setTimeout(scrollToHash, 60);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
};

export default HashScroll;
