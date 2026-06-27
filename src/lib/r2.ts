import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.R2_BUCKET_NAME || 'bora-passageiro';
const PUBLIC_URL = process.env.R2_PUBLIC_URL || '';

/**
 * Faz upload de um arquivo para o Cloudflare R2.
 * @returns URL pública do arquivo
 */
export async function uploadToR2(
  file: File | Buffer,
  options?: { folder?: string; filename?: string; contentType?: string }
): Promise<string> {
  const folder = options?.folder || 'uploads';
  const ext = options?.filename?.split('.').pop() || 'jpg';
  const key = `${folder}/${randomUUID()}.${ext}`;

  let body: Buffer;
  let contentType = options?.contentType || 'image/jpeg';

  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer();
    body = Buffer.from(arrayBuffer);
    contentType = file.type || contentType;
  } else {
    body = file;
  }

  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));

  return `${PUBLIC_URL}/${key}`;
}

/**
 * Deleta um arquivo do Cloudflare R2.
 */
export async function deleteFromR2(url: string): Promise<void> {
  if (!url || !url.startsWith(PUBLIC_URL)) return;
  const key = url.replace(`${PUBLIC_URL}/`, '');

  await s3.send(new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  }));
}

/**
 * Verifica se o R2 está configurado.
 */
export function isR2Configured(): boolean {
  return !!(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_PUBLIC_URL);
}
