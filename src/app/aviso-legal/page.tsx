import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Aviso Legal | Clickshop',
  description: 'Aviso Legal de Clickshop Labs.',
};

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#000000] pt-32 pb-24 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#697368] hover:text-[#7fee64] transition-colors text-sm mb-8 inline-block">
          &larr; Volver al inicio
        </Link>
        <h1 className="text-[32px] md:text-[42px] font-medium tracking-[-0.015em] text-[#ddffdc] mb-8">
          Aviso <span className="text-[#7fee64]">Legal</span>
        </h1>
        
        <div className="prose prose-invert prose-p:text-[#8cab87] prose-headings:text-[#ddffdc] prose-a:text-[#7fee64] max-w-none">
          <h2>1. Datos Identificativos</h2>
          <p>
            Nombre comercial: Clickshop<br />
            Email de contacto: clickshop.code@gmail.com<br />
            Actividad: Servicios de diseño web, desarrollo de software a medida, landing pages y soluciones digitales.
          </p>

          <h2>2. Propiedad Intelectual e Industrial</h2>
          <p>
            El diseño del portal, sus códigos fuente, logotipos, marcas y demás signos distintivos que aparecen en el mismo pertenecen a Clickshop y están protegidos por los correspondientes derechos de propiedad intelectual e industrial.
          </p>

          <h2>3. Responsabilidad de los Contenidos</h2>
          <p>
            Clickshop no se hace responsable de la legalidad de otros sitios web de terceros desde los que pueda accederse a este portal. Tampoco responde por la legalidad de otros sitios web de terceros que pudieran estar vinculados o enlazados desde este portal.
          </p>

          <h2>4. Ley Aplicable</h2>
          <p>
            La ley aplicable en caso de disputa o conflicto de interpretación de los términos que conforman este aviso legal, así como cualquier cuestión relacionada con los servicios del presente portal, será la legislación vigente aplicable en la jurisdicción correspondiente.
          </p>
        </div>
      </div>
    </main>
  );
}
