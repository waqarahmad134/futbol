import BlogArticlePage, { blogArticleMetadata, blogArticleStaticParams } from "@/app/_shared/BlogArticlePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogArticleStaticParams();
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return blogArticleMetadata(params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogArticlePage locale="en" slug={params.slug} />;
}
