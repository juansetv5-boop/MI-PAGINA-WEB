# Project Context & State Tracking

## 1. Current Status
- **Framework & Build**: Next.js 16 (App Router) + TypeScript 5 + Tailwind CSS v4.
- **Build Verification**: `next build` pasa limpiamente (0 errores, 0 advertencias).

- **Sanitización de Ciberseguridad & Sincronización GitHub**:
  - Se eliminaron todas las credenciales "quemadas" (hardcoded) del código fuente.
  - La integración de EmailJS opera exclusivamente a través de variables de entorno:
    * `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
    * `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
    * `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
  - Se verificó que el archivo `.gitignore` proteja los archivos `.env*` de ser commiteados al repositorio.
  - Sincronización remota vinculada con `https://github.com/juansetv5-boop/MI-PAGINA-WEB.git`.

- **Integración de EmailJS (Frontend Directo a clickshop.code@gmail.com)**:
  - Invocación directa a `emailjs.send(...)` pasando los parámetros `{ name, company, email, message }`.
  - Envío sin recarga de página ni requerimiento de endpoints backend en servidor.
  - Estado de carga `"Enviando..."` con spinner animado en el botón.
  - Banner/Toast de confirmación en verde: `"¡Mensaje recibido! Nos pondremos en contacto contigo lo antes posible."`.
  - Limpieza automática de todos los campos del formulario tras el envío exitoso.

- **Mejoras Previas de Layout, Branding & Wizard WhatsApp**:
  - **Márgenes y Espaciado Global**: Holgura en secciones principales (`px-6 md:px-12 lg:px-20` con `max-w-[1360px]`).
  - **Limpieza de Branding**: Logo `/public/logo.jpg` renderizado sobre canvas oscuro sin bordes ni sombras.
  - **Popup / Wizard Interactivo (WhatsApp 3127930898)**: Modal de 3 pasos con barra de progreso en verde Lime Pulse (`#7fee64`) para la captación directa de leads por WhatsApp.

- **Scrollytelling & Rendimiento**:
  - Secuencia de 84 frames PNG con layout alternado en 2 columnas (Zig-zag) para 500vh con lerp frame dampening (`0.1`) en Canvas.
  - Lenis Smooth Scroll activo globalmente.

## 2. Architecture Notes
- El proyecto cumple con estándares de ciberseguridad sin exposición de secretos en el control de versiones y está totalmente sincronizado con el repositorio remoto en GitHub.
