import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { BLOG_POSTS } from "@/data/blog";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${post.slug}/`,
      type: "article",
      images: [OG_IMAGE],
    },
    twitter: {
      title: post.metaTitle,
      description: post.metaDescription,
      images: ["/og-image.webp"],
    },
  };
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription,
      image: `${SITE_URL}${post.heroImage}`,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}/`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}/` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell
        title={post.title}
        intro={post.description}
        crumb={post.title}
        parent={{ label: "Blog", href: "/blog" }}
      >
        <img
          src={post.heroImage}
          alt={post.title}
          width={1200}
          height={630}
          className="w-full rounded-xl border border-border mb-2"
        />
        <p className="text-xs">Published {post.date}</p>
        {post.intro.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <h2>Frequently Asked Questions</h2>
        {post.faqs.map((faq) => (
          <div key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
        <h2>Conclusion</h2>
        <p>{post.conclusion}</p>
        <p>
          <Link href={post.ctaHref} className="font-display not-prose inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors">
            {post.ctaLabel}
          </Link>
        </p>
        {post.relatedHref && post.relatedLabel && (
          <p>
            <Link href={post.relatedHref} className="font-display not-prose inline-block rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">
              {post.relatedLabel}
            </Link>
          </p>
        )}
        <p>
          <Link href="/blog">Back to all guides</Link>
        </p>
      </PageShell>
    </>
  );
}
