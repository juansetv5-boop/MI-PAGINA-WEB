'use client';

import React, { useState } from 'react';
import { useWizard } from './WizardContext';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

export default function ConversionWizardModal() {
  const { isWizardOpen, closeWizard } = useWizard();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    siteType: 'landing',
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
    const whatsappUrl = buildWhatsAppUrl({
      name,
      company,
      service: siteType,
    });

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ name: '', company: '', siteType: 'landing' });
    closeWizard();
  };

  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  const siteOptions = [
    { label: 'Landing Page', val: 'landing' },
    { label: 'Página Web Corporativa', val: 'corporativa' },
    { label: 'Sistema Web a Medida', val: 'sistema' },
    { label: 'No estoy seguro aún / Necesito asesoría', val: 'asesoria' },
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
                  ¿Cómo se llama tu empresa o proyecto? <span className="text-xs text-[#8cab87] font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Ej: Mendoza Consultores (opcional)"
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
                      key={opt.val}
                      type="button"
                      onClick={() => setFormData({ ...formData, siteType: opt.val })}
                      className={`w-full text-left px-4 py-3.5 min-h-[48px] rounded-lg text-sm font-medium border transition-all flex items-center justify-between ${
                        formData.siteType === opt.val
                          ? 'bg-[#7fee64] text-[#000000] border-[#7fee64] font-semibold shadow-[0_0_15px_rgba(127,238,100,0.25)]'
                          : 'bg-[#212525] text-[#8cab87] border-[#485346] hover:border-[#677d64] hover:text-[#ddffdc] active:bg-[#282c2c]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {formData.siteType === opt.val && <span className="font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#485346]/40">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="min-h-[44px] px-3 text-xs font-medium text-[#8cab87] hover:text-[#ddffdc] transition-colors flex items-center justify-center sm:justify-start"
                >
                  ← Paso anterior
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}

              <button
                type="submit"
                className="w-full sm:w-auto min-h-[48px] bg-[#7fee64] text-[#000000] px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all hover:opacity-95 hover:shadow-[0_0_20px_rgba(127,238,100,0.3)] active:scale-[0.98] flex items-center justify-center gap-2"
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
