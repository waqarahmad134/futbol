import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { BLOG_POSTS } from "@/data/blog";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site";
import type { Locale } from "@/i18n/locales";
import { hreflangAlternates, localizedUrl, localizePath } from "@/i18n/locales";
import { localizeStrings } from "@/i18n/dictionary";
import { DictionaryProvider } from "@/i18n/DictionaryContext";

export function blogMetadata(locale: Locale): Metadata {
  const t = localizeStrings(locale, "blog", {
    metaTitle: "Futbol11 Blog - Football Game Guides and Tips",
    metaDesc:
      "Guides and tips for Futbol11 games: how to play Wordle, win the Football Grid, and more. Free daily football puzzles explained.",
  });
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDesc,
    alternates: { canonical: localizedUrl("/blog", locale), languages: hreflangAlternates("/blog") },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      url: localizedUrl("/blog", locale),
      images: [OG_IMAGE],
    },
    twitter: { title: t.metaTitle, description: t.metaDesc, images: ["/og-image.webp"] },
  };
}

export default function BlogPage({ locale }: { locale: Locale }) {
  const t = localizeStrings(locale, "blog", {
    title: "Futbol11 Blog",
    intro:
      "Guides and tips for our daily football games. Learn the rules, pick up winning tactics, and get more out of every puzzle.",
    readGuide: "Read the guide",
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t.title,
    url: localizedUrl("/blog", locale),
    description: t.intro,
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

  return (
    <DictionaryProvider locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell title={t.title} intro={t.intro} locale={locale}>
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
                {t.readGuide}
              </Link>
            </article>
          ))}
        </div>
      </PageShell>
    </DictionaryProvider>
  );
}
