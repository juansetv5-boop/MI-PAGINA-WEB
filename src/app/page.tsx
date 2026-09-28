import dynamic from 'next/dynamic';
import IDETabManager from "@/components/IDETabManager";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import MobileBottomNav from "@/components/MobileBottomNav";
import { WizardProvider } from "@/components/WizardContext";

const ConversionWizardModal = dynamic(() => import("@/components/ConversionWizardModal"));

export default function Home() {
  return (
    <WizardProvider>
      <div className="relative min-h-screen bg-[#0a0a0a] text-[#ddffdc] overflow-x-clip max-w-full">
        {/* 1. VS Code IDE Tab Architecture & Content Switcher */}
        <IDETabManager />

        {/* 3. Global Conversion Wizard, WhatsApp & Mobile Navigation */}
        <ConversionWizardModal />
        <FloatingWhatsAppButton />
        <MobileBottomNav />
      </div>
    </WizardProvider>
  );
}
