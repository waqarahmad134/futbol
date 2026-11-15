import BlogPage, { blogMetadata } from "@/app/_shared/BlogPage";

export const metadata = blogMetadata("pt");

export default function Page() {
  return <BlogPage locale="pt" />;
}
