import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import LegalTipsSection from "@/components/home/LegalTipsSection";
import Footer from "@/components/Footer";
import SubscribePage from "@/components/home/SubscribePage";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <div className="h-24 bg-gradient-to-b from-slate-900/95 to-slate-900" />
        <StatsSection />
        <ServicesSection />
        <LegalTipsSection />
        {/* <SubscriptionSection /> */}
        <SubscribePage />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
