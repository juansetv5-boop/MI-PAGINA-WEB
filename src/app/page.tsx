import LoadingScreen from "@/components/LoadingScreen";
import IDETabManager from "@/components/IDETabManager";
import ConversionWizardModal from "@/components/ConversionWizardModal";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import MobileBottomNav from "@/components/MobileBottomNav";
import { WizardProvider } from "@/components/WizardContext";

export default function Home() {
  return (
    <WizardProvider>
      <div className="relative min-h-screen bg-[#0a0a0a] text-[#ddffdc] overflow-x-clip max-w-full">
        {/* 1. Cinematic Video Loading Screen (Lightweight VP9/H.264 without audio) */}
        <LoadingScreen />

        {/* 2. VS Code IDE Tab Architecture & Content Switcher */}
        <IDETabManager />

        {/* 3. Global Conversion Wizard, WhatsApp & Mobile Navigation */}
        <ConversionWizardModal />
        <FloatingWhatsAppButton />
        <MobileBottomNav />
      </div>
    </WizardProvider>
  );
}
