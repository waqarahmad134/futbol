import BlogArticlePage, { blogArticleMetadata, blogArticleStaticParams } from "@/app/_shared/BlogArticlePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogArticleStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return blogArticleMetadata(slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogArticlePage locale="en" slug={slug} />;
}
