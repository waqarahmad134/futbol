import Header from "@/components/Header";
import DailyScore from "@/components/DailyScore";
import GameGrid from "@/components/GameGrid";
import OtherSites from "@/components/OtherSites";
import HowToPlay from "@/components/HowToPlay";
import SEOContent from "@/components/SEOContent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
        <section className="py-8 flex justify-center">
          <DailyScore />
        </section>
        <GameGrid />
        <OtherSites />
        <HowToPlay />
        <SEOContent />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
