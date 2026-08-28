import type { Metadata } from "next";
import localFont from "next/font/local";
import { Archivo, Roboto_Mono } from "next/font/google";
import { AgentationDev } from "@/components/dev/AgentationDev";
import "./globals.css";

const barnegat = localFont({
  src: "./fonts/Barnegat-Regular.otf",
  variable: "--font-barnegat",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atlética — Programación de entrenamiento",
  description:
    "Atlética es el método de programación, cursos y comunidad para atletas que entrenan en serio. Programaciones, formación profesional y experiencia de marca desde Buenos Aires.",
  openGraph: {
    title: "Atlética — Programación de entrenamiento",
    description:
      "Programaciones, cursos y comunidad para atletas que entrenan en serio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body
        className={`${barnegat.variable} ${archivo.variable} ${mono.variable} bg-ink text-paper font-sans antialiased`}
      >
        {children}
        <AgentationDev />
      </body>
    </html>
  );
}
