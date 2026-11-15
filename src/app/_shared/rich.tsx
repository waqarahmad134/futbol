import { Fragment, type ReactNode } from "react";

// Render a translated string with inline React nodes (links, bold text)
// substituted for {token} placeholders, e.g.
// rich(t.privacyP1, { site: <a href={SITE_URL}>futbol11.live</a> }).
export function rich(text: string, nodes: Record<string, ReactNode>): ReactNode {
  const parts = text.split(/(\{[^}]+\})/g);
  return parts.map((part, i) => {
    const m = part.match(/^\{(.+)\}$/);
    if (m && nodes[m[1]] !== undefined) {
      return <Fragment key={i}>{nodes[m[1]]}</Fragment>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
