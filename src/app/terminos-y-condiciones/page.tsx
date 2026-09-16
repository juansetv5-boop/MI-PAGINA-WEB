import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Términos y Condiciones | Clickshop',
  description: 'Términos y Condiciones de Clickshop Labs.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#000000] pt-32 pb-24 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#697368] hover:text-[#7fee64] transition-colors text-sm mb-8 inline-block">
          &larr; Volver al inicio
        </Link>
        <h1 className="text-[32px] md:text-[42px] font-medium tracking-[-0.015em] text-[#ddffdc] mb-8">
          Términos y <span className="text-[#7fee64]">Condiciones</span>
        </h1>
        
        <div className="prose prose-invert prose-p:text-[#8cab87] prose-headings:text-[#ddffdc] prose-a:text-[#7fee64] max-w-none">
          <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          
          <h2>1. Objeto</h2>
          <p>
            Los presentes Términos y Condiciones regulan el acceso y uso del sitio web de Clickshop, así como la contratación de nuestros servicios de diseño web, desarrollo de software a medida, landing pages y soluciones digitales.
          </p>

          <h2>2. Servicios y Entregables</h2>
          <p>
            Las características específicas, plazos de entrega y costos de cada proyecto se detallarán en un presupuesto o propuesta comercial personalizada. El inicio del proyecto está condicionado a la aceptación formal de dicha propuesta y al pago del anticipo acordado.
          </p>

          <h2>3. Propiedad Intelectual</h2>
          <p>
            Todo el código, diseño y recursos generados específicamente para el cliente serán de su propiedad una vez que se haya liquidado el pago total del proyecto. Clickshop se reserva el derecho de utilizar los proyectos completados en su portafolio o materiales promocionales, a menos que se acuerde lo contrario mediante un acuerdo de confidencialidad (NDA).
          </p>

          <h2>4. Pagos y Cancelaciones</h2>
          <p>
            En caso de cancelación del proyecto por parte del cliente una vez iniciado el desarrollo, el anticipo inicial no será reembolsable, con el fin de cubrir las horas de trabajo ya invertidas.
          </p>

          <h2>5. Modificaciones</h2>
          <p>
            Clickshop se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en este sitio web.
          </p>
        </div>
      </div>
    </main>
  );
}
