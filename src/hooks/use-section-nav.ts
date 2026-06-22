import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Navigates to an in-page section by id. Works from any route:
// - On the home page it smooth-scrolls to the section.
// - From another route (e.g. a game page) it navigates home with the hash,
//   and the home page scrolls to the section once it mounts.
export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string) => {
      if (location.pathname !== "/") {
        navigate(`/#${id}`);
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [navigate, location.pathname],
  );
}
