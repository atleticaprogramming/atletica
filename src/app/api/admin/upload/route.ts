import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  handleUpload,
  handleUploadPresigned,
  type HandleUploadBody,
} from "@vercel/blob/client";
import { issueSignedToken } from "@vercel/blob";
import { uploadMode } from "@/lib/upload-mode";
import { isAuthenticated } from "@/lib/auth";

// Subida de imágenes y videos desde el panel.
// · Con Vercel Blob: el navegador sube directo a Blob y esta ruta sólo firma
//   el permiso (así no hay límite de 4,5 MB de Vercel). Con almacén OIDC
//   (BLOB_STORE_ID) firma una URL; con BLOB_READ_WRITE_TOKEN, un token.
// · En local sin Blob: recibe el archivo y lo guarda en public/uploads.

const MAX = 50 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "video/mp4", "video/webm"];

export async function POST(request: Request) {
  const type = request.headers.get("content-type") ?? "";

  if (type.includes("application/json")) {
    const raw = await request.json();
    if (uploadMode() === "presigned") {
      try {
        const res = await handleUploadPresigned({
          body: raw,
          request,
          getSignedToken: async (pathname) => {
            if (!isAuthenticated()) throw new Error("Sesión vencida. Volvé a entrar.");
            const token = await issueSignedToken({
              pathname,
              operations: ["put"],
              allowedContentTypes: TYPES,
              maximumSizeInBytes: MAX,
            });
            return { token };
          },
        });
        return NextResponse.json(res);
      } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 400 });
      }
    }
    const body = raw as HandleUploadBody;
    try {
      const res = await handleUpload({
        body,
        request,
        // El aviso de «subida terminada» llega desde Vercel, sin la cookie
        // del admin: por eso la sesión se comprueba sólo al firmar.
        onBeforeGenerateToken: async () => {
          if (!isAuthenticated()) throw new Error("Sesión vencida. Volvé a entrar.");
          return { allowedContentTypes: TYPES, maximumSizeInBytes: MAX };
        },
        onUploadCompleted: async () => {},
      });
      return NextResponse.json(res);
    } catch (e) {
      return NextResponse.json({ error: (e as Error).message }, { status: 400 });
    }
  }

  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Sesión vencida. Volvé a entrar." }, { status: 401 });
  }
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Falta conectar el almacenamiento de imágenes (Vercel Blob)." },
      { status: 500 }
    );
  }

  const form = await request.formData();
  // Sin `instanceof File`: Node 19 no lo trae global.
  const file = form.get("file") as Blob & { name?: string } | null;
  if (!file || typeof file === "string" || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ error: "No llegó ningún archivo." }, { status: 400 });
  }
  if (!TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Formato no admitido." }, { status: 400 });
  }

  const nombre = file.name || "imagen.jpg";
  const ext = path.extname(nombre).toLowerCase() || ".jpg";
  const base = path
    .basename(nombre, path.extname(nombre))
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "imagen";
  const name = `${base}-${Date.now().toString(36)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${name}` });
}
