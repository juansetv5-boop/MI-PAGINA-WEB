'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

type ToastState = 'idle' | 'success' | 'error';

export default function TerminalContactFooter() {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    serviceType: 'Landing Page',
    message: '',
  });
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>('idle');

  const serviceOptions = [
    { label: 'Landing Page', val: 'Landing Page' },
    { label: 'Página Web Corporativa', val: 'Página Web Corporativa' },
    { label: 'Sistema Web a Medida', val: 'Sistema Web a Medida' },
    { label: 'Asesoría 1 a 1', val: 'Asesoría 1 a 1' },
  ];

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!formData.userName.trim()) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.userEmail.trim()) return;
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!formData.serviceType) return;
      setStep(4);
      return;
    }

    // Step 4 — Final step: send via EmailJS
    if (!formData.message.trim()) return;

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
      user_name: formData.userName,
      user_email: formData.userEmail,
      service_type: formData.serviceType,
      message: formData.message,
      // Compatibility fields for existing templates
      name: formData.userName,
      email: formData.userEmail,
      client_name: formData.userName,
      client_email: formData.userEmail,
      company: formData.serviceType,
      company_name: formData.serviceType,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setToast('success');
    } catch (error) {
      console.error('[EmailJS Error]:', error);
      setToast('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ userName: '', userEmail: '', serviceType: 'Landing Page', message: '' });
    setStep(1);
    setToast('idle');
    setIsLoading(false);
  };

  return (
    <footer id="contact" className="w-full max-w-full bg-[#0a0a0a] pt-24 pb-12 px-4 md:px-12 lg:px-24 flex flex-col items-center border-t border-[#1f2a33]">
      <div id="start" className="w-full max-w-3xl px-6 md:px-12 mb-16 scroll-mt-24">

        {/* Section Title Header */}
        <ScrollReveal delay={0}>
          <div className="text-center mb-10">
            <h2 className="text-[#ddffdc] text-[32px] md:text-[42px] font-medium tracking-[-0.015em]">
              Consola de contacto <span className="text-[#7fee64]">directo</span>
            </h2>
            <p className="text-[#8cab87] text-base mt-2">
              Ingresa tus datos paso a paso para comunicarte con nuestro equipo.
            </p>
          </div>
        </ScrollReveal>

        {/* Window Frame: Terminal Style on Desktop, Clean Card on Mobile */}
        <ScrollReveal delay={150}>
          <div className="bg-[#181818] rounded-2xl md:rounded-lg border border-[#485346] overflow-hidden shadow-2xl">
            {/* Desktop Header Bar (hidden md:flex) */}
            <div className="hidden md:flex items-center justify-between px-4 py-3 border-b border-[#485346] bg-[#181818]">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="font-mono text-xs text-[#8cab87] font-medium">
                clickshop@terminal:~ $ contact.sh
              </div>
              <button
                onClick={handleReset}
                className="text-xs font-mono text-[#677d64] hover:text-[#7fee64] transition-colors"
                title="Reiniciar consola"
              >
                [Reiniciar]
              </button>
            </div>

            {/* Mobile Header Bar (flex md:hidden) */}
            <div className="flex md:hidden items-center justify-between px-5 py-3.5 border-b border-[#485346]/60 bg-[#141616]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7fee64]" />
                <span className="font-sans font-bold text-xs text-[#ddffdc] tracking-wider uppercase">
                  Paso {step} de 4
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs font-sans text-[#8cab87] hover:text-[#7fee64] p-1 min-h-[36px] flex items-center"
              >
                Reiniciar
              </button>
            </div>

            {/* Form Content Area */}
            <div className="p-5 sm:p-6 md:p-8 font-mono text-sm md:text-base min-h-[320px] flex flex-col justify-between">
              {toast === 'success' ? (
                /* Success Terminal Screen */
                <div className="space-y-5 my-auto">
                  <div className="text-[#7fee64] font-semibold flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>system: ¡Mensaje recibido con éxito! Te contactaremos lo antes posible.</span>
                  </div>
                  <div className="bg-[#212525] border border-[#485346] rounded-md p-4 space-y-2 text-xs md:text-sm text-[#8cab87]">
                    <div className="text-[#ddffdc] font-bold text-xs uppercase tracking-wider mb-2">
                      &gt; REGISTRO DE CONSOLA:
                    </div>
                    <div><span className="text-[#7fee64]">&gt; Nombre:</span> {formData.userName}</div>
                    <div><span className="text-[#7fee64]">&gt; Email:</span> {formData.userEmail}</div>
                    <div><span className="text-[#7fee64]">&gt; Servicio:</span> {formData.serviceType}</div>
                    <div><span className="text-[#7fee64]">&gt; Mensaje:</span> {formData.message}</div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={handleReset}
                      className="bg-[#7fee64] text-[#000000] px-5 py-2.5 rounded-md font-sans text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_15px_rgba(127,238,100,0.25)]"
                    >
                      Nueva consulta →
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Step-by-Step Terminal Form */
                <div>
                  {toast === 'error' && (
                    <div className="mb-4 flex items-center gap-3 px-4 py-3 rounded-lg border bg-[#1f0d0d] border-[#ff5f56] text-[#ff5f56] text-xs font-sans">
                      <span>✕</span>
                      <span>system: Error al enviar la solicitud. Intenta nuevamente.</span>
                    </div>
                  )}

                  {/* Summary of Completed Steps */}
                  <div className="space-y-2 mb-6 text-xs md:text-sm text-[#677d64]">
                    {step > 1 && (
                      <div className="flex items-center gap-2 text-[#8cab87]">
                        <span className="text-[#7fee64]">✓ [Paso 1] Nombre:</span>
                        <span className="text-[#ddffdc]">{formData.userName}</span>
                      </div>
                    )}
                    {step > 2 && (
                      <div className="flex items-center gap-2 text-[#8cab87]">
                        <span className="text-[#7fee64]">✓ [Paso 2] Email:</span>
                        <span className="text-[#ddffdc]">{formData.userEmail}</span>
                      </div>
                    )}
                    {step > 3 && (
                      <div className="flex items-center gap-2 text-[#8cab87]">
                        <span className="text-[#7fee64]">✓ [Paso 3] Servicio:</span>
                        <span className="text-[#ddffdc]">{formData.serviceType}</span>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleNextStep} className="space-y-6">
                    {/* Step 1: Nombre Completo */}
                    {step === 1 && (
                      <div className="space-y-2">
                        <label className="block text-[#aed2a4] text-xs md:text-sm font-sans">
                          system: Por favor ingresa tu nombre completo:
                        </label>
                        <div className="flex items-center bg-[#212525] border border-[#485346] rounded-lg px-3.5 min-h-[50px] focus-within:border-[#7fee64] transition-colors">
                          <span className="text-[#7fee64] mr-2 font-mono">&gt;</span>
                          <input
                            type="text"
                            required
                            value={formData.userName}
                            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                            placeholder="Ej: Carlos Mendoza"
                            className="bg-transparent border-none outline-none text-[#7fee64] placeholder-[#677d64] flex-1 text-base font-mono focus:ring-0 w-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Email de contacto */}
                    {step === 2 && (
                      <div className="space-y-2">
                        <label className="block text-[#aed2a4] text-xs md:text-sm font-sans">
                          system: Ingresa tu email de contacto:
                        </label>
                        <div className="flex items-center bg-[#212525] border border-[#485346] rounded-lg px-3.5 min-h-[50px] focus-within:border-[#7fee64] transition-colors">
                          <span className="text-[#7fee64] mr-2 font-mono">&gt;</span>
                          <input
                            type="email"
                            required
                            value={formData.userEmail}
                            onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                            placeholder="Ej: carlos@miempresa.com"
                            className="bg-transparent border-none outline-none text-[#7fee64] placeholder-[#677d64] flex-1 text-base font-mono focus:ring-0 w-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Tipo de servicio u opción (incluye Asesoría 1 a 1) */}
                    {step === 3 && (
                      <div className="space-y-3">
                        <label className="block text-[#aed2a4] text-xs md:text-sm font-sans">
                          system: Selecciona el servicio o tipo de proyecto:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {serviceOptions.map((opt) => (
                            <button
                              key={opt.val}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, serviceType: opt.val });
                              }}
                              className={`min-h-[50px] px-4 py-3 rounded-lg text-xs md:text-sm font-mono text-left transition-all flex items-center justify-between active:scale-[0.98] ${
                                formData.serviceType === opt.val
                                  ? 'bg-[#7fee64] text-[#000000] font-bold shadow-[0_0_12px_rgba(127,238,100,0.3)]'
                                  : 'bg-[#212525] text-[#8cab87] border border-[#485346] hover:border-[#7fee64] hover:text-[#ddffdc] active:bg-[#282c2c]'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {formData.serviceType === opt.val && <span>✓</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Mensaje / Detalle */}
                    {step === 4 && (
                      <div className="space-y-2">
                        <label className="block text-[#aed2a4] text-xs md:text-sm font-sans">
                          system: ¿A qué se dedica tu negocio o qué necesitas? (Mensaje / Detalle):
                        </label>
                        <div className="flex items-start bg-[#212525] border border-[#485346] rounded-lg px-3.5 py-3 focus-within:border-[#7fee64] transition-colors">
                          <span className="text-[#7fee64] mr-2 mt-0.5 font-mono">&gt;</span>
                          <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Ej: Necesitamos una página web para nuestra empresa de consultoría financiera..."
                            className="bg-transparent border-none outline-none text-[#7fee64] placeholder-[#677d64] flex-1 text-base font-mono focus:ring-0 resize-none w-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step Controls */}
                    <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4">
                      <div className="flex items-center justify-between sm:justify-start gap-3">
                        {step > 1 ? (
                          <button
                            type="button"
                            onClick={() => setStep((prev) => prev - 1)}
                            className="min-h-[44px] px-3 text-xs font-mono text-[#8cab87] hover:text-[#7fee64] transition-colors flex items-center"
                          >
                            ← Anterior
                          </button>
                        ) : (
                          <div className="min-h-[44px]" />
                        )}
                        <span className="text-xs text-[#677d64] font-mono">
                          Paso {step} de 4
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto min-h-[48px] bg-[#7fee64] text-[#000000] px-7 py-3 rounded-lg font-sans text-xs md:text-sm font-bold uppercase tracking-wider transition-all hover:opacity-95 hover:shadow-[0_0_20px_rgba(127,238,100,0.3)] active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-[#000000]"
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
                        ) : step < 4 ? (
                          'Siguiente Paso →'
                        ) : (
                          'Enviar Solicitud →'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="pt-6 border-t border-[#485346]/40 flex justify-between items-center text-xs font-sans text-[#677d64] mt-6">
                <span>Confidencialidad garantizada</span>
                <span>Respuesta en menos de 24h</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Direct Email Link */}
        <ScrollReveal delay={250}>
          <div className="text-center mt-8 text-[#677d64] text-xs md:text-sm font-sans">
            Consultas directas:{' '}
            <a
              href="mailto:clickshop.code@gmail.com?subject=Consulta%20Directa%20Clickshop&body=Hola%20equipo%20Clickshop,"
              className="text-[#859984] hover:text-[#7fee64] underline underline-offset-2 transition-colors"
            >
              clickshop.code@gmail.com
            </a>
          </div>
        </ScrollReveal>
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

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-xs font-sans">
            <a href="/#work" className="text-[#859984] hover:text-[#7fee64] transition-colors">
              Proyectos
            </a>
            <a href="/#services" className="text-[#859984] hover:text-[#7fee64] transition-colors">
              Servicios
            </a>
            <a href="/#process" className="text-[#859984] hover:text-[#7fee64] transition-colors">
              Proceso
            </a>
            <span className="hidden md:inline text-[#485346]">|</span>
            <Link href="/politica-de-privacidad" className="text-[#697368] hover:text-[#7fee64] transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos-y-condiciones" className="text-[#697368] hover:text-[#7fee64] transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/aviso-legal" className="text-[#697368] hover:text-[#7fee64] transition-colors">
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
