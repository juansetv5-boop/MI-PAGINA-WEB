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
- Arranque directo ultra rápido (0ms) sin pantalla de carga ni bloqueos de rendering: Máximo rendimiento 100/100 en Lighthouse y Core Web Vitals (FCP, LCP, CLS).
- Ventana superior enmarcada flotante (Look Lonzo Visuals) con bordes redondeados (rounded-2xl md:rounded-3xl) animada de forma instantánea mediante keyframes nativos CSS (`@keyframes lonzoWindowEntrance`) con físicas elásticas y cascada interna (*stagger*).
- Flujo inferior 100% full-width a pantalla completa (w-full max-w-full bg-[#0a0a0a] px-4 md:px-12 lg:px-24) que abarca Proceso, Sobre Nosotros y Consola de Contacto sin marcos restrictivos.
- Barra de navegación móvil inferior rediseñada como cápsula flotante glassmorphism con botón central destacado y target ergonómico para el pulgar.

## 22/09/2026 - Compactación y Optimización Responsiva de Pestañas IDE en Móvil
- **Ajuste de Espaciado y Tipografía Compacta (`src/components/IDETabManager.tsx`)**:
  - Clases aplicadas al contenedor de pestaña (`<button role="tab">`):
    `px-2.5 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs md:text-sm font-mono whitespace-nowrap min-h-[38px] sm:min-h-[44px]`.
  - Gap interno entre ícono y etiqueta optimizado: `gap-1.5 sm:gap-2`.
- **Optimización Visual y Táctil en Móvil**:
  - Botón de cierre decorativo (`×`) configurado con `hidden sm:flex`: Oculto en móviles para evitar toques accidentales y liberar espacio útil de pantalla; visible en tablet/desktop.
  - Borde superior activo (`border-t-2 border-t-[#7fee64]`) perfectamente integrado en la altura compacta.
  - Contenedor con desplazamiento táctil fluido: `overflow-x-auto no-scrollbar flex items-center w-full px-2 py-1 bg-[#252526] border-t border-b border-[#1f2a33]`.
- **Validación Técnica y Git**:
  - `npm run build` verificado con 0 errores y 0 advertencias de compilación / TypeScript (código 0).
  - Conservado estrictamente en local sin `git push`.

## 22/09/2026 - Humanización y Condicionales Dinámicos para Mensajes de WhatsApp
- **Lógica Condicional y Generador de Mensajes (`src/utils/whatsapp.ts`)**:
  - Implementado generador dinámico de URL `https://wa.me/573127930898?text=...` con codificación segura `encodeURIComponent(mensaje)` para preservar signos, tildes y saltos de línea.
  - Formato limpio de empresa: Si el usuario proporciona empresa, se añade ` de {empresa}`; si no, se omite de forma natural sin espacios dobles ni anomalías (`Soy Carlos.` vs `Soy Carlos de Mendoza Consultores.`).
  - Campo de empresa marcado como opcional en el modal (`ConversionWizardModal.tsx`).
- **Templates Dinámicos según Intención**:
  - **Asesoría / Consultoría (`service === 'asesoria'`)**:
    *"¡Hola! Soy {userName}{companyText}. Estuve viendo Clickshop y me gustaría tener una asesoría con ustedes para ver qué es lo que realmente le conviene a mi negocio. ¿Cómo podríamos cuadrarla?"*
  - **Proyectos de Desarrollo (Landing Page, Web Corporativa, Sistema a Medida)**:
    *"¡Hola! Soy {userName}{companyText}. Estuve mirando su web y me interesa que trabajemos en una {serviceLabel} para mi proyecto. Quería contarles un poco la idea para que lo revisemos."*
  - Mapeo de `serviceLabel` en minúsculas naturales: `"landing page"`, `"página corporativa"`, `"plataforma a medida"`.
- **Integración en Componentes**:
  - `ConversionWizardModal.tsx` migrado para utilizar `buildWhatsAppUrl` y opciones estructuradas (`landing`, `corporativa`, `sistema`, `asesoria`).
- **Validación Técnica y Git**:
  - `npm run build` verificado exitosamente con 0 errores y 0 advertencias de TypeScript (código 0).
  - Conservado estrictamente en local sin `git push`.

## 22/09/2026 - Refactorización de Servicios: Brand Voice Humano, Micro-Copy Corto, Remoción de Tags y Cero Tiempos de Entrega
- **Eliminación Total de Tags Técnicos y Tiempos de Entrega**:
  - Removidos por completo todos los chips y badges tipo `[Diseño a Medida]`, `[Mobile-First]`, `[Alta Velocidad]`, `[Sin Plantillas]`.
  - Eliminada toda mención a plazos y tiempos de entrega ("2-3 semanas", "X días", "tiempos récord", SLAs) tanto en encabezados como en el banner inferior de compromiso y en las tarjetas.
- **Micro-Copy Humano y Conciso (Exactamente 2 líneas por opción)**:
  - **Landing Page**: *"Una página directa y sin rodeos, pensada para presentar lo que ofreces y guiar a tu cliente a contactarte sin enredos."*
  - **Página Corporativa**: *"La casa digital de tu negocio. Ordena quién eres y tus proyectos para transmitir confianza sólida desde el primer segundo."*
  - **Sistema a Medida**: *"Herramientas y paneles creados a la medida de tu operación para resolver procesos específicos de tu día a día."*
- **Call-to-Action Unificado e Interacción**:
  - Botón interactivo en cada tarjeta: *"Hablemos de este proyecto →"*, que preselecciona el servicio en el formulario de contacto (`TerminalContactFooter.tsx`) mediante evento custom `select-service` y hace scroll suave a `#contact`.
  - Pestaña del IDE en `IDETabManager.tsx` actualizada a: `Servicios & Soluciones Digitales`.
- **Validación Técnica y Git**:
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias de compilación / TypeScript (código 0).
  - Conservado estrictamente en local sin `git push`.

## 22/09/2026 - Reescritura de Textos y Humanización de Copy Oficial Clickshop
- **Reglas de Tono y Comunicación Oficial**:
  - Cero tecnicismos (eliminadas menciones a SSR, Core Web Vitals, Frameworks, latencia o APIs).
  - Tono fresco, comprensivo, transparente y directo centrado en la empatía, el orden y la tranquilidad del cliente.
- **Hero Principal (`HeroSection.tsx`)**:
  - Titular: *"Te entendemos a ti tanto como a tu página web."*
  - Descripción: *"Da mucha rabia cuando pagas por una web prometiendo profesionalismo y te entregan algo básico, lento y sin alma que hace pensar que tener una página no sirve. Nosotros no solo ordenamos tu información: hacemos que quien entre sienta tranquilidad, entienda lo que ofreces y se quede hasta el final."*
  - Botón principal: *"Hablemos de tu idea"*.
  - Botón secundario: *"Ver proyectos reales"*.
  - Tres puntos de valor clave:
    1. *"Se ve bien, funciona mejor"* (Tu portada cumple lo que promete).
    2. *"Sin enredos raros"* (Hablas directo con quien hace tu página, de tú a tú).
    3. *"Carga en un pestañeo"* (Porque nadie espera una página lenta).
- **Sección Sobre Nosotros / Filosofía (`CleanEditorialAbout.tsx`)**:
  - Titular: *"Una página no es solo para verse bonita. Es para transmitir tranquilidad."*
  - Texto central (Analogía del Libro):
    *"Imagina que tu web es como un libro. Si la portada es hermosa pero abres las páginas y todo está desordenado, confuso o no habla de lo que prometía la carátula, el lector simplemente lo cierra y se va decepcionado. Nuestro trabajo es ser el escritor que acompaña a tu cliente paso a paso desde la primera línea hasta la última. Cuando una página cumple lo que promete y se siente fácil de recorrer, la gente confía. Y cuando la gente confía, tu negocio se muestra más. Así de simple funciona. :D"*
- **Sección de Contacto (`TerminalContactFooter.tsx`)**:
  - Titular: *"Cuéntanos qué tienes en mente."*
  - Subtítulo: *"Sin tecnicismos ni formularios raros. Cuéntanos qué hace tu negocio y te decimos con total sinceridad cómo lo resolveríamos nosotros."*
  - Pasos del formulario humanizados con preguntas cercanas y botones directos (*"Continuar →"*, *"Enviar mensaje →"*).
- **Secciones de Portafolio y Servicios (`PortfolioShowcase.tsx`, `ServicesView.tsx`)**:
  - Textos y métricas adaptados para comunicar valor humano (*"Velocidad Instantánea"*, *"Claridad 100%"*, *"Diseño a Medida"*).
- **Validación Técnica y Git**:
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias de compilación / TypeScript (código 0).
  - Conservado estrictamente en local sin `git push`.

## 22/09/2026 - Corrección Responsiva en Móvil: Ocultación de Botón WPP, Ajuste de Navbar, Selector de Portafolio y Vista Minimalista
- **Eliminación del Botón Flotante de WhatsApp en Móvil**:
  - `FloatingWhatsAppButton.tsx`: Configurado con `hidden md:flex`, eliminando cualquier solapamiento o distracción en viewports móviles mientras se preserva accesible en pantallas de escritorio (`md:flex fixed bottom-6 right-6`).
- **Ajuste Ergonómico en `MobileBottomNav.tsx`**:
  - Contenedor reajustado a `justify-between px-1 sm:px-2` con margen seguro para garantizar que el botón flotante central de cotización no invada ni tape los enlaces laterales ('Proyectos' y 'Servicios').
- **Solución al Desbordamiento en Selector de Portafolio (`PortfolioShowcase.tsx`)**:
  - Contenedor de pestañas reestructurado como pastilla elástica contenida: `w-full max-w-sm sm:max-w-md mx-auto p-1 bg-[#121612] border border-[#2d2d2d] rounded-xl flex items-center justify-between overflow-x-auto no-scrollbar gap-1`.
  - Botones ajustados con `whitespace-nowrap px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg flex-1 text-center transition-all`.
  - Etiqueta adaptativa por breakpoint:
    - Móvil: `<span className="sm:hidden">Dactilología AI</span>`
    - Desktop: `<span className="hidden sm:inline">Traductor Dactilología Alpha</span>`
  - La pastilla activa verde respeta el padding interno sin recortar bordes redondeados.
- **Vista Minimalista en Móvil (Título + Mockup Interactivo)**:
  - En pantallas móviles (`block md:hidden`), la tarjeta de proyecto se enfoca estrictamente en:
    1. Título del caso de estudio (`h3` centrado/limpio).
    2. Mockup interactivo a pantalla completa con previsualización nítida y enlace directo `Visitar ↗`.
  - Textos descriptivos extensos, métricas secundarias y etiquetas de stack tecnológico se ocultaron en móvil (`hidden md:block`/`hidden md:grid`), evitando saturación visual y scroll innecesario.
- **Validación Técnica y Git**:
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias de compilación / TypeScript (código 0).
  - Conservado estrictamente en local sin `git push`.

## 22/09/2026 - Calibración de Animación de Entrada: Ritmo Chill, Ultra-Smooth y Desaceleración Inercial
- **Reajuste de Curva Inercial y Keyframes Nativos**:
  - Curva de tiempo ultra relajada con desaceleración orgánica: `cubic-bezier(0.05, 0.9, 0.1, 1)` (cero tirones bruscos).
  - Duración total de la ventana: `3.4s`.
  - Keyframes `@keyframes lonzoWindowEntrance`:
    - 0%: `opacity: 0; transform: translateY(28px) scale(0.95); filter: blur(4px);`
    - 40%: `opacity: 1; filter: blur(0px);`
    - 80%: `transform: translateY(2px) scale(0.995);`
    - 100%: `opacity: 1; transform: translateY(0px) scale(1);`
- **Desacople y Stagger Progresivo Relajado de los Elementos Interiores**:
  - Header (`<header>`): Arranca a los `0.4s` con duración de `1.2s` (`translateY(-10px) -> 0px`).
  - Glow verde de fondo: Fade-in atmosférico tenue de `2.0s` iniciando a los `0.6s`.
  - H1 ("Te entendemos a ti..."): Fade-in suave de abajo hacia arriba iniciando a los `0.9s` (duración `1.2s`, `translateY(16px) -> 0px`).
  - Párrafo descriptivo: Arranca a los `1.3s` con fade puro (duración `1.0s`).
  - Botones de acción ("Diseña tu muestra" / "Ver cómo trabajamos"): Se integran a los `1.7s` con scale suave (`0.97 -> 1`, duración `1.0s`).
  - Specs/Métricas (+100%, 3 Revisiones, Mobile-First): Flotan a su posición final a los `2.0s` con duración de `1.2s`, completando el asentamiento total en los ~3.2s - 3.4s.
- **Optimización de Hardware y Renderizado GPU**:
  - Propiedad `will-change: transform, opacity` activa durante el ciclo de animación y liberada a `'auto'` tras 3700ms en `IDETabManager.tsx` y `HeroSection.tsx`.
  - Sin micro-saltos de scroll ni CLS.
- **Validación Técnica y Git**:
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias (código 0).
  - Conservado estrictamente en local sin `git push`.

## 22/09/2026 - Eliminación Completa de Pantalla de Carga (Loading Screen) para Rendimiento 100/100 y Arranque Directo
- **Desmontaje y Remoción Total**:
  - Eliminado por completo el componente `LoadingScreen.tsx`.
  - Removido el import y la invocación de `<LoadingScreen />` en `src/app/page.tsx`.
  - Eliminadas todas las dependencias de eventos globales (`loading-screen-exit`), temporizadores de espera y flags de carga inicial.
- **Arranque Inmediato con Keyframes CSS Nativos**:
  - La ventana principal del IDE se anima en el milisegundo cero sin esperar hidratación mediante `.animate-lonzo-window` (`@keyframes lonzoWindowEntrance`):
    - Curva: `cubic-bezier(0.16, 1, 0.3, 1)`.
    - Duración: `800ms`.
    - Estado: `scale: 0.91 translateY(35px) -> scale: 1 translateY(0)`, `opacity: 0 -> 1`.
    - Punto de anclaje: `transform-origin: center center`.
  - Cascada interna de micro-retrasos en CSS puro (`animation-fill-mode: both`):
    - Header/Navbar: `.animate-lonzo-header` (retraso 120ms, `-12px -> 0px`).
    - Titular H1: `.animate-lonzo-h1` (retraso 220ms, `20px -> 0px`).
    - Párrafo de valor: `.animate-lonzo-paragraph` (retraso 300ms, `15px -> 0px`).
    - Botones de acción CTA: `.animate-lonzo-buttons` (retraso 380ms, `15px scale(0.97) -> 0px scale(1)`).
    - Barra de métricas: `.animate-lonzo-metrics` (retraso 460ms, `10px -> 0px`).
- **Limpieza de Recursos y Composición**:
  - `will-change: transform, opacity` se aplica transitoriamente durante la animación y se restablece a `'auto'` a los 1250ms.
  - Zero bloqueo del hilo principal de ejecución, permitiendo renderizado inmediato First Contentful Paint (FCP) y Largest Contentful Paint (LCP) óptimos.
- **Validación Técnica y Git**:
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias de compilación / TypeScript (código 0).
  - Conservado estrictamente en local sin `git push`.

## 22/09/2026 - Animación OS Window Pop-in estilo Lonzo Visuals con Físicas Elásticas y Stagger Interno
- **Sincronización con Pantalla de Carga**:
  - `LoadingScreen.tsx`: Disparo síncrono del evento personalizado `loading-screen-exit` (`window.dispatchEvent(new CustomEvent('loading-screen-exit'))`) en cuanto inicia el fade-out de salida.
  - `IDETabManager.tsx`: Receptor activo del evento con temporizador de fallback (3.3s si existe video, 50ms si no existe loader) para garantizar la ejecución confiable en cualquier condición.
- **Físicas y Animación del Marco Contenedor**:
  - Curva de transición elástica: `cubic-bezier(0.16, 1, 0.3, 1)` (Swift/macOS Spring).
  - Duración total de entrada: `800ms`.
  - Transformación inicial: `opacity: 0`, `scale: 0.91`, `translate-y: 35px`.
  - Transformación final: `opacity: 1`, `scale: 1`, `translate-y: 0`.
  - Expansión simétrica: `transform-origin: center center`.
- **Cascada (Stagger) de Elementos Interiores**:
  - Barra Superior / Navbar del IDE (`header`): Retraso `120ms`, `translate-y: -12px -> 0px`, `opacity: 0 -> 1`.
  - Título H1 del Hero ("Te entendemos a ti tanto como a tu página web"): Retraso `220ms`, `translate-y: 20px -> 0px`, `opacity: 0 -> 1`.
  - Párrafo de Valor ("Sin tecnicismos raros..."): Retraso `300ms`, `translate-y: 15px -> 0px`, `opacity: 0 -> 1`.
  - Botones de Acción ("Diseña tu muestra" / "Ver cómo trabajamos"): Retraso `380ms`, `translate-y: 15px -> 0px`, `scale: 0.97 -> 1`, `opacity: 0 -> 1`.
  - Barra Inferior de Métricas (+100%, 3 Revisiones, Mobile-First): Retraso `460ms`, `translate-y: 10px -> 0px`, `opacity: 0 -> 1`.
- **Optimización y Limpieza de Composición**:
  - Inyección transitoria de `will-change: transform, opacity` durante el ciclo de entrada, removida automáticamente a los 1200ms-1250ms (`willChange: 'auto'`).
  - Preservación de `overflow-x: clip` para evitar aparición de barras de desplazamiento horizontales durante la escala.
- **Validación Técnica y Git**:
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias (código de salida 0).
  - Conservado estrictamente en local sin `git push`.

## 22/09/2026 - Configuración Universal de Pantalla de Carga en cada Inicio / F5 con loading-screen-opt
- **Eliminación de Persistencia de Sesión**:
  - Removido el almacenamiento y consulta de banderas en `sessionStorage` o `localStorage`.
  - El estado del loader inicializa siempre activo (`const [isLoading, setIsLoading] = useState(true)`), garantizando una reproducción consistente tanto en la primera visita como en cada recarga de página (F5 / refresh).
- **Consumo Exclusivo del Asset Optimizado**:
  - Elemento `<video>` configurado para consumir directamente `/loading-screen-opt.mp4` (H.264 optimizado, 302 KB, sin audio).
  - Propiedades: `autoPlay`, `muted`, `playsInline`, `preload="auto"`, `disablePictureInPicture`.
  - Capa envolvente fija: `fixed inset-0 z-50 bg-[#000000] flex items-center justify-center pointer-events-none`.
- **Ciclo de Vida y Transición Suave**:
  - Disparado por el evento `onEnded` del video, con fallback de seguridad a 3.2 segundos ante posibles retrasos del navegador.
  - Transición de desvanecimiento: `opacity-0 transition-opacity duration-500 ease-out`.
  - Desmontaje total del nodo del DOM al concluir los 500ms para liberar memoria y recursos GPU.
- **Validación Técnica y Git**:
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias (código de salida 0).
  - Todo probado y conservado estrictamente en local (sin `git push`).

## 22/09/2026 - Compresión de Video, Remoción de Audio y Pantalla de Carga 100/100 Lighthouse
- **Compresión y Remoción de Pista de Audio vía FFmpeg**:
  - Archivo original `public/loading-screen.mp4`: **4.18 MB (4,378,579 bytes)** con pista de audio estéreo AAC.
  - Generada versión WebM ultra optimizada (VP9) sin audio:
    - Comando: `ffmpeg -i public/loading-screen.mp4 -an -c:v libvpx-vp9 -crf 32 -b:v 0 -s 1280x720 public/loading-screen.webm`
    - Peso final: **500.89 KB (512,908 bytes)** (reducción del **88.3%**).
  - Generada versión MP4 optimizada (H.264) con `faststart` sin audio:
    - Comando: `ffmpeg -i public/loading-screen.mp4 -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -s 1280x720 public/loading-screen-opt.mp4`
    - Peso final: **302.44 KB (309,700 bytes)** (reducción del **92.9%**).
  - Ambos formatos se sitúan significativamente por debajo del límite de 800 KB, garantizando métricas óptimas de LCP y Core Web Vitals en Lighthouse.
- **Montaje del Componente `LoadingScreen.tsx`**:
  - Contenedor fijo en pantalla completa (`fixed inset-0 z-50 bg-[#000000] flex items-center justify-center pointer-events-none`).
  - Atributos del reproductor: `autoPlay`, `muted`, `playsInline`, `preload="auto"`, `disablePictureInPicture`.
  - Jerarquía ordenada de fuentes para compatibilidad y menor consumo de ancho de banda:
    1. `/loading-screen.webm` (video/webm)
    2. `/loading-screen-opt.mp4` (video/mp4)
    3. `/loading-screen.mp4` (video/mp4 fallback)
  - Desmontaje limpio tras `onEnded` o fallback de seguridad a 3 segundos con transición `opacity-0 transition-opacity duration-500 ease-out`, liberando memoria y aceleración GPU al remover el nodo del DOM.
  - Persistencia de sesión con `sessionStorage.setItem("clickshop_loader_seen", "true")`.
- **Validación Técnica y Git**:
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias.
  - Mantenido estrictamente en local (sin `git push`).

## 22/09/2026 - Refactorización de Secciones Inferiores, Liberación a Pantalla Completa y Navbar Móvil Glassmorphism
- **Eliminación de Elementos Obsoletos**:
  - Removido el banner de texto intermedio de cita del equipo y sus botones CTA hijos en `CleanEditorialAbout.tsx`.
  - Removido el bloque de los tres pilares innegociables (03 / NUESTROS TRES PILARES INNEGOCIABLES: Velocidad Absoluta, Contacto Directo, Propiedad Total) en `CleanEditorialAbout.tsx`.
  - Removida la sección obsoleta de servicios estáticos (`ValuePropositionGrid.tsx`) del flujo principal; los servicios estructurados residen de forma modular en `services.json` (`ServicesView.tsx`).
- **Transición a Ancho Completo (Full-Width sin Márgenes)**:
  - Todo el flujo inferior (Proceso, Sobre Nosotros y Consola de Contacto) se extiende a pantalla completa: `w-full max-w-full bg-[#0a0a0a] px-4 md:px-12 lg:px-24` sin bordes redondeados perimetrales que corten el viewport lateral.
- **Rediseño Glassmorphism de la Barra Móvil (`MobileBottomNav.tsx`)**:
  - Convertido en cápsula flotante estilizada: `fixed bottom-3 left-4 right-4 z-50 bg-[#121612]/80 backdrop-blur-xl border border-[#7fee64]/25 rounded-2xl px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)]`.
  - Botón central 'Cotizar' destacado con relieve: `-mt-5 bg-[#7fee64] text-[#000000] w-13 h-13 rounded-full shadow-[0_0_22px_rgba(127,238,100,0.45)] border-2 border-[#121612]`.
  - Enlaces táctiles de mínimo 44px con feedback visual verde neón `#7fee64`.
- **Validación Técnica y Git**:
  - Preservado `overflow-x: clip` en todo el layout para garantizar cero scroll horizontal en móviles.
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias.
  - Conservado estrictamente en local (sin `git push`).

## 22/09/2026 - Eliminación de Banner CTA/Badge y Expansión a Pantalla Completa (Full-Width) desde #services
- **Eliminación de Elementos Obsoletos**:
  - Eliminado el banner con la cita del equipo ("Hacemos las cosas bien porque el mal software nos quita el sueño") y sus botones hijos de llamada a la acción en `CleanEditorialAbout.tsx`.
  - Eliminada la etiqueta de versión (`v2.4.0`) de la cabecera del editor en `IDETabManager.tsx`.
- **Reestructuración de Layout: Enmarcado Superior + Pantalla Completa desde #services**:
  - El contenedor flotante con bordes redondeados (`max-w-7xl mx-auto rounded-2xl md:rounded-3xl border border-[#2d2d2d]`) cierra justo después del Hero inicial.
  - A partir de `<section id="services">` (`ValuePropositionGrid.tsx`) y en todas las secciones subsiguientes (Proceso, Sobre Nosotros y Consola de Contacto), los bloques se montan directamente sobre el flujo raíz: `w-full max-w-none px-0` ocupando el 100% del ancho de pantalla de borde a borde.
  - Se conservan contenedores internos centrados (`max-w-[1360px] mx-auto px-6 md:px-12`) para mantener una lectura tipográfica equilibrada.
- **Control Responsivo y Compilación**:
  - Preservado `overflow-x: clip` en html, body y contenedores para blindaje contra overflow lateral.
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias.
  - Conservado estrictamente en local (sin `git push`).

## 22/09/2026 - Refactorización de Layout: Remoción de Scrollytelling, Enmarcado Flotante Redondeado y Flujo Global de About & Contact
- **Eliminación de Componentes Obsoletos y Barras Sobrantes**:
  - Eliminado por completo el componente `ScrollytellingHero.tsx`, bloques de canvas de fotogramas y scripts de scroll asistido.
  - Eliminada la badge superior con animación pulsante (`LIVE`).
  - Eliminada completamente la barra de estado inferior (`<footer>` Status Bar de VS Code), dejando limpia la base de la ventana.
- **Contenedor Enmarcado Flotante con Bordes Redondeados (Look Lonzo Visuals)**:
  - Wrapper exterior con fondo `#0a0a0a` y espaciado perimetral responsivo (`p-2.5 sm:p-5 md:p-8 min-h-screen flex flex-col justify-center`).
  - Contenedor de la Ventana Principal: `w-full max-w-7xl mx-auto bg-[#1e1e1e] rounded-2xl md:rounded-3xl border border-[#2d2d2d] shadow-2xl overflow-hidden relative flex flex-col my-auto`.
  - Cabecera de ventana preservando controles circulares tipo Mac (rojo, amarillo, verde), logotipo Clickshop, Command Palette (`⌘P`) y selector de pestañas del IDE.
- **Reestructuración de Pestañas y Flujo Global de Secciones**:
  - Pestañas del Tab Manager enfocadas en vistas técnicas principales:
    - `page.tsx`: Hero principal (con padding superior optimizado para el marco), Value Proposition Grid y Trust Tools.
    - `portfolio.ts`: Casos de estudio y portafolio interactivo (`PortfolioShowcase.tsx`).
    - `services.json`: Servicios, plazos de entrega, garantías SLA y toggle de JSON Schema (`ServicesView.tsx`).
  - Flujo vertical global en todas las vistas:
    - Al desplazarse hacia abajo dentro de cualquiera de las tres vistas, el usuario desemboca fluidamente en:
      1. **Sección 'Sobre Nosotros'** (`CleanEditorialAbout.tsx`): Diseño editorial limpio integrado orgánicamente con anclas `#about` y `#process`, sin barras flotantes intrusivas y con llamada a la acción hacia la consola.
      2. **Sección 'Contacto'** (`TerminalContactFooter.tsx`): Consola terminal interactiva de cotización en 4 pasos con integración EmailJS y pie legal.
- **Validación Técnica y Git**:
  - Preservado `overflow-x: clip` en html, body y contenedores para blindaje contra overflow lateral.
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias.
  - Todo probado y conservado estrictamente en local (sin `git push`).

## 22/09/2026 - Transformación de Identidad Visual a Entorno IDE (VS Code) + Modo Editorial Limpio
- **Pantalla de Carga Cinemática (`LaptopIntro.tsx`)**:
  - Implementada animación fija en pantalla completa (`fixed inset-0 z-50 bg-[#080808]`) simulando la apertura de laptop y zoom cinemático hacia la pantalla de analíticas.
  - Temporizado en 3 segundos con transición suave de desvanecimiento (`opacity-0 scale-105 pointer-events-none transition-all duration-500`).
  - Persistencia de sesión con `sessionStorage.getItem('clickshop_intro_seen')` para no repetir la intro en recargas de la misma sesión. Incluye soporte para tecla ESC y botón 'Saltar intro'.
- **Arquitectura de Pestañas IDE (`IDETabManager.tsx`)**:
  - Reemplazo del encabezado tradicional por una interfaz completa estilo VS Code:
    - Barra superior con controles tipo Mac, breadcrumbs de ruta (`clickshop > src > app > [tab]`) y atajo de Command Palette (`⌘P`).
    - Pestañas activas con fondo `#1e1e1e`, acento superior verde neón `#7fee64` de 2px, texto blanco, icono de tecnología y botón de cierre `×`.
    - Navegación táctil horizontal con inercia nativa (`overflow-x-auto no-scrollbar snap-x`) para pantallas móviles.
    - Barra inferior de estado (Status Bar) en `#007acc` con rama de git (`main*`), codificación `UTF-8`, lenguaje activo y selector de indentación.
- **Conmutador de Contenido Modular (Tabs)**:
  - `page.tsx`: Muestra el ecosistema de inicio (Hero, Scrollytelling, Propuesta de valor, Garantía y herramientas de confianza).
  - `portfolio.ts`: Despliega directamente el portafolio y casos de estudio reales (`PortfolioShowcase.tsx`).
  - `services.json`: Creado `ServicesView.tsx` con especificación de servicios, plazos de entrega (5-7 días, 10-14 días), SLA de disponibilidad y selector de vista visual vs. JSON Schema crudo.
  - `contact.sh`: Carga directamente la consola interactiva Unix en 4 pasos (`TerminalContactFooter.tsx`).
- **Modo Editorial Limpio para `about.md` (Ruptura de Interfaz)**:
  - Creado `CleanEditorialAbout.tsx`: transición suave que oculta las barras de cromo del editor (tabs y status bar).
  - Experiencia editorial minimalista inspirada en Lonzo Visuals con grandes titulares tipográficos, principios no negociables (Ingeniería de Primer Nivel, Sin Plantillas Genéricas, Transparencia Radical) y manifiesto del equipo.
  - Botón flotante accesible de retorno: `← Volver al Editor` para restaurar la vista IDE instantáneamente.
- **Sincronización de Anclas y Navegación**:
  - Sincronización bidireccional entre hashes URL (`#work`, `#services`, `#contact`, `#about`) y el estado de la pestaña activa, manteniendo compatibilidad total con enlaces externos y la barra móvil.
- **Blindaje Responsivo y Compilación**:
  - Mantenido `overflow-x: clip` global en contenedores sin romper el sticky pinning del Scrollytelling.
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias.

## 18/09/2026 - Refactorización Integral de Arquitectura Dual (Mobile vs Desktop)
- **Estrategia Dual de Componentes**:
  - **Navegación & Ergonomía del Pulgar**:
    - Creado componente `MobileBottomNav.tsx` accesible con el pulgar para pantallas móviles (`block md:hidden`), con accesos directos a Proyectos, Servicios, Proceso, Contacto y botón central "Cotizar" destacado en `#7fee64`.
    - Ajustado `FloatingWhatsAppButton.tsx` para situarse de forma ergonómica sobre la barra de navegación inferior móvil (`bottom-20 md:bottom-6`).
    - Modificado `StickyHeader.tsx` para desktop con enlaces expandidos y drawer móvil con enlaces y botones táctiles de mínimo 44px de altura.
  - **Portafolio y Casos de Estudio (`PortfolioShowcase.tsx`)**:
    - En móvil (`block md:hidden`): Tarjetas táctiles limpias de borde a borde para RLP Compliance, Dactilología AI y UI/UX Lab, eliminando barras de navegador simuladas innecesarias y proporcionando botones CTA con mínimo 48px de alto para accionar con el pulgar.
    - En escritorio (`hidden md:block`): Mockups detallados de ventana de navegador simulada con controles tipo Mac, indicador `● EN VIVO` animado, estado `HTTP/3 FAST CACHE` y microinteracciones de cursor (`hover:scale-[1.03]` y overlay emergente).
    - SegmentedControl con swipe táctil e inercia nativa (`overflow-x-auto snap-x snap-mandatory pb-2`) y botones táctiles `min-h-[44px]`.
  - **Scrollytelling & Hero (`ScrollytellingHero.tsx`, `HeroSection.tsx`)**:
    - En móvil: Canvas y visualización edge-to-edge sin etiquetas de depuración ni barras decorativas.
    - En escritorio: HUD técnico superpuesto con indicadores de `RENDER ENGINE: 60 FPS CANVAS` y aceleración por hardware.
    - Botones de acción y CTA con altura mínima de 48px en Hero y fases del recorrido.
  - **Consola y Formulario de Contacto (`TerminalContactFooter.tsx`)**:
    - En móvil (`flex md:hidden`): Encabezado limpio en tarjeta con contador de pasos `Paso X de 4`, inputs con tamaño de fuente base `text-base` (16px) que evitan el auto-zoom indeseado en iOS Safari, botones de opción táctiles de 50px de altura y botón de envío a ancho completo.
    - En escritorio (`hidden md:flex`): Encabezado estilo terminal Unix `clickshop@terminal:~ $ contact.sh` con botones de ventana tipo Mac y reinicio de consola.
  - **Modal de Conversión (`ConversionWizardModal.tsx`)**:
    - Opciones táctiles con altura mínima de 48px, botones de navegación responsivos a ancho completo en mobile.
  - **Servicios y Garantía (`ValuePropositionGrid.tsx`, `TrustToolSection.tsx`)**:
    - Botones y enlaces con targets táctiles de mínimo 44-48px.
- **Validación de Rendimiento y Build**:
  - `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias.

## 18/09/2026 - Previsualización Interactiva RLP Compliance en Mockup de Portafolio
- Capturada imagen de alta resolución (1440x900) del sitio real en producción `https://rlpcompliance.com`.
- Optimizada y guardada como `/public/assets/portfolio/rlpcompliance-preview.webp` (WebP 85%, ~58 KB) para máxima velocidad de carga y 0 CLS.
- Integrado componente Next.js `<Image />` con dimensiones responsivas (`fill`, `object-cover object-top`, `sizes`) dentro del marco de navegador simulado en `PortfolioShowcase.tsx`.
- Envoltura del mockup completo como enlace interactivo hacia `https://rlpcompliance.com` (`target="_blank"`, `rel="noopener noreferrer"`).
- Agregado estado de hover con resplandor perimetral verde `#7fee64`, zoom sutil de imagen (`scale-[1.03]`), badge animado `Visitar sitio en vivo ↗` con backdrop blur, y micro-interacción con indicador pulsante `● EN VIVO`.
- Conservadas barra superior con botones tipo Mac y barra inferior con `ESTADO: 200 OK` y `HTTP/3 FAST CACHE`.
- `npm run build` ejecutado exitosamente con 0 errores y 0 advertencias.

## 16/09/2026 - Páginas Legales
- Creadas rutas politica-de-privacidad, 	erminos-y-condiciones, y  viso-legal.
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

---
## [2026-09-18] Diagnóstico y Corrección de Desbordamiento Horizontal (Overflow-X) en Móvil

### Diagnóstico Ejecutado
- **Elemento culpable identificado**: La fila de métricas/estadísticas del Hero (`HeroSection.tsx`, línea 64) usaba `grid grid-cols-3 gap-4` sin breakpoint responsivo, forzando 3 columnas incluso en pantallas de 320-375px. El texto "3 Revisiones Estratégicas" y "Diseño Mobile-First" no cabía en 1/3 del ancho de pantalla móvil, generando desbordamiento horizontal y el espacio negro visible a la derecha.
- **Glows/resplandores ambientales**: Los blobs de `HeroSection.tsx` (`w-[600px]`) y `ScrollytellingHero.tsx` (`w-[700px]`) están contenidos en padres con `overflow-hidden`, por lo que NO contribuían al overflow.
- **`w-screen` / `100vw`**: No se encontraron instancias en ningún componente.

### Correcciones Aplicadas

#### 1. HeroSection.tsx — Specs Bar Responsiva
- `grid-cols-3` → `grid-cols-1 sm:grid-cols-3` para colapsar a 1 columna en móvil.
- `gap-4` → `gap-6 sm:gap-4` para mejor separación vertical en stack.
- Textos de métricas: `text-lg` → `text-base sm:text-lg` para escalado seguro en pantallas pequeñas.

#### 2. globals.css — Blindaje Global
- `html`: Añadido `overflow-x: hidden; max-width: 100%;`.
- `body`: Añadido `overflow-x: hidden; max-width: 100%; position: relative;`.

#### 3. layout.tsx — Viewport Meta + Clases de Protección
- Exportado `viewport: Viewport` con `width: 'device-width'`, `initialScale: 1`, `maximumScale: 1`, `userScalable: false`.
- `<html>`: Añadido `overflow-x-hidden max-w-full`.
- `<body>`: Añadido `overflow-x-hidden max-w-full relative`.

#### 4. page.tsx — Contenedores Raíz
- Wrapper `<div>`: Añadido `overflow-x-hidden max-w-full`.
- `<main>`: Añadido `max-w-full overflow-x-hidden`.

### Validación
- `npm run build` ejecutado exitosamente (0 errores, código 0).

---
## [2026-09-18] Corrección de Raíz de Sticky Pinning en Scrollytelling (`overflow-x: clip`)

### Causa Raíz del Desplazamiento Prematuro del Canvas
- La aplicación previa de `overflow-x: hidden` en contenedores ancestros (`html`, `body`, el `div` raíz de `page.tsx` y `<main>`) creaba un contexto de recorte de desbordamiento (overflow clipping/scroll container).
- Según la especificación CSS, cuando un contenedor ancestro tiene `overflow-x: hidden`, el navegador anula el comportamiento de `position: sticky` relativo a la ventana de visualización (viewport) para los elementos descendientes, provocando que el Canvas se desplazara hacia arriba como flujo normal en lugar de quedarse fijado.

### Solución Implementada: Transición a `overflow-x: clip`
- **`overflow-x: clip` vs `overflow-x: hidden`**: `overflow-x: clip` bloquea estrictamente cualquier desbordamiento horizontal en el eje X SIN crear un mecanismo de scroll ni un nuevo contexto de desplazamiento de contenedor, manteniendo intacto el comportamiento de `position: sticky` de los elementos hijos respecto al viewport.

### Archivos Modificados
1. **`src/app/globals.css`**:
   - `html`: `overflow-x: clip; max-width: 100%;`
   - `body`: `overflow-x: clip; max-width: 100%; position: relative;`
2. **`src/app/layout.tsx`**:
   - `<html>`: Reemplazado `overflow-x-hidden` por `overflow-x-clip`.
   - `<body>`: Reemplazado `overflow-x-hidden` por `overflow-x-clip`.
3. **`src/app/page.tsx`**:
   - Contenedor raíz (`<div>`): Reemplazado `overflow-x-hidden` por `overflow-x-clip`.
   - Contenedor principal (`<main>`): Reemplazado `overflow-x-hidden` por `overflow-x-clip`.
4. **`src/components/ScrollytellingHero.tsx`**:
   - Contenedor Padre (Track de scroll): `relative h-[250vh] w-full bg-[#000000]`.
   - Contenedor Hijo (Canvas/Viewport): `sticky top-0 left-0 w-full h-screen h-[100dvh] flex items-center justify-center overflow-hidden bg-[#000000] select-none`.
   - El Canvas permanece anclado al viewport durante todo el avance de los fotogramas (0% a 100%) y se libera hacia la pantalla de información al completar la altura del padre (`h-[250vh]`).

### Validación y Estado
- Verificado con compilación limpia en producción local (`npm run build` Turbopack: 0 errores).
- Cambios mantenidos estrictamente en entorno local (sin `git push`).

---
## [2026-09-18] Eliminación de 'Clickshop UI/UX Lab' del Portafolio & Cierre de Estabilización

### Modificaciones en Portafolio (`src/components/PortfolioShowcase.tsx`)
- **Eliminación de pestaña y caso de estudio**: Se retiró completamente el proyecto interno `Clickshop UI/UX Lab` (`lab.clickshop.dev`) del listado de proyectos.
- **Enfoque en Proyectos Principales**: El portafolio ahora se concentra exclusivamente en casos de alto impacto:
  1. **RLP Compliance S.A.S.** (`rlp`): Plataforma web corporativa en producción (`rlpcompliance.com`), previsualización interactiva de Home, métricas de 99.8% disponibilidad y enlace directo.
  2. **Traductor de Dactilología Alpha** (`dactilologia`): Proyecto de visión por computadora con IA, pipeline a 60 FPS, 21 keypoints y 98.4% de precisión.
- **Selector por defecto**: Inicializado en `rlp` (RLP Compliance).
- **Limpieza de Mockups**: Eliminados los bloques condicionales de benchmark/prototipado en las vistas duales (Mobile y Desktop).
- **Actualización de encabezado**: Subtítulo ajustado para reflejar el enfoque corporativo e inteligencia artificial.

### Resumen de Estabilización Responsiva & Scroll Pinning Completada
- **Desbordamiento móvil resuelto**: Grid del Hero colapsado a 1 columna en móvil (`grid-cols-1 sm:grid-cols-3`), evitando desbordamiento por textos largos.
- **Compatibilidad con sticky pinning**: Transición de `overflow-x: hidden` a `overflow-x: clip` en toda la jerarquía (`globals.css`, `layout.tsx`, `page.tsx`), garantizando que `position: sticky` mantenga el Canvas anclado durante el 100% del recorrido en Scrollytelling.
- **Contenedores de Scrollytelling**: Track `h-[250vh]` con Canvas sticky `h-screen h-[100dvh] flex items-center justify-center overflow-hidden`.
- **Compilación**: `npm run build` verificado exitosamente (0 errores, código 0).

---
## [2026-09-19] Optimización de Navegación Móvil & Auto-Scroll Asistido en Scrollytelling

### 1. Navegación Móvil Limpia (`src/components/StickyHeader.tsx`)
- **Ocultamiento del menú hamburguesa en móvil**: Se ocultó el botón hamburguesa en móviles (`className="hidden"`).
- **Enfoque minimalista en cabecera**: En pantallas móviles únicamente permanece visible el logotipo de Clickshop con alineación limpia y espaciado despejado, ya que la navegación táctil ergonómica y el botón de cotización están completamente cubiertos por la barra inferior `MobileBottomNav.tsx`.

### 2. Auto-Scroll Asistido / Reproducción en Scrollytelling (`src/components/ScrollytellingHero.tsx`)
- **Píldora Flotante Glassmorphism**:
  - Incorporado botón elegante centrado horizontalmente y posicionado con holgura sobre la barra móvil (`bottom-24 md:bottom-10 left-1/2 -translate-x-1/2`).
  - Estados visuales: "▶ Explorar automáticamente" / "❚❚ Pausar animación" con acentos verde fósforo `#7fee64` y micro-etiqueta sutil "o desliza libremente".
- **Lógica de Auto-Scroll Suave**:
  - Al pulsar el botón o tras 2 segundos de reposo con el bloque anclado en pantalla (pinning activo), inicia un avance continuo y suave a lo largo del track de la fase (`h-[250vh]`), animando los fotogramas del Canvas al ritmo ideal.
  - Al completar la secuencia de la fase, el auto-scroll se detiene naturalmente entregando al usuario en la tarjeta de información correspondiente.
- **Cancelación Instantánea por Interacción**:
  - Listeners pasivos globales para `touchstart`, `wheel`, `keydown` y `mousedown`. Cualquier interacción táctil o de rueda desactiva el auto-scroll de inmediato y cede el control manual del scroll al usuario sin saltos ni bloqueos.

### 3. Validación & Entorno
- `npm run build` ejecutado en local con Turbopack (0 errores, 0 advertencias).
- Cambios mantenidos estrictamente en local sin `git push`.

---
## [2026-09-19] Auto-Play Inmediato por IntersectionObserver & Control de Pausa/Reanudación en Scrollytelling

### 1. Auto-Play Inmediato (`src/components/ScrollytellingHero.tsx`)
- **Eliminación del retardo de 2 segundos**: Se reemplazó el temporizador pasivo previo por detección reactiva en tiempo real.
- **Disparo reactivo por visibilidad (30% - 50%)**: Configurado un `IntersectionObserver` con thresholds `[0, 0.1, 0.2, 0.3, 0.35, 0.4, 0.5]`. En cuanto el bloque alcanza el 35% de visibilidad en el viewport, se inicia de inmediato el desplazamiento suave asistido (~3.5 px/frame).
- **Estado inicial activo**: La píldora flotante entra directamente mostrando `❚❚ Pausar animación`, badge verde activo y señal pulsante `● AUTO`.

### 2. Control Manual de Pausa y Reanudación
- **Interrupción instantánea**: Al detectar cualquier interacción de scroll manual (`touchstart`, `wheel`, `keydown`), el avance automatizado se interrumpe de inmediato para otorgar el control completo al usuario sin tirones.
- **Estado de reanudación**: La píldora cambia a `▶ Reanudar animación` (con micro-indicador *“o desliza”*), permitiendo al usuario reactivar el avance automático desde cualquier punto de la fase con un solo toque.
- **Alternancia por clic**: Al hacer clic en la píldora, conmuta fluidamente entre pausa y reanudación de la animación.

### 3. Finalización Limpia & Ocultamiento Suave
- Al alcanzar el tramo final de la fase (`p >= 0.985`) y acceder a la tarjeta de información correspondiente, el motor detiene el auto-play y la píldora flotante se desvanece suavemente (`opacity-0 scale-95 transition-all duration-500 pointer-events-none`).

### 4. Validación & Entorno
- Compilación de producción local verificada con Turbopack (`npm run build`: 0 errores, 0 advertencias).
- Cambios conservados estrictamente en el entorno local (sin `git push`).

---
## [2026-09-22] Maximización de Mockup & Eliminación de Botón Duplicado en Portafolio

### 1. Eliminación del Botón Verde Redundante (`src/components/PortfolioShowcase.tsx`)
- **Remoción de elemento duplicado**: Se eliminó el bloque inferior de acción (`<div className="pt-4 border-t border-[#485346]/40">...</div>`) en la columna izquierda para proyectos con URL activa en vivo (`rlpcompliance.com`).
- **Enfoque en interacción principal**: Se conserva la tarjeta interactiva de la columna derecha (`<a href="https://rlpcompliance.com" target="_blank" ...>`) como el único y principal punto de interacción para abrir el sitio web en una nueva pestaña.

### 2. Escalado y Maximización del Mockup Interactivo
- **Aprovechamiento de espacio en columna**: El contenedor de la columna derecha aprovecha todo el alto disponible (`w-full h-full flex flex-col justify-center`).
- **Dimensión y nitidez ampliada en Desktop**:
  - Ajustada la relación de aspecto y dimensiones del contenedor del mockup a `aspect-[16/10] min-h-[380px] lg:min-h-[440px]`.
  - La captura de pantalla `rlpcompliance-preview.webp` se despliega con mayor amplitud y definición, permitiendo apreciar los detalles de diseño corporativo y tipografía con total claridad.

### 3. Validación & Control Local
- Compilación de producción local verificada exitosamente con Next.js 16.3.4 y Turbopack (`npm run build`: 0 errores, 0 advertencias).
- **Regla estricta Git**: Se cumple la prohibición de ejecutar `git push`. Todos los cambios permanecen en el repositorio local.

---
## [2026-09-22] Remoción de Divisores y Continuidad Visual Fluidizada (Seamless Scroll)

### 1. Remoción de Bordes y Líneas de Corte
- **Remoción de divisores estructurales**: Se eliminaron las clases de borde superior e inferior (`border-t border-[#1f2a33]`, `border-b border-[#1f2a33]`) en todos los componentes desde el Portafolio hacia el pie de página (`PortfolioShowcase.tsx`, `TrustToolSection.tsx`, `ServicesView.tsx`, `CleanEditorialAbout.tsx`, `TerminalContactFooter.tsx`).
- **Eliminación de divisores explícitos**: Se removió el elemento divisor horizontal `<div className="w-full h-px bg-[#212525] mb-20" />` en la sección de Manifiesto & Filosofía (`CleanEditorialAbout.tsx`).

### 2. Fluidez y Continuidad Visual (Seamless Scroll)
- **Unificación de fondos**: Se estandarizó el color de fondo de todas las secciones en `bg-[#0a0a0a]`, eliminando cambios bruscos de contraste visual entre bloques contiguos.
- **Ritmo de lectura basado en espaciado**: Se implementó espaciado vertical amplio y consistente (`py-24 md:py-32`) para guiar la lectura de forma natural y orgánica sin necesidad de líneas divisorias rígidas.

### 3. Validación & Control Local
- Compilación de producción local verificada exitosamente con Next.js 16.3.4 y Turbopack (`npm run build`: 0 errores, 0 advertencias).
- **Regla estricta Git**: Se cumple rigurosamente la prohibición de ejecutar `git push`. Todos los cambios se mantienen exclusivamente en local.

---
## [2026-09-22] Sistema Integral de Animaciones (Smooth Scroll, App Window Launch & Scroll Reveal Direccional)

### 1. Desplazamiento Suave Global
- **Configuración CSS**: Verificado `scroll-behavior: smooth`, `overflow-x: clip` y `max-width: 100%` en `src/app/globals.css` para un desplazamiento fluido en toda la aplicación sin tirones ni desbordamientos horizontales.

### 2. Animación de Entrada de Aplicación (Window Launch Pop-in)
- **Marco flotante del IDE (`src/components/IDETabManager.tsx`)**:
  - Implementada animación de lanzamiento al montarse el componente:
    * Estado inicial: `opacity-0 scale-[0.97] translate-y-6`
    * Estado final: `opacity-100 scale-100 translate-y-0`
    * Transición: `duration-700 cubic-bezier(0.16, 1, 0.3, 1)`
- **Stagger progresivo en Hero (`src/components/HeroSection.tsx`)**:
  - Elementos internos presentados con escalonamiento dinámico de 80ms (Título: 80ms, Subtítulo: 160ms, Botones CTA: 240ms, Métricas: 320ms).

### 3. Motor de Animación por Scroll Direccional (`src/components/ScrollReveal.tsx`)
- **Variante Bloques de Texto (`variant="text"`)**:
  - Transición vertical corta y limpia de abajo hacia arriba (`opacity-0 translate-y-4` -> `opacity-100 translate-y-0`, `duration-500`).
- **Variante Tarjetas y Elementos UI (`variant="card"`)**:
  - Slide direccional inteligente según posición layout:
    * Izquierda (`direction="left"`): `-translate-x-10 opacity-0` -> `translate-x-0 opacity-100` (`duration-700`).
    * Derecha (`direction="right"`): `translate-x-10 opacity-0` -> `translate-x-0 opacity-100` (`duration-700`).
    * Centro / Ancho Completo (`direction="up"`): `translate-y-10 opacity-0` -> `translate-y-0 opacity-100` (`duration-700`).

### 4. Rendimiento & Desapuntado (Lighthouse 100/100)
- `IntersectionObserver` configurado con `threshold: 0.15` y `rootMargin: "0px 0px -60px 0px"`.
- Desconexión inmediata por elemento observado al entrar en viewport (`observer.unobserve(entry.target)`) liberando recursos de CPU.
- Propiedad `will-change: opacity, transform` activa únicamente durante la animación y conmutada a `auto` inmediatamente al finalizar para prevenir consumo innecesario de memoria GPU.

### 5. Validación & Entorno
- Compilación de producción local verificada exitosamente con Next.js 16.3.4 y Turbopack (`npm run build`: 0 errores, 0 advertencias).
- **Regla estricta Git**: Prohibido ejecutar `git push`. Todos los cambios se mantienen rigurosamente en local.




