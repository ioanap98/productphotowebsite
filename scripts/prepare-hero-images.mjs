import fs from 'node:fs/promises';
import path from 'node:path';
import { prepareHeroImage } from '../lib/hero-assets.mjs';

for (const bucket of ['web', 'mobile']) {
  const directory = path.join(process.cwd(), 'public/uploads', bucket);
  const entries = await fs.readdir(directory, { withFileTypes: true }).catch((error) => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  const files = entries.filter((entry) => entry.isFile() && !entry.name.startsWith('.') && /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(entry.name));
  for (const file of files) await prepareHeroImage(bucket, file.name);
  console.log(`Prepared ${files.length} ${bucket} hero images.`);
}
