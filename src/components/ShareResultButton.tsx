"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalizedStrings } from "@/i18n/DictionaryContext";

// Small share-result button for game completion screens.
// Uses the Web Share API when available, otherwise copies the result
// text to the clipboard so it can be pasted anywhere.
const ShareResultButton = ({ text, label }: { text: string; label?: string }) => {
  const t = useLocalizedStrings("share", {
    defaultLabel: "Share result",
    copied: "Copied!",
    copiedTitle: "Result copied",
    copiedDesc: "Paste it anywhere to share your score.",
    failedTitle: "Copy failed",
    failedDesc: "Your browser blocked clipboard access.",
  });
  const buttonLabel = label ?? t.defaultLabel;
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // User cancelled or share failed; fall through to copy.
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: t.copiedTitle, description: t.copiedDesc });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: t.failedTitle, description: t.failedDesc, variant: "destructive" });
    }
  };

  return (
    <button
      onClick={share}
      className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-xs font-display hover:bg-primary/90 transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
      {copied ? t.copied : buttonLabel}
    </button>
  );
};

export default ShareResultButton;
