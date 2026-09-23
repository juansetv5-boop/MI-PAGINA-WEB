/**
 * Generador dinámico y humanizado de enlaces de WhatsApp para Clickshop
 */

export interface BuildWhatsAppUrlParams {
  name?: string;
  company?: string;
  service?: string;
  phoneNumber?: string;
}

export const DEFAULT_WHATSAPP_PHONE = '573127930898';

/**
 * Mapea el tipo de servicio a un sustantivo natural en minúsculas para desarrollo
 */
export function getServiceLabel(service: string = ''): string {
  const normalized = service.toLowerCase().trim();
  if (normalized.includes('landing')) {
    return 'landing page';
  }
  if (normalized.includes('corporativ')) {
    return 'página corporativa';
  }
  if (
    normalized.includes('sistema') ||
    normalized.includes('medida') ||
    normalized.includes('plataforma')
  ) {
    return 'plataforma a medida';
  }
  return normalized || 'landing page';
}

/**
 * Evalúa si el servicio solicitado corresponde a Asesoría / Consultoría
 */
export function isAsesoriaService(service: string = ''): boolean {
  const normalized = service.toLowerCase().trim();
  return (
    normalized === 'asesoria' ||
    normalized.includes('asesor') ||
    normalized.includes('consultor')
  );
}

/**
 * Construye el mensaje humanizado condicional según la intención del cliente
 */
export function buildWhatsAppMessage({
  name,
  company,
  service,
}: {
  name?: string;
  company?: string;
  service?: string;
}): string {
  const userName = name?.trim() || 'un cliente';
  const trimmedCompany = company?.trim();
  const companyText = trimmedCompany ? ` de ${trimmedCompany}` : '';

  // a) Si es Asesoría ('service === "asesoria"')
  if (isAsesoriaService(service)) {
    return `¡Hola! Soy ${userName}${companyText}. Estuve viendo Clickshop y me gustaría tener una asesoría con ustedes para ver qué es lo que realmente le conviene a mi negocio. ¿Cómo podríamos cuadrarla?`;
  }

  // b) Si es Proyecto de Desarrollo (Landing, Corporativa, Sistema)
  const serviceLabel = getServiceLabel(service);
  return `¡Hola! Soy ${userName}${companyText}. Estuve mirando su web y me interesa que trabajemos en una ${serviceLabel} para mi proyecto. Quería contarles un poco la idea para que lo revisemos.`;
}

/**
 * Genera el enlace wa.me completamente codificado para no romper tildes, signos ni saltos
 */
export function buildWhatsAppUrl({
  name,
  company,
  service,
  phoneNumber = DEFAULT_WHATSAPP_PHONE,
}: BuildWhatsAppUrlParams): string {
  const message = buildWhatsAppMessage({ name, company, service });
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedText}`;
}
