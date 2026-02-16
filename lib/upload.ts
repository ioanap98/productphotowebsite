import fs from 'fs/promises';
import path from 'path';

export const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '5242880', 10); // 5 MB default

export function sanitizeFilename(name: string) {
  // keep only basename, replace whitespace, strip any suspicious chars, limit length
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
      // file does not exist
      return candidate;
    }
  }
}
