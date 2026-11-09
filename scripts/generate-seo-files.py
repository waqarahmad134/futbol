#!/usr/bin/env python3
"""Generate public/feed.xml (RSS 2.0) and public/llms-full.txt from
src/data/games.ts and src/data/blog.ts.

Reads titles, slugs, descriptions and full article text straight from the
source files so the feed and llms-full can never drift from the site's own
copy. Re-run after editing games.ts or blog.ts.
No em-dashes in generated output: they are normalized to commas.
"""
import re
import html
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://futbol11.live"
DATE = "2026-11-09"
PUBDATE = "Sun, 09 Nov 2026 00:00:00 GMT"

STR_RE = re.compile(r'"((?:[^"\\]|\\.)*)"')


def unesc(s: str) -> str:
    return s.replace('\\"', '"').replace("\\'", "'").replace("\\\\", "\\")


def clean(s: str) -> str:
    # No em-dashes in generated copy; normalize to a comma.
    return unesc(s).replace("\u2014", ",").replace("\u2013", "-").strip()


def field(block: str, name: str) -> str:
    m = re.search(name + r':\s*"((?:[^"\\]|\\.)*)"', block)
    return clean(m.group(1)) if m else ""


# ---------------- games ----------------
src = (ROOT / "src/data/games.ts").read_text(encoding="utf-8")

GAME_RE = re.compile(
    r'title: "(?P<title>(?:[^"\\]|\\.)*)",\s*'
    r'slug: "(?P<slug>(?:[^"\\]|\\.)*)",\s*'
    r'description: "(?P<desc>(?:[^"\\]|\\.)*)",\s*'
    r'longDescription: "(?P<long>(?:[^"\\]|\\.)*)",\s*'
    r'howToPlay: \[(?P<how>.*?)\],',
    re.DOTALL,
)

games = []
for m in GAME_RE.finditer(src):
    how = [clean(x) for x in STR_RE.findall(m.group("how"))]
    games.append(
        {
            "title": clean(m.group("title")),
            "slug": clean(m.group("slug")),
            "desc": clean(m.group("desc")),
            "long": clean(m.group("long")),
            "how": how,
        }
    )

if len(games) != 20:
    sys.exit(f"expected 20 games, parsed {len(games)}")

# ---------------- blog ----------------
blog_src = (ROOT / "src/data/blog.ts").read_text(encoding="utf-8")

SECTION_RE = re.compile(
    r'heading: "(?P<h>(?:[^"\\]|\\.)*)",\s*'
    r'paragraphs: \[(?P<p>.*?)\],\s*'
    r'(?:bullets: \[(?P<b>.*?)\],\s*)?\}',
    re.DOTALL,
)
FAQ_RE = re.compile(
    r'q: "(?P<q>(?:[^"\\]|\\.)*)",\s*a: "(?P<a>(?:[^"\\]|\\.)*)",',
    re.DOTALL,
)

posts = []
for block in re.split(r'\n  \{\n    slug: "', blog_src)[1:]:
    # The split consumed the `slug: "` prefix, so the block starts with the slug value.
    slug = block.split('"', 1)[0]
    intro_m = re.search(r'intro: \[(.*?)\],\n    sections:', block, re.DOTALL)
    sections = []
    for sm in SECTION_RE.finditer(block):
        sections.append(
            {
                "heading": clean(sm.group("h")),
                "paras": [clean(x) for x in STR_RE.findall(sm.group("p"))],
                "bullets": [clean(x) for x in STR_RE.findall(sm.group("b"))] if sm.group("b") else [],
            }
        )
    posts.append(
        {
            "slug": slug,
            "title": field(block, "title"),
            "desc": field(block, "description"),
            "date": field(block, "date"),
            "keyword": field(block, "primaryKeyword"),
            "intro": [clean(x) for x in STR_RE.findall(intro_m.group(1))] if intro_m else [],
            "sections": sections,
            "faqs": [
                {"q": clean(m.group("q")), "a": clean(m.group("a"))}
                for m in FAQ_RE.finditer(block)
            ],
            "conclusion": field(block, "conclusion"),
        }
    )

if not posts:
    sys.exit("expected blog posts, parsed none")
for p in posts:
    if len(p["sections"]) != 5 or len(p["faqs"]) < 3:
        sys.exit(f"blog post {p['slug']}: unexpected shape "
                 f"({len(p['sections'])} sections, {len(p['faqs'])} faqs)")
    text = " ".join(
        [p["title"], p["desc"]]
        + p["intro"]
        + [x for s in p["sections"] for x in [s["heading"]] + s["paras"] + s["bullets"]]
        + [x for f in p["faqs"] for x in (f["q"], f["a"])]
        + [p["conclusion"]]
    )
    words = len(text.split())
    kw_count = len(re.findall(re.escape(p["keyword"]), text, re.IGNORECASE))
    print(f"blog {p['slug']}: {words} words, keyword {kw_count}x "
          f"({kw_count / words * 100:.2f}%)")

