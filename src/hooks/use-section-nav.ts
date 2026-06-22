"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

// Navigates to an in-page section by id. Works from any route:
// - On the home page it smooth-scrolls to the section.
// - From another route (e.g. a game page) it navigates home with the hash;
//   the home page's HashScroll then scrolls to the section once it mounts.
export function useSectionNav() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (id: string) => {
      if (pathname !== "/") {
        router.push(`/#${id}`);
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [router, pathname],
  );
}
