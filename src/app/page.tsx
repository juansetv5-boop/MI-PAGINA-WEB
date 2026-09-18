import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ScrollytellingHero from "@/components/ScrollytellingHero";
import ValuePropositionGrid from "@/components/ValuePropositionGrid";
import TrustToolSection from "@/components/TrustToolSection";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import TerminalContactFooter from "@/components/TerminalContactFooter";
import ConversionWizardModal from "@/components/ConversionWizardModal";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import MobileBottomNav from "@/components/MobileBottomNav";
import { WizardProvider } from "@/components/WizardContext";

export default function Home() {
  return (
    <WizardProvider>
      <div className="relative min-h-screen bg-[#000000] text-[#ddffdc]">
        <StickyHeader />
        <main className="w-full flex flex-col">
          <HeroSection />
          <ScrollytellingHero />
          <ValuePropositionGrid />
          <TrustToolSection />
          <PortfolioShowcase />
        </main>
        <TerminalContactFooter />
        <ConversionWizardModal />
        <FloatingWhatsAppButton />
        <MobileBottomNav />
      </div>
    </WizardProvider>
  );
}
