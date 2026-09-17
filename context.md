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

## 16/09/2026 - Auto-Advance de Fotogramas y Aviso de Navegación en Scrollytelling
- Implementado avance automático de fotogramas (1 a 84) a ~26 fps exclusivamente cuando el componente ScrollytellingHero.tsx entra en el viewport (mediante IntersectionObserver).
- Pausa inmediata del avance automático ante cualquier interacción manual del usuario (wheel, 	ouch, drag, keydown).
- Detención fija en el fotograma 84 al completar la secuencia para lectura continua de la Fase 3.
- Añadido badge/aviso superior minimalista en el contenedor del Scrollytelling: "Desliza para explorar a tu ritmo ↓" con icono/flecha verde animada (#7fee64).
- 
pm run build ejecutado exitosamente.

## 16/09/2026 - Refactorización de Portafolio (SegmentedControl & Layout Split 2 Columnas)
- Reemplazada la cuadrícula de 3 tarjetas en PortfolioShowcase.tsx por un control de pestañas centrado (SegmentedControl estilo glassmorphism) con selección activa:
  - "RLP Compliance"
  - "Traductor Dactilología Alpha"
  - "Clickshop UI/UX Lab"
- Implementada la arquitectura Split en 2 columnas:
  - Columna Izquierda: Categoría en acento verde (#7fee64), título del proyecto, descripción extendida, 3 tarjetas de métricas clave (ej. 99.8% Disponibilidad, 60 FPS, <0.4ms Render), stack tecnológico y botón de acción directa.
  - Columna Derecha: Vista previa tipo ventana de navegador interactiva con botones de control (rojo, amarillo, verde) y dominio activo (lpcompliance.com, dactilologia.clickshop.dev, lab.clickshop.dev).
- Añadida animación fluida de transición (desvanecimiento y escala suave opacity / scale) al cambiar entre proyectos.
- 
pm run build ejecutado exitosamente.

## 16/09/2026 - Consolidación del Sistema de Animaciones e Interacciones (Excluyendo Scrollytelling)
- Actualizado el motor de animación de entrada (ScrollReveal.tsx) para soportar la transición estandarizada de desplazamiento desde la derecha y opacidad (opacity: 0 -> 1, 	ranslateX(60px) -> translateX(0)), activado progresivamente con IntersectionObserver.
- Confirmada la interactividad de la Consola Terminal (TerminalContactFooter.tsx) con captura de datos en 4 pasos (Nombre, Email, Selección de Servicio/Asesoría, Mensaje), feedback visual de consola y 0 auto-scroll / 0 auto-focus intrusivo.
- Confirmado el visor dinámico Split del Portafolio (PortfolioShowcase.tsx) con SegmentedControl superior y transiciones ade & slide suaves.
- Aplicado el diseño de tarjetas estilo Glassmorphism (tema oscuro, bordes #485346, fondos semi-transparentes y acentos #7fee64 Lime Pulse) con micro-interacciones suaves en botones y enlaces.
- Garantizada la navegación pasiva en todas las secciones para control total del usuario sin saltos de viewport automáticos.
- 
pm run build ejecutado exitosamente.

---
## [2026-09-17] Scrollytelling 3 Capítulos + Optimización de Imágenes WebP

### Optimización masiva de fotogramas
- Ejecutado script Python con Pillow para convertir todos los .png a .webp (calidad 85%).
- Resultado: ase1/ (84 frames), ase2/ (84 frames), ase3/ (92 frames) — total 260 frames optimizados.
- Los archivos .png originales fueron eliminados para aliviar el repositorio.

### Refactorización de ScrollytellingHero.tsx — Arquitectura 3 Capítulos
- Eliminada la lógica de carga plana (/frames/NN.png) por un sistema modular por fase.
- Helper getFrameSrc(globalIndex) mapea el índice global (1-260) a la ruta correcta por carpeta:
  * ase1/: frames 1–84
  * ase2/: frames 85–168
  * ase3/: frames 169–260
- La sección tiene ahora h-[600vh] para dar más espacio de scroll a los 3 capítulos.
- Scroll dividido en 3 tercios: cada tercio avanza el capítulo correspondiente.
- Badges de progreso superiores (Capítulo 1 / 2 / 3) con estado completado (✓) visible.
- Al finalizar cada capítulo, aparece con transición suave una tarjeta con el nombre de la fase:
  * ✓ Fase 1: Arquitectura & Código
  * ✓ Fase 2: Posicionamiento & Experiencia de Usuario
  * ✓ Fase 3: Conversión & Ventas Automáticas
- El header del monitor muestra el frame local por capítulo en lugar del frame global.
- Preloader rediseñado: barra de progreso animada verde en overlay hasta completar carga.
- Auto-play activo por defecto; se cancela ante cualquier interacción de usuario (wheel/touch/key).
- Build verificado exitosamente con Next.js 16.3.4 + Turbopack (código 0).

---
## [2026-09-17] Adaptacion de Aspect Ratio Dinamico & Contenedor Full-Screen (Scrollytelling)

### Contenedor Full-Screen Pinning (100vh)
- Configurado el contenedor interno pegajoso en 'w-full h-screen sticky top-0 overflow-hidden' para asegurar fijacion del 100% del viewport durante toda la secuencia.
- Capas informativas rediseñadas con glassmorphic overlays ('bg-[#181818]/90 border border-[#485346]/80 backdrop-blur-md') ubicadas en la parte inferior o lateral (pantallas XL en Fase 2) sin obstruir el canvas animado.

### Tratamiento de Aspect Ratio Vertical en Fase 2
- Incorporada la propiedad 'isVertical: true' para la Fase 2 (fotogramas portrait 720x1280).
- Aplicado escalado adaptativo fluido ('w-auto h-full max-h-[85vh] object-contain mx-auto') permitiendo aprovechar la altura maxima sin recortes (CLS) ni deformaciones.
- Implementado el efecto de luz ambiental inteligente (Ambient Glow) detras del marco ('blur-3xl opacity-40 bg-[#7fee64]/20') ajustado a las dimensiones dinamicas.
- Transiciones CSS suaves ('transition-all duration-700 ease-out') en el marco al cambiar entre Fases 1, 2 y 3.
- Build verificado de Next.js (codigo 0).
