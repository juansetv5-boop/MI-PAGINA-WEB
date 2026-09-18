import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ScrollytellingHero from "@/components/ScrollytellingHero";
import ValuePropositionGrid from "@/components/ValuePropositionGrid";
import TrustToolSection from "@/components/TrustToolSection";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import TerminalContactFooter from "@/components/TerminalContactFooter";
import ConversionWizardModal from "@/components/ConversionWizardModal";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { WizardProvider } from "@/components/WizardContext";

export default function Home() {
  return (
    <WizardProvider>
      <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#000000] text-[#ddffdc]">
        <StickyHeader />
        <main className="w-full max-w-full overflow-x-hidden flex flex-col">
          <HeroSection />
          <ScrollytellingHero />
          <ValuePropositionGrid />
          <TrustToolSection />
          <PortfolioShowcase />
        </main>
        <TerminalContactFooter />
        <ConversionWizardModal />
        <FloatingWhatsAppButton />
      </div>
    </WizardProvider>
  );
}
