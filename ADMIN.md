# Panel de administración

El contenido del sitio (cursos, planificaciones y precios) se gestiona desde
**`/admin`**, sin tocar código. La fuente de verdad es una base de datos
**Postgres (Neon)** en Vercel. Si no hay base de datos conectada, el sitio
muestra el contenido base de `src/lib/seed-data.ts` en modo **solo lectura**.

## Qué puede editar el cliente

- **Cursos**: crear/editar/eliminar páginas de curso completas — título, slug
  (URL), categoría, precio, descripción corta (tarjeta), descripción larga,
  módulos, "incluye", instructor/a, orden y si está publicado.
- **Planificaciones**: principales (sección "Planificaciones") y "otras"
  (carrusel), con descripción, características, precio, período, link de
  suscripción, nota al pie, orden, publicado y si aparece en el footer.

> No hay subida de imágenes (por diseño). El campo "imagen" de un curso es
> opcional y apunta a una ruta ya existente en `/public`.

## Acceso

- URL: `/admin` → redirige a `/admin/login`.
- Contraseña: variable de entorno **`ADMIN_PASSWORD`**.

## Puesta en marcha (una vez)

### 1. Crear la base de datos en Vercel
En el proyecto en Vercel → pestaña **Storage** → **Create Database** →
**Neon (Postgres)** → conectar al proyecto. Vercel agrega solo las variables
`POSTGRES_URL` (y relacionadas) al entorno.

> Alternativa por CLI: `vercel link` y luego crear el store desde el dashboard
> (la creación de stores no está disponible de forma desatendida por CLI).

### 2. Definir las variables de entorno en Vercel
En **Settings → Environment Variables**:
- `ADMIN_PASSWORD` = la contraseña del panel.
- `SESSION_SECRET` = una cadena larga y aleatoria.

### 3. Cargar el contenido inicial
Entrar a `/admin`, y en el panel principal usar **"Recargar desde datos base"**.
Eso crea las tablas (si no existen) y carga todo el contenido actual del sitio.
Listo: a partir de ahí se edita todo desde el panel.

## Desarrollo local

```bash
cp .env.local.example .env.local   # completar ADMIN_PASSWORD y SESSION_SECRET
# opcional, para editar contra la DB real:
vercel env pull .env.local
npm run dev
```

Sin `POSTGRES_URL`, `/admin` se ve pero los cambios no se guardan (modo lectura).

## Notas técnicas

- Tras guardar, las páginas públicas se revalidan automáticamente
  (`revalidatePath`), así el cambio se ve enseguida.
- Capa de datos: `src/lib/db.ts` (esquema + seed), `src/lib/content.ts`
  (lectura con fallback), `src/lib/content-write.ts` (escritura).
- Las acciones del panel están en `src/app/admin/actions.ts`.
