/**
 * Enlaces de contacto de la landing (/box). Los datos (WhatsApp, mail,
 * formulario) vienen de «Contacto y enlaces» en /admin.
 */

export type Ajustes = {
  whatsapp: string;
  email: string;
  preinscripcionUrl: string;
};

/** ¿Hay un número de WhatsApp cargado? */
export const tieneWhatsapp = (a: Ajustes) => a.whatsapp.replace(/\D/g, "").length > 0;

/** WhatsApp con el mensaje escrito, o mail mientras no haya número cargado. */
export function contactoHref(a: Ajustes, mensaje: string) {
  const numero = a.whatsapp.replace(/\D/g, "");
  if (numero) {
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  }
  return `mailto:${a.email}?body=${encodeURIComponent(mensaje)}`;
}

/** Sin formulario cargado, la intención de preinscribirse va por contacto
 *  para no dejar el botón muerto. */
export function preinscripcionHref(a: Ajustes, nombre = "Atlética Fitness Center") {
  return (
    a.preinscripcionUrl.trim() ||
    contactoHref(a, `Hola! Quiero preinscribirme en ${nombre}.`)
  );
}

/** Abre en pestaña nueva todo lo que sale del sitio. */
export const externo = (href: string) =>
  /^(https?:|mailto:)/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
