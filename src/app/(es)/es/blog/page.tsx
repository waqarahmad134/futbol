import BlogPage, { blogMetadata } from "@/app/_shared/BlogPage";

export const metadata = blogMetadata("es");

export default function Page() {
  return <BlogPage locale="es" />;
}
