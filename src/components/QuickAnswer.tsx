interface QuickAnswerProps {
  answer: string;
}

// Direct-answer box for AI Overviews: a short answer at the top of the page,
// visible to readers and easy for search engines to quote.
export default function QuickAnswer({ answer }: QuickAnswerProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 mb-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
        Quick answer
      </p>
      <p className="text-foreground leading-relaxed">{answer}</p>
    </div>
  );
}
