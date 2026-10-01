/**
 * Cómo se suben las imágenes del panel, según cómo esté conectado Vercel Blob:
 * · "presigned": almacén conectado con OIDC (BLOB_STORE_ID, lo que crea hoy
 *   el panel de Vercel). El navegador sube con una URL firmada.
 * · "token": almacén con la llave clásica BLOB_READ_WRITE_TOKEN.
 * · "local": sin Blob; en desarrollo se guarda en public/uploads.
 */
export type UploadMode = "presigned" | "token" | "local";

export function uploadMode(): UploadMode {
  if (process.env.BLOB_STORE_ID && process.env.BLOB_WEBHOOK_PUBLIC_KEY) return "presigned";
  if (process.env.BLOB_READ_WRITE_TOKEN) return "token";
  return "local";
}
