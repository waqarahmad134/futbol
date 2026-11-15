import GamePage, { gameMetadata, gameStaticParams } from "@/app/_shared/GamePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return gameStaticParams();
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return gameMetadata("es", params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <GamePage locale="es" slug={params.slug} />;
}
