'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

type ToastState = 'idle' | 'success' | 'error';

export default function TerminalContactFooter() {
  const [formData, setFormData] = useState({
    contact: '',
    company: '',
    description: '',
    scope: 'LANDING_PAGE',
  });
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>('idle');

  const scopes = [
    { label: 'Landing Page', val: 'LANDING_PAGE' },
    { label: 'Página Web Corporativa', val: 'CORPORATIVA' },
    { label: 'Sistema Web a Medida', val: 'SISTEMA_MEDIDA' },
  ];

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    // Final step — send via EmailJS
    if (!formData.contact.trim() || !formData.description.trim()) return;

    setIsLoading(true);
    setToast('idle');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('[EmailJS Error]: Las variables de entorno de EmailJS no están configuradas.');
      setToast('error');
      setIsLoading(false);
      return;
    }

    const templateParams = {
      name: formData.contact,
      company: formData.company || 'Sin especificar',
      email: formData.contact,
      message: `[Tipo de Proyecto: ${formData.scope}]\n${formData.description}`,
      client_name: formData.contact,
      company_name: formData.company || 'Sin especificar',
      client_email: formData.contact,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setToast('success');
      setFormData({ contact: '', company: '', description: '', scope: 'LANDING_PAGE' });
      setStep(1);
      setTimeout(() => setToast('idle'), 6000);
    } catch (error) {
      console.error('[EmailJS Error]:', error);
      setToast('error');
      setTimeout(() => setToast('idle'), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ contact: '', company: '', description: '', scope: 'LANDING_PAGE' });
    setStep(1);
    setToast('idle');
    setIsLoading(false);
  };

  return (
    <footer id="contact" className="w-full bg-[#000000] pt-24 pb-12 flex flex-col items-center">
      <div id="start" className="w-full max-w-3xl px-6 md:px-12 mb-16 scroll-mt-24">

        {/* Toast Banner */}
        {toast !== 'idle' && (
          <div
            className={`mb-6 flex items-center gap-3 px-5 py-4 rounded-lg border text-sm font-sans transition-all ${
              toast === 'success'
                ? 'bg-[#0d1f0d] border-[#7fee64] text-[#7fee64]'
                : 'bg-[#1f0d0d] border-[#ff5f56] text-[#ff5f56]'
            }`}
          >
            <span className="text-lg">{toast === 'success' ? '✓' : '✕'}</span>
            <span>
              {toast === 'success'
                ? '¡Mensaje recibido! Nos pondremos en contacto contigo lo antes posible.'
                : 'Ocurrió un error al enviar el mensaje. Intenta de nuevo.'}
            </span>
          </div>
        )}

        {/* Window Frame */}
        <div className="bg-[#181818] rounded-lg border border-[#485346] overflow-hidden shadow-2xl">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#485346] bg-[#181818]">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-sans text-xs text-[#8cab87] font-medium">
              Clickshop — Formulario Directo
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-sans text-[#677d64] hover:text-[#7fee64] transition-colors"
              title="Reiniciar formulario"
            >
              Reiniciar
            </button>
          </div>

          {/* Form Content Area */}
          <div className="p-6 font-sans text-sm md:text-base min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="text-[#aed2a4] mb-6 font-medium">
                Completa los datos para diseñar una muestra personalizada para tu negocio.
              </div>

              <form onSubmit={handleNextStep} className="space-y-6">
                {/* Select Scope Options */}
                <div>
                  <label className="block text-[#ddffdc] text-xs uppercase font-sans tracking-wider mb-2.5">
                    Tipo de proyecto:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {scopes.map((s) => (
                      <button
                        key={s.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, scope: s.val })}
                        className={`px-4 py-2 rounded-md text-xs font-sans font-medium transition-all ${
                          formData.scope === s.val
                            ? 'bg-[#7fee64] text-[#000000] font-bold shadow-[0_0_12px_rgba(127,238,100,0.3)]'
                            : 'bg-[#212525] text-[#8cab87] border border-[#485346] hover:border-[#677d64]'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 1: Nombre y Correo / WhatsApp */}
                {step >= 1 && (
                  <div className="space-y-1.5">
                    <label className="block text-[#ddffdc] text-xs uppercase font-sans tracking-wider">
                      [1/3] Nombre y Correo / WhatsApp:
                    </label>
                    <div className="flex items-center bg-[#212525] border border-[#485346] rounded-md px-3.5 py-2.5">
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="Ej: Carlos Mendoza - carlos@miempresa.com / +52 55..."
                        className="bg-transparent border-none outline-none text-[#7fee64] placeholder-[#677d64] flex-1 text-sm font-sans focus:ring-0"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Nombre de la empresa o proyecto */}
                {step >= 2 && (
                  <div className="space-y-1.5">
                    <label className="block text-[#ddffdc] text-xs uppercase font-sans tracking-wider">
                      [2/3] Nombre de tu empresa o proyecto:
                    </label>
                    <div className="flex items-center bg-[#212525] border border-[#485346] rounded-md px-3.5 py-2.5">
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Ej: Mendoza Consultores / Clínica Dental"
                        className="bg-transparent border-none outline-none text-[#7fee64] placeholder-[#677d64] flex-1 text-sm font-sans focus:ring-0"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Descripción del negocio */}
                {step >= 3 && (
                  <div className="space-y-1.5">
                    <label className="block text-[#ddffdc] text-xs uppercase font-sans tracking-wider">
                      [3/3] ¿A qué se dedica tu negocio? (Breve descripción):
                    </label>
                    <div className="flex items-start bg-[#212525] border border-[#485346] rounded-md px-3.5 py-2.5">
                      <textarea
                        required
                        rows={2}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Ej: Ofrecemos servicios de consultoría financiera para PyMEs y buscamos captar más clientes calificados..."
                        className="bg-transparent border-none outline-none text-[#7fee64] placeholder-[#677d64] flex-1 text-sm font-sans focus:ring-0 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-[#677d64] font-sans">
                    Paso {step} de 3
                  </span>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#7fee64] text-[#000000] px-6 py-2.5 rounded-md font-sans text-xs md:text-sm font-bold uppercase tracking-wider transition-all hover:opacity-95 hover:shadow-[0_0_20px_rgba(127,238,100,0.3)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-3.5 w-3.5 text-[#000000]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Enviando...
                      </>
                    ) : step < 3 ? (
                      'Siguiente Paso →'
                    ) : (
                      'Solicitar Muestra →'
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="pt-6 border-t border-[#485346]/40 flex justify-between items-center text-xs font-sans text-[#677d64]">
              <span>Confidencialidad garantizada</span>
              <span>Respuesta en menos de 24h</span>
            </div>
          </div>
        </div>

        {/* Direct Email Link */}
        <div className="text-center mt-8 text-[#677d64] text-xs md:text-sm font-sans">
          Consultas directas:{' '}
          <a
            href="mailto:clickshop.code@gmail.com?subject=Consulta%20Directa%20Clickshop&body=Hola%20equipo%20Clickshop,"
            className="text-[#859984] hover:text-[#7fee64] underline underline-offset-2 transition-colors"
          >
            clickshop.code@gmail.com
          </a>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="w-full border-t border-[#1f2a33] px-6 md:px-12 lg:px-20 py-8">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[#ddffdc] text-sm font-medium tracking-tight">CLICKSHOP LABS</span>
            <span className="text-[#485346]">/</span>
            <span className="text-[#697368] text-xs font-sans">
              © {new Date().getFullYear()} Todos los derechos reservados
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs font-sans">
            <a href="#work" className="text-[#859984] hover:text-[#7fee64] transition-colors">
              Proyectos
            </a>
            <a href="#services" className="text-[#859984] hover:text-[#7fee64] transition-colors">
              Servicios
            </a>
            <a href="#process" className="text-[#859984] hover:text-[#7fee64] transition-colors">
              Proceso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
