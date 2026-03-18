import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const DEFAULT_MAX_FILE_SIZE = 40 * 1024 * 1024;
const DEFAULT_MAX_IMAGE_DIMENSION = 2400;
const DEFAULT_IMAGE_QUALITY = 82;

const PASSTHROUGH_EXTENSIONS = new Set(['.gif', '.svg']);

export const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || `${DEFAULT_MAX_FILE_SIZE}`, 10);
export const MAX_IMAGE_DIMENSION = parseInt(
  process.env.MAX_IMAGE_DIMENSION || `${DEFAULT_MAX_IMAGE_DIMENSION}`,
  10
);
export const OUTPUT_IMAGE_QUALITY = parseInt(
  process.env.OUTPUT_IMAGE_QUALITY || `${DEFAULT_IMAGE_QUALITY}`,
  10
);

export class UploadError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'UploadError';
    this.status = status;
  }
}

export function sanitizeFilename(name: string) {
  const base = path.basename(name || 'file');
  return base.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 200);
}

export async function ensureUniqueName(dir: string, name: string) {
  let candidate = name;
  let i = 1;
  while (true) {
    try {
      await fs.access(path.join(dir, candidate));
      const ext = path.extname(name);
      const base = path.basename(name, ext);
      candidate = `${base}_${Date.now()}_${i}${ext}`;
      i++;
    } catch {
      return candidate;
    }
  }
}

export function isAdminRequest(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  return (
    cookieHeader
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('admin-auth='))
      ?.split('=')[1] === 'true'
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const rounded = value >= 10 ? value.toFixed(0) : value.toFixed(1);
  return `${rounded} ${units[unitIndex]}`;
}

function isSupportedImage(file: File) {
  const extension = path.extname(file.name || '').toLowerCase();
  return (
    (file.type || '').startsWith('image/') ||
    ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'].includes(extension)
  );
}

function isPassthroughFormat(filename: string, mimeType: string) {
  const extension = path.extname(filename).toLowerCase();
  return PASSTHROUGH_EXTENSIONS.has(extension) || mimeType === 'image/gif' || mimeType === 'image/svg+xml';
}

function buildWebpFilename(filename: string) {
  const extension = path.extname(filename);
  const base = path.basename(filename, extension) || 'image';
  return `${base}.webp`;
}

async function optimizeImage(file: File) {
  const originalSize = file.size ?? 0;
  if (originalSize > MAX_FILE_SIZE) {
    throw new UploadError(`File too large: ${file.name}`, 413);
  }

  if (!file.name || !isSupportedImage(file)) {
    throw new UploadError(`Unsupported file type: ${file.name || 'unknown'}`, 415);
  }

  const safeName = sanitizeFilename(file.name);
  const mimeType = (file.type || '').toLowerCase();
  const originalBuffer = Buffer.from(await file.arrayBuffer());

  if (isPassthroughFormat(safeName, mimeType)) {
    return {
      buffer: originalBuffer,
      filename: safeName,
      originalBytes: originalBuffer.length,
      savedBytes: originalBuffer.length,
      optimized: false,
    };
  }

  try {
    let pipeline = sharp(originalBuffer, { failOn: 'error' }).rotate();
    const metadata = await pipeline.metadata();
    const needsResize =
      (metadata.width ?? 0) > MAX_IMAGE_DIMENSION || (metadata.height ?? 0) > MAX_IMAGE_DIMENSION;

    pipeline = pipeline.resize({
      width: MAX_IMAGE_DIMENSION,
      height: MAX_IMAGE_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    });

    const compressedBuffer = await pipeline
      .webp({
        quality: OUTPUT_IMAGE_QUALITY,
        effort: 6,
      })
      .toBuffer();

    if (!needsResize && compressedBuffer.length >= originalBuffer.length) {
      return {
        buffer: originalBuffer,
        filename: safeName,
        originalBytes: originalBuffer.length,
        savedBytes: originalBuffer.length,
        optimized: false,
      };
    }

    return {
      buffer: compressedBuffer,
      filename: buildWebpFilename(safeName),
      originalBytes: originalBuffer.length,
      savedBytes: compressedBuffer.length,
      optimized: true,
    };
  } catch {
    throw new UploadError(`Invalid image file: ${file.name}`, 415);
  }
}

export async function saveUploadedFiles(req: Request, relativeDir: string, label: string) {
  if (!isAdminRequest(req)) {
    throw new UploadError('Unauthorized', 401);
  }

  const formData = await req.formData();
  const files = formData.getAll('files') as File[];

  if (!files || files.length === 0) {
    throw new UploadError('No files uploaded', 400);
  }

  const uploadDir = path.join(process.cwd(), relativeDir);
  await fs.mkdir(uploadDir, { recursive: true });

  const saved: string[] = [];
  let originalBytes = 0;
  let savedBytes = 0;
  let optimizedCount = 0;

  for (const file of files) {
    if (!file || typeof file.name !== 'string') continue;

    const optimizedFile = await optimizeImage(file);
    const uniqueName = await ensureUniqueName(uploadDir, optimizedFile.filename);
    const filePath = path.join(uploadDir, uniqueName);

    await fs.writeFile(filePath, optimizedFile.buffer);
    saved.push(uniqueName);
    originalBytes += optimizedFile.originalBytes;
    savedBytes += optimizedFile.savedBytes;
    if (optimizedFile.optimized) optimizedCount += 1;
  }

  if (saved.length === 0) {
    throw new UploadError('No valid files uploaded', 400);
  }

  const savingsBytes = Math.max(originalBytes - savedBytes, 0);
  const message =
    savingsBytes > 0
      ? `Uploaded ${saved.length} ${label}. Optimized ${optimizedCount} file${optimizedCount === 1 ? '' : 's'} and reduced total size from ${formatBytes(originalBytes)} to ${formatBytes(savedBytes)}.`
      : `Uploaded ${saved.length} ${label}.`;

  return {
    message,
    files: saved,
    optimizedCount,
    originalBytes,
    savedBytes,
    savingsBytes,
  };
}
