import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Política de privacidad — Atlética",
  description:
    "Cómo Atlética Fitness recopila, usa y protege tus datos personales.",
};

const sections: LegalSection[] = [
  {
    h: "Datos que recopilamos",
    body: [
      "Recopilamos los datos que nos brindás al registrarte o comprar: nombre, correo electrónico y datos de contacto. Los datos de pago son procesados por plataformas de terceros; no almacenamos los números completos de tarjetas.",
      "También podemos recopilar datos de uso del sitio (páginas vistas, dispositivo, navegador) de forma agregada.",
    ],
  },
  {
    h: "Cómo usamos tus datos",
    body: [
      "Utilizamos tus datos para darte acceso a las planificaciones y cursos, gestionar tu cuenta y pagos, brindarte soporte, y enviarte comunicaciones relacionadas con el servicio.",
      "Con tu consentimiento, podemos enviarte novedades, lanzamientos y promociones. Podés darte de baja en cualquier momento.",
    ],
  },
  {
    h: "Base legal",
    body: [
      "Tratamos tus datos sobre la base de la ejecución del servicio contratado, tu consentimiento y nuestro interés legítimo en mejorar la experiencia, conforme a la Ley 25.326 de Protección de los Datos Personales de Argentina.",
    ],
  },
  {
    h: "Con quién los compartimos",
    body: [
      "Compartimos datos únicamente con los proveedores necesarios para operar: procesadores de pago, plataformas de cursos y herramientas de comunicación. Estos terceros sólo acceden a la información imprescindible y bajo sus propias políticas.",
      "No vendemos tus datos personales.",
    ],
  },
  {
    h: "Cookies",
    body: [
      "Usamos cookies y tecnologías similares para el funcionamiento del sitio, recordar preferencias y medir el uso de forma anónima. Podés gestionarlas desde la configuración de tu navegador.",
    ],
  },
  {
    h: "Seguridad",
    body: [
      "Aplicamos medidas razonables para proteger tus datos. Ningún sistema es 100% infalible, pero trabajamos para minimizar los riesgos.",
    ],
  },
  {
    h: "Tus derechos",
    body: [
      "Podés solicitar el acceso, la rectificación, la actualización o la supresión de tus datos personales, así como retirar tu consentimiento, escribiéndonos por nuestros canales oficiales.",
    ],
  },
  {
    h: "Conservación",
    body: [
      "Conservamos tus datos mientras mantengas una cuenta activa o sea necesario para prestarte el servicio y cumplir obligaciones legales.",
    ],
  },
  {
    h: "Cambios",
    body: [
      "Podemos actualizar esta política. Publicaremos siempre la versión vigente en este sitio, con su fecha de última actualización.",
    ],
  },
  {
    h: "Contacto",
    body: [
      "Por consultas sobre privacidad podés escribirnos a Instagram @atletica.fitness o YouTube @atleticafitness.",
    ],
  },
];

export default function Page() {
  return (
    <LegalLayout
      title="Política de privacidad"
      updated="Junio de 2026"
      intro="En Atlética Fitness cuidamos tu información. Esta política explica qué datos recopilamos, cómo los usamos y cuáles son tus derechos."
      sections={sections}
    />
  );
}
