import BlogPage, { blogMetadata } from "@/app/_shared/BlogPage";

export const metadata = blogMetadata("en");

export default function Page() {
  return <BlogPage locale="en" />;
}
