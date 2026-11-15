import BlogPage, { blogMetadata } from "@/app/_shared/BlogPage";

export const metadata = blogMetadata("fr");

export default function Page() {
  return <BlogPage locale="fr" />;
}
