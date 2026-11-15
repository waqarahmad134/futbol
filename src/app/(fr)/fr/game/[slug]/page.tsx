import GamePage, { gameMetadata, gameStaticParams } from "@/app/_shared/GamePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return gameStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return gameMetadata("fr", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GamePage locale="fr" slug={slug} />;
}
