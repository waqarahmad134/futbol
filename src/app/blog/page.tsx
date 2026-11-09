import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { BLOG_POSTS } from "@/data/blog";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Futbol11 Blog - Football Game Guides and Tips" },
  description:
    "Guides and tips for Futbol11 games: how to play Wordle, win the Football Grid, and more. Free daily football puzzles explained.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Futbol11 Blog - Football Game Guides and Tips",
    description:
      "Guides and tips for Futbol11 games: how to play Wordle, win the Football Grid, and more. Free daily football puzzles explained.",
    url: `${SITE_URL}/blog/`,
    images: [OG_IMAGE],
  },
  twitter: {
    title: "Futbol11 Blog - Football Game Guides and Tips",
    description:
      "Guides and tips for Futbol11 games: how to play Wordle, win the Football Grid, and more. Free daily football puzzles explained.",
    images: ["/og-image.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Futbol11 Blog",
  url: `${SITE_URL}/blog/`,
  description:
    "Guides and tips for Futbol11 games: how to play Wordle, win the Football Grid, and more.",
  datePublished: BLOG_POSTS[BLOG_POSTS.length - 1].date,
  dateModified: BLOG_POSTS[0].date,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  blogPost: BLOG_POSTS.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}/`,
    datePublished: post.date,
    dateModified: post.date,
  })),
};

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell
        title="Futbol11 Blog"
        intro="Guides and tips for our daily football games. Learn the rules, pick up winning tactics, and get more out of every puzzle."
      >
        <div className="space-y-8 not-prose">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="rounded-xl border border-border bg-muted/20 p-5">
              <h2 className="font-display text-xl text-foreground">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-3 text-sm font-display text-primary hover:underline"
              >
                Read the guide
              </Link>
            </article>
          ))}
        </div>
      </PageShell>
    </>
  );
}
