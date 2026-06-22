import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "f11-cookie-consent";

type Gtag = (...args: unknown[]) => void;

// Update Google Consent Mode v2 signals (defaults are set to "denied" in index.html).
function updateConsent(granted: boolean) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  const value = granted ? "granted" : "denied";
  gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "granted") {
      updateConsent(true);
    } else if (saved !== "denied") {
      setVisible(true);
    }
  }, []);

  const choose = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    updateConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-card/95 backdrop-blur"
    >
      <div className="container flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
          We use cookies to keep your daily progress and to serve ads. Third parties, including
          Google, may use cookies to personalise ads.{" "}
          <Link to="/privacy-policy" className="text-primary hover:underline">
            Learn more
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => choose(false)}
            className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/40 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => choose(true)}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-display text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
