# Project Context & State Tracking

## 1. Current Status
- **Framework & Build**: Next.js 16 (App Router) + TypeScript 5 + Tailwind CSS v4.
- **Build Verification**: `next build` pasa limpiamente (0 errores, 0 advertencias).

- **Estructura Fija en Scrollytelling (Sin Zig-Zag)**:
  - Se eliminó la alternancia de columnas (Zig-zag) en `ScrollytellingHero.tsx`.
  - La columna de texto se mantiene fija a la izquierda y el reproductor Canvas a la derecha durante las 3 fases del recorrido.
  - Se conservan las animaciones direccionales Slide-In de texto, el mapeo de fotogramas (1-38, 39-70, 71-84) y el track de `500vh`.

- **Corrección de Textos en Métricas & Animaciones (Fade-In / Smooth Scroll)**:
  - Copy corregido en Hero: `+100% Imagen Profesional`, `3 Revisiones Estratégicas (Ajustes a Medida)` y `Diseño Mobile-First (Optimización Total)`.
  - Componente `ScrollReveal.tsx` activo en toda la landing page con desapuntado de `IntersectionObserver`.
  - `html { scroll-behavior: smooth; }` para la navegación fluida por anclas.

- **Sanitización de Ciberseguridad & Sincronización GitHub**:
  - EmailJS operando mediante variables de entorno en `.env.local` con `.gitignore` protegido.
  - Repositorio remoto: `https://github.com/juansetv5-boop/MI-PAGINA-WEB.git`.

## 2. Architecture Notes
- Distribución visual fija de 2 columnas (Texto a la izquierda | Canvas a la derecha) para una lectura fluida, natural e ininterrumpida durante el scroll.

## 16/09/2026 - Páginas Legales
- Creadas rutas politica-de-privacidad, 	erminos-y-condiciones, y viso-legal.
- Agregados enlaces de navegación en el Footer.
- 
pm run build exitoso.

## 16/09/2026 - Refactorización Consola de Contacto Interactiva (EmailJS & Asesoría 1 a 1)
- Refactorizada la consola interactiva (TerminalContactFooter.tsx) con un flujo de captura progresiva de 4 pasos independientes:
  - Paso 1: Nombre completo (userName).
  - Paso 2: Email de contacto (userEmail).
  - Paso 3: Selección de tipo de servicio (Landing Page, Página Web Corporativa, Sistema Web a Medida, y la nueva opción "Asesoría 1 a 1").
  - Paso 4: Detalle o mensaje del negocio (message).
- Actualizado el envío vía EmailJS mapeando los parámetros individuales (user_name, user_email, service_type, message) junto con alias de compatibilidad.
- Pantalla de confirmación con estilo terminal al enviar la consulta.
- 
pm run build ejecutado exitosamente.

## 16/09/2026 - Corrección de Auto-Scroll / Focus Intrusivo en Consola
- Eliminados los atributos utoFocus de los campos de entrada e inputs de TerminalContactFooter.tsx y ConversionWizardModal.tsx.
- Se evita que el navegador desplace automáticamente el viewport hacia la consola del footer al cargar la web o cambiar de paso.
- El usuario permanece de forma natural en la parte superior (Hero) al cargar el sitio.
- 
pm run build ejecutado exitosamente.
