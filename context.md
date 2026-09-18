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

---
## [2026-09-17] Rollback de Estructura Scrollytelling & Desenfoque Ambiental en Fase 2

### Rollback y Restauración
- Restaurada la arquitectura modular de 3 Capítulos previa en ScrollytellingHero.tsx con disposición limpia de 2 columnas (Texto fijo a la izquierda | Monitor Canvas a la derecha).

### Tratamiento de Desenfoque Ambiental (Ambient Blur) en Fase 2
- Añadido efecto de resplandor y desenfoque ambiental posterior (g-[#7fee64]/20 blur-3xl opacity-40) detrás del marco del monitor cuando la Fase 2 (fotogramas verticales) está activa.
- Garantizado un encuadre estético y limpio que rellena los laterales durante la transición de la Fase 2 sin alterar la proporcionalidad ni generar desplazamientos brúscos de diseño (0 CLS).
- Build verificado de Next.js (código 0).

---
## [2026-09-18] Optimización en Lote — Fase 2 (Script Python + Pillow)

### Ejecución del script `scripts/optimize_fase2.py`
- **Fotogramas procesados**: 100 / 100 (001.png → 001.webp ... 100.png → 100.webp).
- **Formato de entrada**: PNG (sin compresión).
- **Formato de salida**: WebP · Calidad 82% · method=6 (compresión máxima) · optimize=True.
- **Peso total entrada**: 125.31 MB (promedio ~1.25 MB/frame).
- **Peso total salida**: 5.04 MB (promedio ~51 KB/frame).
- **Reducción total**: -120.28 MB (-96.0%).
- **Tiempo de ejecución**: 17.8 s.
- **Renombrado**: padding numérico estricto de 3 dígitos (001-100) para lectura cronológica garantizada por el Canvas.
- **Archivos PNG originales**: eliminados tras conversión exitosa.
- **Errores reales**: 0 (los mensajes de consola eran únicamente charmap de Windows al imprimir la flecha, no fallos de conversión).
- **Log de ejecución**: `scripts/optimize_fase2_log.txt`.

---
## [2026-09-18] Arquitectura Modular de Bloques Alternados (Sandwich Full-Screen)

### Reestructuracion del Scrollytelling
- Desacopladas las animaciones Canvas de las pantallas informativas para eliminar la competencia visual de scroll y textos simultaneos.
- Implementada la secuencia de bloques modulares alternados a pantalla completa (100vh):
  * **BLOQUE 1 (Canvas Fase 1)**: Scroll pinning en h-[200vh] con sticky top-0 h-screen w-full que reproduce la secuencia de 84 fotogramas de /frames/fase1/ al ritmo del scroll del usuario.
  * **BLOQUE 2 (Info Fase 1)**: Pantalla completa estatica (min-h-screen w-full bg-[#080808]) que entra naturalmente al liberarse el pin. Presenta los 3 pilares de Arquitectura Tecnica (Next.js App Router/SSR, TypeScript Estricto 100%, Lighthouse 100/100) con metricas clave y boton CTA directo hacia el Wizard modal.
  * **BLOQUE 3 (Canvas Fase 2)**: Contenedor con scroll pinning en h-[200vh] que reproduce los 100 fotogramas optimizados de /frames/fase2/ (001.webp a 100.webp).
  * **BLOQUE 4 (Info Fase 2)**: Pantalla completa estatica dedicada a la Experiencia Visual & UX/UI (Jerarquia Visual de Alta Retencion, Diseno Mobile-First Adaptativo, Micro-interacciones a 60 FPS).
  * **BLOQUE 5 (Canvas Fase 3)**: Contenedor con scroll pinning en h-[200vh] que reproduce los 92 fotogramas de /frames/fase3/ (01.webp a 92.webp).
  * **BLOQUE 6 (Info Fase 3)**: Pantalla completa estatica enfocada en Conversion & Ventas 24/7 (Captacion Progresiva sin Friccion, Cierre Inmediato por WhatsApp, Disponibilidad Cloud 99.9%).

### Gestion de Memoria y Rendimiento
- **Carga y liberacion progresiva**: Cada PhaseCanvasBlock cuenta con un IntersectionObserver (margen de 500px) que precarga los fotogramas de forma anticipada antes de entrar en el viewport y libera las referencias de memoria (imagesRef.current = []) cuando el usuario se desplaza lejos de la seccion.
- **Render loop eficiente a 60 FPS**: Interpolacion suave (lerp) que solo se ejecuta cuando el bloque esta proximo al viewport, reduciendo el consumo de CPU/GPU a cero en reposo.
- **Escalado adaptativo de Canvas**: Renderizado con object-contain centrado, aceleracion grafica y soporte para pantallas de alta densidad (DPR hasta 2x), evitando distorsiones y desbordamientos horizontales.
- **Build verificado**: Compilacion exitosa con Next.js 16.3.4 Turbopack y TypeScript (0 errores).

---
## [2026-09-18] Experiencia Edge-to-Edge Pura con Escalado Cover Centrado (Mobile-First)

### Eliminacion de Marcos, Bordes y Badges
- Removido el contenedor de ventana simulada (barra superior con botones tipo Mac, titulos tecnicos y badges de 60 FPS).
- Eliminados bordes exteriores, paddings contenedores y etiquetas flotantes inferiores para una experiencia visual limpia, inmersiva y cinematografica.

### Escalado Full-Screen (Object-Fit: Cover Centrado)
- Contenedor sticky configurado en w-full h-[100dvh] sticky top-0 left-0 overflow-hidden.
- Implementado escalado matematico identico a object-fit: cover centrado en el contexto del canvas 2D:
  * Calculo de escala maxima scale = Math.max(w / imgWidth, h / imgHeight).
  * Encuadre centrado ox = (w - dw) / 2 y oy = (h - dh) / 2 para asegurar que el nucleo de la accion (mano, smartphone e interfaz) permanezca visible, protegido y enfocado en cualquier resolucion movil.
  * Eliminacion total de barras negras y margenes vacios.

### Optimizacion Mobile-First & Estabilidad
- Uso de 100dvh para evitar saltos o desajustes de interfaz por la aparicion/desaparicion de la barra de navegacion en iOS Safari y Android Chrome.
- Aceleracion por hardware con ctx.getContext('2d', { alpha: false }) y control estricto de desbordamiento horizontal (overflow-x-hidden).
- Build de produccion verificado (cero errores, codigo 0).
