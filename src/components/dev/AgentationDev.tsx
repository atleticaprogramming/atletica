"use client";
import dynamic from "next/dynamic";

// Carga diferida y solo en cliente (es una herramienta de escritorio que toca el DOM)
const Agentation = dynamic(
  () => import("agentation").then((m) => m.Agentation),
  { ssr: false }
);

/**
 * Monta Agentation únicamente en desarrollo. En el build de producción
 * devuelve null y el chunk de la librería ni siquiera se carga.
 */
export function AgentationDev() {
  if (process.env.NODE_ENV === "production") return null;
  return <Agentation />;
}
