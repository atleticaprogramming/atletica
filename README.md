# Atlética — Sitio web

Sitio de marca premium para **Atlética Fitness**: programación de entrenamiento de
CrossFit, cursos y comunidad. Construido con Next.js 14 (App Router), TypeScript y
Tailwind CSS. Textos en español argentino.

## Identidad de marca

- **Tipografía display:** Barnegat (local, `src/app/fonts/Barnegat-Regular.otf`) — usada en mayúsculas.
- **Tipografía secundaria:** Archivo (cuerpo y títulos en minúscula).
- **Tipografía mono:** Roboto Mono (etiquetas / labels).
- **Colores:** `ink` #0E2433 (navy), `blue` #212ADE (principal/acento), `paper` #F4F2EC (crema), blanco.

Tokens en `tailwind.config.ts`. Utilidades `.display` / `.label` en `src/app/globals.css`.

## Secciones (`src/components/sections/`)

1. `Nav` — barra flotante + banner superior.
2. `Hero` — pantalla completa con foto y titular animado.
3. `Manifiesto` — "Qué es Atlética" + marquee de fotos + 3 pilares.
4. `Metodo` — tabs interactivos del método (4 etapas).
5. `Programas` — 3 programaciones con precio e incluye (Base / Performance / Competidor).
6. `Cursos` — sección destacada de formación (insignia + 3 cursos).
7. `Valores` — nube tipográfica con imagen al hover.
8. `Testimonios` — comunidad + métricas.
9. `Composicion` — lockup tipográfico de marca (Átletica · Buenos Aires · Samurai).
10. `CtaFinal` — llamado final sobre foto.
11. `Footer`.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3050
npm run build    # build de producción
npm start        # servir build en :3050
```

## Notas

- Las imágenes en `public/img/` son las fotos de la marca optimizadas a JPG ~1700px.
- Los precios y textos de las programaciones son una propuesta editorial lista para ajustar.
- Las animaciones de entrada usan IntersectionObserver (`src/components/ui/Reveal.tsx`)
  con red de seguridad para scrolls rápidos.
