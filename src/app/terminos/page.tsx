import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/sections/LegalLayout";

export const metadata: Metadata = {
  title: "Términos y condiciones — Atlética",
  description:
    "Términos y condiciones de uso de las planificaciones, cursos y servicios de Atlética Fitness.",
};

const sections: LegalSection[] = [
  {
    h: "Aceptación",
    body: [
      "Al acceder y utilizar el sitio de Atlética Fitness y contratar nuestras planificaciones o cursos, aceptás estos términos y condiciones en su totalidad. Si no estás de acuerdo, te pedimos que no utilices el servicio.",
    ],
  },
  {
    h: "Quiénes somos",
    body: [
      "Atlética Fitness es una marca de programación de entrenamiento, cursos y comunidad con base en Buenos Aires, Argentina.",
    ],
  },
  {
    h: "Servicios",
    body: [
      "Ofrecemos planificaciones de entrenamiento por suscripción y cursos digitales en video. El contenido tiene fines educativos y de entrenamiento, y se entrega a través de nuestras plataformas o aplicaciones.",
      "Podemos modificar, actualizar o discontinuar parte de los contenidos para mejorar la calidad del servicio.",
    ],
  },
  {
    h: "Registro y cuenta",
    body: [
      "Para acceder a algunos servicios necesitás crear una cuenta con datos reales y mantenerlos actualizados. Sos responsable de la confidencialidad de tus credenciales y de la actividad realizada desde tu cuenta.",
    ],
  },
  {
    h: "Precios y pagos",
    body: [
      "Los precios se expresan en pesos argentinos (ARS) e incluyen los impuestos que correspondan. Los pagos se procesan a través de plataformas de terceros; Atlética no almacena los datos completos de tu medio de pago.",
      "Las suscripciones se renuevan según el plan contratado y podés darlas de baja en cualquier momento. Por tratarse de contenidos digitales de acceso inmediato, los cursos no admiten reembolso una vez iniciado el acceso, salvo lo que disponga la legislación vigente.",
    ],
  },
  {
    h: "Licencia de uso",
    body: [
      "Al comprar una planificación o curso recibís una licencia personal, intransferible y no exclusiva para acceder al contenido. No está permitido compartir, revender, reproducir ni distribuir el material sin autorización expresa.",
    ],
  },
  {
    h: "Propiedad intelectual",
    body: [
      "Todos los contenidos —videos, textos, planificaciones, logos y marcas— son propiedad de Atlética Fitness o de sus instructores y están protegidos por las leyes de propiedad intelectual.",
    ],
  },
  {
    h: "Salud y responsabilidad",
    body: [
      "El entrenamiento implica esfuerzo físico. Antes de comenzar, te recomendamos consultar con un profesional de la salud. Realizás los ejercicios bajo tu propia responsabilidad, respetando las indicaciones, escalas y progresiones provistas.",
      "Atlética no se responsabiliza por lesiones derivadas de una ejecución incorrecta, del uso indebido del material o de condiciones de salud preexistentes no informadas.",
    ],
  },
  {
    h: "Modificaciones",
    body: [
      "Podemos actualizar estos términos en cualquier momento. La versión vigente será siempre la publicada en este sitio, con su fecha de última actualización.",
    ],
  },
  {
    h: "Ley aplicable y contacto",
    body: [
      "Estos términos se rigen por las leyes de la República Argentina. Ante cualquier consulta podés escribirnos por nuestras redes oficiales: Instagram @atletica.fitness o YouTube @atleticafitness.",
    ],
  },
];

export default function Page() {
  return (
    <LegalLayout
      title="Términos y condiciones"
      updated="Junio de 2026"
      intro="Estos términos regulan el acceso y el uso del sitio de Atlética Fitness, así como la contratación de nuestras planificaciones y cursos."
      sections={sections}
    />
  );
}
