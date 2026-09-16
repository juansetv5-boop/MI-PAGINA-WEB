import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidad | Clickshop',
  description: 'Política de Privacidad de Clickshop Labs.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#000000] pt-32 pb-24 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#697368] hover:text-[#7fee64] transition-colors text-sm mb-8 inline-block">
          &larr; Volver al inicio
        </Link>
        <h1 className="text-[32px] md:text-[42px] font-medium tracking-[-0.015em] text-[#ddffdc] mb-8">
          Política de <span className="text-[#7fee64]">Privacidad</span>
        </h1>
        
        <div className="prose prose-invert prose-p:text-[#8cab87] prose-headings:text-[#ddffdc] prose-a:text-[#7fee64] max-w-none">
          <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          
          <h2>1. Información del Responsable</h2>
          <p>
            Denominación: Clickshop<br />
            Correo electrónico de contacto: clickshop.code@gmail.com<br />
            Actividad: Servicios de diseño web, desarrollo de software a medida, landing pages y soluciones digitales.
          </p>

          <h2>2. Finalidad del Tratamiento de Datos</h2>
          <p>
            En Clickshop recogemos y procesamos los datos personales proporcionados a través de nuestro formulario de contacto (gestionado mediante EmailJS) exclusivamente con la finalidad de:
          </p>
          <ul>
            <li>Atender y responder a sus consultas, solicitudes de presupuesto o propuestas de proyectos.</li>
            <li>Gestionar la relación comercial y proporcionar el servicio de diseño y desarrollo web solicitado.</li>
          </ul>

          <h2>3. Legitimación y Conservación</h2>
          <p>
            La base legal para el tratamiento de sus datos es su consentimiento explícito al enviar el formulario. Los datos se conservarán el tiempo estrictamente necesario para cumplir con las finalidades mencionadas o hasta que usted solicite su eliminación.
          </p>

          <h2>4. Comunicación de Datos a Terceros</h2>
          <p>
            Sus datos personales no serán compartidos, vendidos, ni cedidos a terceros, salvo obligación legal.
          </p>

          <h2>5. Derechos del Usuario</h2>
          <p>
            Usted tiene derecho a acceder, rectificar, cancelar, oponerse al tratamiento, limitar el mismo y a la portabilidad de sus datos. Puede ejercer estos derechos enviando un correo electrónico a <strong>clickshop.code@gmail.com</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}