INFO = [
    ("About Futbol11", "about",
     "Learn about Futbol11, the home of 20 free daily football trivia games, puzzles and word challenges covering every league, competition and era."),
    ("Privacy Policy", "privacy-policy",
     "How Futbol11 handles data, cookies and third-party advertising, including the use of Google AdSense cookies, and how you can opt out of personalized ads."),
    ("Terms of Service", "terms",
     "The terms and conditions for using Futbol11's free daily football games, including intellectual property, disclaimers and limitations of liability."),
    ("Contact Us", "contact",
     "Get in touch with the Futbol11 team. Send feedback, report an issue, or suggest a new daily football game."),
]
HOME_DESC = (
    "Play 20 free daily football trivia games. Guess lineups, solve football puzzles, "
    "play Wordle, Grid, Connections and more. New challenges every day."
)


def esc(s: str) -> str:
    return html.escape(s, quote=True)


# ---------------- feed.xml ----------------
items = []
items.append(("Futbol11 - Daily Football Trivia Games, Puzzles and Wordle",
              f"{SITE}/", HOME_DESC))
for g in games:
    items.append((f"{g['title']} - Play Free Daily | Futbol11",
                  f"{SITE}/game/{g['slug']}/", g["desc"]))
items.append(("Futbol11 Blog - Football Game Guides and Tips",
              f"{SITE}/blog/", "Guides and tips for Futbol11 games: how to play Wordle, win the Football Grid, and more."))
for p in posts:
    items.append((p["title"], f"{SITE}/blog/{p['slug']}/", p["desc"]))
for title, slug, desc in INFO:
    items.append((f"{title} - Futbol11", f"{SITE}/{slug}/", desc))

parts = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>Futbol11 - Daily Football Trivia Games, Puzzles and Wordle</title>",
    f"    <link>{SITE}/</link>",
    f"    <description>{esc(HOME_DESC)}</description>",
    "    <language>en</language>",
    f"    <lastBuildDate>{PUBDATE}</lastBuildDate>",
]
for title, link, desc in items:
    parts += [
        "    <item>",
        f"      <title>{esc(title)}</title>",
        f"      <link>{link}</link>",
        f"      <guid>{link}</guid>",
        f"      <description>{esc(desc)}</description>",
        f"      <pubDate>{PUBDATE}</pubDate>",
        "    </item>",
    ]
parts += ["  </channel>", "</rss>", ""]
(ROOT / "public/feed.xml").write_text("\n".join(parts), encoding="utf-8")

# ---------------- llms-full.txt ----------------
lines = [
    "# Futbol11",
    "",
    "> Futbol11 is a free daily football (soccer) games website with 20 trivia, puzzle and word challenges that reset every day at midnight. No account or download is required, every game is played in the browser, and progress is stored locally. Games cover the Premier League, La Liga, Serie A, Bundesliga, Champions League, World Cup, Copa America and football history from the 1930s to today.",
    "",
    f"- [Futbol11]({SITE}/): home page with all 20 daily games",
    "",
    "## Games",
    "",
]
for g in games:
    lines += [
        f"### {g['title']}",
        "",
        f"- [{g['title']}]({SITE}/game/{g['slug']}/): {g['desc']}",
        "",
        g["long"],
        "",
        "How to play:",
        "",
    ]
    lines += [f"- {step}" for step in g["how"]]
    lines += ["", ""]
lines += ["## Blog", ""]
lines += [f"- [Futbol11 Blog]({SITE}/blog/): all game guides", ""]
for p in posts:
    lines += [
        f"### {p['title']}",
        "",
        f"- [{p['title']}]({SITE}/blog/{p['slug']}/): {p['desc']}",
        "",
    ]
    lines += p["intro"] + [""]
    for s in p["sections"]:
        lines += [f"#### {s['heading']}", ""]
        lines += s["paras"] + [""]
        if s["bullets"]:
            lines += [f"- {b}" for b in s["bullets"]] + [""]
    lines += ["#### Frequently Asked Questions", ""]
    for f in p["faqs"]:
        lines += [f"**{f['q']}**", "", f["a"], ""]
    lines += ["#### Conclusion", "", p["conclusion"], "", ""]
lines += ["## About", ""]
for title, slug, desc in INFO:
    lines += [f"- [{title}]({SITE}/{slug}/): {desc}"]
lines += [
    "",
    "## Optional",
    "",
    f"- [Sitemap]({SITE}/sitemap.xml): all pages on the site",
    f"- [RSS Feed]({SITE}/feed.xml): all games and pages with descriptions",
    "",
]
(ROOT / "public/llms-full.txt").write_text("\n".join(lines), encoding="utf-8")

print(f"games parsed: {len(games)}")
print(f"feed items: {len(items)}")
print("wrote public/feed.xml and public/llms-full.txt")
