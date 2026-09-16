'use client';

import React, { useState } from 'react';
import { useWizard } from './WizardContext';

export default function ConversionWizardModal() {
  const { isWizardOpen, closeWizard } = useWizard();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    siteType: 'Landing Page',
  });

  if (!isWizardOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      handleWhatsAppSubmit();
    }
  };

  const handleWhatsAppSubmit = () => {
    const { name, company, siteType } = formData;
    const clientName = name.trim() || 'Cliente';
    const companyName = company.trim() || 'Mi Empresa';
    const selectedType = siteType || 'Asesoría';

    const message = `¡Hola Clickshop! 👋 Mi nombre es ${clientName}, de la empresa ${companyName}. Estoy buscando información sobre: ${selectedType}. Me gustaría cotizar y ver una muestra para mi negocio.`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/573127930898?text=${encodedText}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ name: '', company: '', siteType: 'Landing Page' });
    closeWizard();
  };

  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  const siteOptions = [
    'Landing Page',
    'Página Web Corporativa',
    'Sistema Web a Medida',
    'No estoy seguro aún / Necesito asesoría',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#181818] border border-[#485346] rounded-xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Progress Bar */}
        <div className="w-full bg-[#212525] h-1.5 relative overflow-hidden">
          <div
            className="h-full bg-[#7fee64] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#485346]/60 bg-[#181818]">
          <div>
            <div className="text-xs font-sans font-semibold text-[#7fee64]">
              PASO {step} DE 3
            </div>
            <div className="text-[#ddffdc] text-sm font-medium mt-0.5">
              Solicitud de Muestra &amp; Asesoría
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#212525] border border-[#485346] flex items-center justify-center text-[#8cab87] hover:text-[#ddffdc] hover:border-[#7fee64] transition-colors"
            aria-label="Cerrar ventana"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 font-sans">
          <form onSubmit={handleNext} className="space-y-6">
            {/* Step 1: Nombre */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <label className="block text-[#ddffdc] text-lg font-medium leading-snug">
                  ¿Cómo te llamas?
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Carlos Mendoza"
                  className="w-full bg-[#212525] border border-[#485346] rounded-lg px-4 py-3 text-[#ddffdc] placeholder-[#677d64] text-base focus:outline-none focus:border-[#7fee64] focus:ring-1 focus:ring-[#7fee64] transition-all"
                />
              </div>
            )}

            {/* Step 2: Empresa */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <label className="block text-[#ddffdc] text-lg font-medium leading-snug">
                  ¿Cómo se llama tu empresa o proyecto?
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Ej: Mendoza Consultores / Clínica Dental"
                  className="w-full bg-[#212525] border border-[#485346] rounded-lg px-4 py-3 text-[#ddffdc] placeholder-[#677d64] text-base focus:outline-none focus:border-[#7fee64] focus:ring-1 focus:ring-[#7fee64] transition-all"
                />
              </div>
            )}

            {/* Step 3: Tipo de Sitio */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <label className="block text-[#ddffdc] text-lg font-medium leading-snug">
                  ¿Qué tipo de sitio web necesitas?
                </label>
                <div className="space-y-2.5">
                  {siteOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, siteType: opt })}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-all ${
                        formData.siteType === opt
                          ? 'bg-[#7fee64] text-[#000000] border-[#7fee64] font-semibold shadow-[0_0_15px_rgba(127,238,100,0.25)]'
                          : 'bg-[#212525] text-[#8cab87] border-[#485346] hover:border-[#677d64] hover:text-[#ddffdc]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#485346]/40">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="text-xs font-medium text-[#8cab87] hover:text-[#ddffdc] transition-colors"
                >
                  ← Paso anterior
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                className="bg-[#7fee64] text-[#000000] px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all hover:opacity-95 hover:shadow-[0_0_20px_rgba(127,238,100,0.3)] active:scale-[0.98] flex items-center gap-2"
              >
                <span>{step < 3 ? 'Siguiente Paso →' : 'Completar y enviar por WhatsApp 💬'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
